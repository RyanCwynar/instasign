import { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LocationMapModal from "../components/LocationMapModal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact InstaSIGN for custom signs in Delray Beach, Boca Raton & Palm Beach County. Call (561) 685-7335 or visit us at 155 Avenue L, Delray Beach, FL.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact InstaSIGN | Delray Beach Sign Shop",
    description: "Get in touch for custom signs. Call (561) 685-7335 or visit 155 Avenue L, Delray Beach, FL.",
    url: "https://instasign.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 !text-white">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with InstaSIGN. We're here to help with all your sign needs.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Phone Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Phone</h2>
              <p className="text-gray-600 mb-4">Give us a call</p>
              <a 
                href="tel:+15616857335" 
                className="text-xl font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                +1 (561) 685-7335
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Email</h2>
              <p className="text-gray-600 mb-4">Send us a message</p>
              <a 
                href="mailto:bill@instasign.com" 
                className="text-xl font-semibold text-primary hover:text-primary-hover transition-colors break-all"
              >
                bill@instasign.com
              </a>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Address</h2>
              <p className="text-gray-600 mb-4">Visit our location</p>
              <LocationMapModal>
                <a 
                  href="https://maps.google.com/?q=155+Avenue+L,+Delray+Beach,+FL+33483" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-primary hover:text-primary-hover transition-colors inline-block"
                >
                  155 Avenue L<br />
                  Delray Beach, FL 33483<br />
                  United States
                </a>
              </LocationMapModal>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="InstaSIGN Logo"
                  width={200}
                  height={67}
                  className="h-16 w-auto"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">About InstaSIGN</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your trusted sign maker since 1986. We specialize in quality signs, professional service, 
                  and local expertise you can depend on. Serving Delray Beach, Boca Raton, and Boynton Beach 
                  with excellence in every project.
                </p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mt-8 bg-gray-50 rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Business Hours</h3>
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Monday - Friday</p>
                <p className="text-gray-600">8:00 AM - 5:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Saturday</p>
                <p className="text-gray-600">By Appointment</p>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-4">Closed Sunday</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

