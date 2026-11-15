import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import bcrypt from "bcryptjs";
import { Project, SiteSettings, Subscriber, AdminUser } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "showcase.db");

// Singleton connection in global scope for Next.js hot-reloads
const globalForDb = globalThis as unknown as { dbSync: DatabaseSync | undefined };

function getDatabase(): DatabaseSync {
  if (!globalForDb.dbSync) {
    const db = new DatabaseSync(DB_PATH);
    initializeSchema(db);
    globalForDb.dbSync = db;
  }
  return globalForDb.dbSync;
}

function initializeSchema(db: DatabaseSync) {
  // 1. Projects Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      content_markdown TEXT NOT NULL,
      category TEXT NOT NULL,
      tech_stack TEXT NOT NULL,
      thumbnail_url TEXT NOT NULL,
      demo_url TEXT,
      github_url TEXT,
      download_url TEXT,
      donation_qr_url TEXT,
      donation_link TEXT,
      is_featured INTEGER NOT NULL DEFAULT 0,
      is_published INTEGER NOT NULL DEFAULT 1,
      views_count INTEGER NOT NULL DEFAULT 0,
      downloads_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // 2. Site Settings Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY DEFAULT 'site',
      site_title TEXT NOT NULL,
      site_description TEXT NOT NULL,
      author_name TEXT NOT NULL,
      author_bio TEXT NOT NULL,
      github_profile TEXT,
      global_donation_qr TEXT,
      global_donation_link TEXT,
      donation_note TEXT
    );
  `);

  // 3. Subscribers Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  // 4. Admin Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  // Seed default site settings if not present
  const checkSettings = db.prepare("SELECT id FROM site_settings WHERE id = 'site'").get();
  if (!checkSettings) {
    const insertSettings = db.prepare(`
      INSERT INTO site_settings (
        id, site_title, site_description, author_name, author_bio,
        github_profile, global_donation_qr, global_donation_link, donation_note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertSettings.run(
      "site",
      "Json",
      "Katalog aplikasi web, template, dan sistem open source gratis karya developer Indonesia. Anda bebas mencoba live demo dan mengunduh seluruh source code secara cuma-cuma.",
      "Developer Showcase",
      "Membangun berbagai sistem web dan aplikasi siap pakai untuk komunitas developer dan publik secara 100% gratis.",
      "https://github.com",
      "",
      "https://saweria.co/demo",
      "Dukung kelanjutan pengembangan proyek dan server dengan berdonasi via QRIS / Saweria. Terima kasih atas apresiasinya!"
    );
  }

  // Seed default admin user (admin / admin123) if empty
  const checkAdmin = db.prepare("SELECT id FROM admin_users LIMIT 1").get();
  if (!checkAdmin) {
    const insertAdmin = db.prepare(`
      INSERT INTO admin_users (id, username, password_hash, created_at)
      VALUES (?, ?, ?, ?)
    `);
    const passwordHash = bcrypt.hashSync("admin123", 10);
    insertAdmin.run("admin-1", "admin", passwordHash, new Date().toISOString());
  }

  // Seed initial sample projects if table is empty
  const checkProjects = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
  if (checkProjects && checkProjects.count === 0) {
    seedInitialProjects(db);
  }
}

