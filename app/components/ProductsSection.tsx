import Image from "next/image";

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">Our Products</h2>
          <div className="w-24 h-1 bg-[#c05555] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quality signs for every need, delivered and installed with professional service
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Product 1 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 w-full">
            <div className="h-72 relative overflow-hidden">
              <Image
                src="/products/graduation-banners.jpg"
                alt="Graduation Banners"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Graduation Banners</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Celebrate achievements with custom graduation banners. Perfect for schools, universities, and ceremonies.
              </p>
              <a 
                href="/contact" 
                className="btn btn-blue"
              >
                Order Now
              </a>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 w-full">
            <div className="h-72 relative overflow-hidden">
              <Image
                src="/products/vehicle-lettering.jpg"
                alt="Vehicle Lettering"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Vehicle Lettering</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Professional vehicle lettering and graphics. Make your business mobile with eye-catching designs.
              </p>
              <a 
                href="/contact" 
                className="btn btn-blue"
              >
                Order Now
              </a>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 w-full">
            <div className="h-72 relative overflow-hidden">
              <Image
                src="/products/aluminum-signs.jpg"
                alt="Aluminum Signs"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Aluminum Signs</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Durable aluminum signs built to last. Weather-resistant and perfect for outdoor displays.
              </p>
              <a 
                href="/contact" 
                className="btn btn-blue"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

