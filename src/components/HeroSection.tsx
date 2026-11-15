"use client";

import React, { useState } from "react";
import { ArrowDown, Coffee } from "lucide-react";
import DonationModal from "./DonationModal";
import Orb from "./Orb";

interface HeroSectionProps {
  totalProjects: number;
  authorName?: string;
  globalDonationLink?: string;
  globalDonationQr?: string;
  donationNote?: string;
}

export default function HeroSection({
  totalProjects,
  globalDonationLink,
  globalDonationQr,
  donationNote,
}: HeroSectionProps) {
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-white border-b border-neutral-200/80 py-20 sm:py-28">
        {/* Animated Background Orb */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-45">
          <div className="w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] shrink-0">
            <Orb
              colors={["#08CB00", "#22c55e", "#111827"]}
              backgroundColor="#ffffff"
              size={1}
              glow={1.3}
              bleed={0.4}
              hoverIntensity={0.9}
              trail={1}
              rotateOnHover
              followCursor
            />
          </div>
        </div>

        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-neutral-200/90 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#08CB00] shadow-[0_0_8px_#08CB00] animate-pulse" />
            <span className="text-xs font-bold text-neutral-800 tracking-wide uppercase">
              100% Free & Open Source Catalog
            </span>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-950 tracking-tight leading-[1.12]">
              Jelajahi & Unduh{" "}
              <span className="relative inline-block text-neutral-950">
                Source Code Web
              </span>{" "}
              Secara Gratis.
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Koleksi sistem, aplikasi web, dashboard, dan template buatan pribadi yang bisa langsung Anda coba live demo-nya dan unduh kodenya tanpa biaya.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto pt-2">
            <a
              href="#catalog"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl shadow-md transition group"
            >
              <span>Lihat Semua Proyek</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            {/* Traktir CTA Button with #08CB00 */}
            <button
              onClick={() => setIsDonationOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#08CB00] hover:bg-[#07b500] text-black font-extrabold text-sm rounded-xl shadow-md transition glow-green-sm"
            >
              <Coffee className="w-4 h-4 text-black" />
              <span>Traktir Pengembang</span>
            </button>
          </div>

          {/* Key Value Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-8 border-t border-neutral-200/60">
            <div className="p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-neutral-200/80">
              <div className="text-2xl font-black text-neutral-900">{totalProjects}+</div>
              <div className="text-xs text-neutral-500 font-medium mt-0.5">Proyek Siap Pakai</div>
            </div>
            <div className="p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-neutral-200/80">
              <div className="text-2xl font-black text-[#08CB00]">GRATIS</div>
              <div className="text-xs text-neutral-500 font-medium mt-0.5">Bebas Unduh & Pakai</div>
            </div>
            <div className="p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-neutral-200/80">
              <div className="text-2xl font-black text-neutral-900">Live Demo</div>
              <div className="text-xs text-neutral-500 font-medium mt-0.5">Coba Tanpa Setup</div>
            </div>
            <div className="p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-neutral-200/80">
              <div className="text-2xl font-black text-neutral-900">Traktir Kopi</div>
              <div className="text-xs text-neutral-500 font-medium mt-0.5">Dukung Pembuat</div>
            </div>
          </div>
        </div>
      </section>

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
