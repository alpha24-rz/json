"use client";

import React, { useState } from "react";
import { Coffee, Heart, Sparkles, MessageSquareHeart } from "lucide-react";
import { CoffeeSupporter } from "@/lib/types";
import DonationModal from "./DonationModal";

interface TechStackMarqueeProps {
  supporters?: CoffeeSupporter[];
  globalDonationLink?: string;
  globalDonationQr?: string;
  donationNote?: string;
}

const DEFAULT_SUPPORTERS: CoffeeSupporter[] = [
  {
    id: "sup-1",
    name: "Rian Pratama",
    coffee_count: 3,
    message: "Semangat terus bang! Template POS Toko ngebantu banget buat warung ortu di kampung 🙌",
    created_at: "2 jam lalu",
  },
  {
    id: "sup-2",
    name: "Dimas Ariyanto",
    coffee_count: 5,
    message: "Kodingan Next.js-nya rapi & clean. Makasih banyak udah digratisin buat bahan belajar!",
    created_at: "5 jam lalu",
  },
  {
    id: "sup-3",
    name: "Dev Bandung",
    coffee_count: 2,
    message: "Kopi hitam double shot buat nemenin begadang maintenance server ☕🔥 Respect!",
    created_at: "12 jam lalu",
  },
  {
    id: "sup-4",
    name: "Siti Rahma",
    coffee_count: 4,
    message: "Automasi Sheets & Excel-nya juara! Sangat mempermudah rekap data bulanan tim.",
    created_at: "1 hari lalu",
  },
  {
    id: "sup-5",
    name: "Fajar Kurniawan",
    coffee_count: 10,
    message: "Hemat waktu develop seminggu lebih. Sukses selalu buat karya-karya open source-nya!",
    created_at: "1 hari lalu",
  },
  {
    id: "sup-6",
    name: "Hendri W.",
    coffee_count: 3,
    message: "UI dashboard analytics-nya keren & modern banget. Ditunggu update fitur selanjutnya!",
    created_at: "2 hari lalu",
  },
  {
    id: "sup-7",
    name: "Budi Santoso",
    coffee_count: 2,
    message: "Sedekah kopi buat developer yang tulus berbagi ilmu untuk kemajuan anak bangsa 🚀",
    created_at: "3 hari lalu",
  },
  {
    id: "sup-8",
    name: "Alif Maulana",
    coffee_count: 5,
    message: "WhatsApp Bot automation-nya langsung kepake buat broadcast di kantor. Mantap pol!",
    created_at: "4 hari lalu",
  },
];

