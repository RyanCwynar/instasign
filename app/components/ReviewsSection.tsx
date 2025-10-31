export default function ReviewsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">We get great reviews.</h2>
          <div className="w-24 h-1 bg-[#c05555] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">Our customers love working with us</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 justify-items-center items-stretch">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-shadow w-full">
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 text-3xl">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
            <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
              "InstaSIGN provided excellent service from start to finish. The sign quality is outstanding and the installation was professional. Highly recommend!"
            </p>
            <p className="text-gray-600 font-semibold">— Satisfied Customer</p>
          </div>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-shadow w-full">
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 text-3xl">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
            <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
              "Been using InstaSIGN for years. Their attention to detail and customer service is unmatched. Always deliver on time and on budget!"
            </p>
            <p className="text-gray-600 font-semibold">— Local Business Owner</p>
          </div>
        </div>
      </div>
    </section>
  );
}

