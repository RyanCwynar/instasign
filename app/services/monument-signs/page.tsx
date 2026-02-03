import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "Monument Signs | InstaSIGN",
  description: "Professional ground-mounted monument signs for businesses in Palm Beach County. InstaSIGN has been crafting custom signage since 1986. Durable, elegant, and impactful.",
  alternates: {
    canonical: "/services/monument-signs",
  },
  openGraph: {
    title: "Monument Signs",
    description: "Professional ground-mounted monument signs for businesses in Palm Beach County. InstaSIGN - since 1986.",
  },
};

export default function MonumentSignsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
              Serving Palm Beach County Since 1986
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-white">
            Monument Signs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Make a lasting first impression with custom monument signs. Ground-mounted, elegant, and built to establish your business presence.
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

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Professional Monument Signs in Palm Beach County
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Monument signs serve as the cornerstone of your business's visual identity. These ground-level structures create an immediate impression of permanence, professionalism, and prestige. At InstaSIGN, we have been designing and installing monument signs throughout Palm Beach County since 1986, helping businesses from Boca Raton to Boynton Beach establish a commanding presence at their entrances.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our monument signs are constructed using a variety of premium materials including natural stone, brick, stucco, aluminum, and high-density foam with durable coatings. Each sign is custom-designed to complement your building's architecture and surrounding landscape. Whether you prefer a modern minimalist look or a traditional style that matches South Florida's aesthetic, our design team brings your vision to life.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Illumination options add versatility to your monument sign. We offer internal LED lighting, external spotlights, and halo-lit letters to ensure your business is visible around the clock. LED technology keeps energy costs low while providing brilliant, even lighting that enhances your sign's appearance after sunset. For businesses along busy corridors in Delray Beach or commercial parks throughout Palm Beach County, illuminated monument signs are essential for 24/7 visibility.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The installation of a monument sign requires careful planning and execution. Our team handles every aspect of the project, from initial site surveys and permit applications to foundation work and final installation. We coordinate with local authorities to ensure compliance with zoning regulations, setback requirements, and height restrictions. Our experienced installers ensure your monument sign is level, secure, and positioned for maximum impact.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ready to make a statement with a custom monument sign? Contact InstaSIGN today for a free consultation. We proudly serve businesses throughout Palm Beach County with quality craftsmanship and personalized service that has defined our company for nearly four decades.
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
            Contact us today for a free quote on monument signs.
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
