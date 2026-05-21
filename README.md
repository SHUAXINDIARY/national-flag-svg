# Rough Emoji Draw

Rough Emoji Draw 是一个把国旗 emoji 绘制成手写风格 Canvas 图像的轻量前端项目。项目使用 TypeScript 编写核心绘制逻辑，通过 Rslib 打包为浏览器可直接加载的 IIFE 产物，并在源码中引入 Rough.js 提供粗糙线条、填充和边框效果。

## 功能特性

- 将 Unicode 国旗 emoji 绘制到指定 `canvas`。
- 内置中国、日本、美国、澳大利亚、泰国、法国、意大利、西班牙、梵蒂冈等常见旗帜的手写模板。
- 对未单独适配的国旗使用 emoji 栅格化与像素采样流程生成统一风格的 fallback 图像。
- 暴露 `window.RoughEmoji` 全局 API，适合在无框架 HTML 页面中直接调用。
- 提供 `flag-qa.html` 批量 QA 页面，用于检查国家/地区旗帜绘制效果。

## 技术栈

- TypeScript
- DOM Canvas
- Rough.js
- Rslib

## 快速开始

安装依赖：

```bash
npm install
```

执行类型检查：

```bash
npm run typecheck
```

构建浏览器产物：

```bash
npm run build
```

构建完成后会生成 `dist/rough-emoji.js`。在浏览器中打开 `flag-qa.html`，即可查看批量国旗绘制结果。

## 浏览器使用

页面只需要加载本项目构建产物，Rough.js 会由 Rslib 打包进 `dist/rough-emoji.js`：

```html
<script src="./dist/rough-emoji.js"></script>
```

调用示例：

```html
<canvas id="flag-canvas" width="720" height="720"></canvas>
<script>
  const canvas = document.querySelector("#flag-canvas");

  window.RoughEmoji.draw(canvas, "🇨🇳");
</script>
```

## 全局 API

`window.RoughEmoji.draw(canvasElement, value)`

把输入值规范化为国旗 emoji，并绘制到传入的 `HTMLCanvasElement`。非法输入会回退为中国国旗。

`window.RoughEmoji.isFlagEmoji(value)`

判断字符串是否为由两个区域指示符组成的国旗 emoji。

`window.RoughEmoji.resolveFlag(value)`

把任意输入转换为可绘制的国旗 emoji；当前只接受合法国旗 emoji，非法值回退为 `🇨🇳`。

## 项目结构

```text
.
├── src/
│   └── rough-emoji.ts   # 核心绘制逻辑与全局 API
├── flag-qa.html         # 批量视觉 QA 页面
├── rslib.config.ts      # Rslib 构建配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 脚本与依赖声明
```

## 开发说明

- 新增旗帜优先在 `src/rough-emoji.ts` 中补充独立绘制函数，并在 `drawFlag` 分支中接入。
- 绘制函数按正方形画布坐标系工作，新增坐标建议基于当前 `size` 或已有旗帜区域变量推导。
- 修改绘制效果后，先运行 `npm run typecheck`，再运行 `npm run build` 并打开 `flag-qa.html` 进行视觉检查。
- `dist/` 为构建产物，通常不作为源码维护对象；只有需要同步可直接打开的浏览器产物时才更新。