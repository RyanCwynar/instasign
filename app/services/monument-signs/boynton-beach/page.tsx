import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "Monument Signs in Boynton Beach, FL | InstaSIGN",
  description: "Professional ground-mounted monument signs in Boynton Beach, Florida. InstaSIGN has been serving Palm Beach County since 1986. Custom designs, durable materials, free quotes.",
  alternates: {
    canonical: "/services/monument-signs/boynton-beach",
  },
  openGraph: {
    title: "Monument Signs in Boynton Beach, FL",
    description: "Professional ground-mounted monument signs in Boynton Beach, Florida. InstaSIGN - since 1986.",
  },
};

export default function MonumentSignsBoyntonBeachPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
              Serving Boynton Beach Since 1986
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-white">
            Monument Signs in Boynton Beach, FL
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Establish your Boynton Beach business presence with custom monument signs. Elegant, durable, and designed to impress.
          </p>
          <ContactModal>
            <button className="btn btn-primary text-lg px-8 py-4">
              Get a Free Quote
            </button>
          </ContactModal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Why Choose InstaSIGN for Monument Signs?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Custom designs with premium materials",
              "Illuminated or non-illuminated options",
              "Built to withstand Florida weather",
              "Complete permitting and installation"
            ].map((benefit, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#c05555] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{benefit}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Monument Signs in Boynton Beach
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Looking for professional monument signs in Boynton Beach, Florida? InstaSIGN has been the trusted choice for businesses throughout Palm Beach County since 1986. Our monument signs help Boynton Beach businesses create a professional, welcoming entrance.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            From retail centers along Congress Avenue to industrial parks in the Quantum area, we design and install monument signs that make lasting impressions. Our team understands Boynton Beach's permitting requirements and works efficiently to get your sign installed.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Contact us today for a free quote on your monument sign project in Boynton Beach.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Contact us today for a free quote on monument signs in Boynton Beach.
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
