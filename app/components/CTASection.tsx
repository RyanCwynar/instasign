export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Multi-layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/70 via-orange-100/80 to-rose-100/70"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 via-transparent to-rose-100/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                          radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`,
      }}></div>
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 drop-shadow-sm">Ready to order your sign?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-700">
          Get started today and join thousands of satisfied customers who trust InstaSIGN for all their signage needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#products" 
            className="btn btn-primary transform hover:scale-105"
          >
            View Products
          </a>
          <a 
            href="#contact" 
            className="btn btn-white transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

