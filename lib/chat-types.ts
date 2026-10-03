import type { Quote, QuoteRequest } from "./pricing";

export const ALLOWED_UPLOAD_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp", "application/pdf"] as const;
/** Vercel serverless functions reject request bodies over 4.5 MB. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

/** Customer files live in Vercel Blob; the chat route fetches them and sends the bytes to Claude. */
export const MAX_ATTACHMENTS_PER_CONVERSATION = 10;

export interface ChatAttachment {
  /** Public Vercel Blob URL (random suffix, so it isn't guessable). */
  url: string;
  name: string;
  mediaType: (typeof ALLOWED_UPLOAD_TYPES)[number];
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  attachments?: ChatAttachment[];
}

export interface QuoteState {
  quote: Quote;
  request: QuoteRequest;
  projectSummary: string;
}

export interface CustomQuoteState {
  customerName: string;
  contact: string;
  summary: string;
}

export interface ChatRequestBody {
  messages: ChatMessage[];
  /** The most recent quote the customer was shown, re-priced on the server. */
  quoteRequest?: QuoteRequest | null;
  projectSummary?: string | null;
}

/** Newline-delimited JSON events streamed from /api/chat. */
export type ChatStreamEvent =
  | { type: "text"; delta: string }
  | { type: "quote"; quote: Quote; projectSummary: string }
  | { type: "custom_quote"; lead: CustomQuoteState }
  | { type: "error"; message: string }
  | { type: "done" };
