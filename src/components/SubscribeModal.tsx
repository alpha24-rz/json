"use client";

import React, { useState } from "react";
import { X, Mail, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Berhasil berlangganan!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Gagal menyimpan email.");
      }
    } catch {
      setStatus("error");
      setMessage("Terjadi kesalahan koneksi. Silakan coba lagi.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#9BEC00]/15 text-[#9BEC00] mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900">
            Dapatkan Notifikasi Proyek Baru
          </h3>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto">
            Daftarkan email Anda untuk menerima pemberitahuan setiap ada aplikasi web, template, atau source code gratis yang baru dirilis.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center p-6 bg-neutral-50 rounded-xl border border-[#9BEC00]/30 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#9BEC00] mx-auto" />
            <p className="text-sm font-semibold text-neutral-900">{message}</p>
            <p className="text-xs text-neutral-500">Kami tidak akan mengirimkan spam. Hanya rilis karya terbaik!</p>
            <button
              onClick={onClose}
              className="mt-3 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition"
            >
              Selesai
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#9BEC00] focus:ring-2 focus:ring-[#9BEC00]/20 transition"
                />
              </div>
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 p-2.5 bg-red-50 text-red-700 rounded-lg text-xs border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 px-4 bg-[#9BEC00] hover:bg-[#88d400] text-black font-bold rounded-xl shadow-md transition disabled:opacity-60 glow-green-sm text-sm"
            >
              {status === "loading" ? "Mendaftarkan..." : "Langganan Gratis"}
            </button>

            <p className="text-[11px] text-neutral-400 text-center">
              100% Gratis. Berhenti berlangganan kapan saja dengan 1 klik.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

