# 🌐 国内可用部署方案（无需实名认证）

> ⚠️ 由于你未满 18 岁，无法完成腾讯云/阿里云等国内平台的实名认证，以下方案无需实名即可使用。

---

## ✅ 方案 1：Vercel（已部署完成 ✅）

**当前网站已成功部署在 Vercel：**
- 🌍 **访问地址**：https://trip-ai-mauve.vercel.app
- 免费、自动 HTTPS、无需实名
- 国内部分地区可直接访问，部分网络环境可能较慢

这是当前最快的方案，已完成部署。

---

## 🚀 方案 2：Zeabur（香港节点，推荐替代）

**特点**：香港节点、无需实名、免备案、国内访问速度较快

### 部署步骤：

1. **注册 Zeabur 账号**
   - 访问 https://dash.zeabur.com
   - 支持 GitHub/Google 账号直接登录（无需实名）

2. **安装 CLI 并登录**
   ```bash
   npm install -g zeabur
   zeabur login
   ```

3. **初始化项目**
   ```bash
   zeabur init
   ```
   - 选择项目目录 `trip-ai`
   - 选择 Next.js 框架

4. **部署**
   ```bash
   zeabur deploy
   ```

5. **配置环境变量**
   - 在 Zeabur 控制台 → 项目 → 环境变量
   - 添加 `DEEPSEEK_API_KEY` = 你的 DeepSeek API Key（在 `.env.local` 中）

6. **绑定域名**
   - Zeabur 提供免费子域名 `xxx.zeabur.app`
   - 香港节点国内访问速度良好

---

## ☁️ 方案 3：Cloudflare Pages（全球节点）

**特点**：完全免费、无需实名、自动 HTTPS、全球 CDN（含部分国内边缘节点）

### 部署步骤：

1. **注册 Cloudflare 账号**
   - 访问 https://dash.cloudflare.com/sign-up
   - 邮箱注册即可，无需实名

2. **推送代码到 GitHub**
   ```bash
   # 先在 github.com 创建一个新仓库（需注册 GitHub，无需实名）
   git remote add origin https://github.com/你的用户名/trip-ai.git
   git push -u origin main
   ```

3. **导入项目**
   - Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
   - 选择 `trip-ai` 仓库
   - 框架预设选择 **Next.js**
   - 构建命令：`npm run build`
   - 输出目录：`.next`

4. **配置环境变量**
   - Settings → Environment variables
   - 添加 `DEEPSEEK_API_KEY`

5. **部署**
   - 点击 **Save and Deploy**
   - 获得免费域名 `xxx.pages.dev`

---

## 📊 方案对比

| 方案 | 实名认证 | 国内速度 | 免费额度 | 备案要求 |
|------|---------|---------|---------|---------|
| **Vercel**（已上线） | ❌ 不需要 | ⭐⭐⭐ | ✅ 免费 | ❌ 不需要 |
| **Zeabur**（推荐） | ❌ 不需要 | ⭐⭐⭐⭐ | ✅ 有免费额度 | ❌ 不需要 |
| **Cloudflare Pages** | ❌ 不需要 | ⭐⭐⭐ | ✅ 完全免费 | ❌ 不需要 |

---

## 🏁 推荐操作

由于你已经通过 Vercel 完成了部署，**最省事的方案是继续使用 Vercel**。

如果觉得 Vercel 在国内访问太慢，推荐使用 **Zeabur（香港节点）**，注册后无需实名即可部署。

---

## 🔑 需要记住的密钥

- **DeepSeek API Key**：在项目根目录 `.env.local` 文件中（此文件已被 `.gitignore` 排除，不会上传到 Git）
- **Vercel Token**：在你的 Vercel 账号中创建（https://vercel.com/account/tokens）

## 🔄 更新 Vercel 网站方法

```bash
# 先设置你自己的 Vercel Token
$env:VERCEL_TOKEN="你的 Vercel Token"
vercel deploy --prod --yes