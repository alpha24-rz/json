"use client";

import React, { useState, useMemo } from "react";
import { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";
import { 
  SlidersHorizontal, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp, 
  Layout, 
  ShoppingBag, 
  FileSpreadsheet, 
  LayoutGrid 
} from "lucide-react";

interface ProjectCatalogProps {
  initialProjects: Project[];
  categories: string[];
  globalDonationLink?: string;
  globalDonationQr?: string;
}

const INITIAL_COUNT = 3;

const CATEGORY_TABS = [
  { id: "Landing Page", label: "Landing Page", icon: Layout },
  { id: "E-Commerce", label: "E-Commerce", icon: ShoppingBag },
  { id: "Excel & Spreadsheet", label: "Excel & Spreadsheet", icon: FileSpreadsheet },
  { id: "Browse All", label: "Browse All", icon: LayoutGrid },
];

export default function ProjectCatalog({
  initialProjects,
  globalDonationLink,
  globalDonationQr,
}: ProjectCatalogProps) {
  // Start with Landing Page as requested
  const [selectedCategory, setSelectedCategory] = useState("Landing Page");
  const [sortBy, setSortBy] = useState<"featured" | "newest" | "views" | "downloads">("featured");
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
        // Category filter: "Browse All" shows all projects
        if (selectedCategory !== "Browse All" && selectedCategory !== "Semua") {
          if (project.category !== selectedCategory) {
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
  }, [initialProjects, selectedCategory, selectedTech, sortBy]);

  // Projects to display (Curated limit)
  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const hasMore = filteredProjects.length > visibleCount;

  return (
    <section id="catalog" className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Discover Something Great
          </h2>
        </div>

        {/* Minimal Category & Sorting Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
          
          {/* Category Filter Pills with Icons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              const count = tab.id === "Browse All"
                ? initialProjects.length
                : initialProjects.filter((p) => p.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(tab.id);
                    setSelectedTech(null);
                    setVisibleCount(INITIAL_COUNT);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:text-neutral-950 hover:bg-neutral-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#9BEC00]" : "text-neutral-400"}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
              <span>Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e: any) => {
                  setSortBy(e.target.value);
                  setVisibleCount(INITIAL_COUNT);
                }}
                className="bg-transparent font-bold text-neutral-900 focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Unggulan</option>
                <option value="newest">Terbaru</option>
                <option value="views">Paling Populer</option>
                <option value="downloads">Paling Banyak Diunduh</option>
              </select>
            </div>
          </div>
        </div>

        {/* Optional Quick Tech Tags */}
        {allTechList.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-neutral-500 -mt-3">
            <span className="font-medium mr-1">Filter Tech:</span>
            {allTechList.map((tech) => (
              <button
                key={tech}
                onClick={() => {
                  setSelectedTech(selectedTech === tech ? null : tech);
                  setVisibleCount(INITIAL_COUNT);
                }}
                className={`px-2.5 py-0.5 rounded-lg border transition ${
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
                onClick={() => {
                  setSelectedTech(null);
                  setVisibleCount(INITIAL_COUNT);
                }}
                className="text-neutral-400 hover:text-red-600 underline ml-1"
              >
                Reset tag
              </button>
            )}
          </div>
        )}

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

            {/* Load More / Expand Action */}
            {hasMore ? (
              <div className="flex flex-col items-center justify-center pt-8 pb-4">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-950 font-bold text-sm shadow-xs hover:shadow-md transition-all duration-200 group"
                >
                  <span>Lihat Produk Lainnya</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-semibold group-hover:bg-[#9BEC00] group-hover:text-black transition">
                    +{filteredProjects.length - visibleCount}
                  </span>
                  <ChevronDown className="w-4 h-4 text-neutral-600 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <p className="text-xs text-neutral-400 mt-2">
                  Menampilkan {displayedProjects.length} dari {filteredProjects.length} produk di kategori ini
                </p>
              </div>
            ) : filteredProjects.length > INITIAL_COUNT ? (
              <div className="flex flex-col items-center justify-center pt-8 pb-4">
                <button
                  onClick={() => {
                    setVisibleCount(INITIAL_COUNT);
                    const el = document.getElementById("catalog");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-600 text-xs font-semibold transition"
                >
                  <span>Tampilkan Lebih Sedikit</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-12 bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-800">
              Belum ada produk di kategori {selectedCategory}
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm">
              Klik &quot;Browse All&quot; untuk melihat seluruh koleksi produk digital yang tersedia.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Browse All");
                setSelectedTech(null);
                setVisibleCount(INITIAL_COUNT);
              }}
              className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition"
            >
              Browse All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
