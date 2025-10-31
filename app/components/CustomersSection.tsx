import Image from "next/image";

export default function CustomersSection() {
  return (
    <section id="customers" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">Our Customers</h2>
          <div className="w-24 h-1 bg-[#c05555] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by leading businesses and organizations in South Florida
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            <div className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <Image src="/atlantic-comm.png" alt="Atlantic Comm" width={150} height={50} className="w-auto h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <Image src="/bark-logo.png" alt="BARK" width={150} height={50} className="w-auto h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <Image src="/big-apple.png" alt="Big Apple" width={150} height={50} className="w-auto h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <Image src="/raveis.png" alt="Raveis" width={150} height={50} className="w-auto h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <Image src="/engel-volkers.png" alt="Engel & Völkers" width={150} height={50} className="w-auto h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <Image src="/delray-beach-club.png" alt="Delray Beach Club" width={150} height={50} className="w-auto h-12 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

