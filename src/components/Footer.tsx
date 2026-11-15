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

            {/* Col 4: Ketentuan Penggunaan (Span 2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                Penggunaan
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li className="flex items-start gap-1.5 text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9BEC00] shrink-0 mt-0.5" />
                  <span>Bebas Komersial & Pribadi</span>
                </li>
                <li className="text-neutral-500 text-[11px] leading-relaxed">
                  Bebas dipakai dan dimodifikasi untuk proyek sendiri maupun klien.
                </li>
              </ul>

              {/* Ilustrasi Lucu: Traktir Dulu Kopi */}
              <button
                onClick={() => setIsDonationOpen(true)}
                className="group/coffee relative mt-3 w-full p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-[#9BEC00]/50 hover:bg-neutral-900 transition-all duration-300 text-left flex items-center gap-2.5 shadow-xs hover:shadow-lg hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                title="Buka QRIS / Saweria Traktir Kopi"
              >
                {/* Ambient glow on hover */}
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#9BEC00]/10 rounded-full blur-xl group-hover/coffee:bg-[#9BEC00]/25 transition-all" />

                {/* Cute Smiling Coffee Cup SVG */}
                <div className="relative w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center shrink-0 group-hover/coffee:border-[#9BEC00] group-hover/coffee:scale-105 transition-all duration-300">
                  <svg viewBox="0 0 36 36" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Steam lines */}
                    <path d="M14 6c0-1.5 1-2 1-3.5M18 7c0-1.5 1-2 1-3.5M22 6c0-1.5 1-2 1-3.5" stroke="#9BEC00" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
                    {/* Coffee Cup Body */}
                    <path d="M10 12h16c0 6-3 12-8 12s-8-6-8-12z" fill="#0A0A0A" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
                    {/* Cute Face: 2 happy eyes and smiling mouth */}
                    <circle cx="15" cy="16" r="1" fill="#FFFFFF" />
                    <circle cx="21" cy="16" r="1" fill="#FFFFFF" />
                    <path d="M16.5 18.5c.5.8 2.5.8 3 0" stroke="#9BEC00" strokeWidth="1.2" strokeLinecap="round" />
                    {/* Cup Handle */}
                    <path d="M26 14h2.5a2.5 2.5 0 0 1 0 5H25" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Saucer */}
                    <path d="M9 26h18" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white group-hover/coffee:text-[#9BEC00] transition-colors flex items-center gap-1">
                    <span>Traktir Dulu Kopi</span>
                    <span>☕</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 group-hover/coffee:text-neutral-300 leading-tight mt-0.5">
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

