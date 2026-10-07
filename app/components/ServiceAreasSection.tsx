import Link from "next/link";

const cities = [
  { name: "Delray Beach", slug: "delray-beach" },
  { name: "Boca Raton", slug: "boca-raton" },
  { name: "Boynton Beach", slug: "boynton-beach" },
  { name: "West Palm Beach", slug: "west-palm-beach" },
  { name: "Palm Beach", slug: "palm-beach" },
  { name: "Palm Beach Gardens", slug: "palm-beach-gardens" },
  { name: "Jupiter", slug: "jupiter" },
  { name: "Wellington", slug: "wellington" },
  { name: "Lake Worth", slug: "lake-worth" },
];

export default function ServiceAreasSection() {
  return (
    <section className="bg-white py-16 md:py-18 border-t border-line">
      <div className="max-w-[1240px] mx-auto px-6 flex flex-wrap gap-x-16 gap-y-7 items-start">
        <div className="basis-[340px] shrink">
          <h2 className="display text-[30px] !leading-tight mb-2.5">Serving Palm Beach County</h2>
          <p className="text-muted">From our shop on Avenue L in Delray Beach.</p>
        </div>
        <div className="flex-[1_1_520px] min-w-0 flex flex-wrap gap-2.5">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/services/signs/${city.slug}`}
              className="inline-flex items-center min-h-11 px-[18px] py-2.5 border border-[#d5dae1] rounded-full font-medium text-[15px] text-ink hover:border-ink transition-colors"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
