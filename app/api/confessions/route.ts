import { NextResponse } from "next/server";
import { createConfession } from "@/lib/store";
import { validateConfessionInput } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const result = validateConfessionInput(body);

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  try {
    const confession = await createConfession(result.data);
    return NextResponse.json({ id: confession.id, createdAt: confession.createdAt }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "提交失败，请检查 Supabase 配置后重试。" }, { status: 500 });
  }
}
