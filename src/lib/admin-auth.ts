import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export const ADMIN_SESSION_COOKIE = "admin_session";

type AdminAuthRecord = {
  id: number;
  username: string;
  password: string;
  sessionToken: string | null;
};

async function ensureAdminAuthRecord(): Promise<AdminAuthRecord> {
  const existing = await db.adminAuth.findFirst();
  if (existing) return existing;

  const username = process.env.ADMIN_PANEL_USER ?? "admin";
  const password = process.env.ADMIN_PANEL_PASSWORD ?? "admin123";

  return db.adminAuth.create({
    data: { username, password, sessionToken: null },
  });
}

export async function verifyAdminCredentials(username: string, password: string) {
  const record = await ensureAdminAuthRecord();
  return record.username === username && record.password === password;
}

export async function createAdminSession() {
  const record = await ensureAdminAuthRecord();
  const sessionToken = randomUUID();

  await db.adminAuth.update({
    where: { id: record.id },
    data: { sessionToken },
  });

  return sessionToken;
}

export async function isAdminAuthenticated() {
  const record = await ensureAdminAuthRecord();
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(token && record.sessionToken && token === record.sessionToken);
}

export async function clearAdminSession() {
  const record = await ensureAdminAuthRecord();
  await db.adminAuth.update({
    where: { id: record.id },
    data: { sessionToken: null },
  });
}

export async function updateAdminCredentials(username: string, password: string) {
  const record = await ensureAdminAuthRecord();
  await db.adminAuth.update({
    where: { id: record.id },
    data: { username, password, sessionToken: null },
  });
}
