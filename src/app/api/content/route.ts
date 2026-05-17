import { NextResponse } from "next/server";
import { getPortfolioContent, savePortfolioContent } from "@/lib/portfolio-store";
import type { PortfolioContent } from "@/lib/portfolio-content";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  try {
    const authed = await isAdminAuthenticated();
    if (!authed) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }

    const content = await getPortfolioContent();
    return NextResponse.json({ ok: true, content });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to load content." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const authed = await isAdminAuthenticated();
    if (!authed) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as {
      content?: PortfolioContent;
    };

    if (!body.content) {
      return NextResponse.json(
        { ok: false, error: "Missing content payload." },
        { status: 400 },
      );
    }

    const saved = await savePortfolioContent(body.content);
    return NextResponse.json({ ok: true, content: saved });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save content." },
      { status: 500 },
    );
  }
}
