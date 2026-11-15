"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Heart, ExternalLink, Copy, Check, Coffee } from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
  donationLink?: string;
  donationQrUrl?: string;
  donationNote?: string;
}

export default function DonationModal({
  isOpen,
  onClose,
  projectTitle,
  donationLink = "https://saweria.co/demo",
  donationQrUrl,
  donationNote,
}: DonationModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetLink = donationLink || "https://saweria.co/demo";

  const handleCopy = () => {
    navigator.clipboard.writeText(targetLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#9BEC00]/15 text-[#9BEC00] mb-1">
            <Coffee className="w-6 h-6 text-[#9BEC00]" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900">
            Traktir Kopi Pengembang
          </h3>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto">
            {projectTitle ? (
              <span>
                Apresiasi untuk proyek <strong className="text-neutral-800">{projectTitle}</strong> agar tetap gratis & terus berkembang.
              </span>
            ) : (
              "Traktiran kopi Anda membantu penyediaan server, domain, dan kode sumber gratis untuk publik."
            )}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-5 bg-neutral-50 rounded-xl border border-neutral-200 mb-5">
          <div className="p-3 bg-white rounded-lg shadow-xs border border-neutral-200">
            {donationQrUrl ? (
              <img
                src={donationQrUrl}
                alt="Donation QR Code"
                className="w-48 h-48 object-contain"
              />
            ) : (
              <QRCodeSVG
                value={targetLink}
                size={190}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: "/favicon.ico",
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            )}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <Coffee className="w-4 h-4 text-[#9BEC00]" />
            <span>Scan Kode QR</span>
          </div>
          {donationNote && (
            <p className="text-[11px] text-neutral-500 text-center mt-2 px-2">
              {donationNote}
            </p>
          )}
        </div>

        {/* Donation Link Box */}
        <div className="flex items-center gap-2 p-2 bg-neutral-100 rounded-lg border border-neutral-200 mb-5">
          <span className="text-xs text-neutral-600 truncate flex-1 pl-2 font-mono">
            {targetLink}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-white border border-neutral-300 rounded-md font-medium text-neutral-800 hover:bg-neutral-50 transition shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#9BEC00]" />
                <span className="text-[#9BEC00]">Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>

        {/* Primary CTA button */}
        <a
          href={targetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#9BEC00] hover:bg-[#88d400] text-black font-bold rounded-xl shadow-md transition glow-green-sm"
        >
          <span>Traktir Kopi Sekarang</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

