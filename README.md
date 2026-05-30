# 翔乐匿名树洞

基于 Next.js 16 的匿名树洞小站，当前只包含两个功能：

- 普通员工匿名提交心里话
- 管理员登录后查看全部提交内容

## 启动

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 管理员账号

默认开发账号：

- 账号：`admin`
- 密码：`change-me-before-deploy`

上线或给真实团队使用前，请复制 `.env.example` 为 `.env.local`，并修改：

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=your-long-random-secret
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 数据存储

提交内容会保存到 Supabase 的 `public.confessions` 表。先在 Supabase SQL Editor 执行：

```sql
create extension if not exists pgcrypto;

create table if not exists public.confessions (
  id uuid primary key default gen_random_uuid(),
  nickname text not null default '匿名同事' check (char_length(nickname) <= 24),
  content text not null check (char_length(content) between 5 and 1200),
  created_at timestamptz not null default now()
);

create index if not exists confessions_created_at_idx
  on public.confessions (created_at desc);

alter table public.confessions enable row level security;
```

同样的 SQL 也放在 `supabase/schema.sql`。

在 Vercel 项目设置里添加这些环境变量：

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

`SUPABASE_SERVICE_ROLE_KEY` 只能放在服务端环境变量里，不要写成 `NEXT_PUBLIC_`，也不要放到前端代码。

## 常用命令

```bash
npm run typecheck
npm run build
npm run start
```
