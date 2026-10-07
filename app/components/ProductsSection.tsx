import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./Icons";

const products = [
  {
    name: "Channel letters",
    description: "Illuminated 3D lettering that makes your storefront impossible to miss, day or night.",
    image: "/products/channel-letters.jpg",
    href: "/services/channel-letters",
  },
  {
    name: "Monument signs",
    description: "Freestanding entrance signs that give offices, plazas and communities a permanent presence.",
    image: "/products/monument-signs.jpg",
    href: "/products",
  },
  {
    name: "Vehicle lettering",
    description: "Professional lettering and graphics that turn your fleet into moving advertising.",
    image: "/products/vehicle-lettering.jpg",
    href: "/services/vehicle-wrap",
  },
  {
    name: "Aluminum signs",
    description: "Durable, weather-resistant panels built for outdoor use and the Florida climate.",
    image: "/products/aluminum-signs.jpg",
    href: "/products",
  },
  {
    name: "Custom banners",
    description: "Grand openings, events, graduations and sales — printed fast, finished for indoor or out.",
    image: "/products/custom-banners.jpg",
    href: "/products",
  },
  {
    name: "Menu boards",
    description: "Clear, on-brand menus for restaurants and cafés that are easy to read and easy to update.",
    image: "/products/menu-boards.jpg",
    href: "/products",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 md:py-26">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-wrap gap-x-10 gap-y-5 justify-between items-end mb-12">
          <div className="max-w-[640px]">
            <div className="eyebrow text-brand-red mb-3">What we make</div>
            <h2 className="display text-4xl md:text-[3.25rem] !leading-[1.02] mb-3.5">
              Signs for every storefront, site and celebration.
            </h2>
            <p className="text-lg text-muted">
              Delivered and installed with professional service, whether you need one
              banner or a full building package.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex gap-2 items-center py-2.5 font-semibold text-brand-blue hover:text-[#003d74]"
          >
            See all products
            <ArrowRight />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="group flex flex-col bg-white border border-line rounded-xl overflow-hidden hover:border-[#c5ccd6] hover:shadow-lg transition"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 flex flex-col gap-2 grow">
                <h3 className="display !font-bold text-[22px] !leading-tight [font-stretch:106%]">
                  {product.name}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted grow">{product.description}</p>
                <span className="mt-2.5 inline-flex gap-1.5 items-center text-[15px] font-semibold text-brand-blue">
                  Get pricing
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
