import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "Window Graphics in Boynton Beach, FL | InstaSIGN",
  description: "Professional window graphics, frosted vinyl, and perforated film in Boynton Beach, Florida. InstaSIGN has been serving Palm Beach County since 1986. Free quotes available.",
  alternates: {
    canonical: "/services/window-graphics/boynton-beach",
  },
  openGraph: {
    title: "Window Graphics in Boynton Beach, FL",
    description: "Professional window graphics and films in Boynton Beach, Florida. InstaSIGN - since 1986.",
  },
};

export default function WindowGraphicsBoyntonBeachPage() {
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
            Window Graphics in Boynton Beach, FL
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your Boynton Beach storefront with professional window graphics. Frosted vinyl, perforated film, and custom designs.
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
            Why Choose InstaSIGN for Window Graphics?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Frosted vinyl for privacy and branding",
              "Perforated film: see out, advertise out",
              "Full-color digitally printed graphics",
              "Professional installation included"
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
            Window Graphics in Boynton Beach
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Looking for professional window graphics in Boynton Beach, Florida? InstaSIGN has been the trusted choice for businesses throughout Palm Beach County since 1986. We help Boynton Beach storefronts and offices make the most of their window space.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            From retail shops in shopping centers to office buildings along Congress Avenue, our window graphics solutions include frosted privacy films, eye-catching perforated graphics, and professional vinyl lettering. All designed to attract customers and build your brand.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Contact us today for a free quote on your window graphics project in Boynton Beach.
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
            Contact us today for a free quote on window graphics in Boynton Beach.
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
