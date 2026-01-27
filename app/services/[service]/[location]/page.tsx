import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

// API base URL - internal for server components
const API_URL = process.env.PAGES_API_URL || "http://127.0.0.1:3457";

interface PageData {
  slug: string;
  service: string;
  location: string | null;
  title: string;
  description: string | null;
  h1: string | null;
  content: string | null;
}

async function getPageData(service: string, location: string): Promise<PageData | null> {
  try {
    const slug = `${service}/${location}`;
    const res = await fetch(`${API_URL}/api/public/pages/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

async function getAllPages(): Promise<PageData[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/pages`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.pages || [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages
    .filter(p => p.location)
    .map(p => ({
      service: p.service.replace(/\s+/g, '-').toLowerCase(),
      location: p.location!.replace(/\s+/g, '-').toLowerCase(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; location: string }> }): Promise<Metadata> {
  const { service, location } = await params;
  const page = await getPageData(service, location);
  
  if (!page) {
    return { title: "Page Not Found" };
  }

  const serviceTitle = service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const locationTitle = location.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: page.title || `${serviceTitle} in ${locationTitle}`,
    description: page.description || `Professional ${serviceTitle.toLowerCase()} services in ${locationTitle}, FL. Quality craftsmanship since 1986. Free quotes!`,
    alternates: {
      canonical: `/services/${service}/${location}`,
    },
    openGraph: {
      title: page.title || `${serviceTitle} in ${locationTitle} | InstaSIGN`,
      description: page.description || `Professional ${serviceTitle.toLowerCase()} in ${locationTitle}. Contact us for a free quote!`,
    },
  };
}

export default async function ServiceLocationPage({ params }: { params: Promise<{ service: string; location: string }> }) {
  const { service, location } = await params;
  const page = await getPageData(service, location);

  // Format for display
  const serviceTitle = service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const locationTitle = location.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // If no page in DB, show a default template
  const title = page?.h1 || page?.title || `${serviceTitle} in ${locationTitle}`;
  const description = page?.description || `Looking for professional ${serviceTitle.toLowerCase()} in ${locationTitle}, Florida? InstaSIGN has been serving Palm Beach County since 1986. We deliver quality craftsmanship, fast turnaround, and expert installation.`;
  const content = page?.content;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
              Serving {locationTitle} Since 1986
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-white">{title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {description}
          </p>
          <ContactModal>
            <button className="btn btn-primary text-lg px-8 py-4">
              Get a Free Quote
            </button>
          </ContactModal>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {content ? (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Why Choose InstaSIGN for {serviceTitle}?
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Local Expertise</h3>
                  <p className="text-gray-600">
                    Based in Delray Beach, we know {locationTitle} and the surrounding Palm Beach County area. 
                    We understand local regulations and can handle permits when needed.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Quality Materials</h3>
                  <p className="text-gray-600">
                    We use only premium materials built to withstand Florida's sun and weather. 
                    Your {serviceTitle.toLowerCase()} will look great for years.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Fast Turnaround</h3>
                  <p className="text-gray-600">
                    Need it quick? We offer fast turnaround times without sacrificing quality. 
                    Rush orders available for {locationTitle} customers.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Professional Installation</h3>
                  <p className="text-gray-600">
                    Our experienced team handles delivery and installation throughout {locationTitle}. 
                    We ensure your signage is placed perfectly.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {serviceTitle} Services We Offer
              </h2>
              <p className="text-gray-600 mb-8">
                Whether you need a single sign or a complete signage package for your {locationTitle} business, 
                InstaSIGN has you covered. We offer custom design, manufacturing, and installation services 
                for all types of {serviceTitle.toLowerCase()}.
              </p>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Ready to Get Started in {locationTitle}?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Contact us today for a free quote on your {serviceTitle.toLowerCase()} project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactModal>
              <button className="btn btn-primary">Get Your Free Quote</button>
            </ContactModal>
            <a href="/contact" className="btn btn-white">
              Visit Our Shop
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
