import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevShowroom — Showcase Website & Source Code Gratis",
  description:
    "Katalog sistem web, template, dan source code gratis berkualitas tinggi karya developer Indonesia. Dilengkapi live demo, akses kode GitHub, dan QR Donasi.",
  keywords: [
    "source code gratis",
    "open source indonesia",
    "website showcase",
    "free source code",
    "template website",
    "next.js showcase",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
