import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";

export default function ProductsPage() {
  const categories = [
    {
      title: "Custom Banners, Signs, and Graphics",
      products: [
        {
          title: "Custom Banners",
          description: "Large format banners for events, trade shows, and advertising. Durable materials suitable for indoor and outdoor use. Custom sizes and designs available.",
          gradient: "from-blue-200 via-blue-300 to-blue-400"
        },
        {
          title: "Business Hours Signs",
          description: "Professional business hours signs for storefronts and offices. Clear, readable designs that inform customers of your operating schedule.",
          gradient: "from-indigo-200 via-indigo-300 to-indigo-400"
        },
        {
          title: "Custom Decals and Stickers",
          description: "Custom decals and sticker signs for windows, walls, and vehicles. High-quality vinyl that lasts. Perfect for branding and promotional use.",
          gradient: "from-purple-200 via-purple-300 to-purple-400"
        },
        {
          title: "Yard and Lawn Signs",
          description: "Affordable and versatile yard signs perfect for real estate, events, political campaigns, and advertising. Quick turnaround times and multiple size options.",
          gradient: "from-green-200 via-green-300 to-green-400"
        },
        {
          title: "Graduation Banners",
          description: "Celebrate achievements with custom graduation banners. Perfect for schools, universities, and ceremonies. Available in various sizes with durable materials.",
          gradient: "from-cyan-200 via-cyan-300 to-cyan-400"
        },
        {
          title: "Vehicle Graphics and Wraps",
          description: "Professional vehicle lettering, graphics, and full wraps. Make your business mobile with eye-catching designs. High-quality vinyl that withstands the elements.",
          gradient: "from-red-200 via-red-300 to-red-400"
        },
        {
          title: "Custom Party Signs",
          description: "Personalized signs for birthdays, weddings, anniversaries, and special events. Add a personal touch to your celebrations with custom-designed signage.",
          gradient: "from-pink-200 via-pink-300 to-pink-400"
        }
      ]
    },
    {
      title: "Exterior Signage",
      products: [
        {
          title: "Building Signs",
          description: "Professional building signs that make your business stand out. Durable materials built to withstand Florida weather conditions.",
          gradient: "from-gray-300 via-gray-400 to-gray-500"
        },
        {
          title: "Monument Signs",
          description: "Permanent monument signs for property identification. Professional, durable construction perfect for business entrances and developments.",
          gradient: "from-slate-300 via-slate-400 to-slate-500"
        },
        {
          title: "Channel Letters",
          description: "Illuminated and non-illuminated channel letters for building signage. Durable construction perfect for business fronts. Custom sizes and fonts available.",
          gradient: "from-yellow-200 via-yellow-300 to-yellow-400"
        },
        {
          title: "Awning Signage",
          description: "Custom awning signs that combine functionality with advertising. Protect your business from the elements while displaying your brand.",
          gradient: "from-orange-200 via-orange-300 to-orange-400"
        },
        {
          title: "Wall Graphics",
          description: "Large format wall graphics and murals for exterior walls. Transform blank spaces into eye-catching advertising opportunities.",
          gradient: "from-teal-200 via-teal-300 to-teal-400"
        }
      ]
    },
    {
      title: "Interior Decor Signs",
      products: [
        {
          title: "Vinyl Lettering",
          description: "Professional vinyl lettering for walls, windows, and doors. Precision-cut lettering in a wide variety of fonts and colors. Perfect for business names and branding.",
          gradient: "from-violet-200 via-violet-300 to-violet-400"
        },
        {
          title: "Window Graphics",
          description: "Transform your windows into powerful advertising spaces. Decals, frosted glass effects, and full window graphics that are removable and won't damage surfaces.",
          gradient: "from-fuchsia-200 via-fuchsia-300 to-fuchsia-400"
        },
        {
          title: "Custom Canvas Signs",
          description: "Artistic canvas prints and signs for interior decor. Perfect for offices, restaurants, and retail spaces. High-quality prints on durable canvas material.",
          gradient: "from-rose-200 via-rose-300 to-rose-400"
        },
        {
          title: "Wall Graphics and Murals",
          description: "Interior wall graphics and custom murals. Create inspiring environments with large-format interior signage and decorative graphics.",
          gradient: "from-amber-200 via-amber-300 to-amber-400"
        },
        {
          title: "ADA Compliant Signs",
          description: "Compliant ADA signage for accessibility requirements. Tactile signs with raised letters and braille. Perfect for hospitals, offices, and public buildings.",
          gradient: "from-emerald-200 via-emerald-300 to-emerald-400"
        }
      ]
    },
    {
      title: "Point of Purchase Signs",
      products: [
        {
          title: "A-Frame Signs",
          description: "Portable A-frame signs perfect for sidewalk advertising. Weather-resistant materials with changeable message boards. Ideal for restaurants, retail stores, and events.",
          gradient: "from-sky-200 via-sky-300 to-sky-400"
        },
        {
          title: "Menu Boards",
          description: "Custom menu boards for restaurants and cafes. Clear, readable designs that showcase your offerings. Available in various styles and sizes.",
          gradient: "from-lime-200 via-lime-300 to-lime-400"
        },
        {
          title: "Standees and Cutouts",
          description: "Life-size standees and custom cutouts for promotions and events. Eye-catching displays that attract attention and communicate your message effectively.",
          gradient: "from-red-300 via-red-400 to-red-500"
        },
        {
          title: "Floor Graphics",
          description: "Durable floor graphics and signs for wayfinding and promotions. High-traction materials safe for indoor use. Perfect for retail and event spaces.",
          gradient: "from-blue-300 via-blue-400 to-blue-500"
        }
      ]
    },
    {
      title: "Aluminum and Metal Signs",
      products: [
        {
          title: "Aluminum Signs",
          description: "Durable aluminum signs built to last. Weather-resistant and perfect for outdoor displays. Ideal for property identification, directional signs, and business signage.",
          gradient: "from-zinc-300 via-zinc-400 to-zinc-500"
        },
        {
          title: "Parking Signs",
          description: "Custom parking signs for businesses and properties. Durable materials with clear messaging. Perfect for parking regulations, reserved spots, and directional signage.",
          gradient: "from-stone-300 via-stone-400 to-stone-500"
        },
        {
          title: "Real Estate Signs",
          description: "Professional real estate signs for agents and brokers. High-quality materials that withstand Florida weather. Customizable with agent information and property details.",
          gradient: "from-neutral-300 via-neutral-400 to-neutral-500"
        }
      ]
    },
    {
      title: "Wayfinding and Directional Signs",
      products: [
        {
          title: "Directional Signs",
          description: "Clear directional signs to guide visitors and customers. Professional designs that improve navigation in buildings, campuses, and public spaces.",
          gradient: "from-cyan-300 via-cyan-400 to-cyan-500"
        },
        {
          title: "Room Identification Signs",
          description: "Clear room and office identification signs. Professional designs that help visitors navigate your facility with ease.",
          gradient: "from-blue-400 via-blue-500 to-blue-600"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 !text-white">Our Products</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Custom business signage, graphics, and so much more. Quality signs for every need, delivered and installed with professional service.
          </p>
        </div>
      </section>

      {/* Products by Category */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{category.title}</h2>
                <div className="w-24 h-1 bg-[#c05555] mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, productIndex) => (
                  <div 
                    key={productIndex}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className={`h-64 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/20"></div>
                      <svg className="w-32 h-32 text-white opacity-90 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{product.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                        {product.description}
                      </p>
                      <ContactModal>
                        <button className="btn btn-blue w-full text-sm py-2">
                          Get a Quote
                        </button>
                      </ContactModal>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <div className="w-24 h-1 bg-[#c05555] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Beyond products, we offer comprehensive services to ensure your signage project is completed to perfection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <svg className="w-16 h-16 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Graphic Design</h3>
              <p className="text-gray-600">Professional design services to bring your vision to life.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <svg className="w-16 h-16 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Installation</h3>
              <p className="text-gray-600">Expert installation services for all your signage needs.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <svg className="w-16 h-16 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Project Management</h3>
              <p className="text-gray-600">Full-service project management from design to installation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto">
            Tell us about your project so we can help you find the solution that fits your needs. Don't see what you're looking for? We specialize in custom signage solutions tailored to your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactModal>
              <button className="btn btn-primary transform hover:scale-105">
                Get Your Quote
              </button>
            </ContactModal>
            <a 
              href="/contact" 
              className="btn btn-white transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
