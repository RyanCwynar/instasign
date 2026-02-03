import { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";

export const metadata: Metadata = {
  title: "Sign Products & Services",
  description: "Custom banners, vehicle wraps, channel letters, monument signs, yard signs & more. Professional sign services in Delray Beach, Boca Raton & Palm Beach County.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Sign Products & Services | InstaSIGN",
    description: "Custom banners, vehicle wraps, channel letters, monument signs & more in Palm Beach County.",
    url: "https://instasign.com/products",
  },
};

export default function ProductsPage() {
  const categories = [
    {
      title: "Custom Banners, Signs, and Graphics",
      products: [
        {
          title: "Custom Banners",
          description: "Large format banners for events, trade shows, and advertising. Durable materials suitable for indoor and outdoor use. Custom sizes and designs available.",
          image: "/products/custom-banners.jpg"
        },
        {
          title: "Business Hours Signs",
          description: "Professional business hours signs for storefronts and offices. Clear, readable designs that inform customers of your operating schedule.",
          image: "/products/business-hours-signs.jpg"
        },
        {
          title: "Custom Decals and Stickers",
          description: "Custom decals and sticker signs for windows, walls, and vehicles. High-quality vinyl that lasts. Perfect for branding and promotional use.",
          image: "/products/custom-decals-stickers.jpg"
        },
        {
          title: "Yard and Lawn Signs",
          description: "Affordable and versatile yard signs perfect for real estate, events, political campaigns, and advertising. Quick turnaround times and multiple size options.",
          image: "/products/yard-lawn-signs.jpg"
        },
        {
          title: "Graduation Banners",
          description: "Celebrate achievements with custom graduation banners. Perfect for schools, universities, and ceremonies. Available in various sizes with durable materials.",
          image: "/products/graduation-banners.jpg"
        },
        {
          title: "Vehicle Graphics and Wraps",
          description: "Professional vehicle lettering, graphics, and full wraps. Make your business mobile with eye-catching designs. High-quality vinyl that withstands the elements.",
          image: "/products/vehicle-graphics-wraps.jpg"
        },
        {
          title: "Custom Party Signs",
          description: "Personalized signs for birthdays, weddings, anniversaries, and special events. Add a personal touch to your celebrations with custom-designed signage.",
          image: "/products/custom-party-signs.jpg"
        }
      ]
    },
    {
      title: "Exterior Signage",
      products: [
        {
          title: "Building Signs",
          description: "Professional building signs that make your business stand out. Durable materials built to withstand Florida weather conditions.",
          image: "/products/building-signs.jpg"
        },
        {
          title: "Monument Signs",
          description: "Permanent monument signs for property identification. Professional, durable construction perfect for business entrances and developments.",
          image: "/products/monument-signs.jpg"
        },
        {
          title: "Channel Letters",
          description: "Illuminated and non-illuminated channel letters for building signage. Durable construction perfect for business fronts. Custom sizes and fonts available.",
          image: "/products/channel-letters.jpg"
        },
        {
          title: "Awning Signage",
          description: "Custom awning signs that combine functionality with advertising. Protect your business from the elements while displaying your brand.",
          image: "/products/awning-signage.jpg"
        },
        {
          title: "Wall Graphics",
          description: "Large format wall graphics and murals for exterior walls. Transform blank spaces into eye-catching advertising opportunities.",
          image: "/products/wall-graphics-exterior.jpg"
        }
      ]
    },
    {
      title: "Interior Decor Signs",
      products: [
        {
          title: "Vinyl Lettering",
          description: "Professional vinyl lettering for walls, windows, and doors. Precision-cut lettering in a wide variety of fonts and colors. Perfect for business names and branding.",
          image: "/products/vinyl-lettering.jpg"
        },
        {
          title: "Window Graphics",
          description: "Transform your windows into powerful advertising spaces. Decals, frosted glass effects, and full window graphics that are removable and won't damage surfaces.",
          image: "/products/window-graphics.jpg"
        },
        {
          title: "Custom Canvas Signs",
          description: "Artistic canvas prints and signs for interior decor. Perfect for offices, restaurants, and retail spaces. High-quality prints on durable canvas material.",
          image: "/products/custom-canvas-signs.jpg"
        },
        {
          title: "Wall Graphics and Murals",
          description: "Interior wall graphics and custom murals. Create inspiring environments with large-format interior signage and decorative graphics.",
          image: "/products/wall-graphics-murals.jpg"
        },
        {
          title: "ADA Compliant Signs",
          description: "Compliant ADA signage for accessibility requirements. Tactile signs with raised letters and braille. Perfect for hospitals, offices, and public buildings.",
          image: "/products/ada-compliant-signs.jpg"
        }
      ]
    },
    {
      title: "Point of Purchase Signs",
      products: [
        {
          title: "A-Frame Signs",
          description: "Portable A-frame signs perfect for sidewalk advertising. Weather-resistant materials with changeable message boards. Ideal for restaurants, retail stores, and events.",
          image: "/products/a-frame-signs.jpg"
        },
        {
          title: "Menu Boards",
          description: "Custom menu boards for restaurants and cafes. Clear, readable designs that showcase your offerings. Available in various styles and sizes.",
          image: "/products/menu-boards.jpg"
        },
        {
          title: "Standees and Cutouts",
          description: "Life-size standees and custom cutouts for promotions and events. Eye-catching displays that attract attention and communicate your message effectively.",
          image: "/products/standees-cutouts.jpg"
        },
        {
          title: "Floor Graphics",
          description: "Durable floor graphics and signs for wayfinding and promotions. High-traction materials safe for indoor use. Perfect for retail and event spaces.",
          image: "/products/floor-graphics.jpg"
        }
      ]
    },
    {
      title: "Aluminum and Metal Signs",
      products: [
        {
          title: "Aluminum Signs",
          description: "Durable aluminum signs built to last. Weather-resistant and perfect for outdoor displays. Ideal for property identification, directional signs, and business signage.",
          image: "/products/aluminum-signs.jpg"
        },
        {
          title: "Parking Signs",
          description: "Custom parking signs for businesses and properties. Durable materials with clear messaging. Perfect for parking regulations, reserved spots, and directional signage.",
          image: "/products/parking-signs.jpg"
        },
        {
          title: "Real Estate Signs",
          description: "Professional real estate signs for agents and brokers. High-quality materials that withstand Florida weather. Customizable with agent information and property details.",
          image: "/products/real-estate-signs.jpg"
        }
      ]
    },
    {
      title: "Wayfinding and Directional Signs",
      products: [
        {
          title: "Directional Signs",
          description: "Clear directional signs to guide visitors and customers. Professional designs that improve navigation in buildings, campuses, and public spaces.",
          image: "/products/directional-signs.jpg"
        },
        {
          title: "Room Identification Signs",
          description: "Clear room and office identification signs. Professional designs that help visitors navigate your facility with ease.",
          image: "/products/room-identification-signs.jpg"
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
                    <div className="h-64 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
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
