import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="id" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,700&family=Google+Sans+Text:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
