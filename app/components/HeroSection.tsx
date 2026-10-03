import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./Icons";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-ink text-white">
      {/* Background image with a left-side scrim so the copy stays readable */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[60%_50%]"
          quality={85}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,29,0.9)_0%,rgba(8,17,29,0.72)_42%,rgba(8,17,29,0.2)_75%,rgba(8,17,29,0.05)_100%)] max-md:bg-none max-md:bg-[rgba(8,17,29,0.72)]" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-24 min-h-[520px] flex items-center">
        <div className="max-w-[640px]">
          <div className="eyebrow inline-flex gap-2.5 items-center text-[#9fb4cc] mb-6">
            <span className="w-7 h-[3px] bg-brand-red inline-block" />
            Palm Beach County sign makers
          </div>
          <h1 className="display text-5xl sm:text-6xl lg:text-[5.75rem] !leading-[0.95] !font-[850] mb-6 [font-stretch:112%]">
            We make
            <br />
            great signs.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-[#c9d3df] max-w-[34rem] mb-9">
            Storefronts, vehicles, banners and everything in between — designed,
            built and installed by the same local team since 1986.
          </p>
          <div className="flex flex-wrap gap-3.5 mb-12">
            <Link href="/quote" className="btn btn-primary text-[17px] px-7 py-4">
              Get a free quote
              <ArrowRight />
            </Link>
            <Link href="/products" className="btn btn-ghost text-[17px] px-7 py-4">
              Browse products
            </Link>
          </div>
          <dl className="flex flex-wrap gap-7 pt-7 border-t border-white/15">
            <div>
              <dt className="sr-only">Founded</dt>
              <dd className="display text-[32px] leading-none">1986</dd>
              <dd className="text-sm text-[#9fb4cc] mt-1.5">Making signs since</dd>
            </div>
            <div>
              <dt className="sr-only">Rating</dt>
              <dd className="display text-[32px] leading-none text-[#f5b700]" aria-label="Five stars">
                ★★★★★
              </dd>
              <dd className="text-sm text-[#9fb4cc] mt-1.5">From Google reviewers</dd>
            </div>
            <div>
              <dt className="sr-only">Service</dt>
              <dd className="display text-[32px] leading-none">In-house</dd>
              <dd className="text-sm text-[#9fb4cc] mt-1.5">Design, print &amp; install</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
