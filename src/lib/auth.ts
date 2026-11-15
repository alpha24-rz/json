import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getAdminUser } from "./db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "showcase-platform-super-secret-key-2026-alpha"
);

const COOKIE_NAME = "dev_showcase_admin_token";

export interface AdminSession {
  userId: string;
  username: string;
}

export async function createSessionToken(payload: AdminSession): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.userId || !payload.username) return null;
    return {
      userId: payload.userId as string,
      username: payload.username as string,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

export async function authenticate(username: string, passwordPlain: string): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  const user = getAdminUser(username.trim());
  if (!user) {
    return { success: false, error: "Username atau password salah." };
  }

  const isValid = bcrypt.compareSync(passwordPlain, user.password_hash);
  if (!isValid) {
    return { success: false, error: "Username atau password salah." };
  }

  const session: AdminSession = {
    userId: user.id,
    username: user.username,
  };

  const token = await createSessionToken(session);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true, session };
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

