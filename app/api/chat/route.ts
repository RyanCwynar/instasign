import Anthropic from "@anthropic-ai/sdk";
import { calculateQuote, PricingError, QuoteRequestSchema } from "@/lib/pricing";
import { SIGNBOT_MODEL, SYSTEM_PROMPT, TOOLS } from "@/lib/signbot";
import {
  ALLOWED_UPLOAD_TYPES,
  type ChatMessage,
  type ChatRequestBody,
  type ChatStreamEvent,
  type CustomQuoteState,
} from "@/lib/chat-types";

export const runtime = "nodejs";
export const maxDuration = 60;

const anthropic = new Anthropic();

const MAX_MESSAGES = 60;
const MAX_TEXT_CHARS = 4000;
const MAX_ATTACHMENTS_PER_MESSAGE = 6;
const MAX_TOOL_ROUNDS = 5;
const FILE_ID_RE = /^file_[A-Za-z0-9_-]{8,}$/;

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

/** Turn the browser's chat transcript into Messages API turns. */
function toApiMessages(history: ChatMessage[]): Anthropic.Beta.BetaMessageParam[] {
  return history.map((m) => {
    if (m.role === "assistant") {
      return { role: "assistant", content: m.text || "(no reply)" };
    }
    const content: Anthropic.Beta.BetaContentBlockParam[] = [];
    for (const a of m.attachments ?? []) {
      if (a.mediaType === "application/pdf") {
        content.push({ type: "document", source: { type: "file", file_id: a.fileId }, title: a.name });
      } else {
        content.push({ type: "image", source: { type: "file", file_id: a.fileId } });
      }
    }
    content.push({ type: "text", text: m.text || "(see attached)" });
    return { role: "user", content };
  });
}

function validate(body: ChatRequestBody): string | null {
  if (!Array.isArray(body.messages) || body.messages.length === 0) return "No messages.";
  if (body.messages.length > MAX_MESSAGES) return "This conversation is too long. Please call us at (561) 685-7335.";
  if (body.messages[0].role !== "user" || body.messages.at(-1)?.role !== "user") return "Malformed conversation.";
  for (const m of body.messages) {
    if (m.role !== "user" && m.role !== "assistant") return "Malformed conversation.";
    if (typeof m.text !== "string" || m.text.length > MAX_TEXT_CHARS) return "Message too long.";
    const atts = m.attachments ?? [];
    if (m.role === "assistant" && atts.length) return "Malformed conversation.";
    if (atts.length > MAX_ATTACHMENTS_PER_MESSAGE) return "Too many attachments in one message.";
    for (const a of atts) {
      if (!FILE_ID_RE.test(a.fileId) || !(ALLOWED_UPLOAD_TYPES as readonly string[]).includes(a.mediaType)) {
        return "Invalid attachment.";
      }
    }
  }
  return null;
}

async function sendLead(lead: CustomQuoteState, transcript: ChatMessage[]) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    console.log("custom quote lead (set LEAD_WEBHOOK_URL to forward these):", lead);
    return;
  }
  const files = transcript.flatMap((m) => m.attachments ?? []).map((a) => a.url ?? a.name);
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      text: `New custom sign quote request from ${lead.customerName} (${lead.contact})\n\n${lead.summary}${files.length ? `\n\nFiles: ${files.join(", ")}` : ""}`,
      ...lead,
      files,
    }),
  }).catch((err) => console.error("lead webhook failed", err));
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "The sign assistant isn't configured yet." }, { status: 503 });
  }
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid JSON.");
  }
  const problem = validate(body);
  if (problem) return badRequest(problem);

  const messages = toApiMessages(body.messages);

  // Remind the model what the customer is currently looking at, re-priced here rather than trusted from the client.
  const current = body.quoteRequest ? QuoteRequestSchema.safeParse(body.quoteRequest) : null;
  if (current?.success) {
    try {
      const q = calculateQuote(current.data);
      messages.push({
        role: "system",
        content: `The customer is currently looking at this quote (total ${q.totalCents} cents). Its calculate_quote input was:\n${JSON.stringify({ ...current.data, project_summary: body.projectSummary ?? "" })}`,
      } as Anthropic.Beta.BetaMessageParam);
    } catch {
      // A stale quote that no longer prices is simply not mentioned.
    }
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: ChatStreamEvent) => controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));

      try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          const response = anthropic.beta.messages.stream({
            model: SIGNBOT_MODEL,
            max_tokens: 16000,
            betas: ["server-side-fallback-2026-07-01"],
            fallbacks: "default",
            output_config: { effort: "low" },
            system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
            tools: TOOLS,
            messages,
          });

          if (round > 0) emit({ type: "text", delta: "\n\n" });
          response.on("text", (delta) => emit({ type: "text", delta }));
          const message = await response.finalMessage();

          if (message.stop_reason === "refusal") {
            emit({ type: "text", delta: "Sorry, I can't help with that here. Please call us at (561) 685-7335." });
            break;
          }

          messages.push({ role: "assistant", content: message.content });

          const toolUses = message.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");
          if (message.stop_reason !== "tool_use" || toolUses.length === 0) break;

          const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
          for (const tool of toolUses) {
            const input = tool.input as Record<string, unknown>;
            if (tool.name === "calculate_quote") {
              try {
                const { project_summary, ...request } = input;
                const quote = calculateQuote(request);
                emit({ type: "quote", quote, projectSummary: String(project_summary ?? "") });
                results.push({ type: "tool_result", tool_use_id: tool.id, content: JSON.stringify(quote) });
              } catch (err) {
                const msg = err instanceof PricingError ? err.message : "Pricing failed.";
                results.push({ type: "tool_result", tool_use_id: tool.id, content: msg, is_error: true });
              }
            } else if (tool.name === "request_custom_quote") {
              const lead: CustomQuoteState = {
                customerName: String(input.customer_name ?? ""),
                contact: String(input.contact ?? ""),
                summary: String(input.summary ?? ""),
              };
              await sendLead(lead, body.messages);
              emit({ type: "custom_quote", lead });
              results.push({ type: "tool_result", tool_use_id: tool.id, content: "Sent to the InstaSIGN team." });
            } else {
              results.push({ type: "tool_result", tool_use_id: tool.id, content: "Unknown tool.", is_error: true });
            }
          }
          messages.push({ role: "user", content: results });
        }
        emit({ type: "done" });
      } catch (err) {
        console.error("chat failed", err);
        const message =
          err instanceof Anthropic.RateLimitError
            ? "We're getting a lot of requests right now. Please try again in a minute."
            : "Something went wrong on our end. Please try again, or call (561) 685-7335.";
        emit({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" },
  });
}
