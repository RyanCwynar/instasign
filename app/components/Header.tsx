import Image from "next/image";

export default function Header() {
  return (
    <header className="text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 w-full" style={{backgroundColor: 'var(--header-blue)'}}>
        <div className="w-full relative">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center">
          <div className="flex items-center flex-1">
            <Image
              src="/logo.svg"
              alt="InstaSIGN Logo"
              width={200}
              height={67}
              priority
              className="h-12 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 justify-center flex-1">
            <a href="#home" className="hover:text-gray-200 transition-colors font-medium">Home</a>
            <a href="#products" className="hover:text-gray-200 transition-colors font-medium">Products</a>
            <a href="#about" className="hover:text-gray-200 transition-colors font-medium">About</a>
            <a href="#customers" className="hover:text-gray-200 transition-colors font-medium">Customers</a>
            <a href="#contact" className="hover:text-gray-200 transition-colors font-medium">Contact</a>
            <a 
              href="#order" 
              className="btn btn-primary"
            >
              Order Now
            </a>
          </div>
          <div className="flex items-center justify-end">
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
}