// Helper to generate consistent avatar initial & color
function getAvatarColor(name: string) {
  const colors = [
    "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    "from-lime-500/20 to-emerald-500/20 text-lime-400 border-lime-500/30",
    "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
    "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function TechStackMarquee({
  supporters = DEFAULT_SUPPORTERS,
  globalDonationLink = "https://saweria.co/demo",
  globalDonationQr,
  donationNote,
}: TechStackMarqueeProps) {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const activeSupporters = supporters && supporters.length > 0 ? supporters : DEFAULT_SUPPORTERS;

  return (
    <>
      <section className="w-full bg-neutral-950 text-white border-t border-neutral-900 py-14 sm:py-20 overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-40 bg-[#9BEC00]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-[11px] font-semibold text-neutral-300 mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9BEC00] animate-pulse" />
            <span>Dukungan Komunitas</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400 font-normal">Wall of Coffee ☕</span>
          </div>

          {/* Section Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Traktiran Kopi & Pesan Hangat
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg mx-auto leading-relaxed">
            Terima kasih untuk teman-teman developer & kreator yang sudah mentraktir kopi dan menyemangati kelanjutan karya open source ini.
          </p>
        </div>

        {/* Infinite Marquee Track with Left/Right Gradient Fade Mask */}
        <div className="relative w-full overflow-hidden mask-gradient-x">
          <div className="animate-marquee items-stretch gap-5 sm:gap-6 py-4 cursor-default">
            {/* Loop 1 */}
            {activeSupporters.map((supporter, idx) => (
              <div
                key={`sup-1-${supporter.id || idx}`}
                className="w-[310px] sm:w-[350px] p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-[#9BEC00]/60 hover:bg-neutral-900 transition-all duration-300 flex flex-col justify-between shrink-0 shadow-sm hover:shadow-[0_0_25px_rgba(155,236,0,0.12)] hover:-translate-y-1 group"
              >
                <div>
                  {/* Card Top: Supporter Avatar, Name & Coffee Pill */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br border flex items-center justify-center font-bold text-xs shrink-0 ${getAvatarColor(
                          supporter.name
                        )}`}
                      >
                        {supporter.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#9BEC00] transition-colors truncate">
                          {supporter.name}
                        </h4>
                        <span className="text-[10px] text-neutral-400 block mt-0.5">
                          {supporter.created_at}
                        </span>
                      </div>
                    </div>

                    {/* Coffee Count Badge */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#9BEC00]/10 border border-[#9BEC00]/25 text-[#9BEC00] text-[11px] font-bold shrink-0">
                      <span>☕</span>
                      <span>{supporter.coffee_count} Kopi</span>
                    </div>
                  </div>

                  {/* Card Middle: Supporter Message */}
                  <div className="mt-3.5 relative">
                    <p className="text-xs text-neutral-300 group-hover:text-white leading-relaxed italic line-clamp-3 transition-colors">
                      &ldquo;{supporter.message}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Verified Supporter tag */}
                <div className="mt-4 pt-3 border-t border-neutral-800/70 flex items-center justify-between text-[10px] text-neutral-400">
                  <span className="inline-flex items-center gap-1.5 text-neutral-400 group-hover:text-neutral-300">
                    <Heart className="w-3 h-3 text-[#9BEC00] fill-[#9BEC00]/40" />
                    <span>Supporter Terverifikasi</span>
                  </span>
                  <span className="text-[#9BEC00]/80 font-medium">Json Showcase</span>
                </div>
              </div>
            ))}

            {/* Loop 2 (for seamless infinite loop) */}
            {activeSupporters.map((supporter, idx) => (
              <div
                key={`sup-2-${supporter.id || idx}`}
                className="w-[310px] sm:w-[350px] p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-[#9BEC00]/60 hover:bg-neutral-900 transition-all duration-300 flex flex-col justify-between shrink-0 shadow-sm hover:shadow-[0_0_25px_rgba(155,236,0,0.12)] hover:-translate-y-1 group"
              >
                <div>
                  {/* Card Top: Supporter Avatar, Name & Coffee Pill */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br border flex items-center justify-center font-bold text-xs shrink-0 ${getAvatarColor(
                          supporter.name
                        )}`}
                      >
                        {supporter.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#9BEC00] transition-colors truncate">
                          {supporter.name}
                        </h4>
                        <span className="text-[10px] text-neutral-400 block mt-0.5">
                          {supporter.created_at}
                        </span>
                      </div>
                    </div>

                    {/* Coffee Count Badge */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#9BEC00]/10 border border-[#9BEC00]/25 text-[#9BEC00] text-[11px] font-bold shrink-0">
                      <span>☕</span>
                      <span>{supporter.coffee_count} Kopi</span>
                    </div>
                  </div>

                  {/* Card Middle: Supporter Message */}
                  <div className="mt-3.5 relative">
                    <p className="text-xs text-neutral-300 group-hover:text-white leading-relaxed italic line-clamp-3 transition-colors">
                      &ldquo;{supporter.message}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Verified Supporter tag */}
                <div className="mt-4 pt-3 border-t border-neutral-800/70 flex items-center justify-between text-[10px] text-neutral-400">
                  <span className="inline-flex items-center gap-1.5 text-neutral-400 group-hover:text-neutral-300">
                    <Heart className="w-3 h-3 text-[#9BEC00] fill-[#9BEC00]/40" />
                    <span>Supporter Terverifikasi</span>
                  </span>
                  <span className="text-[#9BEC00]/80 font-medium">Json Showcase</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to join the wall */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsDonationOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#9BEC00]/60 text-white text-xs font-semibold shadow-sm hover:shadow-[0_0_20px_rgba(155,236,0,0.15)] transition-all cursor-pointer group"
          >
            <Coffee className="w-4 h-4 text-[#9BEC00] group-hover:rotate-12 transition-transform" />
            <span>Mau ikut traktir kopi & tulis pesanmu?</span>
            <span className="text-[#9BEC00] group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
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
