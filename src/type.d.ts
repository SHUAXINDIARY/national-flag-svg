/** Rough.js 绘制参数的最小类型集合，只约束当前项目实际传入的标量配置。 */
export interface RoughOptions {
  /** Rough.js 配置项名称到标量值的映射，允许缺省以适配不同绘制方法。 */
  [key: string]: string | number | boolean | undefined;
}

/** 多边形点位。部分数组由 reduce/forEach 推导而来，所以保留为可变长度 number[]。 */
export type Point = number[];

/** 页面通过 CDN 注入的 rough.canvas 实例，只声明当前绘制流程用到的方法。 */
export interface RoughCanvasLike {
  /** 绘制多边形轮廓或填充区域，points 使用画布坐标点位。 */
  polygon(points: Point[], options?: RoughOptions): void;

  /** 绘制矩形区域，用于纸张背景、旗面和局部色块。 */
  rectangle(x: number, y: number, width: number, height: number, options?: RoughOptions): void;

  /** 绘制圆形或近似圆点，用于徽章、星点和采样细节。 */
  circle(x: number, y: number, diameter: number, options?: RoughOptions): void;

  /** 绘制线段，用于旗帜纹理、边缘和细节补充。 */
  line(x1: number, y1: number, x2: number, y2: number, options?: RoughOptions): void;
}

/** 暴露给 HTML 页面和 QA 工具使用的全局绘制 API。 */
export interface RoughEmojiApi {
  /** 将任意输入规范化为国旗 emoji，并绘制到指定 canvas。 */
  draw(canvasElement: HTMLCanvasElement, value: unknown): void;

  /** 判断字符串是否由两个区域指示符组成。 */
  isFlagEmoji(value: string): boolean;

  /** 把外部输入解析成可绘制国旗，非法值回退为默认国旗。 */
  resolveFlag(value: unknown): string;
}

/** CDN 版 Rough.js 提供的全局入口，Rslib 构建时不打包 Rough.js。 */
export interface RoughGlobal {
  /** 基于目标 canvas 创建 Rough.js 绘制上下文。 */
  canvas(canvasElement: HTMLCanvasElement): RoughCanvasLike;
}

declare global {
  /** HTML 页面通过 CDN 注入的 Rough.js 全局对象。 */
  const rough: RoughGlobal;
}
