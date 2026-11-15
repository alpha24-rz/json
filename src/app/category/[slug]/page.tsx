import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects, getAllCategories, getSiteSettings } from "@/lib/db";
import { getCategoryBySlug } from "@/lib/categories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCatalog from "@/components/ProjectCatalog";
import { ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const allCategories = getAllCategories();
  const categoryInfo = getCategoryBySlug(slug, allCategories);

  if (!categoryInfo) {
    return {
      title: "Kategori Tidak Ditemukan",
    };
  }

  const title = categoryInfo.isAll
    ? "Semua Produk Digital Gratis — Download Source Code & Template"
    : `Kategori ${categoryInfo.label} — Produk Digital & Source Code Gratis`;

  return {
    title,
    description: categoryInfo.description || `Daftar produk digital dan template gratis kategori ${categoryInfo.label}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const allCategories = getAllCategories();
  const categoryInfo = getCategoryBySlug(slug, allCategories);

  if (!categoryInfo) {
    notFound();
  }

  const settings = getSiteSettings();
  const projects = getAllProjects({
    onlyPublished: true,
    category: categoryInfo.isAll ? undefined : categoryInfo.id,
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#9BEC00] selection:text-black">
      {/* Header */}
      <Navbar
        siteTitle={settings.site_title}
        githubProfile={settings.github_profile}
        globalDonationLink={settings.global_donation_link}
        globalDonationQr={settings.global_donation_qr}
        donationNote={settings.donation_note}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Category Header Banner */}
        <section className="border-b border-neutral-200/80 bg-neutral-50/60 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            {/* Breadcrumb & Back Link */}
            <nav className="flex items-center gap-2 text-xs text-neutral-500">
              <Link href="/" className="inline-flex items-center gap-1 hover:text-neutral-950 transition font-medium">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </Link>
              <span>/</span>
              <span className="text-neutral-400">Kategori</span>
              <span>/</span>
              <span className="text-neutral-950 font-bold">{categoryInfo.label}</span>
            </nav>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
                {categoryInfo.isAll ? "Semua Produk Digital" : categoryInfo.label}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
                {categoryInfo.description || `Koleksi produk digital gratis dalam kategori ${categoryInfo.label}.`}
              </p>
            </div>
          </div>
        </section>

        {/* Project Catalog filtered for this category */}
        <ProjectCatalog
          initialProjects={projects}
          categories={allCategories}
          activeCategory={categoryInfo.id}
          title={categoryInfo.isAll ? "Semua Produk" : `Koleksi ${categoryInfo.label}`}
          globalDonationLink={settings.global_donation_link}
          globalDonationQr={settings.global_donation_qr}
        />
      </main>

      {/* Footer */}
      <Footer
        siteTitle={settings.site_title}
        authorName={settings.author_name}
        authorBio={settings.author_bio}
        githubProfile={settings.github_profile}
        globalDonationLink={settings.global_donation_link}
        globalDonationQr={settings.global_donation_qr}
        donationNote={settings.donation_note}
      />
    </div>
  );
}

