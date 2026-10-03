import Link from "next/link";
import { Phone } from "./Icons";

export default function CTASection() {
  return (
    <section className="bg-brand-red text-white">
      <div className="max-w-[1240px] mx-auto px-6 py-20 flex flex-wrap gap-x-16 gap-y-8 items-center justify-between">
        <div className="flex-[1_1_520px] min-w-0">
          <h2 className="display text-4xl md:text-[3.5rem] !leading-none !font-[850] mb-3 [font-stretch:112%]">
            Ready for your new sign?
          </h2>
          <p className="text-lg md:text-[19px] text-[#ffe8ee] max-w-[36rem]">
            Tell us what you need and we&apos;ll come back with a design and a price.
            No obligation.
          </p>
        </div>
        <div className="flex flex-wrap gap-3.5">
          <Link
            href="/quote"
            className="btn bg-white text-ink hover:bg-[#f4f4f1] text-[17px] font-bold px-7 py-4"
          >
            Get a free quote
          </Link>
          <a href="tel:+15616857335" className="btn btn-ghost border-white text-[17px] px-7 py-4">
            <Phone className="w-[18px] h-[18px]" />
            Call (561) 685-7335
          </a>
        </div>
      </div>
    </section>
  );
}
