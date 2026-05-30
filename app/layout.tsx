import type { Metadata } from "next";
import { TreePine } from "lucide-react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "享乐匿名树洞",
  description: "匿名提交心里话，管理员权限查看全部内容。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="shell topbar">
          <Link className="brand" href="/" aria-label="享乐匿名树洞首页">
            <span className="brand-mark">
              <TreePine size={19} strokeWidth={2.4} />
            </span>
            <span>享乐匿名树洞</span>
          </Link>
          <nav className="nav" aria-label="主导航">
            <Link href="/">提交心里话</Link>
            <Link href="/admin">权限查看</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
