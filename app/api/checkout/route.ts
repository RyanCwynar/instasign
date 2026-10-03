import Stripe from "stripe";
import { calculateQuote, PricingError, PRICING } from "@/lib/pricing";
import type { ChatAttachment } from "@/lib/chat-types";

export const runtime = "nodejs";

interface CheckoutBody {
  quoteRequest: unknown;
  projectSummary?: string;
  attachments?: ChatAttachment[];
}

/** Stripe metadata values max out at 500 characters, so long text is split across numbered keys. */
function chunkMetadata(prefix: string, text: string, maxChunks: number): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < maxChunks && i * 500 < text.length; i++) {
    out[`${prefix}_${i + 1}`] = text.slice(i * 500, (i + 1) * 500);
  }
  return out;
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json({ error: "Online checkout isn't configured yet. Please call (561) 685-7335." }, { status: 503 });
  }

  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Never trust a client-side price: re-run the exact same pricing engine the assistant used.
  let quote;
  try {
    quote = calculateQuote(body.quoteRequest);
  } catch (err) {
    const message = err instanceof PricingError ? err.message : "Could not price this order.";
    return Response.json({ error: message }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const summary = String(body.projectSummary ?? "").slice(0, 3000);
  const files = (body.attachments ?? [])
    .slice(0, 30)
    .map((a) => (typeof a.url === "string" && a.url.startsWith("https://") ? a.url : String(a.name ?? "")))
    .filter(Boolean)
    .join("\n");

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = quote.lines.map((line) => ({
    quantity: line.quantity,
    price_data: {
      currency: "usd",
      unit_amount: line.unitCents,
      product_data: { name: line.name.slice(0, 250), description: line.detail.slice(0, 500) || undefined },
    },
  }));
  if (quote.taxCents > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: quote.taxCents,
        product_data: { name: `Sales tax (${(PRICING.salesTaxRate * 100).toFixed(1).replace(/\.0$/, "")}%)` },
      },
    });
  }

  const fulfillment = quote.request.fulfillment;
  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_creation: "always",
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      ...(fulfillment !== "pickup" ? { shipping_address_collection: { allowed_countries: ["US"] } } : {}),
      custom_text: {
        submit: {
          message: "We'll email a digital proof for your approval before anything is printed.",
        },
      },
      metadata: {
        source: "homepage-sign-assistant",
        fulfillment,
        design: quote.request.design,
        rush: String(quote.request.rush),
        quote_total_cents: String(quote.totalCents),
        ...chunkMetadata("project_summary", summary, 6),
        ...chunkMetadata("artwork", files, 6),
        ...chunkMetadata("quote_request", JSON.stringify(quote.request), 16),
      },
      payment_intent_data: {
        description: `InstaSIGN order: ${quote.lines.map((l) => `${l.quantity}x ${l.name}`).join(", ")}`.slice(0, 1000),
      },
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#home`,
    });
    return Response.json({ url: session.url });
  } catch (err) {
    console.error("stripe checkout failed", err);
    return Response.json({ error: "Couldn't start checkout. Please try again or call (561) 685-7335." }, { status: 502 });
  }
}
