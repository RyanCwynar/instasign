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
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#customers" className="text-gray-400 hover:text-white transition-colors">Customers</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
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

