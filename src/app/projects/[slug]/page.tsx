import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects, getSiteSettings } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectDetailClient from "./ProjectDetailClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyek Tidak Ditemukan",
    };
  }

  return {
    title: `${project.title} — Source Code Gratis`,
    description: project.tagline || project.description,
    openGraph: {
      title: project.title,
      description: project.tagline || project.description,
      images: [project.thumbnail_url],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const settings = getSiteSettings();
  const allProjects = getAllProjects({ onlyPublished: true });
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.tech_stack.some(t => project.tech_stack.includes(t))))
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#9BEC00] selection:text-black">
      <Navbar
        siteTitle={settings.site_title}
        githubProfile={settings.github_profile}
        globalDonationLink={settings.global_donation_link}
        globalDonationQr={settings.global_donation_qr}
        donationNote={settings.donation_note}
      />

      <main className="flex-1">
        <ProjectDetailClient
          project={project}
          settings={settings}
          relatedProjects={relatedProjects}
        />
      </main>

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

