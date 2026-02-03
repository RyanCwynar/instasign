import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "Pole Signs & Pylon Signs | InstaSIGN",
  description: "Professional pole signs and pylon signs for businesses in Palm Beach County. InstaSIGN has been crafting custom signage since 1986. High-visibility, durable, illuminated options.",
  alternates: {
    canonical: "/services/pole-signs",
  },
  openGraph: {
    title: "Pole Signs & Pylon Signs",
    description: "Professional pole signs and pylon signs for maximum visibility. InstaSIGN - since 1986.",
  },
};

export default function PoleSignsPage() {
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
            Pole Signs & Pylon Signs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Maximize visibility with tall pole and pylon signs. Ideal for businesses along busy roads, shopping centers, and highway locations.
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
            Why Choose InstaSIGN for Pole Signs?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Maximum visibility from a distance",
              "Illuminated options for 24/7 exposure",
              "Engineered for Florida wind loads",
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
            Professional Pole Signs in Palm Beach County
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            When your business needs to be seen from a distance, pole signs and pylon signs deliver unmatched visibility. These tall, freestanding structures elevate your branding above surrounding obstacles, ensuring that motorists and pedestrians can spot your location well in advance. At InstaSIGN, we have been designing, fabricating, and installing pole signs throughout Palm Beach County since 1986, helping businesses from gas stations to shopping plazas capture attention along busy corridors.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Pole signs, sometimes called pylon signs or freestanding signs, come in various configurations to suit different needs and local regulations. Single-pole signs feature a cabinet mounted on a single support, while double-pole designs offer additional stability and a different aesthetic. Multi-tenant pylon signs accommodate several businesses within a single structure, making them ideal for shopping centers in Boca Raton, strip malls in Delray Beach, and commercial plazas in Boynton Beach.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Florida's building codes require pole signs to withstand significant wind loads, especially in hurricane-prone areas. Our engineering team designs every pole sign to meet or exceed local requirements, using heavy-gauge steel poles, reinforced cabinets, and proper foundation specifications. We coordinate with local building departments throughout Palm Beach County to secure necessary permits and ensure your sign is fully compliant.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Illumination is essential for pole signs to deliver round-the-clock visibility. We offer internally illuminated cabinets with energy-efficient LED lighting, external spotlights, and digital LED message centers for businesses wanting to display changing content. LED technology keeps operating costs low while providing brilliant visibility that reaches drivers on Federal Highway, Congress Avenue, and other major roads throughout the region.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ready to put your business on the map with a custom pole sign? Contact InstaSIGN today for a free site evaluation and quote. Our team will assess your location, discuss height and design options, and create a sign that maximizes your visibility while meeting all local codes. We've been Palm Beach County's trusted sign company for nearly four decades.
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
            Contact us today for a free quote on pole signs.
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
