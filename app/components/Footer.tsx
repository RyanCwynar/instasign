import Image from "next/image";
import Link from "next/link";
import LocationMapModal from "./LocationMapModal";

const headingClass = "mb-3.5 text-white text-[15px] font-bold tracking-[0.06em] uppercase";
const linkClass = "text-[#b3c0cf] hover:text-white transition-colors";

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink-deep text-[#b3c0cf] text-[15px]">
      <div className="max-w-[1240px] mx-auto px-6 pt-18 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <Image
              src="/logo.svg"
              alt="InstaSIGN Logo"
              width={200}
              height={67}
              className="h-12 w-auto mb-4"
            />
            <p className="leading-relaxed max-w-[280px]">
              Your trusted sign maker since 1986. Quality signs, professional service
              and local expertise.
            </p>
          </div>
          <div>
            <h3 className={headingClass}>Visit</h3>
            <LocationMapModal>
              <a
                href="https://maps.google.com/?q=155+Avenue+L,+Delray+Beach,+FL+33483"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} leading-relaxed`}
              >
                155 Avenue L
                <br />
                Delray Beach, FL 33483
              </a>
            </LocationMapModal>
          </div>
          <div>
            <h3 className={headingClass}>Contact</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="tel:+15616857335" className={linkClass}>
                  (561) 685-7335
                </a>
              </li>
              <li>
                <a href="mailto:bill@instasign.com" className={linkClass}>
                  bill@instasign.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={headingClass}>Explore</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/products" className={linkClass}>Products</Link></li>
              <li><Link href="/quote" className={linkClass}>Get a quote</Link></li>
              <li><Link href="/#about" className={linkClass}>About</Link></li>
              <li><Link href="/blog" className={linkClass}>Blog</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1e2b3e] pt-6 flex flex-wrap gap-x-6 gap-y-2 justify-between text-sm text-[#8494a8]">
          <p>&copy; {new Date().getFullYear()} InstaSIGN. All rights reserved.</p>
          <p>Delray Beach · Boca Raton · Boynton Beach · West Palm Beach</p>
        </div>
      </div>
    </footer>
  );
}
