import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProjectForm isEdit={false} />
    </div>
  );
}

