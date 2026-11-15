"use client";

import React, { useState, useMemo } from "react";
import { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";
import { Search, SlidersHorizontal, FolderOpen, X, Sparkles } from "lucide-react";

interface ProjectCatalogProps {
  initialProjects: Project[];
  categories: string[];
  globalDonationLink?: string;
  globalDonationQr?: string;
}

export default function ProjectCatalog({
  initialProjects,
  categories,
  globalDonationLink,
  globalDonationQr,
}: ProjectCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState<"featured" | "newest" | "views" | "downloads">("featured");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

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
        // Category filter
        if (selectedCategory !== "Semua" && project.category !== selectedCategory) {
          return false;
        }

        // Tech filter
        if (selectedTech && !project.tech_stack.includes(selectedTech)) {
          return false;
        }

        // Search query
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = project.title.toLowerCase().includes(q);
          const matchTagline = project.tagline.toLowerCase().includes(q);
          const matchDesc = project.description.toLowerCase().includes(q);
          const matchTech = project.tech_stack.some((t) => t.toLowerCase().includes(q));
          const matchCat = project.category.toLowerCase().includes(q);
          return matchTitle || matchTagline || matchDesc || matchTech || matchCat;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "featured") {
          if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === "newest") {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === "views") {
          return b.views_count - a.views_count;
        }
        if (sortBy === "downloads") {
          return b.downloads_count - a.downloads_count;
        }
        return 0;
      });
  }, [initialProjects, search, selectedCategory, selectedTech, sortBy]);

  return (
    <section id="catalog" className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9BEC00]/15 text-neutral-900 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#9BEC00] fill-[#9BEC00]" />
              <span>Eksplorasi Proyek Gratis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Katalog Website & Source Code
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-xl">
              Pilih sistem atau website yang Anda butuhkan. Semua dilengkapi live preview, repository GitHub, serta opsi donasi untuk mendukung kelanjutan proyek.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="text-xs font-medium text-neutral-500 bg-neutral-100 px-3.5 py-2 rounded-xl border border-neutral-200 self-start md:self-auto">
            Menampilkan <strong className="text-neutral-900 font-bold">{filteredProjects.length}</strong> dari {initialProjects.length} proyek
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari sistem, nama proyek, atau teknologi (misal: Next.js, Kasir, E-Commerce)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700">
                <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
                <span>Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-neutral-900 focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Unggulan</option>
                  <option value="newest">Terbaru</option>
                  <option value="views">Paling Banyak Dilihat</option>
                  <option value="downloads">Paling Banyak Diunduh</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-150 ${
                  selectedCategory === cat
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Tech Tag Filters (Optional pill toggle) */}
          {allTechList.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-neutral-500">
              <span className="font-medium mr-1">Filter Tech:</span>
              {allTechList.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                  className={`px-2 py-0.5 rounded-md border transition ${
                    selectedTech === tech
                      ? "bg-[#9BEC00] text-black font-bold border-[#9BEC00]"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {tech}
                </button>
              ))}
              {selectedTech && (
                <button
                  onClick={() => setSelectedTech(null)}
                  className="text-neutral-400 hover:text-red-600 underline ml-1"
                >
                  Reset tag
                </button>
              )}
            </div>
          )}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                globalDonationLink={globalDonationLink}
                globalDonationQr={globalDonationQr}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-12 bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-800">
              Tidak ada proyek yang sesuai
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm">
              Coba cari dengan kata kunci lain atau pilih kategori &quot;Semua&quot; untuk menampilkan seluruh proyek.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("Semua");
                setSelectedTech(null);
              }}
              className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

