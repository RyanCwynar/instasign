# InstaSIGN

Professional custom signage company serving Palm Beach County, Florida since 1986.

🌐 **Website:** [instasign.com](https://instasign.com)

## About

InstaSIGN specializes in custom signs, vehicle wraps, banners, and commercial signage for businesses throughout South Florida. From storefronts to fleet graphics, we deliver quality craftsmanship with fast turnaround times.

## Services

- **Custom Signs** - Business signage, dimensional letters, lobby signs
- **Vehicle Wraps** - Cars, trucks, vans, fleet graphics
- **Banners** - Vinyl banners, event signage, trade show displays
- **Building Signs** - Channel letters, monument signs, exterior signage
- **Real Estate Signs** - Yard signs, directional signs, for sale signs
- **LED & Neon Signs** - Illuminated signage, open signs
- **Window Graphics** - Storefront graphics, privacy film, vehicle windows

## Project Structure

```
app/
├── page.tsx              # Homepage
├── contact/              # Contact page
├── products/             # Products showcase
├── services/             # SEO landing pages
│   ├── [service]/        # Service pages (signs, banners, vehicle-wrap, etc.)
│   │   └── [location]/   # Location-specific pages (boca-raton, delray-beach, etc.)
├── components/           # Reusable UI components
├── sitemap.ts            # Auto-generated sitemap
└── robots.ts             # Robots.txt config
```

## SEO Pages

The site uses programmatic SEO to generate location-specific service pages. Pages are auto-generated from a keyword database and follow the pattern:

- `/services/signs` - General signs page
- `/services/signs/boca-raton` - Signs in Boca Raton
- `/services/vehicle-wrap/west-palm-beach` - Vehicle wraps in West Palm Beach

### Current Coverage

**Services:** signs, banners, vehicle-wrap, building-signs, neon-signs, led-signs, real-estate-signs, window-graphics

**Locations:** Delray Beach, Boca Raton, Boynton Beach, West Palm Beach, Lake Worth, Wellington, Jupiter, Palm Beach Gardens

## Homepage Sign Assistant (chat → quote → Stripe checkout)

The homepage hero is a chat assistant (Claude) that asks what sign the customer needs, takes images / PDFs / pasted screenshots, prices the job, and lets them pay with Stripe Checkout.

| File | Purpose |
| --- | --- |
| `lib/pricing.ts` | Pricing engine. **All prices live in the `PRICING` object.** Tune them here. |
| `lib/signbot.ts` | Assistant system prompt, shop policies, and tool definitions |
| `app/components/SignChat.tsx` | Chat UI in the hero |
| `app/api/chat/route.ts` | Streams the conversation; runs the `calculate_quote` / `request_custom_quote` tools |
| `app/api/upload/route.ts` | Uploads customer files (Anthropic Files API, plus Vercel Blob if configured) |
| `app/api/checkout/route.ts` | Re-prices the quote server-side and creates a Stripe Checkout session |
| `app/order/success/page.tsx` | Post-payment confirmation page |

The assistant never invents prices: it can only quote what `calculateQuote()` returns, and checkout recalculates the price on the server, so the browser can't change what gets charged. Channel letters, monuments, wraps, illuminated and oversized work go to `request_custom_quote` and become a lead instead of an online order.

### Environment variables (set in Vercel)

| Variable | Required | Notes |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | yes | Claude API key |
| `STRIPE_SECRET_KEY` | yes | `sk_live_...` / `sk_test_...` |
| `NEXT_PUBLIC_SITE_URL` | recommended | e.g. `https://instasign.com`, used for Stripe return URLs |
| `BLOB_READ_WRITE_TOKEN` | recommended | Vercel Blob. Saves customer artwork so the shop can download it; links are added to the Stripe payment's metadata |
| `LEAD_WEBHOOK_URL` | optional | Custom-quote leads are POSTed here as JSON with a `text` field (works with Slack incoming webhooks, Zapier, Make) |

Paid orders show up in the Stripe dashboard. Each line item carries the sign specs, and the session metadata holds the production notes (`project_summary_*`), artwork links (`artwork_*`) and the exact quote input (`quote_request_*`).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Push to `main` branch triggers automatic deployment via Vercel.

## License

© 2026 InstaSIGN. All rights reserved.
