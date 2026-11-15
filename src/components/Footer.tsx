"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Coffee, ArrowUp, ShieldCheck } from "lucide-react";
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
  authorName = "Developer",
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
            
            {/* Col 1: Brand & Creator Info (Span 5) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center pl-2">
                <span className="relative font-black text-2xl tracking-tight text-white">
                  <span className="absolute top-1 -left-2.5 w-2 h-2 rounded-full bg-[#9BEC00] shadow-[0_0_8px_#9BEC00]"></span>
                  {siteTitle}
                </span>
              </div>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                {authorBio} Seluruh source code, template, dan sistem digital dibagikan gratis untuk komunitas developer, UMKM, dan kreator.
              </p>

              {/* Action Buttons: GitHub & Traktir Kopi */}
              <div className="flex items-center gap-3 pt-2">
                {githubProfile && (
                  <a
                    href={githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition"
                    aria-label="GitHub"
                    title="Kunjungi Profil GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => setIsDonationOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#9BEC00] text-black font-bold text-xs hover:bg-[#88d400] transition shadow-xs cursor-pointer"
                >
                  <Coffee className="w-3.5 h-3.5 text-black" />
                  <span>Traktir Kopi</span>
                </button>
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
                  <button
                    onClick={() => setIsDonationOpen(true)}
                    className="hover:text-white transition text-left cursor-pointer"
                  >
                    Dukungan / Saweria
                  </button>
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

            {/* Col 4: Lisensi & Jaminan (Span 2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                Lisensi
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li className="flex items-start gap-1.5 text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9BEC00] shrink-0 mt-0.5" />
                  <span>MIT License (Bebas Komersial)</span>
                </li>
                <li className="text-neutral-500 text-[11px] leading-relaxed">
                  Bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan pribadi maupun bisnis.
                </li>
                <li className="text-neutral-400 pt-1">
                  Karya oleh <span className="text-white font-bold">{authorName}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar with Back to Top */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} {siteTitle}. Open source software under MIT License.
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

