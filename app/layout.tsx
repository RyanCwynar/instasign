import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "InstaSIGN – Custom Signs in Delray Beach, Boca Raton & Palm Beach County",
    template: "%s | InstaSIGN",
  },
  description: "Custom business signs, banners, vehicle wraps & more. Serving Delray Beach, Boca Raton, Boynton Beach & Palm Beach County since 1986. Free quotes!",
  keywords: [
    "custom signs",
    "sign shop",
    "business signs",
    "banners",
    "vehicle wraps",
    "Delray Beach signs",
    "Boca Raton signs",
    "Boynton Beach signs",
    "Palm Beach County signs",
    "sign installation",
    "channel letters",
    "monument signs",
  ],
  authors: [{ name: "InstaSIGN" }],
  creator: "InstaSIGN",
  metadataBase: new URL("https://instasign.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://instasign.com",
    siteName: "InstaSIGN",
    title: "InstaSIGN – Custom Signs in Palm Beach County",
    description: "Custom business signs, banners, vehicle wraps & more. Serving Delray Beach, Boca Raton & Boynton Beach since 1986.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InstaSIGN - Custom Signs in Palm Beach County",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaSIGN – Custom Signs in Palm Beach County",
    description: "Custom business signs, banners, vehicle wraps & more. Serving South Florida since 1986.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you set up Search Console
    // google: "your-google-verification-code",
  },
};

// Local Business JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://instasign.com/#business",
  name: "InstaSIGN",
  image: "https://instasign.com/logo.svg",
  description: "Custom business signs, banners, vehicle wraps and more. Serving Palm Beach County since 1986.",
  url: "https://instasign.com",
  telephone: "+1-561-685-7335",
  email: "bill@instasign.com",
  foundingDate: "1986",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "155 Avenue L",
    addressLocality: "Delray Beach",
    addressRegion: "FL",
    postalCode: "33483",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.4615,
    longitude: -80.0728,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Delray Beach",
      sameAs: "https://en.wikipedia.org/wiki/Delray_Beach,_Florida",
    },
    {
      "@type": "City",
      name: "Boca Raton",
      sameAs: "https://en.wikipedia.org/wiki/Boca_Raton,_Florida",
    },
    {
      "@type": "City",
      name: "Boynton Beach",
      sameAs: "https://en.wikipedia.org/wiki/Boynton_Beach,_Florida",
    },
    {
      "@type": "AdministrativeArea",
      name: "Palm Beach County",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sign Products & Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Custom Signs",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Banners" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vehicle Wraps" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Channel Letters" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monument Signs" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Building Signs" } },
        ],
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
