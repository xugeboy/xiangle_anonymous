"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <button className="ghost-button" type="button" onClick={logout} disabled={pending}>
      <LogOut size={17} aria-hidden />
      {pending ? "退出中" : "退出"}
    </button>
  );
}
