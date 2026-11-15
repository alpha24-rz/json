"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import GithubIcon from "./GithubIcon";
import DonationModal from "./DonationModal";
import { MAIN_CATEGORIES } from "@/lib/categories";

interface FooterProps {
  siteTitle?: string;
  authorName?: string;
  authorBio?: string;
  githubProfile?: string;
  globalDonationLink?: string;
  globalDonationQr?: string;
  donationNote?: string;
}

export default function Footer({
  siteTitle = "Json",
  authorName = "alpharz",
  authorBio = "Membangun sistem dan aplikasi open-source gratis.",
  githubProfile = "https://github.com",
  globalDonationLink = "https://saweria.co/demo",
  globalDonationQr,
  donationNote,
}: FooterProps) {
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer id="about" className="relative w-full bg-neutral-950 text-white border-t border-neutral-900 pt-16 pb-8 overflow-hidden">
        {/* Subtle Background Radial Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-neutral-900/40 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
            
            {/* Col 1: Brand & Creator Info (Span 4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center pl-2">
                <span className="relative font-black text-2xl tracking-tight text-white">
                  <span className="absolute top-1 -left-2.5 w-2 h-2 rounded-full bg-[#9BEC00] shadow-[0_0_8px_#9BEC00]"></span>
                  {siteTitle}
                </span>
              </div>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                {authorBio} Seluruh source code, template, dan sistem digital dibagikan gratis untuk komunitas developer, UMKM, dan kreator.
              </p>

              {/* Action Buttons: GitHub */}
              <div className="flex items-center gap-3 pt-2">
                {githubProfile && (
                  <a
                    href={githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition"
                    aria-label="GitHub"
                    title="Kunjungi Profil GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>
                )}
              </div>
            </div>

            {/* Col 2: Kategori Produk (Span 3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                Kategori Produk
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                {MAIN_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span>{cat.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/category/all"
                    className="hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 text-neutral-300 font-semibold"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#9BEC00]" />
                    <span>Jelajahi Semua Produk</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Navigasi Platform (Span 2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                Navigasi
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/#catalog" className="hover:text-white transition">
                    Katalog Unggulan
                  </Link>
                </li>
                <li>
                  <a
                    href={githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    GitHub Showcase
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Traktir Kopi Mascot (Span 3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                Traktir Kopi
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Karya open source gratis untuk siapa saja. Dukung kreator agar server dan coding tetap semangat!
              </p>

              {/* Card Mascot Traktir Kopi */}
              <button
                type="button"
                onClick={() => setIsDonationOpen(true)}
                className="group/coffee relative w-full p-3.5 rounded-2xl bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-[#9BEC00]/60 transition-all duration-300 text-left flex items-center gap-3.5 shadow-lg hover:shadow-[0_0_25px_rgba(155,236,0,0.18)] hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                title="Traktir Dulu Kopi"
              >
                {/* Ambient glow on hover */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#9BEC00]/10 rounded-full blur-xl group-hover/coffee:bg-[#9BEC00]/25 transition-all duration-500 pointer-events-none" />

                {/* Cute Character Mascot Image */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 group-hover/coffee:border-[#9BEC00]/60 shrink-0 transition-transform duration-300 group-hover/coffee:scale-105 shadow-inner">
                  <img
                    src="/images/coffee-mascot.webp"
                    alt="Karakter Traktir Kopi"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col min-w-0 pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover/coffee:text-[#9BEC00] transition-colors truncate">
                      Traktir Dulu Kopi
                    </span>
                    <span className="text-xs">☕</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 group-hover/coffee:text-neutral-300 leading-tight mt-1 line-clamp-2">
                    Biar server & coding tetap ngebut!
                  </span>
                </div>
              </button>
            </div>

          </div>

          {/* Bottom Bar with Back to Top */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} {siteTitle}.
            </p>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition font-semibold cursor-pointer"
              title="Kembali ke bagian atas halaman"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Massive Subtle Background Brand Watermark (Linear/Vercel Style) */}
          <div className="overflow-hidden select-none pointer-events-none -mb-6 sm:-mb-12 mt-8 text-center opacity-30">
            <span className="text-[7rem] sm:text-[12rem] md:text-[16rem] font-black tracking-tighter text-neutral-900 leading-none block">
              {siteTitle.toUpperCase()}
            </span>
          </div>

        </div>
      </footer>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
        donationLink={globalDonationLink}
        donationQrUrl={globalDonationQr}
        donationNote={donationNote}
      />
    </>
  );
}

