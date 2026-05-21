import { RoughEmoji } from "./rough-emoji";
import { RoughEmojiApp } from "./rough-emoji-app";
import type { RoughEmojiApi } from "./types";

/** 浏览器 script 标签入口：挂载 window.RoughEmoji，并在演示页自动绑定表单。 */
const browserWindow = globalThis as typeof globalThis & Partial<{ RoughEmoji: RoughEmojiApi }>;
browserWindow.RoughEmoji = RoughEmoji;
new RoughEmojiApp(RoughEmoji).mount();
