import AdminNav from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin Dashboard — DevShowroom",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-[#9BEC00] selection:text-black">
      <AdminNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}

