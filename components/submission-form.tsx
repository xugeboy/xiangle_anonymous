"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type Tone = "success" | "error" | "idle";

export default function SubmissionForm() {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<Tone>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    setTone("idle");

    const response = await fetch("/api/confessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, content })
    });
    const data = await response.json().catch(() => ({}));

    setPending(false);

    if (!response.ok) {
      setTone("error");
      setMessage(data.message || "提交失败，请稍后再试。");
      return;
    }

    setNickname("");
    setContent("");
    setTone("success");
    setMessage("已收到。它会只出现在管理员权限查看里。");
  }

  return (
    <form className="panel form-panel" onSubmit={onSubmit}>
      <h2 className="panel-title">提交心里话</h2>
      <div className="field">
        <label htmlFor="nickname">称呼，可留空</label>
        <input
          id="nickname"
          maxLength={24}
          placeholder="例如：三楼靠窗的同事"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="content">心里话</label>
        <textarea
          id="content"
          minLength={5}
          maxLength={1200}
          required
          placeholder="写下想被看见的那部分。"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <div className="form-row">
        <span className="hint">{content.trim().length}/1200</span>
        <button className="primary-button" type="submit" disabled={pending}>
          <Send size={17} aria-hidden />
          {pending ? "提交中" : "提交"}
        </button>
      </div>
      {message ? (
        <p className="status" data-tone={tone}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
