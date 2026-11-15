"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShieldCheck, ArrowUpRight } from "lucide-react";
import GithubIcon from "./GithubIcon";
import DonationModal from "./DonationModal";

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
  siteTitle = "DevShowroom",
  authorName = "Developer",
  authorBio = "Membangun sistem dan aplikasi open-source gratis.",
  githubProfile = "https://github.com",
  globalDonationLink = "https://saweria.co/demo",
  globalDonationQr,
  donationNote,
}: FooterProps) {
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  return (
    <>
      <footer id="about" className="w-full bg-neutral-950 text-white border-t border-neutral-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center pl-2">
                <span className="relative font-black text-2xl tracking-tight text-white">
                  <span className="absolute top-1 -left-2.5 w-2 h-2 rounded-full bg-[#08CB00] shadow-[0_0_8px_#08CB00]"></span>
                  Json
                </span>
              </div>
              <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
                {authorBio} Seluruh source code dan website dibagikan secara gratis untuk kepentingan edukasi, portfolio, dan pengembangan karya bersama.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {githubProfile && (
                  <a
                    href={githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => setIsDonationOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#08CB00] text-black font-bold text-xs hover:bg-[#07b500] transition"
                >
                  <Heart className="w-3.5 h-3.5 fill-black" />
                  <span>Dukung via QR Donasi</span>
                </button>
              </div>
            </div>

            {/* Col 2: Navigasi Cepat */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Navigasi
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <Link href="/#catalog" className="hover:text-white transition">
                    Katalog Proyek
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-white transition">
                    Tentang Platform
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsDonationOpen(true)}
                    className="hover:text-white transition text-left"
                  >
                    QR Donasi Saweria
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Pengembang & Admin */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Pengembang & Admin
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li className="text-neutral-300 font-medium">
                  Karya oleh: <span className="text-white font-bold">{authorName}</span>
                </li>
                <li>
                  <Link 
                    href="/admin" 
                    className="inline-flex items-center gap-1 text-neutral-400 hover:text-[#08CB00] transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Login Dashboard Admin</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} {siteTitle}. Open source software under MIT License.
            </p>
            <p className="flex items-center gap-1.5">
              <span>Dibuat dengan Next.js & Tailwind CSS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#08CB00]"></span>
            </p>
          </div>
        </div>
      </footer>

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

