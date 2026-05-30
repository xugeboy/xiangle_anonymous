import { ShieldCheck } from "lucide-react";
import SubmissionForm from "@/components/submission-form";

export default function Home() {
  return (
    <main className="shell hero">
      <section className="hero-copy">
        <p className="eyebrow">匿名树洞</p>
        <h1>把想说但不方便说的话，安静放在这里。</h1>
        <p className="lead">
          普通员工无需登录即可提交心里话。页面不会展示他人的内容，只有预留的管理账户能进入权限查看。
        </p>
      </section>
      <SubmissionForm />
      <section className="hint" aria-label="权限提示">
        <ShieldCheck size={16} aria-hidden />
        管理员账号请通过环境变量配置，默认仅用于本地开发。
      </section>
    </main>
  );
}
