import { NextRequest, NextResponse } from "next/server";
import { incrementProjectViews, incrementProjectDownloads } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type === "download") {
      incrementProjectDownloads(slug);
    } else {
      incrementProjectViews(slug);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal tracking data: " + (error?.message || "") },
      { status: 500 }
    );
  }
}

