# DevShowroom — Platform Showcase Website & Source Code Gratis

Platform modern dan elegan untuk menampilkan portofolio sistem, aplikasi web, dan source code gratis berkualitas tinggi karya developer Indonesia. Dilengkapi fitur live preview, tautan repository GitHub, serta QR Donasi (QRIS / Saweria) interaktif.

---

## 🎨 Desain & Identitas Visual
* **Palet Warna:**
  * Latar Belakang: **Putih Bersih** (`#FFFFFF` / `#FAFAFA`)
  * Tipografi & Aksen Sekunder: **Hitam Pekat** (`#0A0A0A`)
  * Tombol Aksi Kunci / Highlight: **Hijau Elektrik (`#08CB00`)** (Subscribe, QR Donasi, Unduh Source Code)

---

## 🚀 Fitur Utama

### 1. Sisi Pengunjung (Public Facing)
* **Katalog Interaktif:**
  * Pencarian real-time berdasarkan judul, deskripsi, atau teknologi.
  * Filter kategori (*E-Commerce*, *POS & Bisnis*, *Dashboard & SaaS*, *Developer Tools*, dll).
  * Filter tag teknologi (*Next.js*, *Tailwind CSS*, *React*, *TypeScript*, dll).
  * Pengurutan (*Unggulan*, *Terbaru*, *Paling Banyak Dilihat*, *Paling Banyak Diunduh*).
* **Kartu Proyek (Project Card):**
  * Thumbnail visual responsif dengan badge kategori dan status gratis.
  * **Tombol Live Demo:** Akses preview aplikasi secara instan.
  * **Tombol GitHub:** Menuju repository kode sumber publik.
  * **Tombol QR Donasi (`#08CB00`):** Membuka modal interaktif berisi kode QR (QRIS / Saweria) yang digenerate otomatis atau dari gambar kustom pengembang.
  * **Tombol Dokumentasi / Detail.**
* **Halaman Detail Proyek (`/projects/[slug]`):**
  * Tinjauan lengkap sistem & use cases.
  * Panduan instalasi dan cara menjalankan (*Markdown / Code-block syntax*).
  * Spesifikasi tech stack & lisensi open-source (MIT).
  * Rekomendasi proyek terkait.
* **Subscribe Notifikasi:** Form pendaftaran email pengunjung untuk rilis proyek baru.

### 2. Sisi Pengelola (Admin Dashboard)
* **Autentikasi Terproteksi (`/admin/login`):** Sesi aman berbasis token JWT cookie terenkripsi.
* **Dashboard Metrik (`/admin`):**
  * Total Proyek, Total Kunjungan, Total Unduhan Source Code, Total Subscriber.
* **CRUD Proyek (`/admin/projects/new` & `/admin/projects/[id]/edit`):**
  * Judul, Slug otomatis, Tagline, Deskripsi.
  * Upload thumbnail gambar langsung dari browser.
  * Input tag tech stack dinamis.
  * Tautan Live Demo, GitHub repo, dan direct ZIP download.
  * QR Donasi khusus per proyek (opsional).
  * Editor Markdown untuk petunjuk instalasi (*README*).
  * Toggle instan status *Publikasikan* dan *Proyek Unggulan*.
* **Pengaturan Situs (`/admin/settings`):**
  * Nama platform, profil pembuat, link GitHub.
  * Konfigurasi tautan Saweria dan gambar QRIS global.

---

## 🛠️ Tech Stack
* **Framework:** Next.js 16 (App Router) + TypeScript
* **Styling:** Tailwind CSS v4 + Lucide Icons
* **Database:** SQLite lokal (via Node.js `node:sqlite` tanpa instalasi binary tambahan)
* **Keamanan & Autentikasi:** Jose (JWT) + Bcryptjs
* **QR Code Engine:** `qrcode.react` (SVG high-resolution)

---

## 💻 Panduan Menjalankan

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### 3. Build & Jalankan Mode Produksi
```bash
npm run build
npm run start
```

---

## 🔐 Kredensial Admin Bawaan
* **URL Login:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
* **Username:** `admin`
* **Password:** `admin123`
*(Kredensial dapat diperbarui atau ditambah langsung dari database)*
