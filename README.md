# 🧳 Trip AI - AI 旅游计划生成器

> 🤖 AI 帮你规划真正适合你的旅行 | 路线、预算、餐饮、住宿、VLOG 一站式搞定

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-8b5cf6)](https://trip-ai-mauve.vercel.app)

## ✨ 功能特性

- 🤖 **AI 智能规划**：输入出发地、目的地、天数、预算，DeepSeek AI 自动生成详细旅行计划
- 💰 **预算明细**：交通、住宿、餐饮、门票、购物分类展示，一目了然
- 🗓️ **每日行程**：详细时间安排（几点到几点做什么）、餐饮安排（早中晚餐）
- 🚄 **交通安排**：交通方式、路线、耗时、费用
- 🏨 **住宿推荐**：酒店名称、位置、价格、评分
- 🎬 **Vlog 视频搜索**：自动搜索 Bilibili 上目的地相关的旅游 Vlog
- 🏷️ **24 种旅行偏好**：雪山、草原、海边、美食、摄影、温泉等
- 🎒 **行李清单**、🌤️ **天气建议**、📞 **紧急联系方式**
- 🎨 **现代化 UI**：渐变背景、动画特效、响应式设计
- 📜 **历史记录**：本地保存历史规划，随时回顾

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
DEEPSEEK_API_KEY=你的DeepSeek_API_Key
```

> 在 [DeepSeek 开放平台](https://platform.deepseek.com/) 获取 API Key

### 3. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可使用！

## 📖 使用说明

1. 填写**出发地**（必填，如"广州"）
2. 填写**目的地**（选填，留空由 AI 推荐）
3. 设置**天数、预算、人数、出行方式**
4. 选择**旅行偏好**（可多选，如"雪山"、"美食"）
5. 点击「**开始规划**」，AI 自动生成完整旅行计划
6. 计划包含：行程地图、每日安排、预算明细、用餐计划、住宿推荐等
7. 点击「**清空**」可重置表单

## 🛠️ 技术栈

- **框架**：[Next.js 16](https://nextjs.org) (App Router + Turbopack)
- **语言**：[TypeScript](https://www.typescriptlang.org/)
- **样式**：[TailwindCSS 4](https://tailwindcss.com)
- **AI**：[DeepSeek API](https://platform.deepseek.com/)
- **视频搜索**：Bilibili 公开 API（后端代理）
- **部署**：Vercel

## 📁 项目结构

```
trip-ai/
├── app/
│   ├── api/
│   │   ├── plan/          # AI 旅行规划 API
│   │   └── videos/        # Bilibili 视频搜索代理
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/
│   ├── Hero.tsx           # 首页展示区
│   ├── TripForm.tsx       # 旅行表单
│   ├── SearchBox.tsx      # 搜索和生成逻辑
│   ├── ResultCard.tsx     # 结果展示
│   ├── VideoVlog.tsx      # Vlog 视频搜索
│   ├── PreferenceSelector.tsx  # 偏好选择
│   └── HistorySidebar.tsx # 历史记录
├── types/
│   └── trip.ts            # TypeScript 类型定义
├── vercel.json            # Vercel 部署配置
└── EDGEONE_DEPLOY.md      # 国内部署指南
```

## 🌐 在线 Demo

访问 [https://trip-ai-mauve.vercel.app](https://trip-ai-mauve.vercel.app) 体验在线版本！

## 📦 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Ftrip-ai)

部署时配置环境变量 `DEEPSEEK_API_KEY` 即可。

### 国内部署

参见 [EDGEONE_DEPLOY.md](EDGEONE_DEPLOY.md) - 提供免实名认证的国内高速访问方案（Zeabur / Cloudflare Pages）。

## 📄 License

[MIT](LICENSE)

## 💬 联系与贡献

- 欢迎提交 Issue 和 Pull Request
- 如有问题请在 GitHub Issues 中反馈

---

**Made with ❤️ by Trip AI**