function seedInitialProjects(db: DatabaseSync) {
  const insertProject = db.prepare(`
    INSERT INTO projects (
      id, title, slug, tagline, description, content_markdown,
      category, tech_stack, thumbnail_url, demo_url, github_url,
      download_url, donation_qr_url, donation_link,
      is_featured, is_published, views_count, downloads_count,
      created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?
    )
  `);

  const now = new Date().toISOString();

  const samples = [
    {
      id: "proj-1",
      title: "TokoKatalog — Minimalist E-Commerce Platform",
      slug: "tokokatalog-minimalist-ecommerce",
      tagline: "Platform e-commerce modern dengan katalog produk instan dan direct checkout via WhatsApp.",
      description: "TokoKatalog adalah sistem toko online instan tanpa ribet untuk UMKM dan brand lokal. Dilengkapi fitur filter kategori, pencarian real-time, cart sederhana, serta checkout langsung ke nomor WhatsApp penjual dengan format pesan terstruktur otomatis.",
      content_markdown: `## Fitur Unggulan
- **Katalog Produk Cepat:** Menggunakan Next.js App Router dengan caching optimal.
- **Cart & WhatsApp Checkout:** Pelanggan bisa memilih varian produk lalu checkout langsung ke WhatsApp penjual.
- **Admin Mini:** Mengelola daftar produk, harga diskon, dan stok secara mudah.
- **SEO Ready:** OpenGraph metadata otomatis untuk setiap produk saat dibagikan ke media sosial.

## Panduan Instalasi Lokal
1. Clone repository:
   \`\`\`bash
   git clone https://github.com/example/tokokatalog.git
   cd tokokatalog
   \`\`\`
2. Pasang dependensi:
   \`\`\`bash
   npm install
   \`\`\`
3. Konfigurasi file \`.env\`:
   \`\`\`env
   NEXT_PUBLIC_WHATSAPP_NUMBER="6281234567890"
   \`\`\`
4. Jalankan server lokal:
   \`\`\`bash
   npm run dev
   \`\`\`
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.`,
      category: "E-Commerce",
      tech_stack: JSON.stringify(["Next.js 15", "Tailwind CSS", "TypeScript", "SQLite", "Lucide Icons"]),
      thumbnail_url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
      demo_url: "https://demo.example.com/tokokatalog",
      github_url: "https://github.com/example/tokokatalog",
      download_url: "https://github.com/example/tokokatalog/archive/refs/heads/main.zip",
      donation_qr_url: "",
      donation_link: "https://saweria.co/demo",
      is_featured: 1,
      is_published: 1,
      views_count: 142,
      downloads_count: 48,
    },
    {
      id: "proj-2",
      title: "KasirKita — POS & Inventory Management UMKM",
      slug: "kasirkita-pos-inventory-umkm",
      tagline: "Aplikasi kasir web responsif dengan manajemen stok dan cetak struk thermal.",
      description: "KasirKita dirancang untuk pemilik usaha ritel, kedai kopi, dan toko kelontong. Memiliki antarmuka kasir cepat dengan shortcut keyboard, pemindai barcode kamera, tracking stok otomatis, dan cetak struk nota belanja.",
      content_markdown: `## Fitur KasirKita
- **Point of Sale Cepat:** Input item cepat, diskon per item atau per transaksi, pembayaran tunai & QRIS.
- **Cetak Struk:** Kompatibel dengan printer thermal bluetooth & USB (ukuran 58mm & 80mm).
- **Laporan Penjualan:** Rekap omzet harian, mingguan, dan produk terlaris.
- **Offline Resilient:** Menyimpan data sementara di IndexedDB saat koneksi internet terputus.

## Cara Menjalankan
\`\`\`bash
git clone https://github.com/example/kasirkita.git
cd kasirkita
npm install
npm run dev
\`\`\``,
      category: "System & Dashboard",
      tech_stack: JSON.stringify(["React", "TypeScript", "Tailwind CSS", "IndexedDB", "Node.js"]),
      thumbnail_url: "https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=1200&auto=format&fit=crop",
      demo_url: "https://demo.example.com/kasirkita",
      github_url: "https://github.com/example/kasirkita",
      download_url: "https://github.com/example/kasirkita/archive/refs/heads/main.zip",
      donation_qr_url: "",
      donation_link: "https://saweria.co/demo",
      is_featured: 1,
      is_published: 1,
      views_count: 215,
      downloads_count: 89,
    },
    {
      id: "proj-3",
      title: "DocuFast — API & Technical Docs Template",
      slug: "docufast-technical-docs-template",
      tagline: "Sistem dokumentasi teknis super cepat berbasis Markdown/MDX dengan pencarian instan.",
      description: "DocuFast adalah template dokumentasi kode dan manual teknis yang dirancang untuk performa tertinggi. Dilengkapi navigasi bersarang, code block dengan tombol salin otomatis, diagram visual, dan dukungan dark/light mode.",
      content_markdown: `## Keunggulan DocuFast
- **Markdown / MDX:** Tulis dokumentasi langsung dengan format Markdown standar.
- **Full-text Search:** Pencarian instan berbasis client-side indexing.
- **Syntax Highlighting:** Pewarnaan sintaks rapi untuk 30+ bahasa pemrograman.

## Setup Cepat
\`\`\`bash
git clone https://github.com/example/docufast.git
cd docufast
npm install
npm run dev
\`\`\``,
      category: "Developer Tools",
      tech_stack: JSON.stringify(["Next.js", "MDX", "Tailwind CSS", "TypeScript"]),
      thumbnail_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
      demo_url: "https://demo.example.com/docufast",
      github_url: "https://github.com/example/docufast",
      download_url: "https://github.com/example/docufast/archive/refs/heads/main.zip",
      donation_qr_url: "",
      donation_link: "https://saweria.co/demo",
      is_featured: 0,
      is_published: 1,
      views_count: 98,
      downloads_count: 32,
    },
    {
      id: "proj-4",
      title: "AdminPulse — Clean SaaS & Analytics Dashboard",
      slug: "adminpulse-saas-analytics-dashboard",
      tagline: "Template dashboard admin modern dengan visualisasi grafik metrik dan manajemen user.",
      description: "AdminPulse adalah starter template dashboard admin berbasis Tailwind CSS dengan komponen modular. Menyediakan kartu metrik KPI, grafik pendapatan interaktif, tabel pengguna dengan paginasi, dan formulir pengaturan sistem.",
      content_markdown: `## Fitur AdminPulse
- **Dashboard Ringkas:** KPI cards dengan indikator tren naik/turun.
- **Data Visualizations:** Chart interaktif untuk analitik trafik dan transaksi.
- **Tabel Data:** Lengkap dengan sorting, search, dan filter status.
- **Fully Responsive:** Tampilan rapi dari layar HP hingga monitor ultra-wide.

## Quickstart
\`\`\`bash
git clone https://github.com/example/adminpulse.git
cd adminpulse
npm install
npm run dev
\`\`\``,
      category: "System & Dashboard",
      tech_stack: JSON.stringify(["Next.js 15", "Tailwind CSS", "Chart.js", "Lucide Icons"]),
      thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      demo_url: "https://demo.example.com/adminpulse",
      github_url: "https://github.com/example/adminpulse",
      download_url: "https://github.com/example/adminpulse/archive/refs/heads/main.zip",
      donation_qr_url: "",
      donation_link: "https://saweria.co/demo",
      is_featured: 1,
      is_published: 1,
      views_count: 304,
      downloads_count: 116,
    },
    {
      id: "proj-5",
      title: "NovaLaunch — High-Converting Startup Landing Page",
      slug: "novalaunch-startup-landing-page",
      tagline: "Template landing page modern dengan animasi halus, pricing table, dan formulir lead capture.",
      description: "NovaLaunch dirancang khusus untuk peluncuran produk digital, startup, dan aplikasi mobile. Memiliki desain minimalist monochrome yang elegan, optimized score 100 di Google Lighthouse, dan mudah dikustomisasi.",
      content_markdown: `## Fitur NovaLaunch
- Responsive Design
- Clean Tailwind Typography
- Ready for Next.js App Router`,
      category: "Landing Page",
      tech_stack: JSON.stringify(["Next.js 15", "Tailwind CSS", "TypeScript", "Framer Motion"]),
      thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      demo_url: "https://demo.example.com/novalaunch",
      github_url: "https://github.com/example/novalaunch",
      download_url: "https://github.com/example/novalaunch/archive/refs/heads/main.zip",
      donation_qr_url: "",
      donation_link: "https://saweria.co/demo",
      is_featured: 1,
      is_published: 1,
      views_count: 195,
      downloads_count: 62,
    },
    {
      id: "proj-6",
      title: "DocuRAG — Chatbot AI Tanya Jawab Dokumen PDF & File",
      slug: "docurag-chatbot-ai-rag",
      tagline: "Sistem RAG (Retrieval-Augmented Generation) lokal untuk chat interaktif dengan file PDF/dokumen Anda.",
      description: "DocuRAG memungkinkan pengguna mengunggah dokumen (PDF, TXT, DOCX) lalu mengajukan pertanyaan langsung dengan jawaban akurat berdasarkan isi dokumen beserta sitasi nomor halaman secara real-time.",
      content_markdown: `## Fitur DocuRAG
- RAG Pipeline with ChromaDB
- Multi-document Parsing
- Source Citations & Highlight`,
      category: "AI & Chatbot RAG",
      tech_stack: JSON.stringify(["Python", "LangChain", "FastAPI", "ChromaDB", "React"]),
      thumbnail_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
      demo_url: "https://demo.example.com/docurag",
      github_url: "https://github.com/example/docurag",
      download_url: "https://github.com/example/docurag/archive/refs/heads/main.zip",
      donation_qr_url: "",
      donation_link: "https://saweria.co/demo",
      is_featured: 1,
      is_published: 1,
      views_count: 380,
      downloads_count: 145,
    },
    {
      id: "proj-7",
      title: "FinTrack Pro — Template Excel Keuangan, Cash Flow & Budgeting UMKM",
      slug: "fintrack-pro-template-excel-keuangan",
      tagline: "Template spreadsheet otomatis untuk pencatatan arus kas, laba rugi, dan analitik keuangan bisnis.",
      description: "Template Microsoft Excel & Google Sheets siap pakai yang dirancang dengan formula otomatis, grafik visual ringkasan bulanan, pelacakan pengeluaran kategori, serta kalkulator margin laba tanpa perlu coding.",
      content_markdown: `## Fitur FinTrack Pro
- Dashboard Keuangan Otomatis
- Rekap Laba/Rugi Bulanan
- Formula Siap Pakai (No VBA needed)`,
      category: "Excel & Spreadsheet",
      tech_stack: JSON.stringify(["Microsoft Excel", "Google Sheets", "Financial Modeling"]),
      thumbnail_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
      demo_url: "https://docs.google.com/spreadsheets/demo",
      github_url: "https://github.com/example/fintrack-excel",
      download_url: "https://example.com/downloads/fintrack-pro.xlsx",
      donation_qr_url: "",
      donation_link: "https://saweria.co/demo",
      is_featured: 0,
      is_published: 1,
      views_count: 310,
      downloads_count: 158,
    }
  ];

  for (const p of samples) {
    insertProject.run(
      p.id, p.title, p.slug, p.tagline, p.description, p.content_markdown,
      p.category, p.tech_stack, p.thumbnail_url, p.demo_url, p.github_url,
      p.download_url, p.donation_qr_url, p.donation_link,
      p.is_featured, p.is_published, p.views_count, p.downloads_count,
      now, now
    );
  }
}

