import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, clearAdminSession } from "@/lib/admin-auth";

export async function POST() {
  await clearAdminSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  return response;
}
