import Image from "next/image";
import ContactModal from "./ContactModal";

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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight !text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            Buy signs online
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-10 font-normal leading-relaxed !text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] max-w-3xl mx-auto">
            <strong className="font-semibold">InstaSIGN</strong> has been making, delivering and installing signs in
            Delray Beach, Boca Raton and Boynton Beach since <strong className="font-semibold">1986</strong>.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#products" 
              className="btn btn-primary"
            >
              Browse Products
            </a>
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

