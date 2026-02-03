import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "Window Graphics & Films | InstaSIGN",
  description: "Professional window graphics, decals, frosted vinyl, and perforated film for businesses in Palm Beach County. InstaSIGN has been crafting custom signage since 1986.",
  alternates: {
    canonical: "/services/window-graphics",
  },
  openGraph: {
    title: "Window Graphics & Films",
    description: "Professional window graphics, frosted vinyl, and perforated film. InstaSIGN - since 1986.",
  },
};

export default function WindowGraphicsPage() {
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
            Window Graphics & Films
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your storefront with professional window graphics. Decals, frosted vinyl, perforated film, and custom designs that attract customers and enhance privacy.
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

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Professional Window Graphics in Palm Beach County
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Window graphics represent one of the most valuable and underutilized advertising spaces available to businesses. Your storefront windows are visible to every person who walks or drives by, making them prime real estate for branding, promotions, and information. At InstaSIGN, we have been helping Palm Beach County businesses maximize their window space since 1986, creating custom graphics that attract attention and drive customers through the door.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our window graphics solutions range from simple cut vinyl lettering to elaborate full-window murals. Frosted vinyl films add elegance and privacy to office windows while incorporating your logo or decorative patterns—perfect for conference rooms in Boca Raton, medical offices in Delray Beach, and professional firms in Boynton Beach. The frosted appearance mimics expensive etched glass at a fraction of the cost and can be easily updated when needed.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Perforated window film, also known as see-through graphics, is a game-changer for retail storefronts. This innovative material displays vibrant graphics visible from outside while allowing people inside to see out clearly. It's the perfect solution for businesses wanting maximum window advertising without sacrificing natural light or visibility. Many retailers throughout Palm Beach County use perforated graphics for seasonal promotions, product displays, and brand messaging.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We also offer traditional vinyl decals for business hours, logos, and contact information, as well as full-color digitally printed graphics for photo-quality window displays. All our window graphics are produced using premium materials that resist fading, peeling, and bubbling in Florida's intense sun. Our experienced installers ensure clean, professional applications that enhance rather than detract from your storefront's appearance.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ready to transform your windows into powerful marketing tools? Contact InstaSIGN today for a free consultation. We serve businesses throughout Palm Beach County with quality window graphics and exceptional service.
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
            Contact us today for a free quote on window graphics.
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
