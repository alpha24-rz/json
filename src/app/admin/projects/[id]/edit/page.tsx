import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getProjectById } from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}

