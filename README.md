# Rough Emoji Draw

[English README](./README.en.md)

Rough Emoji Draw 是一个把 Unicode 国旗 emoji 绘制成 Rough.js 手写风格 Canvas 图像的轻量前端库。项目使用 TypeScript 编写核心绘制逻辑，通过 Rslib 同时输出 ESM、CommonJS 与 IIFE 产物；Rough.js 会随库一并打包，安装或引用构建产物即可使用，无需额外引入 CDN。

## 功能特性

- 将 Unicode 国旗 emoji 绘制到指定 `canvas`。
- 内置约 100 面国旗的手写模板（含中国、日本、美国、澳大利亚、泰国、法国、意大利、西班牙、梵蒂冈等），其余地区走统一的 emoji 栅格化与像素采样 fallback。
- 支持三种接入方式：npm `import` / Node `require`、浏览器 `<script>` 全局变量 `window.RoughEmoji`。
- 提供 TypeScript 类型声明，可在 TS 项目中直接获得 API 提示。
- 提供 `index.html` 批量 QA 页面，预览 240+ 国家/地区旗帜，支持按地区码或中文名搜索，并可一键复制透明背景 SVG。

## 技术栈

- TypeScript
- DOM Canvas
- Rough.js
- Rslib

## 环境要求

- Node.js 20 及以上（可用 `.nvmrc`：`nvm use`）
- [pnpm](https://pnpm.io/) 9 及以上（推荐通过 Corepack：`corepack enable`）

## 快速开始

安装依赖：

```bash
pnpm install
```

执行类型检查：

```bash
pnpm run typecheck
```

构建产物：

```bash
pnpm run build
```

构建完成后会生成：

| 文件 | 格式 | 用途 |
| --- | --- | --- |
| `dist/index.js` | ESM | `import` 引入 |
| `dist/index.cjs` | CJS | Node.js `require()` |
| `dist/index.d.ts` | 类型 | TypeScript 类型入口 |
| `dist/rough-emoji.js` | IIFE（压缩） | 浏览器 `<script>` 标签 |

本地预览 QA 页面（不要用 `file://` 直接打开 HTML，浏览器会拦截本地 JS）：

```bash
pnpm run dev
```

然后在浏览器访问 [http://localhost:3000/](http://localhost:3000/)。

## 使用方式

### npm 包（ESM）

```ts
import { RoughEmoji } from "rough-emoji-draw";

const canvas = document.querySelector<HTMLCanvasElement>("#flag-canvas")!;
RoughEmoji.draw(canvas, "🇨🇳");
```

也可按需导入独立工具函数：

```ts
import { isFlagEmoji, resolveFlag } from "rough-emoji-draw";
```

### npm 包（CommonJS / Node）

```js
const { RoughEmoji } = require("rough-emoji-draw");

console.log(typeof RoughEmoji.draw); // "function"
```

> 绘制依赖 Canvas 与 DOM 环境。Node 侧可正常加载 API，实际调用 `draw` 时需要在浏览器、jsdom 或 `node-canvas` 等具备 Canvas 的运行时中使用。

### 浏览器 `<script>` 标签

页面只需加载 IIFE 产物，会自动挂载 `window.RoughEmoji`：

```html
<script src="./dist/rough-emoji.js"></script>
<canvas id="flag-canvas" width="720" height="720"></canvas>
<script>
  const canvas = document.querySelector("#flag-canvas");
  window.RoughEmoji.draw(canvas, "🇨🇳");
</script>
```

也可通过包导出子路径引用同一 IIFE 文件：

```html
<script src="./node_modules/rough-emoji-draw/dist/rough-emoji.js"></script>
```

若页面包含演示表单 DOM（`#rough-canvas`、`#emoji-form` 等），可额外加载 `demo/rough-emoji-app.js` 绑定交互与 PNG 下载逻辑：

```html
<script src="./dist/rough-emoji.js"></script>
<script type="module" src="./demo/rough-emoji-app.js"></script>
```

## API

### `RoughEmoji.draw(canvasElement, value)`

把输入值规范化为国旗 emoji，并绘制到传入的 `HTMLCanvasElement`。非法输入会回退为中国国旗。

### `RoughEmoji.isFlagEmoji(value)`

判断字符串是否为由两个区域指示符组成的国旗 emoji。也可作为命名导出 `isFlagEmoji` 直接使用。

### `RoughEmoji.resolveFlag(value)`

把任意输入转换为可绘制的国旗 emoji；当前只接受合法国旗 emoji，非法值回退为 `🇨🇳`。也可作为命名导出 `resolveFlag` 直接使用。

### 类型导出

```ts
import type { RoughEmojiApi } from "rough-emoji-draw";
```

还可按需导入 `RoughOptions`、`Point`、`RoughCanvasLike`。

## 项目结构

```text
.
├── src/
│   ├── index.ts          # npm 库入口，导出 API 与类型
│   ├── browser.ts        # 浏览器 IIFE 入口，挂载 window.RoughEmoji
│   ├── rough-emoji.ts    # 绘制门面与渲染调度
│   ├── flag-drawers.ts   # 各国旗手写模板与 fallback 绘制
│   ├── flag-utils.ts     # 国旗 emoji 解析与校验
│   ├── render-context.ts # Canvas 上下文切换
│   ├── constant.ts       # 静态常量与模板映射
│   └── types.ts          # 对外类型声明
├── demo/
│   ├── index.js              # index.html 批量 QA 页脚本（搜索、渲染、复制 SVG）
│   ├── index-svg-export.js   # Canvas 旗面裁剪与透明 SVG 导出
│   └── rough-emoji-app.js    # 单页演示表单绑定与 PNG 下载（不进入 npm 产物）
├── index.html            # 批量视觉 QA 页面
├── rslib.config.ts       # Rslib 多格式构建配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 脚本、依赖与 exports 字段
```

## 开发说明

- 新增旗帜优先在 `src/flag-drawers.ts` 中补充独立绘制函数，并在 `templateDrawers` 分发表中接入；`src/rough-emoji.ts` 负责调度，不直接承载具体旗面绘制。
- 绘制函数按正方形画布坐标系工作，新增坐标建议基于当前 `size` 或已有旗帜区域变量推导。
- 修改绘制效果后，先运行 `pnpm run typecheck`，再运行 `pnpm run build`，并通过 `pnpm run dev` 打开 `index.html` 进行视觉检查。
- `demo/` 下的页面脚本仅用于本地演示与 QA，不随 npm 包发布；`dist/` 为构建产物，通常不作为源码维护对象。
