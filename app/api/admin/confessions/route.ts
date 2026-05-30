import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/auth";
import { listConfessions } from "@/lib/store";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "未授权访问。" }, { status: 401 });
  }

  try {
    const confessions = await listConfessions();
    return NextResponse.json({ confessions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "读取失败，请检查 Supabase 配置。" }, { status: 500 });
  }
}
