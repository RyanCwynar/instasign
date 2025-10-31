export default function ReviewsSection() {
  const reviews = [
    {
      name: "H. Kennemer",
      text: "InstaSIGN does an excellent job every time! Coastal Commercial Group has used InstaSIGN for almost 10 years. Our signs always look great and are ready very quickly. Thank you Bill and Tom, great job.",
    },
    {
      name: "G Damage",
      text: "Got to be the best place and prices for signs that I have found in a long time. The owner and staff are very courteous and helpful with creating the perfect sign for your business. Highly recommend Instasign!!!!",
    },
    {
      name: "Craig McInnis",
      text: "I have been doing business with InstaSIGN for many years. They are always on point, great at meeting deadlines and always rise to design challenges. Quality work by great people!",
    },
    {
      name: "Suzan Santosus",
      text: "We have been using InstaSIGN for over 10 years quality and pricing are phenomenal. I highly recommend them.",
    },
    {
      name: "Stephen Jara",
      text: "Bill and Insta Sign has provided the finest quality and service a business could demand. Friendly and professional, the staff does a fantastic job.",
    },
    {
      name: "Kelsey Johnson",
      text: "Bill is AWESOME! He is very friendly and goes over and beyond to help us out. They have GREAT prices for quality copies in bulk.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">We get great reviews.</h2>
          <div className="w-24 h-1 bg-[#c05555] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">Our customers love working with us</p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-shadow w-full flex flex-col"
            >
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 text-3xl">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6 italic leading-relaxed flex-grow">
                &quot;{review.text}&quot;
              </p>
              <p className="text-gray-600 font-semibold">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