// ==========================================
// Data Access Helper Functions
// ==========================================

export function formatProjectRow(row: any): Project {
  let techStack: string[] = [];
  try {
    techStack = typeof row.tech_stack === "string" ? JSON.parse(row.tech_stack) : row.tech_stack;
  } catch {
    techStack = [];
  }

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    tagline: row.tagline || "",
    description: row.description || "",
    content_markdown: row.content_markdown || "",
    category: row.category || "General",
    tech_stack: techStack,
    thumbnail_url: row.thumbnail_url || "",
    demo_url: row.demo_url || "",
    github_url: row.github_url || "",
    download_url: row.download_url || "",
    donation_qr_url: row.donation_qr_url || "",
    donation_link: row.donation_link || "",
    is_featured: Boolean(row.is_featured),
    is_published: Boolean(row.is_published),
    views_count: Number(row.views_count || 0),
    downloads_count: Number(row.downloads_count || 0),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function getAllProjects(options?: { onlyPublished?: boolean; category?: string; search?: string }): Project[] {
  const db = getDatabase();
  let query = "SELECT * FROM projects WHERE 1=1";
  const params: any[] = [];

  if (options?.onlyPublished) {
    query += " AND is_published = 1";
  }

  if (options?.category && options.category !== "Semua") {
    query += " AND category = ?";
    params.push(options.category);
  }

  if (options?.search) {
    query += " AND (title LIKE ? OR description LIKE ? OR tech_stack LIKE ?)";
    const term = `%${options.search}%`;
    params.push(term, term, term);
  }

  query += " ORDER BY is_featured DESC, created_at DESC";

  const rows = db.prepare(query).all(...params);
  return rows.map(formatProjectRow);
}

export function getProjectBySlug(slug: string): Project | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM projects WHERE slug = ?").get(slug);
  if (!row) return null;
  return formatProjectRow(row);
}

