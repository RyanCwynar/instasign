import type { Quote, QuoteRequest } from "./pricing";

export const ALLOWED_UPLOAD_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp", "application/pdf"] as const;
/** Vercel serverless functions reject request bodies over 4.5 MB. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export interface ChatAttachment {
  /** Anthropic Files API id. */
  fileId: string;
  name: string;
  mediaType: (typeof ALLOWED_UPLOAD_TYPES)[number];
  /** Public URL for the shop's records, when Vercel Blob storage is configured. */
  url?: string;
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
