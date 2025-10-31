import Image from "next/image";
import Link from "next/link";
import ContactModal from "./ContactModal";
import LocationMapModal from "./LocationMapModal";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="InstaSIGN Workshop"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center w-full px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
              Since 1986
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 leading-tight !text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            We Make Great Signs
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 !text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center gap-2">
            in Palm Beach County
            <LocationMapModal position="bottom-left">
              <button 
                className="inline-flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                aria-label="View location on map"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                >
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
            </LocationMapModal>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/products" 
              className="btn btn-primary"
            >
              Browse Products
            </Link>
            <ContactModal>
              <button className="btn btn-white cursor-pointer">
                Get a Quote
              </button>
            </ContactModal>
          </div>
        </div>
      </div>
    </section>
  );
}

