"use client";

import React, { useState } from "react";
import { ArrowDown, Sparkles, Terminal, Code, Heart, Bell, ShieldCheck } from "lucide-react";
import SubscribeModal from "./SubscribeModal";
import DonationModal from "./DonationModal";

interface HeroSectionProps {
  totalProjects: number;
  authorName?: string;
  globalDonationLink?: string;
  globalDonationQr?: string;
  donationNote?: string;
}

export default function HeroSection({
  totalProjects,
  authorName = "Developer",
  globalDonationLink,
  globalDonationQr,
  donationNote,
}: HeroSectionProps) {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-white border-b border-neutral-200/80 py-16 sm:py-24">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">


          {/* Main Headline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-950 tracking-tight leading-[1.12]">
              Jelajahi & Unduh{" "}
              <span className="relative inline-block text-neutral-950">
                Source Code Web
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#08CB00]/25 -z-10 rounded-sm" />
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

            {/* Subscribe CTA Button with #08CB00 */}
            <button
              onClick={() => setIsSubscribeOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#08CB00] hover:bg-[#07b500] text-black font-extrabold text-sm rounded-xl shadow-md transition glow-green-sm"
            >
              <Bell className="w-4 h-4 text-black" />
              <span>Subscribe Rilis Baru</span>
            </button>
          </div>

          {/* Key Value Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-8 border-t border-neutral-100">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <div className="text-2xl font-black text-neutral-900">{totalProjects}+</div>
              <div className="text-xs text-neutral-500 font-medium mt-0.5">Proyek Siap Pakai</div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <div className="text-2xl font-black text-[#08CB00]">GRATIS</div>
              <div className="text-xs text-neutral-500 font-medium mt-0.5">Bebas Unduh & Pakai</div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <div className="text-2xl font-black text-neutral-900">Live Demo</div>
              <div className="text-xs text-neutral-500 font-medium mt-0.5">Coba Tanpa Setup</div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <div className="text-2xl font-black text-neutral-900">QR Donasi</div>
              <div className="text-xs text-neutral-500 font-medium mt-0.5">Dukung Pembuat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />
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

