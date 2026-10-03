"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Close, MapPin, Menu, Phone } from "./Icons";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/services/signs", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Utility bar scrolls away; only the main nav stays pinned */}
      <div className="bg-ink-deep text-[#b9c3d0] text-sm">
        <div className="max-w-[1240px] mx-auto px-6 py-2.5 flex flex-wrap gap-x-7 gap-y-2 justify-between items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-1 items-center">
            <a
              href="https://maps.google.com/?q=155+Avenue+L,+Delray+Beach,+FL+33483"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex gap-2 items-center hover:text-white transition-colors"
            >
              <MapPin />
              155 Avenue L, Delray Beach, FL
            </a>
            <span className="hidden sm:inline">Family-run sign shop since 1986</span>
          </div>
          <a
            href="tel:+15616857335"
            className="inline-flex gap-2 items-center font-semibold text-white"
          >
            <Phone />
            (561) 685-7335
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full bg-ink border-b border-[#1e2b3e] text-white">
        <nav aria-label="Main" className="max-w-[1240px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-10">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="InstaSIGN Logo"
                width={200}
                height={67}
                priority
                className="h-12 w-auto"
              />
            </Link>
            <div className="hidden md:flex items-center gap-8 font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#e6ebf1] hover:text-white py-2.5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="/quote" className="btn btn-primary hidden md:inline-flex">
              Get a free quote
            </Link>
            <button
              className="md:hidden text-white p-2.5 -mr-2.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <Close /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 border-t border-white/15 pt-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-2.5 font-medium text-[#e6ebf1] hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/quote"
                  className="btn btn-primary w-fit mt-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get a free quote
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
