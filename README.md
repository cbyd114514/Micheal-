# Micheal 的拼豆网 (Bead Studio)

> 零构建、无打包依赖的在线图片转 **Artkal 55 色** 拼豆图纸工具与像素灵感社区。

---

## 📖 项目简介

**Bead Studio (拼豆网)** 是一个专为拼豆（Perler / Artkal Beads）手工爱好者打造的零构建静态 Web 应用。无需安装任何 Node.js 框架或执行繁重的打包流水线，核心图像处理基于原生 **HTML5 Canvas 2D API** 完成。

用户上传任意位图，即可自动色彩量化为 **Artkal 55 色** 标准色系，并支持一键导出高清图纸、PDF 制作教程以及采购颗粒清单。

---

## 🌟 核心功能

### 1. 极速图片转图纸 (`create.html`)
- **色彩量化算法**：在浏览器本地计算像素颜色欧氏距离，精准映射至 Artkal 55 标准色板。
- **参数动态微调**：支持画板格数（10×10 至 100×100）、对比度、饱和度与颜色数量上限的实时滑块微调。

### 2. 自由创作与灵感临摹
- **白板手绘 (`whiteboard.html`)**：交互式点阵网格，支持画笔、橡皮擦、吸管工具、网格线显示与撤销/重做。
- **灵感中心 (`inspiration.html`)**：收录 6 大分类精选图纸（动漫、动物、风景、文字、节日、美食），支持一键加载临摹。
- **AI 辅助生图**：支持通过边缘 Worker 联动文生图接口，一键生成契合拼豆像素风格的原始线稿。

### 3. 多维度交付物导出
- **PNG 高清图纸**：带色号标号与辅助网格的高清图纸，方便手工排板。
- **PDF 打印教程**：标准化分步印刷版，直接发送至打印机即可制作。
- **CSV 色号清单**：精准统计各色号所需豆子颗粒数，方便一键导入商城采购。

---

## 📂 项目结构

```text
bead-site/
├── index.html                   # 首页：精选图纸展示与新手步骤指引
├── create.html                  # 创作中心：图片转拼豆 / AI 生图
├── whiteboard.html              # 自由绘制：点阵白板画板
├── inspiration.html             # 灵感首页：6 大分类入口
├── inspiration/                 # 分类图纸数据 (anime, animals, landscape 等)
├── tutorial.html                # 基础教程：拼豆工艺入门
├── tutorial-guide.html          # 高阶技巧与进阶熨烫指南
├── assets/                      # CSS 样式与静态图标资产
├── data/                        # Artkal 55 标准色库与色板配置
├── worker/                      # Cloudflare Worker 边缘生图与加速服务
│   ├── index.js
│   └── wrangler.toml
├── docs/                        # 设计架构与开发文档
└── README.md                    # 项目说明
```

---

## 🚀 部署指南

### 纯静态模式 (推荐)
直接将 `bead-site/` 目录拖拽上传至 **Cloudflare Pages**、**GitHub Pages** 或 **Vercel**：
- **无需编译构建**：静态 HTML/CSS/JS 零依赖加载。
- **隐私保护**：所有图像计算与图纸转换均在客户端浏览器完成，不向外部服务器传输用户原图。

### 边缘增强部署 (Worker)
如需启用 AI 生图或边缘转换能力：
```bash
cd bead-site/worker
npm install -g wrangler
wrangler deploy
```
