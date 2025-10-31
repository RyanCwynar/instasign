export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">Why Choose InstaSIGN?</h2>
          <div className="w-24 h-1 bg-[#c05555] mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-5 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#c05555] to-[#a84444] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Since 1986</h3>
                  <p className="text-gray-600 leading-relaxed">Over 35 years of experience in sign making and installation. We've served thousands of satisfied customers in South Florida.</p>
                </div>
              </div>
              <div className="flex items-start space-x-5 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#5a7fa8] to-[#4a6f98] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Local Service</h3>
                  <p className="text-gray-600 leading-relaxed">Proudly serving Delray Beach, Boca Raton, and Boynton Beach with personalized local service you can trust.</p>
                </div>
              </div>
              <div className="flex items-start space-x-5 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#4a90b8] to-[#3a7a9f] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Fast Delivery</h3>
                  <p className="text-gray-600 leading-relaxed">Quick turnaround times for all your sign needs without compromising on quality or attention to detail.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-5 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#c05555] to-[#a84444] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Custom Design</h3>
                  <p className="text-gray-600 leading-relaxed">Work with our experienced team to create the perfect sign that matches your brand and vision.</p>
                </div>
              </div>
              <div className="flex items-start space-x-5 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#5a7fa8] to-[#4a6f98] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Professional Installation</h3>
                  <p className="text-gray-600 leading-relaxed">Expert installation services included with your order. Our trained professionals ensure perfect placement.</p>
                </div>
              </div>
              <div className="flex items-start space-x-5 group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#4a90b8] to-[#3a7a9f] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Quality Materials</h3>
                  <p className="text-gray-600 leading-relaxed">Premium materials that stand the test of time. Weather-resistant and built to maintain their appearance for years.</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}

