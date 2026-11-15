"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/types";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle,
  AlertCircle
} from "lucide-react";

interface AdminProjectTableProps {
  initialProjects: Project[];
}

export default function AdminProjectTable({ initialProjects }: AdminProjectTableProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = projects.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      } else {
        alert("Gagal menghapus proyek.");
      }
    } catch {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (id: string, field: "is_published" | "is_featured", currentValue: boolean) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, [field]: !currentValue }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, [field]: !currentValue } : p))
        );
        router.refresh();
      }
    } catch {
      alert("Gagal memperbarui status.");
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-xs overflow-hidden">
      
      {/* Table Header Controls */}
      <div className="p-5 border-b border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari dalam daftar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-neutral-900 transition"
          />
        </div>

        <Link
          href="/admin/projects/new"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#08CB00] hover:bg-[#07b500] text-black font-bold text-xs rounded-xl shadow-xs transition glow-green-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
        </Link>
      </div>

      {/* Projects Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200">
              <th className="py-3 px-4">Proyek</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Statistik</th>
              <th className="py-3 px-4 text-center">Unggulan</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <tr key={project.id} className="hover:bg-neutral-50/80 transition">
                  {/* Proyek */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                        <img
                          src={project.thumbnail_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=300&auto=format&fit=crop"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-neutral-900 truncate">
                          {project.title}
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate">
                          /{project.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Kategori */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 font-medium">
                      {project.category}
                    </span>
                  </td>

                  {/* Statistik */}
                  <td className="py-3.5 px-4 text-neutral-600">
                    <div className="flex items-center gap-3 font-medium">
                      <span className="flex items-center gap-1" title="Dilihat">
                        <Eye className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{project.views_count}</span>
                      </span>
                      <span className="flex items-center gap-1" title="Diunduh">
                        <Download className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{project.downloads_count}</span>
                      </span>
                    </div>
                  </td>

                  {/* Unggulan Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(project.id, "is_featured", project.is_featured)}
                      className={`p-1.5 rounded-lg border transition ${
                        project.is_featured
                          ? "bg-[#08CB00]/20 text-[#08CB00] border-[#08CB00]/50"
                          : "bg-neutral-100 text-neutral-400 border-neutral-200 hover:text-neutral-700"
                      }`}
                      title={project.is_featured ? "Hapus dari Unggulan" : "Jadikan Unggulan"}
                    >
                      <Sparkles className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  {/* Status Published Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(project.id, "is_published", project.is_published)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md font-bold text-[11px] transition ${
                        project.is_published
                          ? "bg-green-100 text-green-800"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {project.is_published ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                          <span>Publik</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition"
                        title="Buka Halaman Publik"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-1.5 text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-100 transition"
                        title="Edit Proyek"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        disabled={deletingId === project.id}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-neutral-400">
                  Belum ada proyek yang sesuai dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

