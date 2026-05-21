/** 单页演示入口使用的 DOM 选择器，QA 页面不存在这些节点时只暴露全局 API。 */
export const ELEMENT_SELECTORS = {
  canvas: "#rough-canvas",
  form: "#emoji-form",
  input: "#emoji-input",
  downloadButton: "#download-button",
} as const;

/** 默认绘制国旗，供首次打开页面、prompt 默认值和非法输入回退共用。 */
export const DEFAULT_FLAG = "🇨🇳";

/** 下载文件名前缀，最终文件名会追加当前绘制的国旗 emoji。 */
export const DOWNLOAD_FILE_PREFIX = "rough-flag";

/** 首次进入单页演示时提示用户输入国旗的文案。 */
export const FLAG_PROMPT_MESSAGE = "请输入要绘制的国旗";

/** 已有专门手写模板的国旗 emoji，避免绘制分支散落字面量。 */
export const TEMPLATE_FLAGS = {
  china: "🇨🇳",
  japan: "🇯🇵",
  unitedStates: "🇺🇸",
  australia: "🇦🇺",
  thailand: "🇹🇭",
  france: "🇫🇷",
  italy: "🇮🇹",
  spain: "🇪🇸",
  vatican: "🇻🇦",
} as const;

/** Unicode 区域指示符起始码点，两个区域指示符组成国旗 emoji。 */
export const REGION_INDICATOR_MIN_CODE_POINT = 0x1f1e6;

/** Unicode 区域指示符结束码点，用于限制国旗 emoji 的合法范围。 */
export const REGION_INDICATOR_MAX_CODE_POINT = 0x1f1ff;

/** 离屏 emoji 栅格化时使用的像素倍率，保证高分屏采样足够细。 */
export const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

/** 全局视觉色板：纸张、边框和投影色在多个旗帜绘制函数中复用。 */
export const PALETTE = {
  paper: "#fbfdfa",
  frame: "#d9e3db",
  shadow: "rgba(36, 49, 44, 0.08)",
} as const;
