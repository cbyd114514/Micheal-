# Micheal 的拼豆工坊 (`Bead Studio`)

> [!TIP]
> **在线访问地址（点击直达）**：**[https://bead-site.pages.dev](https://bead-site.pages.dev)**  
> 快捷入口：[创作工坊](https://bead-site.pages.dev/create.html) · [白板画板](https://bead-site.pages.dev/whiteboard.html) · [灵感图库](https://bead-site.pages.dev/inspiration.html) · [新手教程](https://bead-site.pages.dev/tutorial.html)

<p>
  <a href="https://bead-site.pages.dev"><img src="https://img.shields.io/badge/Live%20Demo-bead--site.pages.dev-00A8E8?style=for-the-badge&logo=cloudflarepages&logoColor=white" alt="在线访问" /></a>
</p>

> 基于原生 HTML5 Canvas 2D 与 CIE Lab 色彩空间算法的 **Artkal 55 色拼豆图纸生成与创作工坊**，全站采用五层 Apple Liquid Glass 液态玻璃视觉材质，支持浏览器本地离线运行与 Cloudflare Workers AI 边缘增强。

---

## 服务接口

- **边缘 AI Worker**：`https://bead-studio-worker.cbyd114514.workers.dev`
- **本地静态服务**：在 `bead-site/` 目录下执行 `python -m http.server 8080` 后访问 `http://localhost:8080`

---

## 核心特性

1. **零构建高精度拼豆转换 (`create.html` & `assets/js/convert.js`)**
   - **CIE Lab 感知色差匹配**：通过 `srgbToLab` 将图片像素转换至 CIE Lab 色彩空间，对比 Artkal 55 色标准色板计算欧氏距离，实现还原度极高的像素级配珠映射；
   - **灵活规格与本地抠图**：支持 10×10 至 100×100 等多种板宽规格设置，支持通过 `@imgly/background-removal` WASM 模型在浏览器端自动去除图片背景（无需上传图片至服务器）；
   - **一键导出图纸与材料单 (`exporter.js`)**：支持导出高清带色号标注的 **PNG** 图纸、材料数量统计 **CSV** 表格以及基于 jsPDF 生成的 **PDF** 打印图纸（离线时自动降级为 PNG）。
2. **互动白板画板与灵感图库**
   - **自由绘图白板 (`whiteboard.html`)**：集成画笔、吸管、橡皮擦、撤销/重做、实时对照图与左侧材料用量清单（Grid 显式分列，桌面/移动端自适应）；
   - **灵感图库与教程 (`inspiration.html` & `tutorial.html`)**：内置动漫、动物、风景、文字、节日、美食 6 大灵感专题页及交互式新手拼豆引导教程；
   - **可选 AI 生图增强 (`worker/index.js`)**：接入 OpenAI 兼容图像生成接口，实现文本直接生成像素风拼豆图纸。
3. **五层 Apple Liquid Glass 液态玻璃质感 (`liquid-glass.css` & `liquid-glass.js`)**
   - 融合基底饱和度提纯（175%）、SVG 边缘位移折射贴图（中心零位移）、多向内阴影厚度高光、指针跟踪微光与功能层/内容层严格分离；
   - 深度修复暗色模式过曝问题，具备离屏过滤卸载（性能防抖）与系统无障碍模式（减弱透明度/减少动态/高对比度）自适应降级。
4. **完善的自动化测试套件 (`bead-site/tests/`)**
   - 内置涵盖拼豆色号校准、白板交互、侧边栏折叠、参数面板与液态玻璃折射像素测量的端到端验证脚本。

---

## 目录结构

```text
Micheal-/
├── README.md                            # 仓库总览说明（本文件）
└── bead-site/                           # 站点主工程目录
    ├── index.html                       # 首页：精选图纸展示与分步骤引导
    ├── create.html                      # 创作页：上传转拼豆、AI生图与参数调节
    ├── whiteboard.html                  # 白板页：自由绘图画板与实时用量统计
    ├── inspiration.html                 # 灵感中心首页
    ├── inspiration/                     # 6 大专题灵感子页（anime/animals/landscape/text/festival/food）
    ├── tutorial.html                    # 分步骤交互教程
    ├── tutorial-guide.html              # 进阶拼豆指南
    ├── assets/
    │   ├── css/                         # theme.css / layout.css / liquid-glass.css
    │   ├── js/                          # 色彩映射、转换、导出、白板、液态玻璃等 ES 模块
    │   └── images/                      # 收款码与静态素材
    ├── data/                            # featured.json / inspiration.json / tutorials.json
    ├── docs/api-integration.md          # AI 生图 Worker 接入教程
    ├── tests/                           # 自动化视觉与功能测试脚本 (*.mjs)
    ├── worker/                          # Cloudflare Worker 边缘代理 (/api/convert, /api/ai-proxy)
    │   ├── index.js
    │   └── wrangler.toml
    ├── package.json
    └── 更新日志.md                       # 详细版本迭代与液态玻璃实测记录
```

---

## 本地运行与部署

### 1. 本地运行
因浏览器 `file://` 协议会拦截 ES Modules，请在 `bead-site/` 目录下启动任意本地静态服务器：
```bash
cd bead-site
python -m http.server 8080
# 或 npx serve .
```

### 2. 部署前端（Cloudflare Pages）
- 关联仓库并将构建输出目录设为 `bead-site`（构建命令留空即可）；
- 全部 P0 核心功能（图片转拼豆、白板绘图、灵感查看、PNG/CSV 导出）均纯本地运行，无需后端即可直接使用。

### 3. 部署 AI 边缘增强 Worker（可选）
如需启用创作页的 AI 生图功能：
```bash
cd bead-site/worker
wrangler deploy
wrangler secret put API_KEY
```
部署后在前端设置 `window.BEAD_WORKER_BASE` 指向您的 Worker 地址即可（默认支持 `API_BASE` 与 `MODEL` 变量覆盖，详细说明见 `bead-site/docs/api-integration.md`）。

---

## 贡献者 (Contributors)

- **作者**：John MICHAEL ([@cbyd114514](https://github.com/cbyd114514))
- **AI 协作**：Gemini (Google DeepMind)
