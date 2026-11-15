"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import GithubIcon from "./GithubIcon";
import DonationModal from "./DonationModal";

interface NavbarProps {
  siteTitle?: string;
  githubProfile?: string;
  globalDonationLink?: string;
  globalDonationQr?: string;
  donationNote?: string;
}

export default function Navbar({
  siteTitle = "Json",
  githubProfile = "https://github.com",
  globalDonationLink = "https://saweria.co/demo",
  globalDonationQr,
  donationNote,
}: NavbarProps) {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo & Brand */}
          <Link href="/" className="flex items-center group pl-2">
            <span className="relative font-black text-neutral-950 tracking-tight text-2xl group-hover:opacity-80 transition">
              <span className="absolute top-1 -left-2.5 w-2 h-2 rounded-full bg-[#08CB00] shadow-[0_0_8px_#08CB00]"></span>
              Json
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#catalog"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition"
            >
              Katalog Proyek
            </Link>
            <Link
              href="/#about"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition"
            >
              Tentang
            </Link>
          </nav>

          {/* Action CTAs: GitHub & Green Donation */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* GitHub Button */}
            {githubProfile && (
              <a
                href={githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200/80 rounded-xl transition border border-neutral-200"
              >
                <GithubIcon className="w-3.5 h-3.5 text-neutral-900" />
                <span>GitHub</span>
              </a>
            )}

            {/* Donation Button (Green #08CB00) */}
            <button
              onClick={() => setIsDonationOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-black bg-[#08CB00] hover:bg-[#07b500] rounded-xl transition shadow-xs hover:shadow-md glow-green-sm"
            >
              <Heart className="w-3.5 h-3.5 text-black fill-black" />
              <span>Donasi QR</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsDonationOpen(true)}
              className="p-2 text-black bg-[#08CB00] rounded-lg hover:bg-[#07b500] shadow-xs"
              aria-label="Donasi"
            >
              <Heart className="w-4 h-4 fill-black text-black" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-950"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3">
            <Link
              href="/#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-neutral-700"
            >
              Katalog Proyek
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-neutral-700"
            >
              Tentang Pembuat
            </Link>
            {githubProfile && (
              <a
                href={githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-sm font-semibold text-neutral-700"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profil</span>
              </a>
            )}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDonationOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-black bg-[#08CB00] hover:bg-[#07b500] rounded-xl shadow-xs glow-green-sm"
              >
                <Heart className="w-4 h-4 fill-black text-black" />
                <span>Donasi QR</span>
              </button>
            </div>
          </div>
        )}
      </header>

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
