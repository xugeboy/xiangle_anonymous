import { NextResponse } from "next/server";
import { getAdminCredentials, setAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const admin = getAdminCredentials();

  if (username !== admin.username || password !== admin.password) {
    return NextResponse.json({ message: "账号或密码不正确。" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
