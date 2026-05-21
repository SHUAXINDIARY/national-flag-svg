import rough from "roughjs";
import type { RoughCanvasLike } from "./types";

/** 当前正在绘制的 2D 上下文，由 withCanvas 在每次绘制前切换。 */
export let ctx: CanvasRenderingContext2D;

/** 当前正在绘制的 Rough.js 上下文，与 ctx 生命周期保持一致。 */
export let roughCanvas: RoughCanvasLike;

/** 当前画布尺寸，绘制函数都按正方形画布坐标系工作。 */
export let size = 0;

/** 临时切换全局绘制上下文，让同一套绘制函数可以服务单页画布和 QA 多画布。 */
export function withCanvas(canvasElement: HTMLCanvasElement, callback: () => void) {
  const previous = { ctx, roughCanvas, size };
  const nextContext = canvasElement.getContext("2d", { willReadFrequently: true });

  if (!nextContext) {
    throw new Error("Canvas 2D context is not available.");
  }

  ctx = nextContext;
  roughCanvas = rough.canvas(canvasElement);
  size = canvasElement.width;
  try {
    callback();
  } finally {
    ctx = previous.ctx;
    roughCanvas = previous.roughCanvas;
    size = previous.size;
  }
}
