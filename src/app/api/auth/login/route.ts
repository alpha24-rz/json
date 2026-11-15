import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const result = await authenticate(username, password);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Autentikasi gagal." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, user: result.session });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server: " + (error?.message || "") },
      { status: 500 }
    );
  }
}

