import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";
import Link from "next/link";

const API_URL = process.env.PAGES_API_URL || "http://127.0.0.1:3457";

interface PageData {
  slug: string;
  service: string;
  location: string | null;
  title: string;
}

async function getServicePages(service: string): Promise<PageData[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/pages`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.pages || []).filter((p: PageData) => 
      p.service.replace(/\s+/g, '-').toLowerCase() === service && p.location
    );
  } catch {
    return [];
  }
}

// Service descriptions
const serviceInfo: Record<string, { title: string; description: string; features: string[] }> = {
  'signs': {
    title: 'Custom Signs',
    description: 'Professional custom signs for businesses of all sizes. From storefronts to directional signage, we create signs that make an impact.',
    features: ['Business Signs', 'Directional Signs', 'ADA Compliant Signs', 'Illuminated Signs', 'Dimensional Letters'],
  },
  'banners': {
    title: 'Custom Banners',
    description: 'Eye-catching banners for events, promotions, and advertising. Durable materials for indoor and outdoor use.',
    features: ['Vinyl Banners', 'Mesh Banners', 'Retractable Banners', 'Pole Banners', 'Event Banners'],
  },
  'vehicle-wraps': {
    title: 'Vehicle Wraps',
    description: 'Transform your vehicle into a mobile billboard. Full wraps, partial wraps, and lettering for cars, trucks, and fleets.',
    features: ['Full Vehicle Wraps', 'Partial Wraps', 'Fleet Graphics', 'Vehicle Lettering', 'Boat Wraps'],
  },
  'channel-letters': {
    title: 'Channel Letters',
    description: 'Professional 3D channel letters for building signage. Illuminated and non-illuminated options available.',
    features: ['Front-Lit Channel Letters', 'Back-Lit (Halo) Letters', 'Combination Lit', 'Plastic Face Letters', 'Metal Face Letters'],
  },
  'monument-signs': {
    title: 'Monument Signs',
    description: 'Impressive monument signs for property identification. Perfect for business entrances and developments.',
    features: ['Brick Monuments', 'Stone Monuments', 'Aluminum Monuments', 'Illuminated Monuments', 'Multi-Tenant Signs'],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const info = serviceInfo[service];
  const serviceTitle = info?.title || service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: `${serviceTitle} in Palm Beach County`,
    description: info?.description || `Professional ${serviceTitle.toLowerCase()} services in Palm Beach County, FL. Serving Delray Beach, Boca Raton, and Boynton Beach since 1986.`,
    alternates: {
      canonical: `/services/${service}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const info = serviceInfo[service];
  const serviceTitle = info?.title || service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const locationPages = await getServicePages(service);

  const locations = ['Delray Beach', 'Boca Raton', 'Boynton Beach', 'West Palm Beach', 'Lake Worth', 'Wellington', 'Jupiter', 'Palm Beach Gardens'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-white">{serviceTitle}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {info?.description || `Professional ${serviceTitle.toLowerCase()} services in Palm Beach County. Quality craftsmanship since 1986.`}
          </p>
          <ContactModal>
            <button className="btn btn-primary text-lg px-8 py-4">
              Get a Free Quote
            </button>
          </ContactModal>
        </div>
      </section>

      {/* Features */}
      {info?.features && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our {serviceTitle} Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {info.features.map((feature, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
            {serviceTitle} by Location
          </h2>
          <p className="text-center text-gray-600 mb-8">
            We serve all of Palm Beach County. Click a location for more information.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            {locations.map((loc) => {
              const slug = loc.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={loc}
                  href={`/services/${service}/${slug}`}
                  className="bg-white rounded-lg p-4 text-center shadow hover:shadow-lg transition-shadow"
                >
                  <span className="font-medium text-gray-900">{serviceTitle} in {loc}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-700">
            Contact us today for a free quote on your {serviceTitle.toLowerCase()} project.
          </p>
          <ContactModal>
            <button className="btn btn-primary">Get Your Free Quote</button>
          </ContactModal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
