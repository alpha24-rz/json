import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createProject, updateProject, deleteProject, getProjectById } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      tagline,
      description,
      content_markdown,
      category,
      tech_stack,
      thumbnail_url,
      demo_url,
      github_url,
      download_url,
      donation_qr_url,
      donation_link,
      is_featured,
      is_published,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Judul proyek wajib diisi." }, { status: 400 });
    }

    const finalSlug = slug ? slugify(slug) : slugify(title);

    const project = createProject({
      title,
      slug: finalSlug,
      tagline: tagline || "",
      description: description || "",
      content_markdown: content_markdown || "",
      category: category || "General",
      tech_stack: Array.isArray(tech_stack) ? tech_stack : (tech_stack ? tech_stack.split(",").map((s: string) => s.trim()) : []),
      thumbnail_url: thumbnail_url || "",
      demo_url: demo_url || "",
      github_url: github_url || "",
      download_url: download_url || "",
      donation_qr_url: donation_qr_url || "",
      donation_link: donation_link || "",
      is_featured: Boolean(is_featured),
      is_published: is_published !== undefined ? Boolean(is_published) : true,
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal menyimpan proyek: " + (error?.message || "") },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "ID proyek diperlukan." }, { status: 400 });
    }

    if (data.slug) {
      data.slug = slugify(data.slug);
    }

    if (data.tech_stack && typeof data.tech_stack === "string") {
      data.tech_stack = data.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean);
    }

    const updated = updateProject(id, data);
    if (!updated) {
      return NextResponse.json({ error: "Proyek tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal memperbarui proyek: " + (error?.message || "") },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID proyek diperlukan." }, { status: 400 });
    }

    deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal menghapus proyek: " + (error?.message || "") },
      { status: 500 }
    );
  }
}

