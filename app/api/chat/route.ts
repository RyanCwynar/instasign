import Anthropic from "@anthropic-ai/sdk";
import { calculateQuote, PricingError, QuoteRequestSchema } from "@/lib/pricing";
import { SIGNBOT_MODEL, SYSTEM_PROMPT, TOOLS } from "@/lib/signbot";
import { getGatewayClient } from "@/lib/ai-gateway";
import {
  ALLOWED_UPLOAD_TYPES,
  MAX_ATTACHMENTS_PER_CONVERSATION,
  MAX_UPLOAD_BYTES,
  type ChatAttachment,
  type ChatMessage,
  type ChatRequestBody,
  type ChatStreamEvent,
  type CustomQuoteState,
} from "@/lib/chat-types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_MESSAGES = 60;
const MAX_TEXT_CHARS = 4000;
const MAX_ATTACHMENTS_PER_MESSAGE = 6;
const MAX_TOOL_ROUNDS = 5;

/** Only fetch attachments from our own Vercel Blob store, never arbitrary URLs. */
function isBlobUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

/** Download an uploaded file from Blob and turn it into an image or PDF content block. */
async function attachmentBlock(a: ChatAttachment): Promise<Anthropic.ContentBlockParam> {
  const res = await fetch(a.url);
  if (!res.ok) throw new Error(`Couldn't load ${a.name}`);
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length > MAX_UPLOAD_BYTES) throw new Error(`${a.name} is too large`);
  const data = bytes.toString("base64");
  if (a.mediaType === "application/pdf") {
    return { type: "document", source: { type: "base64", media_type: "application/pdf", data }, title: a.name };
  }
  return { type: "image", source: { type: "base64", media_type: a.mediaType, data } };
}

/** Turn the browser's chat transcript into Messages API turns. */
async function toApiMessages(history: ChatMessage[]): Promise<Anthropic.MessageParam[]> {
  return Promise.all(
    history.map(async (m): Promise<Anthropic.MessageParam> => {
      if (m.role === "assistant") {
        return { role: "assistant", content: m.text || "(no reply)" };
      }
      const content: Anthropic.ContentBlockParam[] = await Promise.all((m.attachments ?? []).map(attachmentBlock));
      content.push({ type: "text", text: m.text || "(see attached)" });
      return { role: "user", content };
    }),
  );
}

function validate(body: ChatRequestBody): string | null {
  if (!Array.isArray(body.messages) || body.messages.length === 0) return "No messages.";
  if (body.messages.length > MAX_MESSAGES) return "This conversation is too long. Please call us at (561) 685-7335.";
  if (body.messages[0].role !== "user" || body.messages.at(-1)?.role !== "user") return "Malformed conversation.";
  const totalAttachments = body.messages.reduce((n, m) => n + (m.attachments?.length ?? 0), 0);
  if (totalAttachments > MAX_ATTACHMENTS_PER_CONVERSATION) {
    return `Please keep it to ${MAX_ATTACHMENTS_PER_CONVERSATION} files per conversation, or email artwork to bill@instasign.com.`;
  }
  for (const m of body.messages) {
    if (m.role !== "user" && m.role !== "assistant") return "Malformed conversation.";
    if (typeof m.text !== "string" || m.text.length > MAX_TEXT_CHARS) return "Message too long.";
    const atts = m.attachments ?? [];
    if (m.role === "assistant" && atts.length) return "Malformed conversation.";
    if (atts.length > MAX_ATTACHMENTS_PER_MESSAGE) return "Too many attachments in one message.";
    for (const a of atts) {
      if (!isBlobUrl(a.url) || !(ALLOWED_UPLOAD_TYPES as readonly string[]).includes(a.mediaType)) {
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
  const files = transcript.flatMap((m) => m.attachments ?? []).map((a) => a.url);
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
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid JSON.");
  }
  const problem = validate(body);
  if (problem) return badRequest(problem);

  const anthropic = await getGatewayClient();
  if (!anthropic) {
    return Response.json({ error: "The sign assistant isn't configured yet." }, { status: 503 });
  }

  let messages: Anthropic.MessageParam[];
  try {
    messages = await toApiMessages(body.messages);
  } catch (err) {
    return badRequest(`${(err as Error).message}. Please re-attach it.`);
  }

  // Remind the model what the customer is currently looking at, re-priced here rather than trusted from the client.
  // It rides on the newest user turn as an extra text block, since history is rebuilt on every request.
  const current = body.quoteRequest ? QuoteRequestSchema.safeParse(body.quoteRequest) : null;
  if (current?.success) {
    try {
      const q = calculateQuote(current.data);
      const last = messages[messages.length - 1];
      (last.content as Anthropic.ContentBlockParam[]).unshift({
        type: "text",
        text: `[Context from the website, not typed by the customer: they are currently looking at a quote totaling ${q.totalCents} cents. Its calculate_quote input was: ${JSON.stringify({ ...current.data, project_summary: body.projectSummary ?? "" })}]`,
      });
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
          const response = anthropic.messages.stream({
            model: SIGNBOT_MODEL,
            max_tokens: 16000,
            thinking: { type: "adaptive" },
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

          const toolUses = message.content.filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
          if (message.stop_reason !== "tool_use" || toolUses.length === 0) break;

          const results: Anthropic.ToolResultBlockParam[] = [];
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
