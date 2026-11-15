import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAllProjects, getSubscribersCount } from "@/lib/db";
import AdminProjectTable from "@/components/admin/AdminProjectTable";
import { FolderGit2, Eye, Download, Users, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const projects = getAllProjects();
  const subscribersCount = getSubscribersCount();

  const totalViews = projects.reduce((acc, p) => acc + p.views_count, 0);
  const totalDownloads = projects.reduce((acc, p) => acc + p.downloads_count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & User Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Dashboard Pengelolaan
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Selamat datang kembali, <strong className="text-neutral-800">{session.username}</strong>. Kelola portofolio karya dan source code Anda di sini.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#9BEC00] hover:bg-[#88d400] text-black font-bold text-xs rounded-xl shadow-xs transition glow-green-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
        </Link>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold">Total Proyek</span>
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-neutral-900">{projects.length}</div>
          <div className="text-[11px] text-neutral-400">
            {projects.filter((p) => p.is_published).length} aktif terpublikasi
          </div>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold">Total Kunjungan</span>
            <Eye className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-neutral-900">{totalViews}</div>
          <div className="text-[11px] text-neutral-400">Akumulasi seluruh proyek</div>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold">Unduhan Source Code</span>
            <Download className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-[#9BEC00]">{totalDownloads}</div>
          <div className="text-[11px] text-neutral-400">Klik GitHub & ZIP</div>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold">Subscriber Update</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-neutral-900">{subscribersCount}</div>
          <div className="text-[11px] text-neutral-400">Pengguna terdaftar</div>
        </div>
      </div>

      {/* Projects Management Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">
            Semua Proyek & Source Code
          </h2>
          <span className="text-xs text-neutral-400">
            Klik ikon untuk ubah status publik atau jadikan unggulan
          </span>
        </div>

        <AdminProjectTable initialProjects={projects} />
      </div>
    </div>
  );
}

