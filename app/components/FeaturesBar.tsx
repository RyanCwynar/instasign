export default function FeaturesBar() {
  return (
    <section className="bg-white shadow-md py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#cc4d4d] rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Since 1986</h3>
            <p className="text-gray-600 text-sm">Over 35 years of experience</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#4a77b2] rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Fast Turnaround</h3>
            <p className="text-gray-600 text-sm">Quick delivery & installation</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#0085ba] rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Quality Guaranteed</h3>
            <p className="text-gray-600 text-sm">Premium materials & craftsmanship</p>
          </div>
        </div>
      </div>
    </section>
  );
}

