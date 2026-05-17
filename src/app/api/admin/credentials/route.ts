import { NextResponse } from "next/server";
import { isAdminAuthenticated, updateAdminCredentials } from "@/lib/admin-auth";

export async function PUT(request: Request) {
  try {
    const authed = await isAdminAuthenticated();
    if (!authed) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as { username?: string; password?: string };
    const username = body.username?.trim() ?? "";
    const password = body.password?.trim() ?? "";

    if (!username || !password) {
      return NextResponse.json({ ok: false, error: "Username and password are required." }, { status: 400 });
    }

    await updateAdminCredentials(username, password);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to update credentials." }, { status: 500 });
  }
}
