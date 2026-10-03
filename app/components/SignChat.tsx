"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Quote } from "@/lib/pricing";
import {
  ALLOWED_UPLOAD_TYPES,
  MAX_UPLOAD_BYTES,
  type ChatAttachment,
  type ChatMessage,
  type ChatStreamEvent,
  type CustomQuoteState,
} from "@/lib/chat-types";

interface UiAttachment extends ChatAttachment {
  previewUrl?: string;
}

interface UiMessage {
  role: "user" | "assistant";
  text: string;
  attachments?: UiAttachment[];
  quote?: { quote: Quote; projectSummary: string };
  lead?: CustomQuoteState;
  error?: boolean;
}

interface PendingUpload {
  id: string;
  name: string;
  previewUrl?: string;
  attachment?: UiAttachment;
  error?: string;
}

const STORAGE_KEY = "instasign-chat-v1";
const GREETING =
  "Hi! I'm the InstaSIGN sign assistant. Tell me what kind of sign you need and I'll put together a price you can order right here. Feel free to drop in a logo, photo, sketch or screenshot.";
const STARTERS = ["Vinyl banner", "Yard signs", "Window or wall decals", "Aluminum / PVC sign", "Vehicle magnets", "Something else"];

const money = (cents: number) => (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

function loadSaved(): UiMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UiMessage[]) : [];
  } catch {
    return [];
  }
}

