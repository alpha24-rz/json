"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Project } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { 
  ArrowLeft, 
  Upload, 
  Sparkles, 
  Save, 
  AlertCircle, 
  Check, 
  Globe, 
  Download, 
  QrCode, 
  FileText,
  Tag
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";

interface ProjectFormProps {
  initialData?: Project | null;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "Fullstack Web");
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>(initialData?.tech_stack || ["Next.js", "Tailwind CSS", "TypeScript"]);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url || "");
  const [demoUrl, setDemoUrl] = useState(initialData?.demo_url || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.github_url || "");
  const [downloadUrl, setDownloadUrl] = useState(initialData?.download_url || "");
  const [donationQrUrl, setDonationQrUrl] = useState(initialData?.donation_qr_url || "");
  const [donationLink, setDonationLink] = useState(initialData?.donation_link || "");
  const [contentMarkdown, setContentMarkdown] = useState(initialData?.content_markdown || "");
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false);
  const [isPublished, setIsPublished] = useState(initialData?.is_published !== undefined ? initialData.is_published : true);

  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingQr, setUploadingQr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    if (!techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
    }
    setTechInput("");
  };

  const handleRemoveTech = (t: string) => {
    setTechStack(techStack.filter((item) => item !== t));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "thumb" | "qr") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    if (target === "thumb") setUploadingThumb(true);
    else setUploadingQr(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (target === "thumb") setThumbnailUrl(data.url);
        else setDonationQrUrl(data.url);
      } else {
        alert(data.error || "Gagal mengunggah gambar.");
      }
    } catch {
      alert("Terjadi kesalahan saat mengunggah file.");
    } finally {
      if (target === "thumb") setUploadingThumb(false);
      else setUploadingQr(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Judul proyek tidak boleh kosong.");
      return;
    }

    setSubmitting(true);

    const payload = {
      id: initialData?.id,
      title: title.trim(),
      slug: slugify(slug || title),
      tagline: tagline.trim(),
      description: description.trim(),
      content_markdown: contentMarkdown.trim(),
      category,
      tech_stack: techStack,
      thumbnail_url: thumbnailUrl.trim(),
      demo_url: demoUrl.trim(),
      github_url: githubUrl.trim(),
      download_url: downloadUrl.trim(),
      donation_qr_url: donationQrUrl.trim(),
      donation_link: donationLink.trim(),
      is_featured: isFeatured,
      is_published: isPublished,
    };

    try {
      const endpoint = "/api/projects";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal menyimpan proyek.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan koneksi saat menyimpan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 bg-white border border-neutral-200 rounded-xl text-neutral-600 hover:text-neutral-950 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
              {isEdit ? "Edit Proyek & Source Code" : "Tambah Proyek Baru"}
            </h1>
            <p className="text-xs text-neutral-500">
              Lengkapi data proyek, live demo, repository GitHub, dan QR Donasi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin"
            className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#9BEC00] hover:bg-[#88d400] text-black font-bold text-xs rounded-xl shadow-xs transition glow-green-sm disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Menyimpan..." : "Simpan Proyek"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Main Info & Guide */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Informasi Dasar */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-700" />
              <span>Informasi Pokok Proyek</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Judul Proyek *</label>
              <input
                type="text"
                required
                placeholder="Contoh: TokoKatalog — Minimalist E-Commerce"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-neutral-900 transition"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-800">Slug URL *</label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-[11px] text-neutral-500 hover:text-neutral-900"
                >
                  {autoSlug ? "Kustomisasi Manual" : "Otomatis dari Judul"}
                </button>
              </div>
              <input
                type="text"
                required
                placeholder="tokokatalog-minimalist-ecommerce"
                value={slug}
                disabled={autoSlug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden font-mono disabled:opacity-75 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Tagline Ringkas (1 Kalimat)</label>
              <input
                type="text"
                placeholder="Platform e-commerce instan tanpa ribet dengan checkout WhatsApp..."
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Deskripsi Lengkap</label>
              <textarea
                rows={4}
                placeholder="Jelaskan fitur-fitur utama, use case, dan keunggulan sistem yang dibuat..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden transition leading-relaxed"
              />
            </div>
          </div>

          {/* Card 2: Link Live Demo & Source Code */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-neutral-700" />
              <span>Tautan Demo & Distribusi Kode Sumber</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <span>URL Live Demo</span>
              </label>
              <input
                type="url"
                placeholder="https://demo.example.com"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden font-mono transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-neutral-500" />
                <span>URL Repository GitHub (Publik)</span>
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/project"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden font-mono transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-neutral-500" />
                <span>URL Download Langsung File .ZIP (Opsional)</span>
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/project/archive/refs/heads/main.zip"
                value={downloadUrl}
                onChange={(e) => setDownloadUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden font-mono transition"
              />
            </div>
          </div>

          {/* Card 3: Panduan Instalasi / Markdown */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-700" />
                <span>Panduan Instalasi & Penggunaan (Markdown)</span>
              </h2>
              <span className="text-[11px] text-neutral-400 font-mono">Dukungan format Markdown</span>
            </div>
            <textarea
              rows={8}
              placeholder={`## Cara Menjalankan
1. Clone repo: git clone https://github.com/...
2. Install: npm install
3. Jalankan: npm run dev`}
              value={contentMarkdown}
              onChange={(e) => setContentMarkdown(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-mono bg-neutral-950 text-neutral-100 rounded-xl focus:outline-hidden leading-relaxed"
            />
          </div>
        </div>

        {/* Right 1 Col: Settings, Tech Stack & QR Donasi */}
        <div className="space-y-6">
          
          {/* Card: Status & Publikasi */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
              Status & Visibilitas
            </h3>

            <label className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-100 transition">
              <div>
                <div className="text-xs font-bold text-neutral-900">Publikasikan</div>
                <div className="text-[11px] text-neutral-500">Tampil di katalog pengunjung</div>
              </div>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 accent-[#9BEC00] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-100 transition">
              <div>
                <div className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#9BEC00]" />
                  <span>Proyek Unggulan</span>
                </div>
                <div className="text-[11px] text-neutral-500">Tampil di urutan teratas</div>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#9BEC00] rounded cursor-pointer"
              />
            </label>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-neutral-800">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden font-medium cursor-pointer"
              >
                <option value="Fullstack Web">Fullstack Web</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="POS & Bisnis">POS & Bisnis</option>
                <option value="Dashboard & SaaS">Dashboard & SaaS</option>
                <option value="Developer Tools">Developer Tools</option>
                <option value="Mobile App / Web">Mobile App / Web</option>
                <option value="Landing Page">Landing Page</option>
                <option value="API / Backend">API / Backend</option>
              </select>
            </div>
          </div>

          {/* Card: Gambar Thumbnail */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
              Thumbnail Proyek
            </h3>

            {thumbnailUrl && (
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={thumbnailUrl}
                  alt="Preview Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">URL Gambar</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-mono"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl cursor-pointer border border-neutral-200 transition">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingThumb ? "Mengunggah..." : "Upload File Gambar"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "thumb")}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Card: Tech Stack Tags */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-neutral-700" />
              <span>Tech Stack</span>
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Contoh: Next.js"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3 py-1.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-black"
              >
                Tambah
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="text-neutral-400 hover:text-red-500 font-bold ml-0.5"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Card: Kustomisasi QR Donasi Proyek */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#9BEC00]" />
              <span>QR Donasi Proyek (Opsional)</span>
            </h3>
            <p className="text-[11px] text-neutral-500">
              Kosongkan jika ingin menggunakan QR Donasi & link Saweria default yang ada di menu Pengaturan.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Link Donasi Khusus</label>
              <input
                type="url"
                placeholder="https://saweria.co/demo-khusus"
                value={donationLink}
                onChange={(e) => setDonationLink(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">URL Gambar QR Donasi</label>
              <input
                type="text"
                placeholder="/uploads/my-qris.png"
                value={donationQrUrl}
                onChange={(e) => setDonationQrUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-mono"
              />
            </div>

            <label className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl cursor-pointer border border-neutral-200 transition">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingQr ? "Mengunggah..." : "Upload Gambar QR"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "qr")}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

