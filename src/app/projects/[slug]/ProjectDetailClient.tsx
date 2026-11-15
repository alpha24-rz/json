"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project, SiteSettings } from "@/lib/types";
import { 
  ExternalLink, 
  Download, 
  QrCode, 
  Coffee,
  Heart, 
  ArrowLeft, 
  Calendar, 
  Eye, 
  Sparkles, 
  Terminal,
  CheckCircle2,
  Share2,
  Copy,
  Check
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import DonationModal from "@/components/DonationModal";
import { formatDate } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: Project;
  settings: SiteSettings;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({
  project,
  settings,
  relatedProjects,
}: ProjectDetailClientProps) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const activeDonationLink = project.donation_link || settings.global_donation_link || "https://saweria.co/demo";
  const activeDonationQr = project.donation_qr_url || settings.global_donation_qr || "";

  const handleTrack = async (type: "view" | "download") => {
    try {
      fetch(`/api/projects/${project.slug}/track?type=${type}`, { method: "POST" });
    } catch {
      // ignore
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          href="/#catalog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Proyek</span>
        </Link>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition border border-neutral-200"
        >
          {copiedShare ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#08CB00]" />
              <span className="text-[#08CB00]">Link Tersalin!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan</span>
            </>
          )}
        </button>
      </div>

      {/* Project Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-neutral-900 text-white">
            {project.category}
          </span>
          {project.is_featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-[#08CB00] text-black">
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>Proyek Unggulan</span>
            </span>
          )}
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200">
            Gratis 100%
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          {project.tagline || project.description}
        </p>

        {/* Metadata counters */}
        <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 pt-1">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Dirilis: {formatDate(project.created_at)}</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>{project.views_count} kali dilihat</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5">
            <Download className="w-4 h-4" />
            <span>{project.downloads_count} kali diunduh</span>
          </span>
        </div>
      </div>

      {/* ACTION BUTTONS BAR (Highlight with #08CB00) */}
      <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-wrap items-center gap-3">
        
        {/* 1. Live Demo */}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleTrack("view")}
            className="flex items-center gap-2 px-5 py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Kunjungi Live Demo</span>
          </a>
        )}

        {/* 2. GitHub Repo */}
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleTrack("download")}
            className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-bold text-xs sm:text-sm rounded-xl transition shadow-xs"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Repository GitHub</span>
          </a>
        )}

        {/* 3. Direct Download ZIP */}
        {project.download_url && (
          <a
            href={project.download_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleTrack("download")}
            className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-bold text-xs sm:text-sm rounded-xl transition shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Source Code (.ZIP)</span>
          </a>
        )}

        {/* 4. Traktir Kopi Button (Featured #08CB00) */}
        <button
          onClick={() => setIsQrModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#08CB00] hover:bg-[#07b500] text-black font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md glow-green-sm ml-auto"
        >
          <Coffee className="w-4 h-4 text-black" />
          <span>Traktir Kopi</span>
        </button>
      </div>

      {/* Main Grid: Content vs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Media & Documentation */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Visual Image */}
          <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm aspect-video relative">
            <img
              src={project.thumbnail_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description Section */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
            <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#08CB00]"></span>
              <span>Tentang Proyek</span>
            </h2>
            <div className="text-sm text-neutral-700 leading-relaxed space-y-3 whitespace-pre-line">
              {project.description}
            </div>
          </div>

          {/* Quick Start / Installation Guide (Markdown Render Area) */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-neutral-800" />
                <span>Panduan Instalasi & Menjalankan</span>
              </h2>
              <span className="text-xs font-semibold text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-md">
                README.md
              </span>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-neutral-700 space-y-4">
              {project.content_markdown ? (
                <div className="bg-neutral-950 text-neutral-100 p-5 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {project.content_markdown}
                </div>
              ) : (
                <div className="bg-neutral-950 text-neutral-100 p-5 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
                  <p className="text-neutral-400"># 1. Clone repository ini</p>
                  <p className="text-[#08CB00]">git clone {project.github_url || "https://github.com/example/repo.git"}</p>
                  <p className="mt-3 text-neutral-400"># 2. Masuk ke direktori dan install dependensi</p>
                  <p className="text-white">npm install</p>
                  <p className="mt-3 text-neutral-400"># 3. Jalankan server lokal</p>
                  <p className="text-white">npm run dev</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Specs & Donation Box */}
        <div className="space-y-6">
          
          {/* Tech Stack Specs Box */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-5 shadow-2xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
              Teknologi yang Digunakan
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-3 pt-3 border-t border-neutral-100 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-50">
                <span className="text-neutral-500">Lisensi</span>
                <span className="font-semibold text-neutral-900">MIT (Gratis Dipakai)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-50">
                <span className="text-neutral-500">Kategori</span>
                <span className="font-semibold text-neutral-900">{project.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-50">
                <span className="text-neutral-500">Akses Kode</span>
                <span className="font-bold text-[#08CB00]">100% Terbuka (Public)</span>
              </div>
            </div>
          </div>

          {/* Quick Traktir Kopi Mini-Box in Sidebar */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-center space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#08CB00]/15 text-[#08CB00] flex items-center justify-center mx-auto">
              <Coffee className="w-5 h-5 text-[#08CB00]" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-950 text-sm">
                Suka dengan Proyek Ini?
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Bantu pengembang tetap bersemangat membagikan karya gratis dengan mentraktir kopi lewat Saweria atau QRIS.
              </p>
            </div>
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="w-full py-2.5 px-4 bg-[#08CB00] hover:bg-[#07b500] text-black font-bold text-xs rounded-xl shadow-xs transition glow-green-sm"
            >
              Traktir Kopi
            </button>
          </div>
        </div>
      </div>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <div className="pt-12 border-t border-neutral-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-950">
              Proyek Terkait Lainnya
            </h3>
            <Link
              href="/#catalog"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <div
                key={rel.id}
                className="bg-white border border-neutral-200 rounded-xl p-4 space-y-3 hover:border-neutral-900 transition"
              >
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-neutral-100">
                  <img
                    src={rel.thumbnail_url}
                    alt={rel.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-sm text-neutral-900 line-clamp-1">
                  {rel.title}
                </h4>
                <p className="text-xs text-neutral-500 line-clamp-2">
                  {rel.tagline || rel.description}
                </p>
                <Link
                  href={`/projects/${rel.slug}`}
                  className="inline-block text-xs font-bold text-neutral-900 hover:text-[#08CB00] transition"
                >
                  Detail Proyek &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Donation Modal */}
      <DonationModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        projectTitle={project.title}
        donationLink={activeDonationLink}
        donationQrUrl={activeDonationQr}
        donationNote={settings.donation_note}
      />
    </div>
  );
}

