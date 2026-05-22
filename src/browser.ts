import { RoughEmoji } from "./rough-emoji";
import type { RoughEmojiApi } from "./types";

/** 浏览器 script 标签入口：挂载 window.RoughEmoji。 */
const browserWindow = globalThis as typeof globalThis & Partial<{ RoughEmoji: RoughEmojiApi }>;
browserWindow.RoughEmoji = RoughEmoji;
