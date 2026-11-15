"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteSettings } from "@/lib/types";
import { 
  Save, 
  Upload, 
  QrCode, 
  Globe, 
  User, 
  FileText, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";

interface SettingsFormProps {
  initialSettings: SiteSettings;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();

  const [siteTitle, setSiteTitle] = useState(initialSettings.site_title);
  const [siteDescription, setSiteDescription] = useState(initialSettings.site_description);
  const [authorName, setAuthorName] = useState(initialSettings.author_name);
  const [authorBio, setAuthorBio] = useState(initialSettings.author_bio);
  const [githubProfile, setGithubProfile] = useState(initialSettings.github_profile);
  const [globalDonationLink, setGlobalDonationLink] = useState(initialSettings.global_donation_link);
  const [globalDonationQr, setGlobalDonationQr] = useState(initialSettings.global_donation_qr);
  const [donationNote, setDonationNote] = useState(initialSettings.donation_note);

  const [uploadingQr, setUploadingQr] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    setUploadingQr(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setGlobalDonationQr(data.url);
      } else {
        alert(data.error || "Gagal mengunggah QR.");
      }
    } catch {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setUploadingQr(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_title: siteTitle,
          site_description: siteDescription,
          author_name: authorName,
          author_bio: authorBio,
          github_profile: githubProfile,
          global_donation_link: globalDonationLink,
          global_donation_qr: globalDonationQr,
          donation_note: donationNote,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        router.refresh();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Gagal menyimpan pengaturan.");
      }
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top action header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-neutral-950 tracking-tight">
            Pengaturan Situs & QR Donasi
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Kelola profil pengembang, tautan media sosial, serta QRIS dan Saweria default
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-[#9BEC00] hover:bg-[#88d400] text-black font-bold text-xs rounded-xl shadow-xs transition glow-green-sm disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Menyimpan..." : "Simpan Perubahan"}</span>
        </button>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 text-green-800 rounded-xl text-xs border border-green-200">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>Pengaturan berhasil disimpan dan langsung diterapkan ke website!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Kolom Kiri: Informasi Web & Pengembang */}
        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-neutral-700" />
              <span>Identitas Website</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Judul Website</label>
              <input
                type="text"
                required
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Deskripsi / Slogan Singkat</label>
              <textarea
                rows={3}
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl leading-relaxed"
              />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-neutral-700" />
              <span>Profil Pengembang (Author)</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Nama Pembuat</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Bio Ringkas</label>
              <textarea
                rows={3}
                value={authorBio}
                onChange={(e) => setAuthorBio(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>URL Profil GitHub</span>
              </label>
              <input
                type="url"
                value={githubProfile}
                onChange={(e) => setGithubProfile(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-mono"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pengaturan Global Donasi (QR & Link) */}
        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#9BEC00]" />
              <span>QR Donasi & Saweria Default</span>
            </h2>
            <p className="text-xs text-neutral-500">
              QR Donasi ini akan otomatis muncul pada tombol &quot;Donasi QR&quot; di Navbar, Footer, serta kartu proyek yang tidak memiliki QR khusus.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Tautan Donasi Utama (Saweria / Trakteer)</label>
              <input
                type="url"
                required
                placeholder="https://saweria.co/username"
                value={globalDonationLink}
                onChange={(e) => setGlobalDonationLink(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Catatan Donasi</label>
              <textarea
                rows={2}
                placeholder="Dukung kelanjutan proyek ini lewat Saweria..."
                value={donationNote}
                onChange={(e) => setDonationNote(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
              />
            </div>

            {/* QR Preview & Upload */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <label className="text-xs font-bold text-neutral-800">
                Gambar QR Code Khusus (QRIS / Gambar Barcode)
              </label>

              {globalDonationQr ? (
                <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="w-24 h-24 bg-white p-1 rounded-lg border border-neutral-200 shrink-0">
                    <img
                      src={globalDonationQr}
                      alt="Global Donation QR"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <p className="text-xs font-semibold text-neutral-800">Gambar QR Tersimpan</p>
                    <p className="text-[11px] text-neutral-400 font-mono truncate">{globalDonationQr}</p>
                    <button
                      type="button"
                      onClick={() => setGlobalDonationQr("")}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Hapus (Gunakan Auto-Generated QR dari Link)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
                  <p>
                    <strong className="text-neutral-900">QR Otomatis Aktif:</strong> QR code akan digenerate otomatis secara real-time dari tautan Saweria/Trakteer di atas. Anda juga bisa mengunggah file gambar QRIS resmi jika diinginkan.
                  </p>
                </div>
              )}

              <div className="pt-1">
                <label className="inline-flex items-center gap-1.5 py-2 px-3.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl cursor-pointer border border-neutral-200 transition">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingQr ? "Mengunggah..." : "Unggah Gambar QRIS (.png / .jpg)"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