export function getProjectById(id: string): Project | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
  if (!row) return null;
  return formatProjectRow(row);
}

export const DEFAULT_CATEGORIES = [
  "Landing Page",
  "E-Commerce",
  "AI & Chatbot RAG",
  "Excel & Spreadsheet",
  "System & Dashboard",
  "Developer Tools",
];

export function getAllCategories(): string[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT DISTINCT category FROM projects WHERE is_published = 1").all() as { category: string }[];
  const dbCategories = rows.map(r => r.category).filter(Boolean);
  const combined = Array.from(new Set([...DEFAULT_CATEGORIES, ...dbCategories]));
  return ["Semua", ...combined];
}

export function createProject(data: Omit<Project, "id" | "views_count" | "downloads_count" | "created_at" | "updated_at">): Project {
  const db = getDatabase();
  const id = "proj-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  const now = new Date().toISOString();

  const insert = db.prepare(`
    INSERT INTO projects (
      id, title, slug, tagline, description, content_markdown,
      category, tech_stack, thumbnail_url, demo_url, github_url,
      download_url, donation_qr_url, donation_link,
      is_featured, is_published, views_count, downloads_count,
      created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?
    )
  `);

  insert.run(
    id,
    data.title,
    data.slug,
    data.tagline,
    data.description,
    data.content_markdown,
    data.category,
    JSON.stringify(data.tech_stack),
    data.thumbnail_url,
    data.demo_url,
    data.github_url,
    data.download_url,
    data.donation_qr_url,
    data.donation_link,
    data.is_featured ? 1 : 0,
    data.is_published ? 1 : 0,
    0,
    0,
    now,
    now
  );

  return getProjectById(id)!;
}

