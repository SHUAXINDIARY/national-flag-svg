import {
  DEFAULT_FLAG,
  DEVICE_PIXEL_RATIO,
  DOWNLOAD_FILE_PREFIX,
  ELEMENT_SELECTORS,
  FLAG_PROMPT_MESSAGE,
  PALETTE,
  REGION_INDICATOR_MAX_CODE_POINT,
  REGION_INDICATOR_MIN_CODE_POINT,
  TEMPLATE_FLAGS,
} from "./constant";
import type { RoughCanvasLike, RoughEmojiApi } from "./type";

/** 单页绘制入口的画布；QA 页不存在该节点时只暴露全局 API。 */
const canvas = document.querySelector<HTMLCanvasElement>(ELEMENT_SELECTORS.canvas);
/** 单页绘制入口的表单，用于提交用户输入的国旗。 */
const form = document.querySelector<HTMLFormElement>(ELEMENT_SELECTORS.form);
/** 单页绘制入口的输入框，值会被 resolveFlag 校验后绘制。 */
const input = document.querySelector<HTMLInputElement>(ELEMENT_SELECTORS.input);
/** 单页绘制入口的下载按钮，把当前画布导出成 PNG。 */
const downloadButton = document.querySelector<HTMLButtonElement>(ELEMENT_SELECTORS.downloadButton);
/** 当前正在绘制的 2D 上下文，由 withCanvas 在每次绘制前切换。 */
let ctx: CanvasRenderingContext2D;
/** 当前正在绘制的 Rough.js 上下文，与 ctx 生命周期保持一致。 */
let roughCanvas: RoughCanvasLike;
/** 当前画布尺寸，绘制函数都按正方形画布坐标系工作。 */
let size = 0;
/** 页面和 QA 工具共享的绘制门面：输入 emoji，输出到指定 canvas。 */
const RoughEmoji: RoughEmojiApi = {
  draw(canvasElement, value) {
    withCanvas(canvasElement, () => drawFlag(resolveFlag(value)));
  },
  isFlagEmoji,
  resolveFlag,
};

/** 给 IIFE 产物补充全局属性类型，保持 HTML 内联脚本可用 window.RoughEmoji。 */
const browserWindow = window as Window & Partial<{ RoughEmoji: RoughEmojiApi }>;
browserWindow.RoughEmoji = RoughEmoji;

