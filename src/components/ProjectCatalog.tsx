"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";
import {
  FolderOpen,
  Layout,
  ShoppingBag,
  FileSpreadsheet,
  ArrowRight
} from "lucide-react";
import { MAIN_CATEGORIES } from "@/lib/categories";

interface ProjectCatalogProps {
  initialProjects: Project[];
  categories: string[];
  globalDonationLink?: string;
  globalDonationQr?: string;
  activeCategory?: string;
  title?: string;
}

const INITIAL_COUNT = 6;

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Landing Page": Layout,
  "E-Commerce": ShoppingBag,
  "Excel & Spreadsheet": FileSpreadsheet,
};

export default function ProjectCatalog({
  initialProjects,
  globalDonationLink,
  globalDonationQr,
  activeCategory,
  title = "Discover Something Great",
}: ProjectCatalogProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT);

  // Extract all distinct tech stacks
  const allTechList = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      p.tech_stack.forEach((t) => set.add(t));
    });
    return Array.from(set).slice(0, 10);
  }, [initialProjects]);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((project) => {
        // Only filter by category if activeCategory is set and not "All" / "Browse All"
        if (activeCategory && activeCategory !== "All" && activeCategory !== "Browse All" && activeCategory !== "Semua") {
          if (project.category !== activeCategory) {
            return false;
          }
        }

        // Tech filter
        if (selectedTech && !project.tech_stack.includes(selectedTech)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [initialProjects, activeCategory, selectedTech]);

  // Projects to display (Curated limit)
  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const hasMore = filteredProjects.length > visibleCount;

  return (
    <section id="catalog" className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header & Category Bar (Sejajar / Aligned) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80">

          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight shrink-0">
            {title}
          </h2>

          {/* Categories & Browse All Navigation */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">

            {/* Category Filter Pills (Navigation Links, Inactive by default on Homepage) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {MAIN_CATEGORIES.map((tab) => {
                const Icon = CATEGORY_ICONS[tab.id] || Layout;
                const isActive = activeCategory === tab.id;

                return (
                  <Link
                    key={tab.id}
                    href={`/category/${tab.slug}`}
                    className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 border cursor-pointer ${isActive
                        ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-900 hover:text-neutral-950 hover:bg-neutral-50"
                      }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#9BEC00]" : "text-neutral-400"}`} />
                    <span>{tab.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Subtle Divider */}
            <div className="hidden sm:block w-px h-5 bg-neutral-200 mx-1 shrink-0" />

            {/* Browse All: Clean text-only navigation */}
            <Link
              href="/category/all"
              className={`group inline-flex items-center gap-1.5 py-1.5 px-2 text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${activeCategory === "All" || activeCategory === "Browse All"
                  ? "text-neutral-950"
                  : "text-neutral-500 hover:text-neutral-950"
                }`}
            >
              <span className="relative">
                Browse All
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] transition-all duration-300 ${activeCategory === "All" || activeCategory === "Browse All"
                      ? "w-full bg-[#9BEC00]"
                      : "w-0 group-hover:w-full bg-neutral-900"
                    }`}
                />
              </span>
              <ArrowRight
                className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 ${activeCategory === "All" || activeCategory === "Browse All"
                    ? "text-[#9BEC00] translate-x-0.5"
                    : "text-neutral-400 group-hover:text-neutral-950"
                  }`}
              />
            </Link>

          </div>
        </div>



        {/* Project Cards Grid */}
        {displayedProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  globalDonationLink={globalDonationLink}
                  globalDonationQr={globalDonationQr}
                />
              ))}
            </div>

            {/* Bottom Browse All Navigation (Clean text-only without box badge) */}
            {hasMore && (
              <div className="flex flex-col items-center justify-center pt-10 pb-4">
                <Link
                  href="/category/all"
                  className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-900 hover:text-black transition-colors py-2 px-1 cursor-pointer"
                >
                  <span className="relative pb-0.5">
                    Browse All
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#9BEC00] transition-all duration-300" />
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-black group-hover:translate-x-1.5 transition-transform duration-200" />
                </Link>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-12 bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-800">
              {activeCategory ? `Belum ada produk di kategori ${activeCategory}` : "Belum ada produk yang ditemukan"}
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm">
              Klik &quot;Browse All&quot; untuk melihat seluruh koleksi produk digital yang tersedia.
            </p>
            <Link
              href="/category/all"
              className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition"
            >
              Browse All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
