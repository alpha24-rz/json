import { getAllProjects, getAllCategories, getSiteSettings } from "@/lib/db";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectCatalog from "@/components/ProjectCatalog";
import Footer from "@/components/Footer";

export default async function HomePage() {
  const settings = getSiteSettings();
  const projects = getAllProjects({ onlyPublished: true });
  const categories = getAllCategories();

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
        {/* Hero Section */}
        <HeroSection
          totalProjects={projects.length}
          authorName={settings.author_name}
          globalDonationLink={settings.global_donation_link}
          globalDonationQr={settings.global_donation_qr}
          donationNote={settings.donation_note}
        />

        {/* Catalog Section with Search, Category & Tech Stack Filters */}
        <ProjectCatalog
          initialProjects={projects}
          categories={categories}
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
