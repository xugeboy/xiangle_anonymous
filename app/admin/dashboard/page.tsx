import { redirect } from "next/navigation";
import { Eye } from "lucide-react";
import { isAdminSession } from "@/lib/auth";
import { listConfessions } from "@/lib/store";
import type { Confession } from "@/lib/types";
import LogoutButton from "@/components/logout-button";

const formatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "medium",
  timeStyle: "short"
});

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!(await isAdminSession())) {
    redirect("/admin");
  }

  let confessions: Confession[] = [];
  let loadError = "";

  try {
    confessions = await listConfessions();
  } catch (error) {
    console.error(error);
    loadError = "读取失败，请检查 Supabase 环境变量和数据表。";
  }

  return (
    <main className="shell admin-layout">
      <aside className="panel summary-panel">
        <p className="eyebrow">只读权限</p>
        <h1>全部提交</h1>
        <p className="lead">这里按提交时间倒序展示所有匿名心里话。</p>
        <div className="metric" aria-label="提交总数">
          <span className="hint">提交总数</span>
          <strong>{confessions.length}</strong>
        </div>
      </aside>
      <section className="panel list-panel">
        <div className="toolbar">
          <h2 className="panel-title">
            <Eye size={20} aria-hidden />
            内容列表
          </h2>
          <LogoutButton />
        </div>

        {loadError ? (
          <div className="empty">{loadError}</div>
        ) : confessions.length === 0 ? (
          <div className="empty">还没有任何提交。</div>
        ) : (
          <div className="confession-list">
            {confessions.map((confession) => (
              <article className="confession-item" key={confession.id}>
                <div className="confession-meta">
                  <span>{confession.nickname}</span>
                  <time dateTime={confession.createdAt}>
                    {formatter.format(new Date(confession.createdAt))}
                  </time>
                </div>
                <p className="confession-content">{confession.content}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
