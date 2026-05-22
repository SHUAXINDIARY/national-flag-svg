---
name: Rough Emoji Draw
description: 手绘风国旗 Canvas 库的纸张绿预览页设计系统
colors:
  page-bg: "#f4f8f5"
  paper: "#fbfdfa"
  border: "#d9e3db"
  border-subtle: "#e2ebe5"
  border-input: "#c5d4cb"
  primary: "#2f6b4f"
  primary-hover: "#245a42"
  text: "#1f2933"
  text-muted: "#52645d"
  text-secondary: "#374151"
  placeholder: "#8a9a94"
  code-bg: "#eef5f0"
  input-bg: "#ffffff"
  canvas-paper: "#fbfdfa"
  canvas-frame: "#d9e3db"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "22px"
    fontWeight: 650
    lineHeight: 1.2
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 450
    lineHeight: 1.6
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 550
    lineHeight: 1.4
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.92em"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "8px"
spacing:
  xs: "8px"
  sm: "10px"
  md: "14px"
  lg: "18px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "7px 14px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "7px 14px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "7px 14px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "0"
  search-input:
    backgroundColor: "{colors.input-bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: Rough Emoji Draw

## 1. Overview

**Creative North Star: "The Flag Atlas Page"**

像一本摊开的手工旗谱：浅绿纸张、细线框、深绿书签式链接，中间是大片旗帜 Canvas 网格。页面是图录的封面与目录，不是另一个 dashboard。

整体偏 flat：深度靠纸色层次与 1px 边框，不用阴影堆叠。密度适中，240+ 卡片靠 responsive grid 自适应，搜索栏是唯一主要交互。

**Key Characteristics:**

- 纸张绿中性底 + 单一深绿 accent
- Inter 系统字体栈，无装饰性 display 字体
- 8px 圆角卡片，canvas 1:1 比例
- 中文主文案，技术 snippet 用 monospace
- 与 Canvas 内 `PALETTE.paper` / `PALETTE.frame` 视觉连续

## 2. Colors

克制的中性绿调 palette，accent 仅用于导航、链接、焦点与主按钮。

### Primary

- **Forest Ink** (`#2f6b4f`): 主链接、`.repo-link` 背景、搜索框 focus outline、footer 链接。
- **Forest Deep** (`#245a42`): primary hover、`.repo-link:hover`。

### Neutral

- **Meadow Wash** (`#f4f8f5`): 页面背景 `body`。
- **Ledger Paper** (`#fbfdfa`): intro、search bar、卡片、secondary 按钮背景；与库内 `PALETTE.paper` 一致。
- **Reed Border** (`#d9e3db`): 卡片、intro、search、footer 顶部分割线。
- **Mist Divider** (`#e2ebe5`): 卡片内 canvas 与 label 之间 `border-top`。
- **Sage Stroke** (`#c5d4cb`): 输入框与 secondary 按钮边框。
- **Ink Body** (`#1f2933`): 标题、输入文字、code 字色。
- **Moss Muted** (`#52645d`): tagline、status、footer、`.name`。
- **Fern Secondary** (`#374151`): intro 正文、search label。
- **Fog Placeholder** (`#8a9a94`): search placeholder。
- **Code Wash** (`#eef5f0`): 行内 `code` 背景。

### Named Rules

**The One Accent Rule.** 深绿 `#2f6b4f` 用于可点击与焦点，不做大面积填色块（除单个 primary CTA）。彩色来自旗帜 Canvas，不是页面 chrome。

## 3. Typography

**Display / Body Font:** Inter, ui-sans-serif, system-ui（含 `-apple-system`, Segoe UI fallback）

**Mono Font:** ui-monospace, SF Mono, Menlo, Consolas（npm 命令、API snippet）

**Character:** 清晰、略加重标题（650），正文 14px 易读；不追求 editorial 大字号 contrast。

### Hierarchy

- **Display** (650, 22px, ~1.2): 页面 `h1`「Rough Emoji Draw」。
- **Tagline** (450, 14px, 1.45): `.site-tagline`，muted 色。
- **Body** (450, 14px, 1.6): `.intro` 段落，max 宽度由 main 容器约束。
- **Label** (550, 13–14px): 卡片 `.label`、`.search-label`、footer。
- **Mono inline** (400, 0.92em): `code` 块，浅绿底。

## 4. Elevation

Flat-by-default。卡片不用 box-shadow；层次来自：

- 纸色块 (`#fbfdfa`) 与页面底 (`#f4f8f5`) 的对比
- 1px 实线边框
- Canvas 内 Rough.js 手绘阴影（库绘制，非页面 CSS）

页面 chrome 不引入 drop shadow。若未来需要 hover 反馈，优先 border-color 变化（如 `.secondary-link:hover`）。

## 5. Components

### Buttons / Links

- **Primary (`.repo-link`)**: 6px 半径，padding 7×14px，填充 `#2f6b4f`，字 `#fbfdfa`，hover `#245a42`，`:focus-visible` 2px outline。
- **Secondary (`.secondary-link`)**: 纸底 + `#c5d4cb` 边框，字 `#2f6b4f`，hover 边框与背景 `#eef5f0`。

### Cards (`.item`)

- **Corner:** 8px
- **Background:** `#fbfdfa`
- **Border:** 1px `#d9e3db`
- **Canvas:** 100% 宽，`aspect-ratio: 1`
- **Label row:** 上边框 `#e2ebe5`，flex 空间分配 code / name / emoji

### Search (`.search-bar` + `.search-input`)

- 容器与 intro 同 paper/border 语言，padding 12–14px
- 输入：白底、6px 半径、`#c5d4cb` 边框，focus 2px `#2f6b4f` outline
- `role="search"`，`aria-label` 描述过滤方式

### Status (`#status`)

- `aria-live="polite"`，14px muted 色，报告渲染/筛选/错误状态

### Layout

- **Main:** `min(1280px, calc(100vw - 32px))`，垂直 padding 24–36px
- **Grid:** `repeat(auto-fill, minmax(180px, 1fr))`，gap 14px
- **Sample grid:** minmax 220px，gap 16px，底部 margin 22px

## 6. Do's and Don'ts

### Do:

- **Do** 沿用 `#f4f8f5` / `#fbfdfa` / `#2f6b4f` 三角关系扩展新 UI。
- **Do** 新交互控件补全 `aria-label` 与可见 focus 态。
- **Do** 保持 grid + search 的浏览模型；状态变更写进 `#status`。
- **Do** 脚本加载顺序：`dist/rough-emoji.js` → `rough-emoji-app.js` → 页内逻辑。

### Don't:

- **Don't** 使用紫/indigo 渐变、neon 深色主题或 glassmorphism（见 PRODUCT.md anti-references）。
- **Don't** 引入 hero 指标模板、同质 icon+标题卡片营销栅格。
- **Don't** 用 `border-left` 粗色条做 callout accent。
- **Don't** 为 UI 小改动手改 `src/flag-drawers.ts` 或破坏 `RoughEmoji` API。
- **Don't** 用 `file://` 打开预览页；本地用 `pnpm run dev` 访问 `http://localhost:3000/`。