export default function SignChat() {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [busy, setBusy] = useState(false);
  const [paying, setPaying] = useState(false);
  const [dragging, setDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  // Restore after a refresh or a cancelled Stripe checkout.
  useEffect(() => {
    setMessages(loadSaved());
  }, []);

  useEffect(() => {
    try {
      const saveable = messages.map((m) => ({
        ...m,
        attachments: m.attachments?.map((a) => ({ ...a, previewUrl: undefined })),
      }));
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saveable));
    } catch {
      // Storage unavailable (private mode etc.) — the chat still works, it just won't survive a reload.
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const latestQuoteIndex = messages.findLastIndex((m) => m.quote);
  const latestQuote = latestQuoteIndex >= 0 ? messages[latestQuoteIndex].quote : undefined;

  const addFiles = useCallback((files: FileList | File[]) => {
    for (const file of Array.from(files)) {
      const id = crypto.randomUUID();
      const previewUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
      if (!(ALLOWED_UPLOAD_TYPES as readonly string[]).includes(file.type)) {
        setPending((p) => [...p, { id, name: file.name, error: "Only images and PDFs" }]);
        continue;
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        setPending((p) => [...p, { id, name: file.name, previewUrl, error: "Over 4 MB" }]);
        continue;
      }
      setPending((p) => [...p, { id, name: file.name || "pasted-image.png", previewUrl }]);
      const form = new FormData();
      form.append("file", file, file.name || "pasted-image.png");
      fetch("/api/upload", { method: "POST", body: form })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Upload failed");
          setPending((p) => p.map((u) => (u.id === id ? { ...u, attachment: { ...data, previewUrl } } : u)));
        })
        .catch((err: Error) => setPending((p) => p.map((u) => (u.id === id ? { ...u, error: err.message } : u))));
    }
  }, []);

  const uploading = pending.some((u) => !u.attachment && !u.error);

  async function send(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    const attachments = pending.flatMap((u) => (u.attachment ? [u.attachment] : []));
    if ((!text && attachments.length === 0) || busy || uploading) return;

    const userMsg: UiMessage = { role: "user", text, attachments: attachments.length ? attachments : undefined };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", text: "" }]);
    setInput("");
    setPending([]);
    setBusy(true);

    const history: ChatMessage[] = next
      .filter((m) => !m.error)
      .map((m) => ({
        role: m.role,
        text: m.text || (m.quote ? "Here's your quote." : ""),
        attachments: m.attachments?.map(({ url, name, mediaType }) => ({ url, name, mediaType })),
      }));

    const update = (fn: (m: UiMessage) => UiMessage) =>
      setMessages((prev) => [...prev.slice(0, -1), fn(prev[prev.length - 1])]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: history,
          quoteRequest: latestQuote?.quote.request ?? null,
          projectSummary: latestQuote?.projectSummary ?? null,
        }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as ChatStreamEvent;
          if (event.type === "text") update((m) => ({ ...m, text: m.text + event.delta }));
          else if (event.type === "quote") update((m) => ({ ...m, quote: { quote: event.quote, projectSummary: event.projectSummary } }));
          else if (event.type === "custom_quote") update((m) => ({ ...m, lead: event.lead }));
          else if (event.type === "error") throw new Error(event.message);
        }
      }
      update((m) => ({ ...m, text: m.text.trim() }));
    } catch (err) {
      update((m) => ({ ...m, text: (err as Error).message, error: true }));
    } finally {
      setBusy(false);
      textRef.current?.focus();
    }
  }

  async function pay() {
    if (!latestQuote || paying) return;
    setPaying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          quoteRequest: latestQuote.quote.request,
          projectSummary: latestQuote.projectSummary,
          attachments: messages.flatMap((m) => m.attachments ?? []).map(({ url, name, mediaType }) => ({ url, name, mediaType })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Couldn't start checkout.");
      window.location.href = data.url;
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", text: (err as Error).message, error: true }]);
      setPaying(false);
    }
  }

  function reset() {
    setMessages([]);
    setPending([]);
    setInput("");
  }

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto bg-white/95 backdrop-blur rounded-2xl shadow-2xl text-left flex flex-col overflow-hidden border ${dragging ? "border-primary ring-4 ring-primary/30" : "border-white/40"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-ink text-white">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="font-semibold">Instant Sign Quote</span>
          <span className="hidden sm:inline text-sm text-gray-400">· price it &amp; order online</span>
        </div>
        {messages.length > 0 && (
          <button onClick={reset} className="text-sm text-gray-300 hover:text-white cursor-pointer">
            Start over
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-[340px] md:h-[380px] overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        <Bubble role="assistant" text={GREETING} />
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pl-1">
            {STARTERS.map((s) => (
              <button
                key={s}
                onClick={() => send(s === "Something else" ? "I need something else" : `I need ${s.toLowerCase()}`)}
                className="px-3 py-1.5 rounded-full text-sm bg-white border border-gray-300 text-gray-800 hover:border-primary hover:text-primary cursor-pointer transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className="space-y-2">
            {(m.text || m.attachments?.length || (busy && i === messages.length - 1)) && (
              <Bubble role={m.role} text={m.text} attachments={m.attachments} error={m.error} typing={busy && i === messages.length - 1 && !m.text} />
            )}
            {m.quote && (
              <QuoteCard
                quote={m.quote.quote}
                current={i === latestQuoteIndex}
                paying={paying}
                onPay={pay}
              />
            )}
            {m.lead && <LeadCard lead={m.lead} />}
          </div>
        ))}
      </div>

      {/* Pending uploads */}
      {pending.length > 0 && (
        <div className="flex gap-2 px-4 pt-3 overflow-x-auto bg-white border-t border-gray-200">
          {pending.map((u) => (
            <div key={u.id} className="relative shrink-0 w-16">
              <div className={`w-16 h-16 rounded-lg border overflow-hidden flex items-center justify-center bg-gray-100 ${u.error ? "border-red-400" : "border-gray-300"}`}>
                {u.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
                  <img src={u.previewUrl} alt={u.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-semibold text-gray-500">PDF</span>
                )}
                {!u.attachment && !u.error && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-lg">
                    <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <button
                onClick={() => setPending((p) => p.filter((x) => x.id !== u.id))}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-800 text-white text-xs leading-none cursor-pointer"
                aria-label={`Remove ${u.name}`}
              >
                ×
              </button>
              <p className={`text-[10px] truncate mt-0.5 ${u.error ? "text-red-600" : "text-gray-500"}`}>{u.error ?? u.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Composer */}
      <form
        className="flex items-end gap-2 p-3 bg-white border-t border-gray-200"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept={ALLOWED_UPLOAD_TYPES.join(",")}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-100 cursor-pointer"
          aria-label="Attach images or PDFs"
          title="Attach images or PDFs (you can also paste or drag them in)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        <textarea
          ref={textRef}
          value={input}
          rows={1}
          maxLength={4000}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          onPaste={(e) => {
            const files = Array.from(e.clipboardData.files);
            if (files.length) {
              e.preventDefault();
              addFiles(files);
            }
          }}
          placeholder={messages.length ? "Type a reply, or paste a screenshot…" : "e.g. 3x8 ft banner for a grand opening"}
          className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={busy || uploading || (!input.trim() && !pending.some((u) => u.attachment))}
          className="shrink-0 h-11 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function Bubble({
  role,
  text,
  attachments,
  error,
  typing,
}: {
  role: "user" | "assistant";
  text: string;
  attachments?: UiAttachment[];
  error?: boolean;
  typing?: boolean;
}) {
  const mine = role === "user";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap break-words ${
          mine
            ? "bg-primary text-white rounded-br-md"
            : error
              ? "bg-red-50 text-red-800 border border-red-200 rounded-bl-md"
              : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
        }`}
      >
        {attachments && attachments.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {attachments.map((a) =>
              a.mediaType !== "application/pdf" ? (
                // eslint-disable-next-line @next/next/no-img-element -- local object URL or Blob preview
                <img key={a.url} src={a.previewUrl ?? a.url} alt={a.name} className="w-20 h-20 object-cover rounded-lg border border-white/40" />
              ) : (
                <span key={a.url} className={`text-xs px-2 py-1 rounded-md ${mine ? "bg-white/20" : "bg-gray-100"}`}>
                  📎 {a.name}
                </span>
              ),
            )}
          </div>
        )}
        {typing ? (
          <span className="inline-flex gap-1 py-1">
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
          </span>
        ) : (
          text
        )}
      </div>
    </div>
  );
}

function QuoteCard({ quote, current, paying, onPay }: { quote: Quote; current: boolean; paying: boolean; onPay: () => void }) {
  return (
    <div className={`rounded-xl border bg-white overflow-hidden ${current ? "border-primary shadow-md" : "border-gray-200 opacity-60"}`}>
      <div className="px-4 py-2 bg-gray-100 flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-800">{current ? "Your quote" : "Previous quote"}</span>
        <span className="text-gray-500">Prices in USD</span>
      </div>
      <ul className="divide-y divide-gray-100">
        {quote.lines.map((l, i) => (
          <li key={i} className="px-4 py-2 flex justify-between gap-3 text-sm">
            <div className="min-w-0">
              <p className="font-medium text-gray-900">
                {l.quantity > 1 ? `${l.quantity} × ` : ""}
                {l.name}
              </p>
              <p className="text-xs text-gray-500">{l.detail}</p>
            </div>
            <span className="shrink-0 font-medium text-gray-900">{money(l.totalCents)}</span>
          </li>
        ))}
      </ul>
      <div className="px-4 py-2 border-t border-gray-200 text-sm space-y-0.5">
        <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{money(quote.subtotalCents)}</span></div>
        <div className="flex justify-between text-gray-600"><span>Sales tax</span><span>{money(quote.taxCents)}</span></div>
        <div className="flex justify-between text-base font-bold text-gray-900 pt-1"><span>Total</span><span>{money(quote.totalCents)}</span></div>
        {quote.notes.map((n) => (
          <p key={n} className="text-xs text-gray-500 pt-1">{n}</p>
        ))}
      </div>
      {current && (
        <div className="px-4 pb-4 pt-1">
          <button
            onClick={onPay}
            disabled={paying}
            className="w-full h-11 rounded-lg bg-gray-900 hover:bg-black text-white font-semibold cursor-pointer disabled:opacity-60"
          >
            {paying ? "Opening secure checkout…" : `Pay ${money(quote.totalCents)} & place order`}
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">Secure payment by Stripe · We email a proof before printing</p>
        </div>
      )}
    </div>
  );
}

function LeadCard({ lead }: { lead: CustomQuoteState }) {
  const mailto = `mailto:bill@instasign.com?subject=${encodeURIComponent(`Custom sign quote — ${lead.customerName}`)}&body=${encodeURIComponent(`${lead.summary}\n\nContact: ${lead.customerName}, ${lead.contact}`)}`;
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
      <p className="font-semibold text-gray-900 mb-1">Sent to our team for a custom quote</p>
      <p className="text-gray-600 mb-2">We&apos;ll reach out at {lead.contact}. Want it faster? Call or email us directly.</p>
      <div className="flex gap-2">
        <a href="tel:+15616857335" className="px-3 py-1.5 rounded-lg bg-gray-900 text-white font-medium">Call (561) 685-7335</a>
        <a href={mailto} className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-800 font-medium">Email details</a>
      </div>
    </div>
  );
}
