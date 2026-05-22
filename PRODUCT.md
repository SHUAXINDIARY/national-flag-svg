# Product

## Register

brand

## Users

- **前端开发者**：在 npm 项目或 `<script>` 页面中集成 `rough-emoji-draw`，需要可预测的 Canvas 国旗绘制 API。
- **库维护者与贡献者**：通过 `index.html` 批量预览 240+ 地区旗帜，按 ISO 代码或中文名搜索，做视觉回归与模板质量检查。
- **潜在采用者**：从 GitHub / npm 落地页快速理解库能力、安装方式与手绘风格效果。

典型场景：本地 `pnpm run dev` 打开预览页比对旗帜；在文档或 demo 中嵌入 `RoughEmoji.draw(canvas, emoji)`。

## Product Purpose

Rough Emoji Draw 将 Unicode 国旗 emoji 绘制成 Rough.js 手写风格 Canvas 图像。常见旗帜有独立手写模板；其余走 emoji 栅格化与像素采样 fallback，保证统一视觉语言。

成功标准：库 API 稳定、绘制结果可预期；预览页清晰传达价值、易于搜索与浏览；UI 与 Canvas 内的「纸张旗面」美学一致，不喧宾夺主。

## Brand Personality

**克制、手工、可信。**

- 语气：技术但友好，中文为主，保留 English README 入口。
- 情感：像翻阅一本手工插旗图谱，而非 SaaS 仪表盘或素材站广告页。
- 视觉气质：浅绿纸张背景、细边框、深绿 accent，让彩色旗帜 Canvas 成为焦点。

## Anti-references

- 紫/indigo 渐变 + 白底的标准 AI landing 模板。
- 深色 neon、玻璃拟态、hero 大数字指标等 SaaS  cliché。
- 与现有纸张绿体系冲突的 Tailwind 默认灰蓝配色。
- 为 demo 引入 React/Vue 或破坏 `window.RoughEmoji` 公开 API 的「方便重构」。
- 过度动画、弹窗式筛选（搜索已 inline 足够）。

## Design Principles

1. **旗帜优先**：页面 UI 是画布与旗帜的衬底，不抢手绘内容的注意力。
2. **纸张延续**：HTML 页面的纸色、边框、阴影语义与 `PALETTE.paper` / `PALETTE.frame` 对齐。
3. **展示即文档**：`index.html` 同时承担 QA 与对外说明，信息层次清晰、可复制安装 snippet。
4. **无框架 demo**：示例页保持 vanilla HTML/CSS/JS，与库的轻量定位一致。
5. **可访问的浏览**：搜索、状态反馈、链接与焦点态对键盘和读屏友好。

## Accessibility & Inclusion

- 目标：预览页遵循常见 a11y 实践（语义结构、`aria-label`、`aria-live` 状态、可见 `:focus-visible`）。
- 色彩：正文与背景对比足够；accent 绿用于链接与焦点，不单靠颜色传达唯一信息。
- 动效：默认无必需动效；若新增动画，尊重 `prefers-reduced-motion`。
- 文案：状态文本清晰（如筛选结果、加载失败提示）；避免仅图标无标签的交互控件。
