import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "Vinyl Graphics & Signs | InstaSIGN",
  description: "Professional vinyl graphics, signs, window graphics, and wall murals for businesses in Palm Beach County. InstaSIGN has been crafting custom signage since 1986.",
  alternates: {
    canonical: "/services/vinyl-graphics",
  },
  openGraph: {
    title: "Vinyl Graphics & Signs",
    description: "Professional vinyl graphics, window graphics, and wall murals. InstaSIGN - since 1986.",
  },
};

export default function VinylGraphicsPage() {
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
            Vinyl Graphics & Signs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform any surface with professional vinyl graphics. From window displays to wall murals, we bring your brand to life with vibrant, durable vinyl.
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
            Why Choose InstaSIGN for Vinyl Graphics?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Premium 3M and Avery vinyl materials",
              "Vivid full-color digital printing",
              "Indoor and outdoor applications",
              "Professional installation available"
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
            Professional Vinyl Graphics in Palm Beach County
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Vinyl graphics offer one of the most versatile and cost-effective ways to display your brand, promote your business, or transform your space. At InstaSIGN, we have been creating stunning vinyl graphics for businesses throughout Palm Beach County since 1986, using the latest printing technology and premium materials to deliver exceptional results.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our vinyl graphics services cover a wide range of applications. Cut vinyl lettering provides a clean, professional look for storefronts, office doors, and vehicle identification. Digitally printed vinyl allows for full-color graphics, photographs, and complex designs that capture attention. Whether you need simple text or elaborate imagery, our state-of-the-art equipment produces crisp, vibrant results that withstand Florida's demanding climate.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Wall murals and graphics have become increasingly popular for businesses looking to create immersive environments. From corporate offices in Boca Raton seeking branded conference rooms to restaurants in Delray Beach wanting eye-catching interior décor, vinyl wall graphics transform blank walls into powerful visual statements. Our team handles projects of all sizes, from accent graphics to full floor-to-ceiling installations.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We use only premium vinyl materials from trusted manufacturers like 3M and Avery Dennison. These materials offer superior adhesion, color retention, and durability compared to economy alternatives. For outdoor applications, we apply UV-protective laminates that prevent fading and extend the life of your graphics for years. Our experienced installers ensure bubble-free, properly aligned applications that look professionally finished.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ready to enhance your business with custom vinyl graphics? Contact InstaSIGN today for a free consultation. We serve businesses throughout Palm Beach County including Boca Raton, Delray Beach, and Boynton Beach with quality graphics and exceptional service.
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
            Contact us today for a free quote on vinyl graphics.
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
