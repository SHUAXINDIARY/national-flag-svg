---
name: impeccable
description: >-
  Use when the user wants to design, redesign, shape, critique, audit, polish,
  clarify, distill, harden, optimize, adapt, animate, colorize, extract, or
  otherwise improve a frontend interface in the Rough Emoji Draw / national-flag-svg
  repo. Covers index.html QA page, demo scripts, landing-style docs, forms, and
  library-adjacent UI. Handles UX review, visual hierarchy, accessibility,
  performance, responsive behavior, theming, typography, spacing, motion, and
  UX copy. Not for backend-only tasks or changes to flag drawing algorithms in
  src/flag-drawers.ts unless explicitly requested.
---

# Impeccable — Rough Emoji Draw

You have taste. You notice when UI looks generic, broken, or "AI slop." Apply this skill for any frontend interface work in **national-flag-svg** (npm: `rough-emoji-draw`).

**Project register:** **brand** — the `index.html` preview page is the public face of the library; design quality matters as much as API correctness.

Also read `.cursor/rules/project-rules.mdc` for build and Canvas constraints before editing.

## Design Philosophy

Before writing code:

1. **Purpose**: Who uses this surface, and what must they accomplish in one visit?
2. **Tone**: For this repo — calm, paper-like, hand-drawn warmth; technical but approachable; not SaaS-dashboard generic.
3. **Differentiation**: What makes this page feel like *Rough Emoji Draw*, not another flag grid clone?
4. **Constraints**: Vanilla HTML/CSS/JS only on demo pages; library API stays stable.

Then implement working code with intentional visual choices.

## Design System (index.html baseline)

Extend these tokens; do not introduce a conflicting palette without explicit user approval.

### Typography

- **UI stack**: `Inter`, `ui-sans-serif`, system-ui — already in `index.html`
- **Monospace**: `ui-monospace`, SF Mono, Menlo — for npm commands and API snippets
- **Scale**: h1 ~22px/650; body & intro 14px; footer 13px; card labels 13px
- **Muted text**: `#52645d`, `#374151`, `#8a9a94` (placeholders)

### Color

| Role | Hex | Usage |
| --- | --- | --- |
| Page background | `#f4f8f5` | body |
| Paper / card | `#fbfdfa` | intro, cards, search bar |
| Border | `#d9e3db`, `#e2ebe5`, `#c5d4cb` | frames, dividers, inputs |
| Primary accent | `#2f6b4f` | links, focus, primary actions |
| Primary hover | `#245a42` | `.repo-link`, link hover |
| Code background | `#eef5f0` | inline `code` |
| Body text | `#1f2933` | headings, inputs |
| Canvas paper (library) | `#fbfdfa` | `PALETTE.paper` in `src/constant.ts` |

Theme color meta: `#2f6b4f`.

### Layout

- Main: `min(1280px, calc(100vw - 32px))`, vertical padding 24–36px
- Flag grid: `repeat(auto-fill, minmax(180px, 1fr))`, gap 14px
- Sample grid: minmax 220px, gap 16px
- Cards: 8px radius, 1px `#d9e3db` border, canvas `aspect-ratio: 1`
- Search bar: flex wrap, 12–14px padding, same paper/border language as intro

### Components (class names)

- `.repo-link` — filled primary button-link
- `.secondary-link` — outlined secondary
- `.intro`, `.search-bar`, `.item`, `.label`, `.status`, `.site-footer`
- States: `.item--hidden`, `.flag-section--empty`

## Anti-Patterns (never use)

- Purple/indigo gradients on white (AI slop)
- Inter + purpleCTA as default SaaS look
- Replacing the green paper aesthetic with generic Tailwind gray/blue
- Modals for simple filters (search is already inline)
- Breaking `window.RoughEmoji` public API for UI convenience
- Adding React/Vue to demo pages
- Editing `src/flag-drawers.ts` when the task is purely visual HTML/CSS

## Before Any UI Task

1. Read the target file (`index.html`, `rough-emoji-app.js`) and note existing class names and copy tone (Chinese primary, English README link).
2. Confirm scope: **page UI only** vs **library drawing** — default to page UI.
3. If changing styles, grep for hardcoded colors and update consistently.

## During Implementation

- Prefer extending existing classes over new one-off utilities.
- Preserve accessibility: `aria-label`, `aria-live="polite"` on `#status`, semantic `<main>`, `<header>`, `<footer>`, `role="search"`.
- Keep responsive behavior: grids already auto-fill; test narrow viewports mentally.
- Script load order: `dist/rough-emoji.js` → `rough-emoji-app.js` → page logic. Never rely on `file://`.

## After Implementation

```bash
pnpm run typecheck   # if any TS touched
pnpm run build       # if dist or library entry changed
pnpm run dev         # preview at http://localhost:3000/
```

