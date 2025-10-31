import Image from "next/image";
import LocationMapModal from "./LocationMapModal";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Image
              src="/logo.svg"
              alt="InstaSIGN Logo"
              width={200}
              height={67}
              className="h-12 w-auto mb-6"
            />
            <p className="text-gray-400 leading-relaxed max-w-md">
              Your trusted sign maker since 1986. Quality signs, professional service, and local expertise you can depend on.
            </p>
          </div>
          <div className="relative">
            <h3 className="text-xl font-bold mb-4">Our Location</h3>
            <LocationMapModal>
              <p className="text-gray-400 mb-2">
                <a 
                  href="https://maps.google.com/?q=155+Avenue+L,+Delray+Beach,+FL+33483" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-start"
                >
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>155 Avenue L<br />Delray Beach, FL 33483<br />United States</span>
                </a>
              </p>
            </LocationMapModal>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+15616857335" 
                  className="text-gray-400 hover:text-white transition-colors flex items-start"
                >
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (561) 685-7335</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:bill@instasign.com" 
                  className="text-gray-400 hover:text-white transition-colors flex items-start"
                >
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>bill@instasign.com</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#customers" className="text-gray-400 hover:text-white transition-colors">Customers</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} InstaSIGN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

