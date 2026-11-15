"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { 
  Layout, 
  ShoppingBag, 
  FileSpreadsheet, 
  Bot, 
  BarChart3, 
  Terminal, 
  Layers, 
  Eye, 
  Download,
  ExternalLink,
} from "lucide-react";
import GithubIcon from "./GithubIcon";

interface ProjectCardProps {
  project: Project;
  globalDonationLink?: string;
  globalDonationQr?: string;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "Landing Page":
      return Layout;
    case "E-Commerce":
      return ShoppingBag;
    case "Excel & Spreadsheet":
      return FileSpreadsheet;
    case "AI & Chatbot RAG":
      return Bot;
    case "System & Dashboard":
      return BarChart3;
    case "Developer Tools":
      return Terminal;
    default:
      return Layers;
  }
}

function formatNumber(num: number): string {
  if (!num) return "0";
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const CategoryIcon = getCategoryIcon(project.category);

  // Track clicks on Live Demo or Download
  const handleTrack = async (type: "view" | "download") => {
    try {
      fetch(`/api/projects/${project.slug}/track?type=${type}`, { method: "POST" });
    } catch {
      // ignore
    }
  };

  return (
    <div className="group flex flex-col">
      {/* Thumbnail Frame (Clean, Rounded-2xl, Border) */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 hover:border-neutral-400/90 transition-all duration-300 shadow-2xs hover:shadow-md">
        <Link href={`/projects/${project.slug}`} className="block w-full h-full">
          <img
            src={project.thumbnail_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Hover Quick Action Buttons (Floating in bottom-right) */}
        <div className="absolute inset-0 bg-neutral-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrack("view")}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-neutral-900 text-[11px] font-bold shadow-md hover:scale-105 transition-all backdrop-blur-xs"
              title="Buka Live Demo"
            >
              <span>Demo</span>
              <ExternalLink className="w-3 h-3 text-neutral-600" />
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrack("download")}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-950/95 hover:bg-neutral-950 text-white text-[11px] font-bold shadow-md hover:scale-105 transition-all backdrop-blur-xs"
              title="Lihat Source Code"
            >
              <GithubIcon className="w-3 h-3 text-white" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Meta Section Below Thumbnail (Reference Image Style) */}
      <div className="flex items-center gap-3 mt-3 px-0.5">
        
        {/* Circle Category Icon */}
        <div 
          className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center shrink-0 text-neutral-700 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-[#9BEC00] transition-colors duration-200 shadow-2xs"
          title={`Kategori: ${project.category}`}
        >
          <CategoryIcon className="w-4 h-4" />
        </div>

        {/* Title & Stats */}
        <div className="flex flex-col min-w-0 flex-1">
          <Link href={`/projects/${project.slug}`} className="block">
            <h3 className="text-sm font-bold text-neutral-900 group-hover:text-black transition-colors truncate">
              {project.title}
            </h3>
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mt-0.5">
            <span className="inline-flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-neutral-400" />
              <span>{formatNumber(project.views_count)}</span>
            </span>
            <span className="text-neutral-300">•</span>
            <span className="inline-flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              <span>{formatNumber(project.downloads_count)}</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
