# Rough Emoji Draw

[中文 README](./README.md)

Rough Emoji Draw is a lightweight frontend library that renders Unicode flag emojis as hand-drawn Rough.js-style Canvas images. The core drawing logic is written in TypeScript and built with Rslib into ESM, CommonJS, and IIFE outputs. Rough.js is bundled with the library, so you can use it after install or by referencing the build artifacts—no extra CDN is required.

## Features

- Draw Unicode flag emojis onto a given `canvas`.
- Hand-drawn templates for common flags such as China, Japan, the United States, Australia, Thailand, France, Italy, Spain, and Vatican City.
- A unified fallback pipeline via emoji rasterization and pixel sampling for flags without dedicated templates.
- Three integration paths: npm `import` / Node `require`, and browser `<script>` with the global `window.RoughEmoji`.
- TypeScript declaration files for API autocomplete in TS projects.
- An `index.html` batch QA page to visually inspect 240+ country/region flags.

## Tech Stack

- TypeScript
- DOM Canvas
- Rough.js
- Rslib

## Requirements

- Node.js 20 or later (use `.nvmrc`: `nvm use`)
- [pnpm](https://pnpm.io/) 9 or later (recommended via Corepack: `corepack enable`)

## Quick Start

Install dependencies:

```bash
pnpm install
```

Run type checking:

```bash
pnpm run typecheck
```

Build artifacts:

```bash
pnpm run build
```

The build produces:

| File | Format | Purpose |
| --- | --- | --- |
| `dist/index.js` | ESM | `import` |
| `dist/index.cjs` | CJS | Node.js `require()` |
| `dist/index.d.ts` | Types | TypeScript entry |
| `dist/rough-emoji.js` | IIFE (minified) | Browser `<script>` tag |

Preview the QA page locally (do not open HTML via `file://`; browsers block local JS):

```bash
pnpm run dev
```

Then open [http://localhost:3000/](http://localhost:3000/) in your browser.

## Usage

### npm package (ESM)

```ts
import { RoughEmoji } from "rough-emoji-draw";

const canvas = document.querySelector<HTMLCanvasElement>("#flag-canvas")!;
RoughEmoji.draw(canvas, "🇨🇳");
```

### npm package (CommonJS / Node)

```js
const { RoughEmoji } = require("rough-emoji-draw");

console.log(typeof RoughEmoji.draw); // "function"
```

> Drawing requires a Canvas and DOM environment. The API loads fine on Node, but `draw` must run in a browser, jsdom, `node-canvas`, or another Canvas-capable runtime.

### Browser `<script>` tag

Load the IIFE bundle only; it automatically attaches `window.RoughEmoji`:

```html
<script src="./dist/rough-emoji.js"></script>
<canvas id="flag-canvas" width="720" height="720"></canvas>
<script>
  const canvas = document.querySelector("#flag-canvas");
  window.RoughEmoji.draw(canvas, "🇨🇳");
</script>
```

If the page includes the demo form DOM (`#rough-canvas`, `#emoji-form`, etc.), interaction and download handlers are wired up automatically.

## API

### `RoughEmoji.draw(canvasElement, value)`

Normalizes the input to a flag emoji and draws it on the given `HTMLCanvasElement`. Invalid input falls back to the China flag.

### `RoughEmoji.isFlagEmoji(value)`

Returns whether the string is a flag emoji composed of two regional indicator symbols.

### `RoughEmoji.resolveFlag(value)`

Converts arbitrary input into a drawable flag emoji. Only valid flag emojis are accepted; invalid values fall back to `🇨🇳`.

### Type exports

```ts
import type { RoughEmojiApi } from "rough-emoji-draw";
```

You can also import `RoughOptions`, `Point`, `RoughCanvasLike`, and the demo page helper `RoughEmojiApp` as needed.

## Project Structure

```text
.
├── src/
│   ├── index.ts           # npm library entry; exports API and types
│   ├── browser.ts         # browser IIFE entry; mounts window.RoughEmoji
│   ├── rough-emoji.ts     # core drawing logic
│   ├── rough-emoji-app.ts # single-page demo DOM bindings
│   ├── flag-utils.ts      # flag emoji parsing and validation
│   ├── render-context.ts  # canvas context switching
│   ├── constant.ts        # static constants and template map
│   └── types.ts           # public type declarations
├── index.html             # batch visual QA page
├── rslib.config.ts        # Rslib multi-format build config
├── tsconfig.json          # TypeScript config
└── package.json           # scripts, dependencies, and exports
```

## Development Notes

- Add new flags in `src/rough-emoji.ts` with dedicated draw functions and register them in the template dispatch table.
- Draw functions use a square canvas coordinate system; derive new coordinates from `size` or existing flag layout variables.
- After changing drawing behavior, run `pnpm run typecheck`, then `pnpm run build`, and inspect results in `index.html`.
- `dist/` is build output and is usually not maintained as source; run `pnpm run build` before publishing or local preview.
