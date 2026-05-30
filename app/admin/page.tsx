import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/auth";
import LoginForm from "@/components/login-form";

export default async function AdminPage() {
  if (await isAdminSession()) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="shell admin-layout">
      <section>
        <p className="eyebrow">权限查看</p>
        <h1>管理员入口</h1>
        <p className="lead">登录后可以查看所有员工提交的匿名内容。普通提交者不会看到列表。</p>
      </section>
      <LoginForm />
    </main>
  );
}
