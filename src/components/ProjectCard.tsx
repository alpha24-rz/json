"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import GithubIcon from "./GithubIcon";

interface ProjectCardProps {
  project: Project;
  globalDonationLink?: string;
  globalDonationQr?: string;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  // Track clicks on Live Demo or Download
  const handleTrack = async (type: "view" | "download") => {
    try {
      fetch(`/api/projects/${project.slug}/track?type=${type}`, { method: "POST" });
    } catch {
      // ignore
    }
  };

  return (
    <div className="group relative flex flex-col bg-white border border-neutral-200/90 hover:border-neutral-900/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* Thumbnail Header */}
      <Link href={`/projects/${project.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 block">
        <img
          src={project.thumbnail_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges on top */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-neutral-950/80 text-white backdrop-blur-xs border border-white/10">
            {project.category}
          </span>
          {project.is_featured && (
            <span className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold rounded-md bg-[#9BEC00] text-black shadow-xs">
              <Sparkles className="w-3 h-3 fill-black" />
              <span>Unggulan</span>
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-white/95 text-neutral-900 border border-neutral-200 shadow-2xs backdrop-blur-xs">
            Gratis
          </span>
        </div>
      </Link>

      {/* Card Body - Super Minimalist */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between gap-4">
        
        {/* Info Header: Category/Tech + Direct Title */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-neutral-400 truncate">
            {project.category} • {project.tech_stack.slice(0, 3).join(", ")}
          </div>
          <Link href={`/projects/${project.slug}`} className="group/title block">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover/title:text-neutral-600 transition leading-snug line-clamp-1">
              {project.title}
            </h3>
          </Link>
        </div>

        {/* 2 Clean Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
          {/* Live Demo */}
          {project.demo_url ? (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrack("view")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200/90 rounded-xl transition border border-neutral-200/80"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </a>
          ) : (
            <Link
              href={`/projects/${project.slug}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200/90 rounded-xl transition border border-neutral-200/80"
            >
              <span>Detail</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
            </Link>
          )}

          {/* GitHub Source Code */}
          {project.github_url ? (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrack("download")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-xl transition shadow-xs"
            >
              <GithubIcon className="w-3.5 h-3.5 text-white" />
              <span>Source Code</span>
            </a>
          ) : (
            <Link
              href={`/projects/${project.slug}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-xl transition shadow-xs"
            >
              <GithubIcon className="w-3.5 h-3.5 text-white" />
              <span>Source Code</span>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
