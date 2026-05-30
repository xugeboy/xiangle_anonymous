# 享乐匿名树洞

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
```

## 数据存储

提交内容会保存到本地 `data/confessions.json`。这个文件已加入 `.gitignore`，避免把真实匿名内容提交到仓库。

## 常用命令

```bash
npm run typecheck
npm run build
npm run start
```
