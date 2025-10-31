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
            <div className="h-72 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20"></div>
              <svg className="w-40 h-40 text-white opacity-90 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Graduation Banners</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Celebrate achievements with custom graduation banners. Perfect for schools, universities, and ceremonies.
              </p>
              <a 
                href="#order" 
                className="btn btn-blue"
              >
                Order Now
              </a>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 w-full">
            <div className="h-72 bg-gradient-to-br from-red-200 via-red-300 to-red-400 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20"></div>
              <svg className="w-40 h-40 text-white opacity-90 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Vehicle Lettering</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Professional vehicle lettering and graphics. Make your business mobile with eye-catching designs.
              </p>
              <a 
                href="#order" 
                className="btn btn-blue"
              >
                Order Now
              </a>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 w-full">
            <div className="h-72 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20"></div>
              <svg className="w-40 h-40 text-white opacity-90 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Aluminum Signs</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Durable aluminum signs built to last. Weather-resistant and perfect for outdoor displays.
              </p>
              <a 
                href="#order" 
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

