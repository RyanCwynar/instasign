import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "Channel Letter Signs | InstaSIGN",
  description: "Professional illuminated channel letter signs for businesses in Palm Beach County. InstaSIGN has been crafting custom signage since 1986. LED-lit, durable, and eye-catching.",
  alternates: {
    canonical: "/services/channel-letters",
  },
  openGraph: {
    title: "Channel Letter Signs",
    description: "Professional illuminated channel letter signs for businesses in Palm Beach County. InstaSIGN - since 1986.",
  },
};

export default function ChannelLettersPage() {
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
            Channel Letter Signs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Illuminate your brand with custom channel letter signs. LED-lit, energy-efficient, and designed to make your business stand out day and night.
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
            Why Choose InstaSIGN for Channel Letters?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Energy-efficient LED illumination",
              "Custom fonts and colors to match your brand",
              "Weather-resistant for Florida conditions",
              "Professional permitting assistance"
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
            Professional Channel Letter Signs in Palm Beach County
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Channel letter signs are among the most effective ways to make your business visible to customers. These three-dimensional illuminated letters create a professional, upscale appearance that attracts attention both during the day and after dark. At InstaSIGN, we have been designing and installing channel letter signs throughout Palm Beach County since 1986, bringing nearly four decades of expertise to every project.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our channel letters are crafted using premium materials including aluminum returns, acrylic faces, and energy-efficient LED modules. Unlike older neon technology, modern LED channel letters consume significantly less electricity, last longer, and require minimal maintenance. We offer front-lit, back-lit (halo), and combination styles to achieve the exact look you envision for your storefront or building.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Every channel letter sign we produce is custom-designed to match your brand identity. Our team works with you to select the perfect font, colors, and mounting style. Whether you operate a retail store in Delray Beach, a restaurant in Boca Raton, or an office in Boynton Beach, we ensure your signage meets local codes and makes a lasting impression on potential customers.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The installation process is handled entirely by our experienced crew. We manage permits, coordinate with landlords or property managers, and ensure your channel letters are securely mounted and properly wired. Our signs are built to withstand Florida's intense sun, humidity, and tropical storms, giving you years of reliable service.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ready to upgrade your business visibility with illuminated channel letter signs? Contact InstaSIGN today for a free consultation and quote. We proudly serve businesses throughout Palm Beach County with quality craftsmanship and exceptional customer service.
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
            Contact us today for a free quote on channel letter signs.
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
