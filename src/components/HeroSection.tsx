"use client";

import React, { useState } from "react";
import { ArrowDown, Coffee, ShoppingBag, Store, CodeXml, LayoutDashboard } from "lucide-react";
import DonationModal from "./DonationModal";
import CardSwap, { CardSwapItem } from "./CardSwap";

const showcaseItems: CardSwapItem[] = [
  {
    title: "TokoKatalog — Minimalist E-Commerce",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    icon: <ShoppingBag className="w-3.5 h-3.5 text-neutral-800" />,
  },
  {
    title: "KasirKita — POS & Inventory UMKM",
    image: "https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=1200&auto=format&fit=crop",
    icon: <Store className="w-3.5 h-3.5 text-neutral-800" />,
  },
  {
    title: "DocuFast — API & Technical Docs Template",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    icon: <CodeXml className="w-3.5 h-3.5 text-neutral-800" />,
  },
  {
    title: "AdminPulse — SaaS & Analytics Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    icon: <LayoutDashboard className="w-3.5 h-3.5 text-neutral-800" />,
  },
];

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
      <section className="relative overflow-hidden bg-white border-b border-neutral-200/80 py-16 sm:py-20 lg:py-24">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column: Headline, Description & CTAs */}
            <div className="lg:col-span-6 text-left space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/90 text-xs font-semibold text-neutral-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#9BEC00] shadow-[0_0_8px_#9BEC00]" />
                <span>Katalog Source Code & Sistem Web Siap Pakai</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-neutral-950 tracking-tight leading-[1.12]">
                  Jelajahi & Unduh{" "}
                  <span className="relative inline-block text-neutral-950">
                    Source Code Web
                  </span>{" "}
                  Secara Gratis.
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-xl">
                  Koleksi sistem, aplikasi web, dashboard, dan template buatan pribadi yang bisa langsung Anda coba live demo-nya dan unduh kodenya tanpa biaya.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#catalog"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl shadow-md transition group"
                >
                  <span>Lihat Semua Proyek</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>

                {/* Traktir CTA Button with #9BEC00 */}
                <button
                  onClick={() => setIsDonationOpen(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#9BEC00] hover:bg-[#88d400] text-black font-extrabold text-sm rounded-xl shadow-md transition glow-green-sm"
                >
                  <Coffee className="w-4 h-4 text-black" />
                  <span>Traktir Pengembang</span>
                </button>
              </div>

              {/* Key Value Micro-Stats */}
              <div className="pt-4 border-t border-neutral-200/70 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9BEC00]" />
                  <span>{totalProjects}+ Proyek Tersedia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9BEC00]" />
                  <span>100% Gratis & Open Source</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9BEC00]" />
                  <span>Live Demo Langsung</span>
                </div>
              </div>
            </div>

            {/* Right Column: CardSwap Showcase */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-full h-[460px] sm:h-[540px] lg:h-[600px] relative flex items-center justify-center">
                <CardSwap
                  items={showcaseItems}
                  width={480}
                  height={330}
                  cardDistance={52}
                  verticalDistance={62}
                  depth={85}
                  skewAmount={5}
                  delay={4000}
                  theme="light"
                  pauseOnHover
                />
              </div>
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
