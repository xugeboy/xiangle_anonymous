import type { PublicConfessionInput } from "@/lib/types";

export function validateConfessionInput(input: Partial<PublicConfessionInput>) {
  const nickname = typeof input.nickname === "string" ? input.nickname.trim() : "";
  const content = typeof input.content === "string" ? input.content.trim() : "";

  if (nickname.length > 24) {
    return { ok: false as const, message: "昵称最多 24 个字。" };
  }

  if (content.length < 5) {
    return { ok: false as const, message: "心里话至少写 5 个字。" };
  }

  if (content.length > 1200) {
    return { ok: false as const, message: "心里话最多 1200 个字。" };
  }

  return {
    ok: true as const,
    data: {
      nickname,
      content
    }
  };
}