export function updateProject(id: string, data: Partial<Project>): Project | null {
  const db = getDatabase();
  const existing = getProjectById(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  const updated = {
    ...existing,
    ...data,
    updated_at: now,
  };

  const stmt = db.prepare(`
    UPDATE projects SET
      title = ?,
      slug = ?,
      tagline = ?,
      description = ?,
      content_markdown = ?,
      category = ?,
      tech_stack = ?,
      thumbnail_url = ?,
      demo_url = ?,
      github_url = ?,
      download_url = ?,
      donation_qr_url = ?,
      donation_link = ?,
      is_featured = ?,
      is_published = ?,
      updated_at = ?
    WHERE id = ?
  `);

  stmt.run(
    updated.title,
    updated.slug,
    updated.tagline,
    updated.description,
    updated.content_markdown,
    updated.category,
    JSON.stringify(updated.tech_stack),
    updated.thumbnail_url,
    updated.demo_url,
    updated.github_url,
    updated.download_url,
    updated.donation_qr_url,
    updated.donation_link,
    updated.is_featured ? 1 : 0,
    updated.is_published ? 1 : 0,
    now,
    id
  );

  return getProjectById(id);
}

export function deleteProject(id: string): boolean {
  const db = getDatabase();
  const stmt = db.prepare("DELETE FROM projects WHERE id = ?");
  stmt.run(id);
  return true;
}

export function incrementProjectViews(slug: string) {
  const db = getDatabase();
  db.prepare("UPDATE projects SET views_count = views_count + 1 WHERE slug = ?").run(slug);
}

export function incrementProjectDownloads(slug: string) {
  const db = getDatabase();
  db.prepare("UPDATE projects SET downloads_count = downloads_count + 1 WHERE slug = ?").run(slug);
}

export function getSiteSettings(): SiteSettings {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM site_settings WHERE id = 'site'").get() as any;
  if (!row) {
    return {
      id: "site",
      site_title: "DevHub Showcase",
      site_description: "Showcase Website & Source Code Gratis",
      author_name: "Developer",
      author_bio: "Fullstack Web Developer",
      github_profile: "https://github.com",
      global_donation_qr: "",
      global_donation_link: "https://saweria.co/demo",
      donation_note: "Dukung karya open source ini!",
    };
  }
  return {
    id: row.id,
    site_title: row.site_title,
    site_description: row.site_description,
    author_name: row.author_name,
    author_bio: row.author_bio,
    github_profile: row.github_profile || "",
    global_donation_qr: row.global_donation_qr || "",
    global_donation_link: row.global_donation_link || "",
    donation_note: row.donation_note || "",
  };
}

export function updateSiteSettings(data: Partial<SiteSettings>): SiteSettings {
  const db = getDatabase();
  const current = getSiteSettings();
  const updated = { ...current, ...data };

  db.prepare(`
    UPDATE site_settings SET
      site_title = ?,
      site_description = ?,
      author_name = ?,
      author_bio = ?,
      github_profile = ?,
      global_donation_qr = ?,
      global_donation_link = ?,
      donation_note = ?
    WHERE id = 'site'
  `).run(
    updated.site_title,
    updated.site_description,
    updated.author_name,
    updated.author_bio,
    updated.github_profile,
    updated.global_donation_qr,
    updated.global_donation_link,
    updated.donation_note
  );

  return getSiteSettings();
}

export function addSubscriber(email: string): { success: boolean; message: string } {
  const db = getDatabase();
  const id = "sub-" + Date.now().toString(36);
  const now = new Date().toISOString();

  try {
    db.prepare("INSERT INTO subscribers (id, email, created_at) VALUES (?, ?, ?)").run(id, email.toLowerCase().trim(), now);
    return { success: true, message: "Terima kasih telah berlangganan info update proyek terbaru!" };
  } catch (err: any) {
    if (err?.message?.includes("UNIQUE constraint")) {
      return { success: true, message: "Email Anda sudah terdaftar di newsletter kami." };
    }
    return { success: false, message: "Gagal menyimpan email. Silakan coba lagi nanti." };
  }
}

export function getSubscribersCount(): number {
  const db = getDatabase();
  const row = db.prepare("SELECT COUNT(*) as count FROM subscribers").get() as { count: number };
  return row ? row.count : 0;
}

export function getAdminUser(username: string): AdminUser | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM admin_users WHERE username = ?").get(username) as any;
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    password_hash: row.password_hash,
    created_at: row.created_at,
  };
}

