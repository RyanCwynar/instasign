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
