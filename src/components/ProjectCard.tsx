"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { 
  ExternalLink, 
  QrCode, 
  ArrowRight, 
  Eye, 
  Download, 
  Sparkles 
} from "lucide-react";
import GithubIcon from "./GithubIcon";
import DonationModal from "./DonationModal";

interface ProjectCardProps {
  project: Project;
  globalDonationLink?: string;
  globalDonationQr?: string;
}

export default function ProjectCard({
  project,
  globalDonationLink,
  globalDonationQr,
}: ProjectCardProps) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Track clicks on Live Demo or Download
  const handleTrack = async (type: "view" | "download") => {
    try {
      fetch(`/api/projects/${project.slug}/track?type=${type}`, { method: "POST" });
    } catch {
      // ignore
    }
  };

  const activeDonationLink = project.donation_link || globalDonationLink || "https://saweria.co/demo";
  const activeDonationQr = project.donation_qr_url || globalDonationQr || "";

  return (
    <>
      <div className="group relative flex flex-col bg-white border border-neutral-200/90 hover:border-neutral-900/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        
        {/* Thumbnail Header */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
          <img
            src={project.thumbnail_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Badges on top */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-neutral-950/80 text-white backdrop-blur-xs border border-white/10">
              {project.category}
            </span>
            {project.is_featured && (
              <span className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold rounded-md bg-[#08CB00] text-black shadow-xs">
                <Sparkles className="w-3 h-3 fill-black" />
                <span>Unggulan</span>
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-white/90 text-neutral-900 border border-neutral-200 shadow-2xs backdrop-blur-xs">
              100% Gratis
            </span>
          </div>

          {/* Quick Stats Overlay at Bottom of Image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-medium">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 drop-shadow-sm">
                <Eye className="w-3.5 h-3.5" />
                <span>{project.views_count} view</span>
              </span>
              <span className="flex items-center gap-1 drop-shadow-sm">
                <Download className="w-3.5 h-3.5" />
                <span>{project.downloads_count} unduh</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-5">
          
          {/* Title */}
          <Link href={`/projects/${project.slug}`} className="group/title">
            <h3 className="text-lg font-bold text-neutral-900 line-clamp-1 group-hover/title:text-neutral-700 transition">
              {project.title}
            </h3>
          </Link>

          {/* Tagline / Short description */}
          <p className="mt-1.5 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {project.tagline || project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 4 && (
              <span className="px-1.5 py-0.5 text-[11px] font-medium rounded-md bg-neutral-100 text-neutral-500">
                +{project.tech_stack.length - 4}
              </span>
            )}
          </div>

          <div className="mt-auto pt-5">
            {/* Divider */}
            <div className="border-t border-neutral-100 mb-3.5" />

            {/* ACTION BUTTONS GRID */}
            <div className="grid grid-cols-2 gap-2">
              
              {/* 1. Live Demo */}
              {project.demo_url ? (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleTrack("view")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200/80 rounded-xl transition border border-neutral-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              ) : (
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200/80 rounded-xl transition border border-neutral-200"
                >
                  <span>Lihat Detail</span>
                </Link>
              )}

              {/* 2. GitHub Link */}
              {project.github_url ? (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleTrack("download")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-black rounded-xl transition shadow-xs"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-white" />
                  <span>GitHub</span>
                </a>
              ) : (
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-black rounded-xl transition shadow-xs"
                >
                  <span>Source Code</span>
                </Link>
              )}

              {/* 3. QR Donasi (Accented with #08CB00) */}
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-black bg-[#08CB00]/15 hover:bg-[#08CB00] hover:text-black border border-[#08CB00]/40 hover:border-[#08CB00] rounded-xl transition duration-200 shadow-2xs group/qr"
                title="Dukung pembuat proyek ini lewat QR Donasi"
              >
                <QrCode className="w-3.5 h-3.5 text-neutral-900 group-hover/qr:scale-110 transition-transform" />
                <span>QR Donasi</span>
              </button>

              {/* 4. Detail Page Link */}
              <Link
                href={`/projects/${project.slug}`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 rounded-xl transition border border-transparent hover:border-neutral-200"
              >
                <span>Dokumentasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* QR Donasi Modal per Card */}
      <DonationModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        projectTitle={project.title}
        donationLink={activeDonationLink}
        donationQrUrl={activeDonationQr}
      />
    </>
  );
}