/** 如果当前页面包含交互表单，就自动完成首次绘制和表单事件绑定。 */
if (canvas && form && input && downloadButton) {
  withCanvas(canvas, () => {
    const params = new URLSearchParams(window.location.search);
    const initialFlag =
      params.get("flag") || window.prompt(FLAG_PROMPT_MESSAGE, DEFAULT_FLAG) || DEFAULT_FLAG;

    input.value = initialFlag;
    drawFlag(resolveFlag(initialFlag));

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      drawFlag(resolveFlag(input.value));
    });

    downloadButton.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = `${DOWNLOAD_FILE_PREFIX}-${resolveFlag(input.value)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });
}

/** 临时切换全局绘制上下文，让同一套绘制函数可以服务单页画布和 QA 多画布。 */
function withCanvas(canvasElement, callback) {
  const previous = { ctx, roughCanvas, size };

  ctx = canvasElement.getContext("2d", { willReadFrequently: true });
  roughCanvas = rough.canvas(canvasElement);
  size = canvasElement.width;
  callback();
  ctx = previous.ctx;
  roughCanvas = previous.roughCanvas;
  size = previous.size;
}

/** 绘制总入口：先铺纸张背景，再按已知旗帜走手写模板，未知旗帜走像素采样流程。 */
function drawFlag(flag) {
  clearCanvas();
  drawPaper();
  if (flag === TEMPLATE_FLAGS.china) {
    drawChinaFlag();
    return;
  }

  if (flag === TEMPLATE_FLAGS.japan) {
    drawJapanFlag();
    return;
  }

  if (flag === TEMPLATE_FLAGS.unitedStates) {
    drawUnitedStatesFlag();
    return;
  }

  if (flag === TEMPLATE_FLAGS.australia) {
    drawAustraliaFlag();
    return;
  }

  if (flag === TEMPLATE_FLAGS.thailand) {
    drawThailandFlag();
    return;
  }

  if (flag === TEMPLATE_FLAGS.france) {
    drawFranceFlag();
    return;
  }

  if (flag === TEMPLATE_FLAGS.italy) {
    drawItalyFlag();
    return;
  }

  if (flag === TEMPLATE_FLAGS.spain) {
    drawSpainFlag();
    return;
  }

  if (flag === TEMPLATE_FLAGS.vatican) {
    drawVaticanFlag();
    return;
  }

  drawGenericFlag(flag);
}

/** 把任意输入规范化为可绘制的国旗 emoji；非法输入回退到中国国旗。 */
function resolveFlag(value) {
  const input = String(value || "").trim();

  return isFlagEmoji(input) ? input : DEFAULT_FLAG;
}

/** 判断字符串是否由两个区域指示符组成，这是 Unicode 国旗 emoji 的编码形式。 */
function isFlagEmoji(value) {
  const codePoints = [...value].map((char) => char.codePointAt(0));
  return (
    codePoints.length === 2 &&
    codePoints.every(
      (codePoint) =>
        codePoint >= REGION_INDICATOR_MIN_CODE_POINT &&
        codePoint <= REGION_INDICATOR_MAX_CODE_POINT,
    )
  );
}

/** 清空当前画布，为下一次完整重绘做准备。 */
function clearCanvas() {
  ctx.clearRect(0, 0, size, size);
}

/** 绘制统一纸张底色和粗糙边框，给所有旗帜提供一致的手绘载体。 */
function drawPaper() {
  ctx.fillStyle = PALETTE.paper;
  ctx.fillRect(0, 0, size, size);

  roughCanvas.rectangle(46, 46, size - 92, size - 92, {
    roughness: 1.4,
    bowing: 0.8,
    stroke: PALETTE.frame,
    strokeWidth: 1.2,
    fill: PALETTE.paper,
    fillStyle: "hachure",
    hachureGap: 24,
    fillWeight: 0.28,
  });
}

/** 中国国旗模板：红色旗面、布纹、五颗手绘五角星和最终边框。 */
function drawChinaFlag() {
  const flag = makeSketchRect(118, 174, 486, 342);

  roughCanvas.polygon(flag, {
    stroke: "#8c1f23",
    strokeWidth: 3.2,
    fill: "#de2f36",
    fillStyle: "solid",
    roughness: 2.4,
    bowing: 1.4,
  });

  roughCanvas.polygon(flag, {
    stroke: "#b7252c",
    strokeWidth: 1.2,
    fill: "#d92831",
    fillStyle: "hachure",
    hachureAngle: -8,
    hachureGap: 14,
    fillWeight: 1.1,
    roughness: 2.1,
    bowing: 1.1,
  });

  drawFabricStrokes(132, 196, 458, 292, "#981d25");
  drawSketchStar(210, 262, 54, -18);
  drawSketchStar(294, 214, 20, 17);
  drawSketchStar(330, 266, 20, 38);
  drawSketchStar(330, 324, 20, 8);
  drawSketchStar(290, 374, 20, 24);

  roughCanvas.polygon(makeSketchRect(118, 174, 486, 342), {
    stroke: "#28332e",
    strokeWidth: 2.1,
    fill: "transparent",
    roughness: 2.8,
    bowing: 1.6,
  });
}

/** 日本国旗模板：浅色旗面加中心红日，并叠加纸纹和边框。 */
function drawJapanFlag() {
  const flag = makeSketchRect(128, 172, 464, 344);

  roughCanvas.polygon(flag, {
    stroke: "#d6ded7",
    strokeWidth: 2.4,
    fill: "#fbfdfa",
    fillStyle: "hachure",
    hachureAngle: -10,
    hachureGap: 17,
    fillWeight: 0.45,
    roughness: 2.1,
    bowing: 1.2,
  });

  roughCanvas.circle(360, 344, 166, {
    stroke: "#9f2936",
    strokeWidth: 2.4,
    fill: "#cf3346",
    fillStyle: "solid",
    roughness: 2.4,
    bowing: 1.3,
  });

  roughCanvas.circle(360, 344, 155, {
    stroke: "rgba(159, 41, 54, 0.48)",
    strokeWidth: 1.1,
    fill: "#cf3346",
    fillStyle: "hachure",
    hachureAngle: -12,
    hachureGap: 13,
    fillWeight: 0.9,
    roughness: 2.1,
  });

  drawFabricStrokes(150, 198, 420, 280, "#cbd8ce");
  roughCanvas.polygon(flag, {
    stroke: "#28332e",
    strokeWidth: 1.6,
    fill: "transparent",
    roughness: 2.5,
    bowing: 1.5,
  });
}

/** 美国国旗模板：按标准格子画 13 道条纹、蓝色 canton 和 50 颗星。 */
function drawUnitedStatesFlag() {
  const flagBox = {
    x: 118,
    y: 174,
    width: 486,
    height: 342,
  };
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  roughCanvas.polygon(offsetPoints(flag, 8, 10), {
    stroke: "transparent",
    fill: PALETTE.shadow,
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });

  roughCanvas.polygon(flag, {
    stroke: "#b9c4c0",
    strokeWidth: 2.4,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.4,
    bowing: 1.4,
  });

  for (let row = 0; row < 13; row += 1) {
    if (row % 2 !== 0) {
      continue;
    }

    drawFlagBand(flagBox, 0, row / 13, 1, (row + 1) / 13, "#c83c4a", "#8f2633");
  }

  drawFlagBand(flagBox, 0, 0, 0.43, 7 / 13, "#314d7c", "#20375e");
  drawUSStars(flagBox);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8d2d37");

  roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
    stroke: "#28332e",
    strokeWidth: 2,
    fill: "transparent",
    roughness: 2.8,
    bowing: 1.6,
  });
}

/** 澳大利亚国旗模板：蓝底、左上联合旗和南十字星区域。 */
function drawAustraliaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#243f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0, 1, 1, "#243f78", "#1b2c56");
  drawUnionJackCanton(flagBox);
  drawSketchStarWithColors(mapFlagX(0.24, 0.72, flagBox), mapFlagY(0.24, 0.72, flagBox), 24, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.72)",
  });

  [
    [0.74, 0.28, 13, 4],
    [0.84, 0.44, 11, -12],
    [0.72, 0.58, 13, 10],
    [0.62, 0.45, 12, -8],
    [0.78, 0.72, 8, 18],
  ].forEach(([u, v, radius, rotation]) => {
    drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), radius, rotation, {
      stroke: "#c7d1cc",
      fill: "#fbfdfa",
      hatch: "rgba(251, 253, 250, 0.68)",
    });
  });

  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1a315e");
  drawFlagBorder(flagBox);
}

/** 泰国国旗模板：用归一化纵向比例绘制红白蓝白红五条横带。 */
function drawThailandFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 6, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 6, 1, 2 / 6, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 6, 1, 4 / 6, "#273f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 4 / 6, 1, 5 / 6, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 5 / 6, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#7f2c42");
  drawFlagBorder(flagBox);
}

/** 法国国旗模板：用三等分竖带绘制蓝白红三色旗。 */
function drawFranceFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#2d4e8c", "#1e3768");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#cf3d45", "#912936");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8b334e");
  drawFlagBorder(flagBox);
}

/** 意大利国旗模板：用三等分竖带绘制绿白红三色旗。 */
function drawItalyFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#2f8e5c", "#1f6540");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f6848");
  drawFlagBorder(flagBox);
}

/** 西班牙国旗模板：红黄红横带，并在左侧绘制简化徽章。 */
function drawSpainFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f3c735", "#b78618");
  drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83a3e", "#8f2633");
  drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#f3c735", "#b78618");
  drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83a3e", "#8f2633");
  drawSpainEmblem(flagBox);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#9c5524");
  drawFlagBorder(flagBox);
}

/** 梵蒂冈国旗模板：黄白双竖带，并绘制简化钥匙与冠饰。 */
function drawVaticanFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.5, 1, "#f4cf34", "#a98218");
  drawFlagBand(flagBox, 0.5, 0, 1, 1, "#fbfdfa", "#c7d1cc");
  drawVaticanEmblem(flagBox);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#b49835");
  drawFlagBorder(flagBox);
}

/** 返回大多数旗帜共用的画布内旗面矩形，后续归一化坐标都会映射到该区域。 */
function makeStandardFlagBox() {
  return {
    x: 118,
    y: 174,
    width: 486,
    height: 342,
  };
}

/** 根据旗面轮廓偏移一层半透明多边形，形成手绘纸面上的轻微投影。 */
function drawFlagShadow(flag) {
  roughCanvas.polygon(offsetPoints(flag, 8, 10), {
    stroke: "transparent",
    fill: PALETTE.shadow,
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
}

/** 绘制一个纯色粗糙旗面，作为具体图案、条带和徽章的底层。 */
function drawBlankFlag(flag, fill, stroke) {
  roughCanvas.polygon(flag, {
    stroke,
    strokeWidth: 2.4,
    fill,
    fillStyle: "solid",
    roughness: 2.4,
    bowing: 1.4,
  });
}

/** 用重新抖动的矩形轮廓描边，让旗帜外框保持自然不完全重合。 */
function drawFlagBorder(flagBox) {
  roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
    stroke: "#28332e",
    strokeWidth: 2,
    fill: "transparent",
    roughness: 2.8,
    bowing: 1.6,
  });
}

/** 在给定旗面左上区域绘制简化联合旗，供澳大利亚等旗帜复用。 */
function drawUnionJackCanton(flagBox) {
  const canton = {
    x: flagBox.x,
    y: flagBox.y,
    width: flagBox.width * 0.5,
    height: flagBox.height * 0.5,
  };

  drawFlagBand(canton, 0, 0, 1, 1, "#314d7c", "#20375e");
  drawCantonLine(canton, 0, 0, 1, 1, "#fbfdfa", 13);
  drawCantonLine(canton, 1, 0, 0, 1, "#fbfdfa", 13);
  drawCantonLine(canton, 0, 0, 1, 1, "#c83c4a", 5);
  drawCantonLine(canton, 1, 0, 0, 1, "#c83c4a", 5);
  drawFlagBand(canton, 0.42, 0, 0.58, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(canton, 0, 0.38, 1, 0.62, "#fbfdfa", "#c7d1cc");
  drawFlagBand(canton, 0.46, 0, 0.54, 1, "#c83c4a", "#8f2633");
  drawFlagBand(canton, 0, 0.44, 1, 0.56, "#c83c4a", "#8f2633");
}

/** 用归一化坐标在 canton 内画对角线，负责联合旗的斜十字部分。 */
function drawCantonLine(flagBox, u0, v0, u1, v1, stroke, strokeWidth) {
  roughCanvas.line(mapFlagX(u0, v0, flagBox), mapFlagY(u0, v0, flagBox), mapFlagX(u1, v1, flagBox), mapFlagY(u1, v1, flagBox), {
    stroke,
    strokeWidth,
    roughness: 2.4,
    bowing: 1.6,
  });
}

/** 绘制西班牙旗左侧简化徽章：盾形、冠饰和少量手绘线条。 */
function drawSpainEmblem(flagBox) {
  const cx = mapFlagX(0.31, 0.5, flagBox);
  const cy = mapFlagY(0.5, 0.5, flagBox);
  const shieldWidth = 44;
  const shieldHeight = 58;
  const shield = [
    [cx - shieldWidth / 2 + jitter(1.4), cy - shieldHeight / 2 + jitter(1.4)],
    [cx + shieldWidth / 2 + jitter(1.4), cy - shieldHeight / 2 + jitter(1.4)],
    [cx + shieldWidth * 0.42 + jitter(1.4), cy + shieldHeight * 0.22 + jitter(1.4)],
    [cx + jitter(1.2), cy + shieldHeight / 2 + jitter(1.4)],
    [cx - shieldWidth * 0.42 + jitter(1.4), cy + shieldHeight * 0.22 + jitter(1.4)],
  ];

  roughCanvas.polygon(shield, {
    stroke: "#6f2a2b",
    strokeWidth: 1.25,
    fill: "#d8483f",
    fillStyle: "solid",
    roughness: 2.1,
    bowing: 1.2,
  });

  roughCanvas.rectangle(cx - 14 + jitter(1), cy - 18 + jitter(1), 28, 25, {
    stroke: "#a77613",
    strokeWidth: 0.9,
    fill: "#f4d24a",
    fillStyle: "hachure",
    hachureGap: 6,
    fillWeight: 0.75,
    roughness: 1.9,
    bowing: 1.1,
  });

  roughCanvas.circle(cx, cy - 42, 19, {
    stroke: "#8b6418",
    strokeWidth: 1,
    fill: "#f4d24a",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });

  drawSketchStar(cx, cy - 44, 7, 0);
  roughCanvas.line(cx - 24, cy - 33, cx + 24, cy - 33 + jitter(2), {
    stroke: "#8b6418",
    strokeWidth: 1.05,
    roughness: 2.3,
    bowing: 1.6,
  });
}

/** 绘制梵蒂冈旗简化徽章：交叉钥匙、圆形装饰和红色横线。 */
function drawVaticanEmblem(flagBox) {
  const cx = mapFlagX(0.74, 0.53, flagBox);
  const cy = mapFlagY(0.53, 0.53, flagBox);

  roughCanvas.line(cx - 44, cy + 42, cx + 36, cy - 46, {
    stroke: "#b78716",
    strokeWidth: 4.2,
    roughness: 2.5,
    bowing: 1.8,
  });
  roughCanvas.line(cx + 44, cy + 42, cx - 36, cy - 46, {
    stroke: "#a7adb1",
    strokeWidth: 4.2,
    roughness: 2.5,
    bowing: 1.8,
  });

  roughCanvas.circle(cx - 36, cy - 42, 27, {
    stroke: "#8b6418",
    strokeWidth: 1.5,
    fill: "#f4d24a",
    fillStyle: "hachure",
    hachureGap: 7,
    fillWeight: 0.85,
    roughness: 2.1,
    bowing: 1.2,
  });
  roughCanvas.circle(cx + 36, cy - 42, 27, {
    stroke: "#7d858a",
    strokeWidth: 1.5,
    fill: "#dce2e0",
    fillStyle: "hachure",
    hachureGap: 7,
    fillWeight: 0.85,
    roughness: 2.1,
    bowing: 1.2,
  });

  roughCanvas.circle(cx, cy - 58, 34, {
    stroke: "#a98218",
    strokeWidth: 1.5,
    fill: "#f7e1a0",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.3,
  });
  roughCanvas.rectangle(cx - 24 + jitter(1), cy - 72 + jitter(1), 48, 24, {
    stroke: "#a98218",
    strokeWidth: 1.2,
    fill: "#fbfdfa",
    fillStyle: "hachure",
    hachureGap: 6,
    fillWeight: 0.7,
    roughness: 2,
    bowing: 1.2,
  });
  roughCanvas.line(cx - 34, cy - 19, cx + 34, cy - 19 + jitter(2), {
    stroke: "#c23d45",
    strokeWidth: 3.2,
    roughness: 2.4,
    bowing: 1.5,
  });
}

/** 把归一化矩形区域转换为旗面多边形，先铺纯色再叠加 hachure 纹理。 */
function drawFlagBand(flagBox, u0, v0, u1, v1, fill, stroke) {
  roughCanvas.polygon(makeFlagCellOutline(u0, v0, u1, v1, flagBox), {
    stroke,
    strokeWidth: 1.2,
    fill,
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });

  roughCanvas.polygon(makeFlagCellOutline(u0, v0, u1, v1, flagBox), {
    stroke: softenColor(stroke, 0.28),
    strokeWidth: 0.65,
    fill,
    fillStyle: "hachure",
    hachureAngle: -12,
    hachureGap: 12,
    fillWeight: 0.55,
    roughness: 2,
  });
}

/** 在美国国旗 canton 的归一化范围内按 6/5 交错排列绘制星星。 */
function drawUSStars(flagBox) {
  const startX = 0.055;
  const endX = 0.395;
  const startY = 0.055;
  const endY = 0.49;

  for (let row = 0; row < 9; row += 1) {
    const stars = row % 2 === 0 ? 6 : 5;
    const rowOffset = row % 2 === 0 ? 0 : 0.5;

    for (let column = 0; column < stars; column += 1) {
      const u = startX + ((column + rowOffset) / 5.5) * (endX - startX);
      const v = startY + (row / 8) * (endY - startY);
      const x = mapFlagX(u, v, flagBox);
      const y = mapFlagY(u, v, flagBox);
      drawSketchStar(x, y, 6.4, -18 + row * 2);
    }
  }
}

/**
 * 通用国旗绘制流程：
 * 1. 先把 emoji 画到离屏 canvas 取得像素；
 * 2. 把有效像素按网格采样并合并成颜色段；
 * 3. 将颜色段映射回旗面坐标，叠加轮廓、细节点、布纹和边框。
 */
function drawGenericFlag(flagEmoji) {
  const flagBox = {
    x: 118,
    y: 174,
    width: 486,
    height: 342,
  };
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const source = rasterizeFlagEmoji(flagEmoji, 520);
  const segments = collectFlagSegments(source, flagBox);
  const dominant = getDominantFlagColor(segments) || "#d94444";
  const shadow = offsetPoints(flag, 8, 10);

  roughCanvas.polygon(shadow, {
    stroke: "transparent",
    fill: PALETTE.shadow,
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });

  roughCanvas.polygon(flag, {
    stroke: "#b9c4c0",
    strokeWidth: 2.4,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.4,
    bowing: 1.4,
  });

  roughCanvas.polygon(flag, {
    stroke: softenColor(dominant, 0.34),
    strokeWidth: 1.1,
    fill: dominant,
    fillStyle: "hachure",
    hachureAngle: -10,
    hachureGap: 18,
    fillWeight: 0.38,
    roughness: 2.1,
    bowing: 1.15,
  });

  segments.forEach((segment) => {
    roughCanvas.polygon(segment.outline, {
      stroke: segment.isLightNeutral ? "rgba(38, 49, 45, 0.08)" : softenColor(segment.color, 0.42),
      strokeWidth: segment.isLightNeutral ? 0.35 : 0.75,
      fill: segment.color,
      fillStyle: "solid",
      roughness: 2.25,
      bowing: 1.35,
    });

    if (!segment.isLightNeutral && segment.shouldTexture) {
      roughCanvas.polygon(segment.outline, {
        stroke: "rgba(38, 49, 45, 0.08)",
        strokeWidth: 0.35,
        fill: segment.color,
        fillStyle: "hachure",
        hachureAngle: -12,
        hachureGap: 20,
        fillWeight: 0.3,
        roughness: 1.8,
      });
    }
  });

  drawFlagImageDetails(source, flagBox);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, softenColor(dominant, 0.28));

  roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
    stroke: "#28332e",
    strokeWidth: 2,
    fill: "transparent",
    roughness: 2.8,
    bowing: 1.6,
  });
}

/**
 * 从栅格图里寻找边缘/高对比细节，把它们转成旗面上的小圆点和短线。
 * 这些细节弥补颜色段过于块状的问题，尤其适合徽章、十字和星月等小图案。
 */
function drawFlagImageDetails(source, flagBox) {
  const { data, bounds } = source;
  const pixels = data.data;
  const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
  const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
  const step = Math.max(5, Math.floor(data.width / 88));
  let detailCount = 0;
  let candidateCount = 0;

  for (let y = bounds.minY + step; y < bounds.maxY - step; y += step) {
    for (let x = bounds.minX + step; x < bounds.maxX - step; x += step) {
      const index = (y * data.width + x) * 4;
      const alpha = pixels[index + 3];

      if (alpha < 48 || !isFlagDetailPixel(pixels, data.width, data.height, x, y, step)) {
        continue;
      }

      const metrics = normalizeFlagMetrics(getColorMetrics(pixels, index));
      const isLightNeutral = metrics.brightness > 232 && metrics.saturation < 30;
      candidateCount += 1;

      if (isLightNeutral && candidateCount % 3 !== 0) {
        continue;
      }

      const u = (x - bounds.minX) / contentWidth;
      const v = (y - bounds.minY) / contentHeight;
      const px = mapFlagX(u, v, flagBox) + jitter(1.4);
      const py = mapFlagY(u, v, flagBox) + jitter(1.4);
      const color = `rgba(${metrics.red}, ${metrics.green}, ${metrics.blue}, ${isLightNeutral ? 0.48 : 0.82})`;

      roughCanvas.circle(px, py, randomBetween(3.4, 6.8), {
        stroke: isLightNeutral ? "rgba(38, 49, 45, 0.18)" : softenColor(color, 0.5),
        strokeWidth: isLightNeutral ? 0.5 : 0.8,
        fill: color,
        fillStyle: "solid",
        roughness: 2.1,
        bowing: 1.1,
      });

      if (!isLightNeutral && detailCount % 4 === 0) {
        roughCanvas.line(px + jitter(5), py + jitter(5), px + jitter(14), py + jitter(12), {
          stroke: "rgba(38, 49, 45, 0.24)",
          strokeWidth: randomBetween(0.45, 0.8),
          roughness: 2.4,
          bowing: 1.6,
        });
      }

      detailCount += 1;

      if (detailCount > 180) {
        return;
      }
    }
  }
}

/** 比较中心像素与周围像素的 alpha/颜色差，判断该点是否处在图案边缘或细节处。 */
function isFlagDetailPixel(pixels, width, height, x, y, distance) {
  const index = (y * width + x) * 4;
  const centerAlpha = pixels[index + 3];
  const offsets = [
    [-distance, 0],
    [distance, 0],
    [0, -distance],
    [0, distance],
    [-distance, -distance],
    [distance, distance],
  ];

  return offsets.some(([dx, dy]) => {
    const nextX = Math.min(width - 1, Math.max(0, x + dx));
    const nextY = Math.min(height - 1, Math.max(0, y + dy));
    const nextIndex = (nextY * width + nextX) * 4;
    const alpha = pixels[nextIndex + 3];

    if (Math.abs(centerAlpha - alpha) > 90 || alpha < 32) {
      return true;
    }

    const diff =
      Math.abs(pixels[index] - pixels[nextIndex]) +
      Math.abs(pixels[index + 1] - pixels[nextIndex + 1]) +
      Math.abs(pixels[index + 2] - pixels[nextIndex + 2]);

    return diff > 118;
  });
}

/** 把标准矩形拆成多段边线并加入随机扰动，生成 Rough.js 可用的手绘轮廓点。 */
function makeSketchRect(x, y, width, height) {
  const steps = 6;
  const edgeJitter = 5.2;
  const alongJitter = 2.2;
  const points = [];

  for (let i = 0; i <= steps; i += 1) {
    points.push([x + (width * i) / steps + jitter(alongJitter), y + jitter(edgeJitter)]);
  }
  for (let i = 0; i <= steps; i += 1) {
    points.push([x + width + jitter(edgeJitter), y + (height * i) / steps + jitter(alongJitter)]);
  }
  for (let i = steps; i >= 0; i -= 1) {
    points.push([x + (width * i) / steps + jitter(alongJitter), y + height + jitter(edgeJitter)]);
  }
  for (let i = steps; i >= 0; i -= 1) {
    points.push([x + jitter(edgeJitter), y + (height * i) / steps + jitter(alongJitter)]);
  }

  return points;
}

/** 在旗面内部绘制纵横短线，模拟布料折痕和手绘笔触。 */
function drawFabricStrokes(x, y, width, height, color) {
  for (let i = 0; i < 5; i += 1) {
    const px = x + (width * (i + 0.6)) / 7 + jitter(10);
    roughCanvas.line(px, y + jitter(14), px + jitter(18), y + height + jitter(14), {
      stroke: color,
      strokeWidth: randomBetween(0.55, 1.05),
      roughness: 2.2,
      bowing: 2.4,
    });
  }

  for (let i = 0; i < 3; i += 1) {
    const py = y + (height * (i + 0.8)) / 5 + jitter(8);
    roughCanvas.line(x + jitter(10), py, x + width + jitter(10), py + jitter(18), {
      stroke: color,
      strokeWidth: randomBetween(0.45, 0.85),
      roughness: 2.4,
      bowing: 1.9,
    });
  }
}

/** 使用默认黄色配色绘制手绘五角星。 */
function drawSketchStar(cx, cy, radius, rotationDegrees) {
  drawSketchStarWithColors(cx, cy, radius, rotationDegrees, {
    stroke: "#b68b12",
    fill: "#ffd84c",
    hatch: "#ffec62",
  });
}

/** 计算五角星外/内顶点，再用纯色和 hachure 两层多边形形成粗糙质感。 */
function drawSketchStarWithColors(cx, cy, radius, rotationDegrees, colors) {
  const points = [];
  const rotation = (rotationDegrees * Math.PI) / 180 - Math.PI / 2;

  for (let i = 0; i < 10; i += 1) {
    const angle = rotation + (i * Math.PI) / 5;
    const pointRadius = i % 2 === 0 ? radius : radius * 0.42;
    points.push([
      cx + Math.cos(angle) * pointRadius + jitter(radius * 0.05),
      cy + Math.sin(angle) * pointRadius + jitter(radius * 0.05),
    ]);
  }

  roughCanvas.polygon(points, {
    stroke: colors.stroke,
    strokeWidth: Math.max(1.2, radius * 0.08),
    fill: colors.fill,
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });

  roughCanvas.polygon(points, {
    stroke: colors.hatch,
    strokeWidth: Math.max(0.8, radius * 0.04),
    fill: colors.fill,
    fillStyle: "hachure",
    hachureAngle: -22,
    hachureGap: Math.max(6, radius * 0.22),
    fillWeight: 1,
    roughness: 2.2,
  });
}

/**
 * 将浏览器原生 emoji 字体渲染到离屏 canvas。
 * 输出 ImageData 和非透明像素边界，供后续网格采样只关注旗帜内容区域。
 */
function rasterizeFlagEmoji(flagEmoji, offscreenSize) {
  const offscreen = document.createElement("canvas");
  offscreen.width = offscreenSize * DEVICE_PIXEL_RATIO;
  offscreen.height = offscreenSize * DEVICE_PIXEL_RATIO;

  const offscreenCtx = offscreen.getContext("2d", {
    willReadFrequently: true,
  });
  offscreenCtx.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);
  offscreenCtx.clearRect(0, 0, offscreenSize, offscreenSize);
  offscreenCtx.textAlign = "center";
  offscreenCtx.textBaseline = "middle";
  offscreenCtx.font = `${Math.round(offscreenSize * 0.68)}px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif`;
  offscreenCtx.fillText(flagEmoji, offscreenSize / 2, offscreenSize / 2 + offscreenSize * 0.02);

  const imageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height);
  return { data: imageData, bounds: findPixelBounds(imageData) };
}

/**
 * 把栅格化后的旗帜切成 64x40 网格并按行扫描。
 * 相邻且颜色 bucket 相同的格子会合并成一个 segment，后续直接绘制为粗糙多边形。
 */
function collectFlagSegments(source, flagBox) {
  const { data, bounds } = source;
  const pixels = data.data;
  const segments = [];
  const columns = 64;
  const rows = 40;
  const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
  const contentHeight = Math.max(1, bounds.maxY - bounds.minY);

  for (let row = 0; row < rows; row += 1) {
    let run = null;

    for (let column = 0; column < columns; column += 1) {
      const u0 = column / columns;
      const v0 = row / rows;
      const u1 = (column + 1) / columns;
      const v1 = (row + 1) / rows;
      const sample = sampleFlagCell(pixels, data.width, bounds, contentWidth, contentHeight, u0, v0, u1, v1);

      if (!sample || sample.alpha < 42) {
        if (run) {
          segments.push(createFlagSegment(run, row, columns, rows, flagBox));
          run = null;
        }
        continue;
      }

      const metrics = normalizeFlagMetrics(sample.metrics);
      const isLightNeutral = metrics.brightness > 232 && metrics.saturation < 30;
      const bucket = getFlagSegmentBucket(metrics, isLightNeutral);
      const cell = { column, metrics, isLightNeutral, bucket };

      if (!run || run.bucket !== bucket) {
        if (run) {
          segments.push(createFlagSegment(run, row, columns, rows, flagBox));
        }

        run = {
          bucket,
          startColumn: column,
          endColumn: column,
          cells: [cell],
        };
      } else {
        run.endColumn = column;
        run.cells.push(cell);
      }
    }

    if (run) {
      segments.push(createFlagSegment(run, row, columns, rows, flagBox));
    }
  }

  return segments;
}

/**
 * 对一个归一化网格单元取 5 个采样点，平均 RGB/alpha 得到该单元的代表色。
 * 返回 null 表示该格子基本透明，不参与旗面分段。
 */
function sampleFlagCell(pixels, width, bounds, contentWidth, contentHeight, u0, v0, u1, v1) {
  const points = [
    [(u0 + u1) / 2, (v0 + v1) / 2],
    [u0 + (u1 - u0) * 0.28, v0 + (v1 - v0) * 0.35],
    [u0 + (u1 - u0) * 0.72, v0 + (v1 - v0) * 0.35],
    [u0 + (u1 - u0) * 0.28, v0 + (v1 - v0) * 0.72],
    [u0 + (u1 - u0) * 0.72, v0 + (v1 - v0) * 0.72],
  ];
  const totals = points.reduce(
    (acc, [u, v]) => {
      const x = Math.round(bounds.minX + u * contentWidth);
      const y = Math.round(bounds.minY + v * contentHeight);
      const index = (y * width + x) * 4;
      const alpha = pixels[index + 3];

      if (alpha < 30) {
        return acc;
      }

      acc.red += pixels[index];
      acc.green += pixels[index + 1];
      acc.blue += pixels[index + 2];
      acc.alpha += alpha;
      acc.count += 1;
      return acc;
    },
    { red: 0, green: 0, blue: 0, alpha: 0, count: 0 },
  );

  if (!totals.count) {
    return null;
  }

  const red = Math.round(totals.red / totals.count);
  const green = Math.round(totals.green / totals.count);
  const blue = Math.round(totals.blue / totals.count);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  return {
    alpha: totals.alpha / totals.count,
    metrics: {
      red,
      green,
      blue,
      brightness: (red + green + blue) / 3,
      saturation: max - min,
    },
  };
}

/** 将系统 emoji 渲染时常见的高亮灰白色归一成纸白，减少无意义灰块。 */
function normalizeFlagMetrics(metrics) {
  const isSystemHighlight = metrics.saturation < 28 && metrics.brightness > 110;

  if (isSystemHighlight) {
    return {
      red: 250,
      green: 252,
      blue: 249,
      brightness: 250.3,
      saturation: 3,
    };
  }

  return metrics;
}

/** 将颜色量化到较粗的 bucket，让相近颜色能在同一行内合并为连续色段。 */
function getFlagSegmentBucket(metrics, isLightNeutral) {
  if (isLightNeutral) {
    return "light";
  }

  return `${Math.round(metrics.red / 34) * 34}-${Math.round(metrics.green / 34) * 34}-${
    Math.round(metrics.blue / 34) * 34
  }`;
}

/** 将扫描行中的连续 run 转成可绘制 segment：颜色、面积、纹理标记和旗面轮廓。 */
function createFlagSegment(run, row, columns, rows, flagBox) {
  const metrics = averageMetrics(run.cells);
  const isLightNeutral = run.cells.filter((cell) => cell.isLightNeutral).length > run.cells.length * 0.58;
  const u0 = run.startColumn / columns;
  const u1 = (run.endColumn + 1) / columns;
  const v0 = row / rows;
  const v1 = (row + 1) / rows;

  return {
    color: `rgba(${metrics.red}, ${metrics.green}, ${metrics.blue}, ${isLightNeutral ? 0.88 : 0.98})`,
    metrics,
    isLightNeutral,
    area: ((run.endColumn - run.startColumn + 1) * flagBox.width * flagBox.height) / (columns * rows),
    shouldTexture: row % 4 === 0 && run.endColumn - run.startColumn > 2,
    outline: makeFlagCellOutline(u0, v0, u1, v1, flagBox),
  };
}

/** 对一组网格单元求平均颜色指标，用作合并后 segment 的最终颜色。 */
function averageMetrics(cells) {
  const totals = cells.reduce(
    (acc, cell) => {
      acc.red += cell.metrics.red;
      acc.green += cell.metrics.green;
      acc.blue += cell.metrics.blue;
      return acc;
    },
    { red: 0, green: 0, blue: 0 },
  );
  const count = cells.length || 1;
  const red = Math.round(totals.red / count);
  const green = Math.round(totals.green / count);
  const blue = Math.round(totals.blue / count);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  return {
    red,
    green,
    blue,
    brightness: (red + green + blue) / 3,
    saturation: max - min,
  };
}

/** 统计非浅色 segment 的主色，用于通用旗面的底纹和布纹颜色。 */
function getDominantFlagColor(cells) {
  const groups = new Map();

  cells.forEach((cell) => {
    if (cell.isLightNeutral) {
      return;
    }

    const key = `${Math.round(cell.metrics.red / 36) * 36}-${Math.round(cell.metrics.green / 36) * 36}-${
      Math.round(cell.metrics.blue / 36) * 36
    }`;
    const current = groups.get(key) || { count: 0, red: 0, green: 0, blue: 0 };
    current.count += 1;
    current.red += cell.metrics.red;
    current.green += cell.metrics.green;
    current.blue += cell.metrics.blue;
    groups.set(key, current);
  });

  const dominant = [...groups.values()].sort((a, b) => b.count - a.count)[0];

  if (!dominant) {
    return null;
  }

  return `rgb(${Math.round(dominant.red / dominant.count)}, ${Math.round(
    dominant.green / dominant.count,
  )}, ${Math.round(dominant.blue / dominant.count)})`;
}

/** 将归一化网格边界映射到画布旗面区域，并加轻微重叠/抖动避免缝隙。 */
function makeFlagCellOutline(u0, v0, u1, v1, flagBox) {
  const overlapU = 0.003;
  const overlapV = 0.004;
  const points = [
    [u0 - overlapU, v0 - overlapV],
    [(u0 + u1) / 2, v0 - overlapV + jitter(0.0006)],
    [u1 + overlapU, v0 - overlapV],
    [u1 + overlapU, (v0 + v1) / 2],
    [u1 + overlapU, v1 + overlapV],
    [(u0 + u1) / 2, v1 + overlapV + jitter(0.0006)],
    [u0 - overlapU, v1 + overlapV],
    [u0 - overlapU, (v0 + v1) / 2],
  ];

  return points.map(([u, v]) => [
    mapFlagX(Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v)), flagBox) + jitter(0.45),
    mapFlagY(Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v)), flagBox) + jitter(0.45),
  ]);
}

/** 将旗面归一化横坐标 u 映射到画布 x 坐标。 */
function mapFlagX(u, v, flagBox) {
  return flagBox.x + flagBox.width * u;
}

/** 将旗面归一化纵坐标 v 映射到画布 y 坐标。 */
function mapFlagY(u, v, flagBox) {
  return flagBox.y + flagBox.height * v;
}

/** 扫描 ImageData，找出 alpha 足够高的最小包围盒，去掉 emoji 周围透明留白。 */
function findPixelBounds(imageData) {
  const { data, width, height } = imageData;
  const bounds = {
    minX: width,
    minY: height,
    maxX: 0,
    maxY: 0,
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] < 24) {
        continue;
      }

      bounds.minX = Math.min(bounds.minX, x);
      bounds.minY = Math.min(bounds.minY, y);
      bounds.maxX = Math.max(bounds.maxX, x);
      bounds.maxY = Math.max(bounds.maxY, y);
    }
  }

  if (bounds.minX > bounds.maxX || bounds.minY > bounds.maxY) {
    return { minX: 0, minY: 0, maxX: width, maxY: height };
  }

  return bounds;
}

/** 从 ImageData 像素数组读取 RGB，并派生亮度与饱和度差值。 */
function getColorMetrics(pixels, index) {
  const red = pixels[index];
  const green = pixels[index + 1];
  const blue = pixels[index + 2];
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  return {
    red,
    green,
    blue,
    brightness: (red + green + blue) / 3,
    saturation: max - min,
  };
}

/** 平移一组点位，常用于从旗面轮廓生成投影轮廓。 */
function offsetPoints(points, x, y) {
  return points.map((point) => [point[0] + x, point[1] + y]);
}

/** 将 rgb/rgba 字符串替换成指定透明度，便于复用同一颜色的弱描边版本。 */
function softenColor(color, alpha) {
  const channels = color.match(/rgba?\(([^)]+)\)/);

  if (!channels) {
    return color;
  }

  return `rgba(${channels[1].split(",").slice(0, 3).join(",")}, ${alpha})`;
}

/** 在区间内生成随机数，是所有手绘扰动的基础。 */
function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

/** 生成正负范围内的随机偏移，让边缘、点位和线条产生手绘不稳定感。 */
function jitter(amount) {
  return randomBetween(-amount, amount);
}

