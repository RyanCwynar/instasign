import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "Trade Show Displays & Banners | InstaSIGN",
  description: "Professional trade show displays, portable banners, and booth graphics for businesses in Palm Beach County. InstaSIGN has been crafting custom signage since 1986.",
  alternates: {
    canonical: "/services/trade-show-displays",
  },
  openGraph: {
    title: "Trade Show Displays & Banners",
    description: "Professional trade show displays, banners, and booth graphics. InstaSIGN - since 1986.",
  },
};

export default function TradeShowDisplaysPage() {
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
            Trade Show Displays & Banners
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Stand out at your next event with professional trade show displays. Portable, impactful, and designed to attract attention and generate leads.
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
            Why Choose InstaSIGN for Trade Show Displays?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Portable and easy to set up",
              "Retractable banners and pop-up displays",
              "High-quality fabric and vinyl graphics",
              "Rush production available"
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
            Professional Trade Show Displays in Palm Beach County
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Trade shows and exhibitions are crucial opportunities to showcase your business, connect with potential customers, and establish your brand presence. At InstaSIGN, we have been helping Palm Beach County businesses make powerful impressions at trade shows since 1986, providing everything from simple banner stands to complete booth packages.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our trade show display offerings include retractable banner stands, pop-up displays, fabric backdrops, table covers, and custom booth graphics. Retractable banners are a trade show essential—lightweight, portable, and professional, they set up in seconds and pack down into compact carrying cases. We offer multiple sizes from tabletop displays to large-format banners that command attention from across the exhibition hall.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            For businesses seeking a more comprehensive presence, our pop-up displays and fabric tension systems create stunning backdrops that transform standard booth spaces into branded environments. These displays feature vibrant dye-sublimation printing on wrinkle-resistant fabric, ensuring your graphics look sharp even after transport. From 8-foot tabletop displays to 20-foot curved walls, we customize solutions to fit your booth size and budget.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We understand that trade show deadlines can be tight. Our production team offers rush services when you need displays quickly. Whether you're exhibiting at the Palm Beach Convention Center, traveling to trade shows in Orlando or Miami, or attending local business expos in Boca Raton or Delray Beach, we ensure your materials are ready on time.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ready to make your next trade show a success? Contact InstaSIGN today for a free consultation. Our team will help you select the right displays for your goals, design graphics that capture attention, and deliver quality products that represent your business professionally.
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
            Contact us today for a free quote on trade show displays.
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