Use ReadLints on edited files. Visually spot-check search, sample grid, and full grid if layout changed.

## Sub-Skills Routing

When the user invokes a sub-command, read the matching skill and follow it in **this project's** context:

| Command | Skill path |
| --- | --- |
| `/audit` | `~/.agents/skills/audit/SKILL.md` |
| `/polish` | `~/.agents/skills/polish/SKILL.md` |
| `/clarify` | `~/.agents/skills/clarify/SKILL.md` |
| `/distill` | `~/.agents/skills/distill/SKILL.md` |
| `/bolder` | `~/.agents/skills/bolder/SKILL.md` |
| `/quieter` | `~/.agents/skills/quieter/SKILL.md` |
| `/adapt` | `~/.agents/skills/adapt/SKILL.md` |
| `/animate` | `~/.agents/skills/animate/SKILL.md` |
| `/colorize` | `~/.agents/skills/colorize/SKILL.md` |
| `/optimize` | `~/.agents/skills/optimize/SKILL.md` |
| `/harden` | `~/.agents/skills/harden/SKILL.md` |
| `/extract` | `~/.agents/skills/extract/SKILL.md` |
| `/onboard` | `~/.agents/skills/onboard/SKILL.md` |
| `/critique` | `~/.agents/skills/critique/SKILL.md` |
| `/delight` | `~/.agents/skills/delight/SKILL.md` |
| `/frontend-design` | `~/.agents/skills/frontend-design/SKILL.md` |

For `/normalize`, align with tokens in this file and `index.html` inline styles.

## Rough Emoji Draw — 代码库定制

### 项目定位

- TypeScript + DOM Canvas + Rough.js + Rslib 轻量库：把 Unicode 国旗 emoji 绘成手写风 Canvas。
- 公开 API：`RoughEmoji.draw`, `isFlagEmoji`, `resolveFlag` — 保持签名与行为稳定。
- 演示与 QA 分离：库进 npm/`dist/`；页面脚本在仓库根目录。

### 目录职责

| Path | Role |
| --- | --- |
| `src/rough-emoji.ts` | npm / IIFE 入口；`RoughEmoji` API；`RoughEmojiRenderer`（清画布、铺纸、分发） |
| `src/flag-drawers.ts` | 全部旗帜绘制函数、`templateDrawers` 分发表、`drawGenericFlag` fallback |
| `src/browser.ts` | IIFE 入口，挂载 `window.RoughEmoji` |
| `src/flag-utils.ts` | 国旗 emoji 解析 |
| `src/render-context.ts` | `withCanvas` 全局上下文切换 |
| `src/constant.ts` | `PALETTE`, `TEMPLATE_FLAGS` 等 |
| `src/types.ts` | 对外类型 |
| `index.html` | 批量视觉 QA：240+ 地区、搜索、样本区、内联样式与渲染脚本 |
| `rough-emoji-app.js` | 可选表单 demo（`#rough-canvas` 等）；**不**进入 npm 产物 |
| `dist/rough-emoji.js` | 浏览器 IIFE bundle |

### index.html 页面地图

- **Header**: 标题、tagline、npm/GitHub/English/作者链接、`#status`（`aria-live="polite"`）
- **Intro**: 项目说明、安装 snippet、README 链接
- **Search**: `#flag-search`，按 ISO 代码或中文名过滤
- **Samples**: `#samples` — 重点旗帜
- **Grid**: `#grid` — 其余地区
- **Footer**: 版本、`pnpm` 包名、技术栈说明

内联脚本职责：地区列表、`renderFlagCard`、`loadScript` 链式加载库与 demo 脚本、搜索过滤。不要与 `rough-emoji-app.js` 的表单逻辑混在同一模块 unless refactoring with user approval.

### 库边界（UI 改动时必须遵守）

- UI 任务默认只改 `index.html`、`rough-emoji-app.js`、README 中的示例片段。
- 新旗帜绘制 → `src/flag-drawers.ts`，并在 `templateDrawers` 注册。
- 识别 / fallback 逻辑 → `src/flag-utils.ts` 或 `drawGenericFlag`。
- 不要为 demo 引入框架或全局状态库。
- QA 页批量 `RoughEmoji.draw` 时注意性能：避免在循环里泄漏全局 canvas 上下文；`withCanvas` 已处理切换。

### 验证命令

```bash
pnpm run typecheck
pnpm run build
pnpm run dev    # http://localhost:3000/ — 勿用 file://
```

### 文案

- 页面主语言：简体中文；保留 English README 入口。
- 技术术语可中英并存（Rough.js、Canvas、npm 包名）。
- 状态文案示例：「共 N 个地区，统一手绘风格」「筛选结果：X / N」。
