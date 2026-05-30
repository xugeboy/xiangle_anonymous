"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json().catch(() => ({}));

    setPending(false);

    if (!response.ok) {
      setMessage(data.message || "登录失败。");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form className="panel login-panel" onSubmit={onSubmit}>
      <h2 className="panel-title">
        <LockKeyhole size={20} aria-hidden />
        管理员登录
      </h2>
      <div className="field">
        <label htmlFor="username">账号</label>
        <input
          id="username"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="password">密码</label>
        <input
          id="password"
          autoComplete="current-password"
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button className="primary-button" type="submit" disabled={pending}>
        <LockKeyhole size={17} aria-hidden />
        {pending ? "登录中" : "登录"}
      </button>
      {message ? (
        <p className="status" data-tone="error">
          {message}
        </p>
      ) : null}
    </form>
  );
}
