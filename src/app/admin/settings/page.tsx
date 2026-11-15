import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/db";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const settings = getSiteSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SettingsForm initialSettings={settings} />
    </div>
  );
}

