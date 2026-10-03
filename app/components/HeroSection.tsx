import Image from "next/image";
import Link from "next/link";
import LocationMapModal from "./LocationMapModal";
import SignChat from "./SignChat";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[600px] md:min-h-[760px] flex items-center justify-center py-12 md:py-16">
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight !text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            We Make Great Signs
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 !text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center gap-2">
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
          <SignChat />
          <p className="mt-4 text-sm !text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Prefer to talk to a person? Call{" "}
            <a href="tel:+15616857335" className="font-semibold underline underline-offset-2">(561) 685-7335</a>{" "}
            or{" "}
            <Link href="/products" className="font-semibold underline underline-offset-2">browse our products</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

