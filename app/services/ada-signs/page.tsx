import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "ADA Compliant Signs | InstaSIGN",
  description: "Professional ADA compliant signage including braille and tactile signs for businesses in Palm Beach County. InstaSIGN has been crafting custom signage since 1986.",
  alternates: {
    canonical: "/services/ada-signs",
  },
  openGraph: {
    title: "ADA Compliant Signs",
    description: "Professional ADA compliant signage including braille and tactile signs. InstaSIGN - since 1986.",
  },
};

export default function ADASignsPage() {
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
            ADA Compliant Signs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Professional ADA signage with braille, tactile letters, and proper contrast. Ensure accessibility compliance while maintaining your brand aesthetic.
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
            Why Choose InstaSIGN for ADA Signs?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Full compliance with ADA regulations",
              "Grade 2 braille and tactile characters",
              "Custom designs matching your brand",
              "Complete facility sign packages available"
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
            Professional ADA Compliant Signage in Palm Beach County
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            ADA compliant signage is not just a legal requirement—it's a commitment to accessibility and inclusivity for all visitors to your facility. At InstaSIGN, we have been producing ADA signs for businesses throughout Palm Beach County since 1986, ensuring that offices, medical facilities, retail spaces, and public buildings meet federal accessibility standards while maintaining professional aesthetics.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The Americans with Disabilities Act establishes specific requirements for signage including tactile characters, Grade 2 braille, proper color contrast, and correct mounting heights. Our team stays current with all ADA regulations and produces signs that meet or exceed these standards. We use raised tactile characters that are easily readable by touch, paired with accurately translated braille positioned below the text.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our ADA signs are crafted from durable materials including photopolymer, acrylic, and wood with applied tactile elements. Each sign features the required 70% contrast ratio between text and background, ensuring visibility for individuals with low vision. We offer a range of finishes from brushed metals to wood grains, allowing your ADA signage to complement your interior design in Boca Raton office buildings, Delray Beach medical centers, and Boynton Beach retail locations.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Beyond individual room signs, we provide complete wayfinding packages including directories, exit signs, restroom signs, and stairwell identification. For new construction or renovation projects, our team can develop a comprehensive ADA signage plan that covers your entire facility. We work with architects, contractors, and property managers throughout Palm Beach County to ensure timely delivery and proper installation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Don't risk non-compliance fines or accessibility complaints. Contact InstaSIGN today for a free consultation on your ADA signage needs. We provide expert guidance, quality craftsmanship, and reliable service that Palm Beach County businesses have trusted for nearly four decades.
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
            Contact us today for a free quote on ADA compliant signs.
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
