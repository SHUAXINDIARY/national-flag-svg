import rough from "roughjs";
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

/** 所有专门模板的绘制函数签名。 */
type FlagDrawer = () => void;

/** 专门模板覆盖的国旗 emoji 联合类型。 */
type TemplateFlag = (typeof TEMPLATE_FLAGS)[keyof typeof TEMPLATE_FLAGS];

/** 专门模板分发表：每个标准国旗都有独立绘制入口，避免大量 if 分支。 */
const TEMPLATE_FLAG_DRAWERS: Record<TemplateFlag, FlagDrawer> = {
  // 独占
  [TEMPLATE_FLAGS.australia]: drawAustraliaFlag,
  [TEMPLATE_FLAGS.china]: drawChinaFlag,
  [TEMPLATE_FLAGS.spain]: drawSpainFlag,
  [TEMPLATE_FLAGS.france]: drawFranceFlag,
  [TEMPLATE_FLAGS.italy]: drawItalyFlag,
  [TEMPLATE_FLAGS.japan]: drawJapanFlag,
  [TEMPLATE_FLAGS.thailand]: drawThailandFlag,
  [TEMPLATE_FLAGS.unitedStates]: drawUnitedStatesFlag,
  [TEMPLATE_FLAGS.vatican]: drawVaticanFlag,
  // 待处理
  [TEMPLATE_FLAGS.ad]: drawAdFlag,
  [TEMPLATE_FLAGS.ae]: drawAeFlag,
  [TEMPLATE_FLAGS.af]: drawAfFlag,
  [TEMPLATE_FLAGS.ag]: drawAgFlag,
  [TEMPLATE_FLAGS.ai]: drawAiFlag,
  [TEMPLATE_FLAGS.al]: drawAlFlag,
  [TEMPLATE_FLAGS.am]: drawAmFlag,
  [TEMPLATE_FLAGS.ao]: drawAoFlag,
  [TEMPLATE_FLAGS.aq]: drawAqFlag,
  [TEMPLATE_FLAGS.ar]: drawArFlag,
  [TEMPLATE_FLAGS.as]: drawAsFlag,
  [TEMPLATE_FLAGS.at]: drawAtFlag,
  [TEMPLATE_FLAGS.aw]: drawAwFlag,
  [TEMPLATE_FLAGS.ax]: drawAxFlag,
  [TEMPLATE_FLAGS.az]: drawAzFlag,
  [TEMPLATE_FLAGS.ba]: drawBaFlag,
  [TEMPLATE_FLAGS.bb]: drawBbFlag,
  [TEMPLATE_FLAGS.bd]: drawBdFlag,
  [TEMPLATE_FLAGS.be]: drawBeFlag,
  [TEMPLATE_FLAGS.bf]: drawBfFlag,
  [TEMPLATE_FLAGS.bg]: drawBgFlag,
  [TEMPLATE_FLAGS.bh]: drawBhFlag,
  [TEMPLATE_FLAGS.bi]: drawBiFlag,
  [TEMPLATE_FLAGS.bj]: drawBjFlag,
  [TEMPLATE_FLAGS.bl]: drawBlFlag,
  [TEMPLATE_FLAGS.bm]: drawBmFlag,
  [TEMPLATE_FLAGS.bn]: drawBnFlag,
  [TEMPLATE_FLAGS.bo]: drawBoFlag,
  [TEMPLATE_FLAGS.bq]: drawBqFlag,
  [TEMPLATE_FLAGS.br]: drawBrFlag,
  [TEMPLATE_FLAGS.bs]: drawBsFlag,
  [TEMPLATE_FLAGS.bt]: drawBtFlag,
  [TEMPLATE_FLAGS.bv]: drawBvFlag,
  [TEMPLATE_FLAGS.bw]: drawBwFlag,
  [TEMPLATE_FLAGS.by]: drawByFlag,
  [TEMPLATE_FLAGS.bz]: drawBzFlag,
  [TEMPLATE_FLAGS.ca]: drawCaFlag,
  [TEMPLATE_FLAGS.cc]: drawCcFlag,
  [TEMPLATE_FLAGS.cd]: drawCdFlag,
  [TEMPLATE_FLAGS.cf]: drawCfFlag,
  [TEMPLATE_FLAGS.cg]: drawCgFlag,
  [TEMPLATE_FLAGS.ch]: drawChFlag,
  [TEMPLATE_FLAGS.ci]: drawCiFlag,
  [TEMPLATE_FLAGS.ck]: drawCkFlag,
  [TEMPLATE_FLAGS.cl]: drawClFlag,
  [TEMPLATE_FLAGS.cm]: drawCmFlag,
  [TEMPLATE_FLAGS.co]: drawCoFlag,
  [TEMPLATE_FLAGS.cr]: drawCrFlag,
  [TEMPLATE_FLAGS.cu]: drawCuFlag,
  [TEMPLATE_FLAGS.cv]: drawCvFlag,
  [TEMPLATE_FLAGS.cw]: drawCwFlag,
  [TEMPLATE_FLAGS.cx]: drawCxFlag,
  [TEMPLATE_FLAGS.cy]: drawCyFlag,
  [TEMPLATE_FLAGS.cz]: drawCzFlag,
  [TEMPLATE_FLAGS.de]: drawDeFlag,
  [TEMPLATE_FLAGS.dj]: drawDjFlag,
  [TEMPLATE_FLAGS.dk]: drawDkFlag,
  [TEMPLATE_FLAGS.dm]: drawDmFlag,
  [TEMPLATE_FLAGS.do]: drawDoFlag,
  [TEMPLATE_FLAGS.dz]: drawDzFlag,
  [TEMPLATE_FLAGS.ec]: drawEcFlag,
  [TEMPLATE_FLAGS.ee]: drawEeFlag,
  [TEMPLATE_FLAGS.eg]: drawEgFlag,
  [TEMPLATE_FLAGS.eh]: drawEhFlag,
  [TEMPLATE_FLAGS.er]: drawErFlag,
  [TEMPLATE_FLAGS.et]: drawEtFlag,
  [TEMPLATE_FLAGS.fi]: drawFiFlag,
  [TEMPLATE_FLAGS.fj]: drawFjFlag,
  [TEMPLATE_FLAGS.fk]: drawFkFlag,
  [TEMPLATE_FLAGS.fm]: drawFmFlag,
  [TEMPLATE_FLAGS.fo]: drawFoFlag,
  [TEMPLATE_FLAGS.ga]: drawGaFlag,
  [TEMPLATE_FLAGS.gb]: drawGbFlag,
  [TEMPLATE_FLAGS.gd]: drawGdFlag,
  [TEMPLATE_FLAGS.ge]: drawGeFlag,
  [TEMPLATE_FLAGS.gf]: drawGfFlag,
  [TEMPLATE_FLAGS.gg]: drawGgFlag,
  [TEMPLATE_FLAGS.gh]: drawGhFlag,
  [TEMPLATE_FLAGS.gi]: drawGiFlag,
  [TEMPLATE_FLAGS.gl]: drawGlFlag,
  [TEMPLATE_FLAGS.gm]: drawGmFlag,
  [TEMPLATE_FLAGS.gn]: drawGnFlag,
  [TEMPLATE_FLAGS.gp]: drawGpFlag,
  [TEMPLATE_FLAGS.gq]: drawGqFlag,
  [TEMPLATE_FLAGS.gr]: drawGrFlag,
  [TEMPLATE_FLAGS.gs]: drawGsFlag,
  [TEMPLATE_FLAGS.gt]: drawGtFlag,
  [TEMPLATE_FLAGS.gu]: drawGuFlag,
  [TEMPLATE_FLAGS.gw]: drawGwFlag,
  [TEMPLATE_FLAGS.gy]: drawGyFlag,
  [TEMPLATE_FLAGS.hk]: drawHkFlag,
  [TEMPLATE_FLAGS.hm]: drawHmFlag,
  [TEMPLATE_FLAGS.hn]: drawHnFlag,
  [TEMPLATE_FLAGS.hr]: drawHrFlag,
  [TEMPLATE_FLAGS.ht]: drawHtFlag,
  [TEMPLATE_FLAGS.hu]: drawHuFlag,
  [TEMPLATE_FLAGS.id]: drawIdFlag,
  [TEMPLATE_FLAGS.ie]: drawIeFlag,
  [TEMPLATE_FLAGS.il]: drawIlFlag,
  [TEMPLATE_FLAGS.im]: drawImFlag,
  [TEMPLATE_FLAGS.in]: drawInFlag,
  [TEMPLATE_FLAGS.io]: drawIoFlag,
  [TEMPLATE_FLAGS.iq]: drawIqFlag,
  [TEMPLATE_FLAGS.ir]: drawIrFlag,
  [TEMPLATE_FLAGS.is]: drawIsFlag,
  [TEMPLATE_FLAGS.je]: drawJeFlag,
  [TEMPLATE_FLAGS.jm]: drawJmFlag,
  [TEMPLATE_FLAGS.jo]: drawJoFlag,
  [TEMPLATE_FLAGS.ke]: drawKeFlag,
  [TEMPLATE_FLAGS.kg]: drawKgFlag,
  [TEMPLATE_FLAGS.kh]: drawKhFlag,
  [TEMPLATE_FLAGS.ki]: drawKiFlag,
  [TEMPLATE_FLAGS.km]: drawKmFlag,
  [TEMPLATE_FLAGS.kn]: drawKnFlag,
  [TEMPLATE_FLAGS.kp]: drawKpFlag,
  [TEMPLATE_FLAGS.kr]: drawKrFlag,
  [TEMPLATE_FLAGS.kw]: drawKwFlag,
  [TEMPLATE_FLAGS.ky]: drawKyFlag,
  [TEMPLATE_FLAGS.kz]: drawKzFlag,
  [TEMPLATE_FLAGS.la]: drawLaFlag,
  [TEMPLATE_FLAGS.lb]: drawLbFlag,
  [TEMPLATE_FLAGS.lc]: drawLcFlag,
  [TEMPLATE_FLAGS.li]: drawLiFlag,
  [TEMPLATE_FLAGS.lk]: drawLkFlag,
  [TEMPLATE_FLAGS.lr]: drawLrFlag,
  [TEMPLATE_FLAGS.ls]: drawLsFlag,
  [TEMPLATE_FLAGS.lt]: drawLtFlag,
  [TEMPLATE_FLAGS.lu]: drawLuFlag,
  [TEMPLATE_FLAGS.lv]: drawLvFlag,
  [TEMPLATE_FLAGS.ly]: drawLyFlag,
  [TEMPLATE_FLAGS.ma]: drawMaFlag,
  [TEMPLATE_FLAGS.mc]: drawMcFlag,
  [TEMPLATE_FLAGS.md]: drawMdFlag,
  [TEMPLATE_FLAGS.me]: drawMeFlag,
  [TEMPLATE_FLAGS.mf]: drawMfFlag,
  [TEMPLATE_FLAGS.mg]: drawMgFlag,
  [TEMPLATE_FLAGS.mh]: drawMhFlag,
  [TEMPLATE_FLAGS.mk]: drawMkFlag,
  [TEMPLATE_FLAGS.ml]: drawMlFlag,
  [TEMPLATE_FLAGS.mm]: drawMmFlag,
  [TEMPLATE_FLAGS.mn]: drawMnFlag,
  [TEMPLATE_FLAGS.mo]: drawMoFlag,
  [TEMPLATE_FLAGS.mp]: drawMpFlag,
  [TEMPLATE_FLAGS.mq]: drawMqFlag,
  [TEMPLATE_FLAGS.mr]: drawMrFlag,
  [TEMPLATE_FLAGS.ms]: drawMsFlag,
  [TEMPLATE_FLAGS.mt]: drawMtFlag,
  [TEMPLATE_FLAGS.mu]: drawMuFlag,
  [TEMPLATE_FLAGS.mv]: drawMvFlag,
  [TEMPLATE_FLAGS.mw]: drawMwFlag,
  [TEMPLATE_FLAGS.mx]: drawMxFlag,
  [TEMPLATE_FLAGS.my]: drawMyFlag,
  [TEMPLATE_FLAGS.mz]: drawMzFlag,
  [TEMPLATE_FLAGS.na]: drawNaFlag,
  [TEMPLATE_FLAGS.nc]: drawNcFlag,
  [TEMPLATE_FLAGS.ne]: drawNeFlag,
  [TEMPLATE_FLAGS.nf]: drawNfFlag,
  [TEMPLATE_FLAGS.ng]: drawNgFlag,
  [TEMPLATE_FLAGS.ni]: drawNiFlag,
  [TEMPLATE_FLAGS.nl]: drawNlFlag,
  [TEMPLATE_FLAGS.no]: drawNoFlag,
  [TEMPLATE_FLAGS.np]: drawNpFlag,
  [TEMPLATE_FLAGS.nr]: drawNrFlag,
  [TEMPLATE_FLAGS.nu]: drawNuFlag,
  [TEMPLATE_FLAGS.nz]: drawNzFlag,
  [TEMPLATE_FLAGS.om]: drawOmFlag,
  [TEMPLATE_FLAGS.pa]: drawPaFlag,
  [TEMPLATE_FLAGS.pe]: drawPeFlag,
  [TEMPLATE_FLAGS.pf]: drawPfFlag,
  [TEMPLATE_FLAGS.pg]: drawPgFlag,
  [TEMPLATE_FLAGS.ph]: drawPhFlag,
  [TEMPLATE_FLAGS.pk]: drawPkFlag,
  [TEMPLATE_FLAGS.pl]: drawPlFlag,
  [TEMPLATE_FLAGS.pm]: drawPmFlag,
  [TEMPLATE_FLAGS.pn]: drawPnFlag,
  [TEMPLATE_FLAGS.pr]: drawPrFlag,
  [TEMPLATE_FLAGS.ps]: drawPsFlag,
  [TEMPLATE_FLAGS.pt]: drawPtFlag,
  [TEMPLATE_FLAGS.pw]: drawPwFlag,
  [TEMPLATE_FLAGS.py]: drawPyFlag,
  [TEMPLATE_FLAGS.qa]: drawQaFlag,
  [TEMPLATE_FLAGS.re]: drawReFlag,
  [TEMPLATE_FLAGS.ro]: drawRoFlag,
  [TEMPLATE_FLAGS.rs]: drawRsFlag,
  [TEMPLATE_FLAGS.ru]: drawRuFlag,
  [TEMPLATE_FLAGS.rw]: drawRwFlag,
  [TEMPLATE_FLAGS.sa]: drawSaFlag,
  [TEMPLATE_FLAGS.sb]: drawSbFlag,
  [TEMPLATE_FLAGS.sc]: drawScFlag,
  [TEMPLATE_FLAGS.sd]: drawSdFlag,
  [TEMPLATE_FLAGS.se]: drawSeFlag,
  [TEMPLATE_FLAGS.sg]: drawSgFlag,
  [TEMPLATE_FLAGS.sh]: drawShFlag,
  [TEMPLATE_FLAGS.si]: drawSiFlag,
  [TEMPLATE_FLAGS.sj]: drawSjFlag,
  [TEMPLATE_FLAGS.sk]: drawSkFlag,
  [TEMPLATE_FLAGS.sl]: drawSlFlag,
  [TEMPLATE_FLAGS.sm]: drawSmFlag,
  [TEMPLATE_FLAGS.sn]: drawSnFlag,
  [TEMPLATE_FLAGS.so]: drawSoFlag,
  [TEMPLATE_FLAGS.sr]: drawSrFlag,
  [TEMPLATE_FLAGS.ss]: drawSsFlag,
  [TEMPLATE_FLAGS.st]: drawStFlag,
  [TEMPLATE_FLAGS.sv]: drawSvFlag,
  [TEMPLATE_FLAGS.sx]: drawSxFlag,
  [TEMPLATE_FLAGS.sy]: drawSyFlag,
  [TEMPLATE_FLAGS.sz]: drawSzFlag,
  [TEMPLATE_FLAGS.tc]: drawTcFlag,
  [TEMPLATE_FLAGS.td]: drawTdFlag,
  [TEMPLATE_FLAGS.tf]: drawTfFlag,
  [TEMPLATE_FLAGS.tg]: drawTgFlag,
  [TEMPLATE_FLAGS.tj]: drawTjFlag,
  [TEMPLATE_FLAGS.tk]: drawTkFlag,
  [TEMPLATE_FLAGS.tl]: drawTlFlag,
  [TEMPLATE_FLAGS.tm]: drawTmFlag,
  [TEMPLATE_FLAGS.tn]: drawTnFlag,
  [TEMPLATE_FLAGS.to]: drawToFlag,
  [TEMPLATE_FLAGS.tr]: drawTrFlag,
  [TEMPLATE_FLAGS.tt]: drawTtFlag,
  [TEMPLATE_FLAGS.tv]: drawTvFlag,
  [TEMPLATE_FLAGS.tw]: drawTwFlag,
  [TEMPLATE_FLAGS.tz]: drawTzFlag,
  [TEMPLATE_FLAGS.ua]: drawUaFlag,
  [TEMPLATE_FLAGS.ug]: drawUgFlag,
  [TEMPLATE_FLAGS.um]: drawUmFlag,
  [TEMPLATE_FLAGS.uy]: drawUyFlag,
  [TEMPLATE_FLAGS.uz]: drawUzFlag,
  [TEMPLATE_FLAGS.vc]: drawVcFlag,
  [TEMPLATE_FLAGS.ve]: drawVeFlag,
  [TEMPLATE_FLAGS.vg]: drawVgFlag,
  [TEMPLATE_FLAGS.vi]: drawViFlag,
  [TEMPLATE_FLAGS.vn]: drawVnFlag,
  [TEMPLATE_FLAGS.vu]: drawVuFlag,
  [TEMPLATE_FLAGS.wf]: drawWfFlag,
  [TEMPLATE_FLAGS.ws]: drawWsFlag,
  [TEMPLATE_FLAGS.xk]: drawXkFlag,
  [TEMPLATE_FLAGS.ye]: drawYeFlag,
  [TEMPLATE_FLAGS.yt]: drawYtFlag,
  [TEMPLATE_FLAGS.za]: drawZaFlag,
  [TEMPLATE_FLAGS.zm]: drawZmFlag,
  [TEMPLATE_FLAGS.zw]: drawZwFlag,
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
function withCanvas(canvasElement: HTMLCanvasElement, callback: () => void) {
  const previous = { ctx, roughCanvas, size };

  ctx = canvasElement.getContext("2d", { willReadFrequently: true });
  roughCanvas = rough.canvas(canvasElement);
  size = canvasElement.width;
  callback();
  ctx = previous.ctx;
  roughCanvas = previous.roughCanvas;
  size = previous.size;
}

/** 绘制总入口：先铺纸张背景，再按已知旗帜走专门模板，未知旗帜走像素采样流程。 */
function drawFlag(flag: string) {
  clearCanvas();
  drawPaper();

  const templateDrawer = TEMPLATE_FLAG_DRAWERS[flag as TemplateFlag];
  if (templateDrawer) {
    templateDrawer();
    return;
  }

  drawGenericFlag(flag);
}

/** 把任意输入规范化为可绘制的国旗 emoji；非法输入回退到中国国旗。 */
function resolveFlag(value: unknown) {
  const input = String(value || "").trim();

  return isFlagEmoji(input) ? input : DEFAULT_FLAG;
}

/** 判断字符串是否由两个区域指示符组成，这是 Unicode 国旗 emoji 的编码形式。 */
function isFlagEmoji(value: string) {
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


/** AD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAdFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
  drawFlagBorder(flagBox);
}

/** AE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.25, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.25, 0, 1, 1 / 3, "#15945f", "#0f6646");
  drawFlagBand(flagBox, 0.25, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.25, 2 / 3, 1, 1, "#262d2b", "#111615");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b3538");
  drawFlagBorder(flagBox);
}

/** AF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAfFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.af);
}

/** AG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAgFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ag);
}

/** AI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAiFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ai);
}

/** AL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAlFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const cx = mapFlagX(0.5, 0.5, flagBox);
  const cy = mapFlagY(0.5, 0.5, flagBox);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  roughCanvas.polygon(
    [
      [cx - 62, cy - 42],
      [cx - 18, cy - 18],
      [cx, cy - 58],
      [cx + 18, cy - 18],
      [cx + 62, cy - 42],
      [cx + 28, cy + 14],
      [cx + 44, cy + 64],
      [cx, cy + 35],
      [cx - 44, cy + 64],
      [cx - 28, cy + 14],
    ],
    { stroke: "#111615", strokeWidth: 2, fill: "#262d2b", fillStyle: "solid", roughness: 2.3, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** AM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAmFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#d23b43", "#912936");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#f0a330", "#a96f1f");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#734268");
  drawFlagBorder(flagBox);
}

/** AO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAoFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ao);
}

/** AQ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAqFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.aq);
}

/** AR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawArFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#75a9d8", "#477aa5");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#75a9d8", "#477aa5");
  roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 43, {
    stroke: "#b68b12",
    strokeWidth: 1.2,
    fill: "#ffd84c",
    fillStyle: "hachure",
    hachureGap: 7,
    fillWeight: 0.8,
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#477aa5");
  drawFlagBorder(flagBox);
}

/** AS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAsFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.as);
}

/** AT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAtFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** AW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAwFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.aw);
}

/** AX 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAxFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ax);
}

/** AZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawAzFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#3d9fd3", "#2c6f9b");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
  roughCanvas.circle(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), flagBox.height * 0.24, {
    stroke: "#c7d1cc",
    strokeWidth: 1.2,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.52, 0.5, flagBox), mapFlagY(0.52, 0.5, flagBox), flagBox.height * 0.2, {
    stroke: "#8f2633",
    strokeWidth: 1,
    fill: "#c83c4a",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawSketchStarWithColors(mapFlagX(0.59, 0.5, flagBox), mapFlagY(0.59, 0.5, flagBox), 18, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#756b4d");
  drawFlagBorder(flagBox);
}

/** BA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#253f78", "#1b2c56");
  roughCanvas.polygon(
    [
      [mapFlagX(0.34, 0, flagBox), mapFlagY(0.34, 0, flagBox)],
      [mapFlagX(0.78, 0, flagBox), mapFlagY(0.78, 0, flagBox)],
      [mapFlagX(0.78, 1, flagBox), mapFlagY(0.78, 1, flagBox)],
    ],
    { stroke: "#a98218", strokeWidth: 1.2, fill: "#f0c83a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  for (let i = 0; i < 8; i += 1) {
    drawSketchStarWithColors(mapFlagX(0.36 + i * 0.055, 0.08 + i * 0.115, flagBox), mapFlagY(0.36 + i * 0.055, 0.08 + i * 0.115, flagBox), 10, -18 + i * 4, {
      stroke: "#c7d1cc",
      fill: "#fbfdfa",
      hatch: "rgba(251, 253, 250, 0.7)",
    });
  }
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
  drawFlagBorder(flagBox);
}

/** BB 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBbFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const cx = mapFlagX(0.5, 0.5, flagBox);
  const cy = mapFlagY(0.5, 0.5, flagBox);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#253f78", "#1b2c56");
  roughCanvas.line(cx, cy - 48, cx, cy + 54, { stroke: "#262d2b", strokeWidth: 4, roughness: 2.2, bowing: 1.4 });
  roughCanvas.line(cx, cy - 10, cx - 24, cy - 42, { stroke: "#262d2b", strokeWidth: 3, roughness: 2.2, bowing: 1.4 });
  roughCanvas.line(cx, cy - 10, cx + 24, cy - 42, { stroke: "#262d2b", strokeWidth: 3, roughness: 2.2, bowing: 1.4 });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
  drawFlagBorder(flagBox);
}

/** BD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBdFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#176847", "#0f4f37");
  roughCanvas.circle(mapFlagX(0.47, 0.5, flagBox), mapFlagY(0.47, 0.5, flagBox), flagBox.height * 0.42, {
    stroke: "#8f2633",
    strokeWidth: 1.2,
    fill: "#c83c4a",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
  drawFlagBorder(flagBox);
}

/** BE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f4cf34", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#262d2b", "#111615");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f4cf34", "#a98218");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f4f28");
  drawFlagBorder(flagBox);
}

/** BF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBfFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#249064", "#176847");
  drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 30, -18);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** BG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBgFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#5d5a48");
  drawFlagBorder(flagBox);
}

/** BH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBhFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const teeth = 5;
  const zigzag = [[mapFlagX(0.28, 0, flagBox), mapFlagY(0.28, 0, flagBox)]];

  for (let i = 0; i < teeth; i += 1) {
    zigzag.push([mapFlagX(0.42, (i + 0.5) / teeth, flagBox), mapFlagY(0.42, (i + 0.5) / teeth, flagBox)]);
    zigzag.push([mapFlagX(0.28, (i + 1) / teeth, flagBox), mapFlagY(0.28, (i + 1) / teeth, flagBox)]);
  }

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  roughCanvas.polygon(
    [[mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)], ...zigzag, [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)]],
    { stroke: "#c7d1cc", strokeWidth: 1.2, fill: "#fbfdfa", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** BI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBiFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.bi);
}

/** BJ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBjFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 0.4, 1, "#168453", "#0f5f3d");
  drawFlagBand(flagBox, 0.4, 0, 1, 0.5, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0.4, 0.5, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#76623a");
  drawFlagBorder(flagBox);
}

/** BL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBlFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.bl);
}

/** BM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBmFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.bm);
}

/** BN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBnFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.bn);
}

/** BO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBoFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.bo);
}

/** BQ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBqFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.bq);
}

/** BR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBrFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  roughCanvas.polygon(
    [
      [mapFlagX(0.5, 0.12, flagBox), mapFlagY(0.5, 0.12, flagBox)],
      [mapFlagX(0.88, 0.5, flagBox), mapFlagY(0.88, 0.5, flagBox)],
      [mapFlagX(0.5, 0.88, flagBox), mapFlagY(0.5, 0.88, flagBox)],
      [mapFlagX(0.12, 0.5, flagBox), mapFlagY(0.12, 0.5, flagBox)],
    ],
    { stroke: "#a98218", strokeWidth: 1.2, fill: "#f0c83a", fillStyle: "solid", roughness: 2.3, bowing: 1.2 },
  );
  roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.38, {
    stroke: "#203a74",
    strokeWidth: 1.2,
    fill: "#2f4f9d",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawFlagBand({ x: flagBox.x + flagBox.width * 0.35, y: flagBox.y + flagBox.height * 0.47, width: flagBox.width * 0.3, height: flagBox.height * 0.08 }, 0, 0, 1, 1, "#fbfdfa", "#c7d1cc");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
  drawFlagBorder(flagBox);
}

/** BS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBsFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.bs);
}

/** BT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBtFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.bt);
}

/** BV 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBvFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.bv);
}

/** BW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBwFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#75a9d8", "#477aa5");
  drawFlagBand(flagBox, 0, 0, 1, 0.36, "#75a9d8", "#477aa5");
  drawFlagBand(flagBox, 0, 0.36, 1, 0.42, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.42, 1, 0.58, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 0.58, 1, 0.64, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.64, 1, 1, "#75a9d8", "#477aa5");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#416a88");
  drawFlagBorder(flagBox);
}

/** BY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawByFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 0, 0.18, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.18, 0, 1, 0.68, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.18, 0.68, 1, 1, "#249064", "#176847");
  for (let i = 0; i < 6; i += 1) {
    roughCanvas.line(
      mapFlagX(0.035, i / 6, flagBox),
      mapFlagY(0.035, i / 6, flagBox),
      mapFlagX(0.145, (i + 0.5) / 6, flagBox),
      mapFlagY(0.145, (i + 0.5) / 6, flagBox),
      { stroke: "#c83c4a", strokeWidth: 2.4, roughness: 2.2, bowing: 1.5 },
    );
  }
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** BZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawBzFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0, 1, 0.12, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.88, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.42, {
    stroke: "#c7d1cc",
    strokeWidth: 1.2,
    fill: "#fbfdfa",
    fillStyle: "hachure",
    hachureGap: 9,
    fillWeight: 0.45,
    roughness: 2.3,
    bowing: 1.2,
  });
  drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
  drawFlagBorder(flagBox);
}

/** CA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const cx = mapFlagX(0.5, 0.5, flagBox);
  const cy = mapFlagY(0.5, 0.5, flagBox);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.25, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.75, 0, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.polygon(
    [
      [cx, cy - 74],
      [cx + 17, cy - 28],
      [cx + 55, cy - 42],
      [cx + 34, cy - 4],
      [cx + 70, cy + 8],
      [cx + 28, cy + 22],
      [cx + 36, cy + 64],
      [cx, cy + 36],
      [cx - 36, cy + 64],
      [cx - 28, cy + 22],
      [cx - 70, cy + 8],
      [cx - 34, cy - 4],
      [cx - 55, cy - 42],
      [cx - 17, cy - 28],
    ],
    { stroke: "#8f2633", strokeWidth: 1.8, fill: "#c83c4a", fillStyle: "solid", roughness: 2.4, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** CC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCcFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.cc);
}

/** CD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCdFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.cd);
}

/** CF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCfFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.cf);
}

/** CG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCgFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  roughCanvas.polygon(makeFlagCellOutline(0, 0, 1, 1, flagBox), {
    stroke: "#176847",
    strokeWidth: 1.2,
    fill: "#249064",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  roughCanvas.polygon(
    [
      [mapFlagX(0.28, 1, flagBox), mapFlagY(0.28, 1, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
      [mapFlagX(0.72, 0, flagBox), mapFlagY(0.72, 0, flagBox)],
      [mapFlagX(1, 0, flagBox), mapFlagY(1, 0, flagBox)],
    ],
    { stroke: "#a98218", strokeWidth: 1.2, fill: "#f0c83a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  roughCanvas.polygon(
    [
      [mapFlagX(0.72, 0, flagBox), mapFlagY(0.72, 0, flagBox)],
      [mapFlagX(1, 0, flagBox), mapFlagY(1, 0, flagBox)],
      [mapFlagX(1, 1, flagBox), mapFlagY(1, 1, flagBox)],
      [mapFlagX(0.28, 1, flagBox), mapFlagY(0.28, 1, flagBox)],
    ],
    { stroke: "#8f2633", strokeWidth: 1.2, fill: "#c83c4a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** CH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawChFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.41, 0.23, 0.59, 0.77, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.25, 0.41, 0.75, 0.59, "#fbfdfa", "#c7d1cc");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** CI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCiFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#ee8b2c", "#a9601d");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#249064", "#176847");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#7f7041");
  drawFlagBorder(flagBox);
}

/** CK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCkFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ck);
}

/** CL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawClFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.33, 0.5, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 0.33, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
  drawSketchStarWithColors(mapFlagX(0.165, 0.25, flagBox), mapFlagY(0.165, 0.25, flagBox), 18, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** CM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCmFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#f0c83a", "#a98218");
  drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 31, -18);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** CO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCoFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f4cf34", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#f4cf34", "#a98218");
  drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#80623f");
  drawFlagBorder(flagBox);
}

/** CR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCrFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 6, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 1 / 6, 1, 2 / 6, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 6, 1, 4 / 6, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 4 / 6, 1, 5 / 6, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 5 / 6, 1, 1, "#253f78", "#1b2c56");
  roughCanvas.circle(mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox), 36, {
    stroke: "#c7d1cc",
    strokeWidth: 1,
    fill: "#fbfdfa",
    fillStyle: "hachure",
    hachureGap: 7,
    fillWeight: 0.45,
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** CU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCuFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  for (let row = 0; row < 5; row += 1) {
    drawFlagBand(flagBox, 0, row / 5, 1, (row + 1) / 5, row % 2 === 0 ? "#2f4f9d" : "#fbfdfa", row % 2 === 0 ? "#203a74" : "#c7d1cc");
  }
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)],
      [mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
    ],
    { stroke: "#8f2633", strokeWidth: 1.2, fill: "#c83c4a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawSketchStarWithColors(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 18, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
  drawFlagBorder(flagBox);
}

/** CV 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCvFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.cv);
}

/** CW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCwFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.cw);
}

/** CX 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCxFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.cx);
}

/** CY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCyFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.cy);
}

/** CZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawCzFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)],
      [mapFlagX(0.46, 0.5, flagBox), mapFlagY(0.46, 0.5, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
    ],
    { stroke: "#203a74", strokeWidth: 1.2, fill: "#2f4f9d", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** DE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawDeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f4cf34", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#f4cf34", "#a98218");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#745232");
  drawFlagBorder(flagBox);
}

/** DJ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawDjFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#4f9fd3", "#2c6f9b");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#249064", "#176847");
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)],
      [mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
    ],
    { stroke: "#c7d1cc", strokeWidth: 1.2, fill: "#fbfdfa", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawSketchStarWithColors(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 19, -18, {
    stroke: "#8f2633",
    fill: "#c83c4a",
    hatch: "#d8585f",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
  drawFlagBorder(flagBox);
}

/** DK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawDkFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.29, 0, 0.41, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.42, 1, 0.58, "#fbfdfa", "#c7d1cc");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** DM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawDmFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.dm);
}

/** DO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawDoFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.44, 0.42, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0.56, 0, 1, 0.42, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.58, 0.44, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.56, 0.58, 1, 1, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0.44, 0, 0.56, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.42, 1, 0.58, "#fbfdfa", "#c7d1cc");
  drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#249064");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** DZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawDzFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.5, 1, "#249064", "#176847");
  drawFlagBand(flagBox, 0.5, 0, 1, 1, "#fbfdfa", "#c7d1cc");
  roughCanvas.circle(mapFlagX(0.52, 0.5, flagBox), mapFlagY(0.52, 0.5, flagBox), flagBox.height * 0.32, {
    stroke: "#8f2633",
    strokeWidth: 1.2,
    fill: "#c83c4a",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.57, 0.5, flagBox), mapFlagY(0.57, 0.5, flagBox), flagBox.height * 0.27, {
    stroke: "#c7d1cc",
    strokeWidth: 1,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawSketchStarWithColors(mapFlagX(0.62, 0.5, flagBox), mapFlagY(0.62, 0.5, flagBox), 22, -18, {
    stroke: "#8f2633",
    fill: "#c83c4a",
    hatch: "#d8585f",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
  drawFlagBorder(flagBox);
}

/** EC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawEcFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
  drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#a98218");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#80623f");
  drawFlagBorder(flagBox);
}

/** EE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawEeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#4f9fd3", "#2c6f9b");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#fbfdfa", "#c7d1cc");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3c5f73");
  drawFlagBorder(flagBox);
}

/** EG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawEgFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
  drawShieldBadge(flagBox, 0.5, 0.5, "#d7a735", "#a98218");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** EH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawEhFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.eh);
}

/** ER 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawErFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.er);
}

/** ET 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawEtFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.34, {
    stroke: "#203a74",
    strokeWidth: 1.2,
    fill: "#2f4f9d",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 28, -18);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** FI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawFiFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.28, 0, 0.42, 1, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 0, 0.38, 1, 0.56, "#2f4f9d", "#203a74");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
  drawFlagBorder(flagBox);
}

/** FJ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawFjFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.fj);
}

/** FK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawFkFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.fk);
}

/** FM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawFmFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
  [
    [0.5, 0.28],
    [0.68, 0.5],
    [0.5, 0.72],
    [0.32, 0.5],
  ].forEach(([u, v], index) => {
    drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 20, -18 + index * 5, {
      stroke: "#c7d1cc",
      fill: "#fbfdfa",
      hatch: "rgba(251, 253, 250, 0.7)",
    });
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
  drawFlagBorder(flagBox);
}

/** FO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawFoFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.fo);
}

/** GA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#3d78bd", "#284f84");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#5d7653");
  drawFlagBorder(flagBox);
}

/** GB 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGbFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#253f78", "#1b2c56");
  drawCantonLine(flagBox, 0, 0, 1, 1, "#fbfdfa", 26);
  drawCantonLine(flagBox, 1, 0, 0, 1, "#fbfdfa", 26);
  drawCantonLine(flagBox, 0, 0, 1, 1, "#c83c4a", 10);
  drawCantonLine(flagBox, 1, 0, 0, 1, "#c83c4a", 10);
  drawFlagBand(flagBox, 0.43, 0, 0.57, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.39, 1, 0.61, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.47, 0, 0.53, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.45, 1, 0.55, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1b2c56");
  drawFlagBorder(flagBox);
}

/** GD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGdFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.1, 0.16, 0.9, 0.84, "#f0c83a", "#a98218");
  roughCanvas.polygon(
    [
      [mapFlagX(0.1, 0.16, flagBox), mapFlagY(0.1, 0.16, flagBox)],
      [mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox)],
      [mapFlagX(0.1, 0.84, flagBox), mapFlagY(0.1, 0.84, flagBox)],
    ],
    { stroke: "#176847", strokeWidth: 1, fill: "#249064", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  roughCanvas.polygon(
    [
      [mapFlagX(0.9, 0.16, flagBox), mapFlagY(0.9, 0.16, flagBox)],
      [mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox)],
      [mapFlagX(0.9, 0.84, flagBox), mapFlagY(0.9, 0.84, flagBox)],
    ],
    { stroke: "#176847", strokeWidth: 1, fill: "#249064", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 28, -18, {
    stroke: "#b68b12",
    fill: "#ffd84c",
    hatch: "#ffec62",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** GE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.44, 0, 0.56, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.42, 1, 0.58, "#c83c4a", "#8f2633");
  [
    [0.24, 0.23],
    [0.76, 0.23],
    [0.24, 0.77],
    [0.76, 0.77],
  ].forEach(([u, v]) => {
    drawFlagBand(flagBox, u - 0.035, v - 0.11, u + 0.035, v + 0.11, "#c83c4a", "#8f2633");
    drawFlagBand(flagBox, u - 0.105, v - 0.035, u + 0.105, v + 0.035, "#c83c4a", "#8f2633");
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** GF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGfFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.gf);
}

/** GG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGgFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.43, 0, 0.57, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.4, 1, 0.6, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.47, 0.18, 0.53, 0.82, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0.24, 0.47, 0.76, 0.53, "#f0c83a", "#a98218");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** GH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGhFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
  drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 30, -18, {
    stroke: "#111615",
    fill: "#262d2b",
    hatch: "rgba(38, 45, 43, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** GI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGiFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.gi);
}

/** GL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGlFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.circle(mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox), flagBox.height * 0.42, {
    stroke: "#8f2633",
    strokeWidth: 1,
    fill: "#c83c4a",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawFlagBand({ x: mapFlagX(0.17, 0.5, flagBox), y: mapFlagY(0.5, 0.5, flagBox), width: flagBox.width * 0.42, height: flagBox.height * 0.22 }, 0, 0, 1, 1, "#fbfdfa", "#c7d1cc");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** GM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGmFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 0, 1, 0.33, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.33, 1, 0.4, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.4, 1, 0.6, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.6, 1, 0.67, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.67, 1, 1, "#249064", "#176847");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** GN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGnFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f4cf34", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f4cf34", "#a98218");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#249064", "#176847");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** GP 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGpFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.gp);
}

/** GQ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGqFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)],
      [mapFlagX(0.32, 0.5, flagBox), mapFlagY(0.32, 0.5, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
    ],
    { stroke: "#2c6f9b", strokeWidth: 1.2, fill: "#4f9fd3", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#249064");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** GR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGrFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  for (let row = 0; row < 9; row += 1) {
    const fill = row % 2 === 0 ? "#2f78bd" : "#fbfdfa";
    const stroke = row % 2 === 0 ? "#20588e" : "#c7d1cc";
    drawFlagBand(flagBox, 0, row / 9, 1, (row + 1) / 9, fill, stroke);
  }
  drawFlagBand(flagBox, 0, 0, 0.38, 5 / 9, "#2f78bd", "#20588e");
  drawFlagBand(flagBox, 0.145, 0, 0.235, 5 / 9, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 9, 0.38, 3 / 9, "#fbfdfa", "#c7d1cc");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d6e98");
  drawFlagBorder(flagBox);
}

/** GS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGsFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.gs);
}

/** GT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGtFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#75a9d8", "#477aa5");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#75a9d8", "#477aa5");
  drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#477aa5");
  drawFlagBorder(flagBox);
}

/** GU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGuFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.gu);
}

/** GW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGwFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 0.33, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.33, 0, 1, 0.5, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0.33, 0.5, 1, 1, "#249064", "#176847");
  drawSketchStarWithColors(mapFlagX(0.165, 0.5, flagBox), mapFlagY(0.165, 0.5, flagBox), 26, -18, {
    stroke: "#111615",
    fill: "#262d2b",
    hatch: "rgba(38, 45, 43, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** GY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawGyFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)],
      [mapFlagX(0.9, 0.5, flagBox), mapFlagY(0.9, 0.5, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
    ],
    { stroke: "#c7d1cc", strokeWidth: 7, fill: "#f0c83a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0.05, flagBox), mapFlagY(0, 0.05, flagBox)],
      [mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox)],
      [mapFlagX(0, 0.95, flagBox), mapFlagY(0, 0.95, flagBox)],
    ],
    { stroke: "#111615", strokeWidth: 5, fill: "#c83c4a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
  drawFlagBorder(flagBox);
}

/** HK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawHkFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const cx = mapFlagX(0.5, 0.5, flagBox);
  const cy = mapFlagY(0.5, 0.5, flagBox);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  for (let i = 0; i < 5; i += 1) {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 5;
    const petalX = cx + Math.cos(angle) * 42;
    const petalY = cy + Math.sin(angle) * 42;
    roughCanvas.circle(petalX, petalY, 42, {
      stroke: "#c7d1cc",
      strokeWidth: 1,
      fill: "#fbfdfa",
      fillStyle: "solid",
      roughness: 2.4,
      bowing: 1.2,
    });
  }
  roughCanvas.circle(cx, cy, 22, {
    stroke: "#8f2633",
    strokeWidth: 1,
    fill: "#c83c4a",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.1,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** HM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawHmFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.hm);
}

/** HN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawHnFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#4f9fd3", "#2c6f9b");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#4f9fd3", "#2c6f9b");
  [
    [0.42, 0.43],
    [0.58, 0.43],
    [0.5, 0.5],
    [0.42, 0.57],
    [0.58, 0.57],
  ].forEach(([u, v], index) => {
    drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 9, -18 + index * 4, {
      stroke: "#2c6f9b",
      fill: "#4f9fd3",
      hatch: "#75b6de",
    });
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
  drawFlagBorder(flagBox);
}

/** HR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawHrFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#253f78", "#1b2c56");
  drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#c83c4a");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** HT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawHtFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.38, 0.38, 0.62, 0.62, "#fbfdfa", "#c7d1cc");
  drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** HU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawHuFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#71634e");
  drawFlagBorder(flagBox);
}

/** ID 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawIdFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** IE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawIeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#ee8b2c", "#a9601d");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#75744a");
  drawFlagBorder(flagBox);
}

/** IL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawIlFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.16, 1, 0.26, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 0, 0.74, 1, 0.84, "#2f4f9d", "#203a74");
  drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 46, -30, {
    stroke: "#203a74",
    fill: "rgba(47, 79, 157, 0.08)",
    hatch: "#2f4f9d",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
  drawFlagBorder(flagBox);
}

/** IM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawImFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.im);
}

/** IN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawInFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const cx = mapFlagX(0.5, 0.5, flagBox);
  const cy = mapFlagY(0.5, 0.5, flagBox);
  const wheelRadius = 34;

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#ee8b2c", "#a9601d");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
  roughCanvas.circle(cx, cy, wheelRadius * 2, {
    stroke: "#203a74",
    strokeWidth: 1.4,
    fill: "transparent",
    roughness: 2.1,
    bowing: 1.1,
  });
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    roughCanvas.line(cx, cy, cx + Math.cos(angle) * wheelRadius, cy + Math.sin(angle) * wheelRadius, {
      stroke: "#203a74",
      strokeWidth: 0.65,
      roughness: 2,
      bowing: 1.3,
    });
  }
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#756b4d");
  drawFlagBorder(flagBox);
}

/** IO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawIoFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.io);
}

/** IQ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawIqFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
  roughCanvas.line(mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox), mapFlagX(0.62, 0.5, flagBox), mapFlagY(0.62, 0.5, flagBox), {
    stroke: "#249064",
    strokeWidth: 5,
    roughness: 2.2,
    bowing: 1.5,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** IR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawIrFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.47, 0.39, 0.53, 0.61, "#c83c4a", "#8f2633");
  drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 20, -18, {
    stroke: "#8f2633",
    fill: "rgba(200, 60, 74, 0.18)",
    hatch: "#c83c4a",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** IS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawIsFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 0.28, 0, 0.46, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.36, 1, 0.58, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.33, 0, 0.41, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.43, 1, 0.51, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4f4e86");
  drawFlagBorder(flagBox);
}

/** JE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawJeFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.je);
}

/** JM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawJmFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  roughCanvas.polygon(
    [[mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)], [mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox)], [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)]],
    { stroke: "#111615", strokeWidth: 1, fill: "#262d2b", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  roughCanvas.polygon(
    [[mapFlagX(1, 0, flagBox), mapFlagY(1, 0, flagBox)], [mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox)], [mapFlagX(1, 1, flagBox), mapFlagY(1, 1, flagBox)]],
    { stroke: "#111615", strokeWidth: 1, fill: "#262d2b", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawCantonLine(flagBox, 0, 0, 1, 1, "#f0c83a", 26);
  drawCantonLine(flagBox, 1, 0, 0, 1, "#f0c83a", 26);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
  drawFlagBorder(flagBox);
}

/** JO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawJoFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)],
      [mapFlagX(0.44, 0.5, flagBox), mapFlagY(0.44, 0.5, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
    ],
    { stroke: "#8f2633", strokeWidth: 1.2, fill: "#c83c4a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawSketchStarWithColors(mapFlagX(0.18, 0.5, flagBox), mapFlagY(0.18, 0.5, flagBox), 16, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** KE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.3, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 0.34, 1, 0.66, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.7, 1, 1, "#249064", "#176847");
  roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 76, {
    stroke: "#111615",
    strokeWidth: 1.3,
    fill: "#b64f36",
    fillStyle: "hachure",
    hachureGap: 8,
    fillWeight: 0.55,
    roughness: 2.3,
    bowing: 1.2,
  });
  roughCanvas.line(mapFlagX(0.42, 0.25, flagBox), mapFlagY(0.42, 0.25, flagBox), mapFlagX(0.58, 0.75, flagBox), mapFlagY(0.58, 0.75, flagBox), {
    stroke: "#fbfdfa",
    strokeWidth: 3,
    roughness: 2.2,
    bowing: 1.5,
  });
  roughCanvas.line(mapFlagX(0.58, 0.25, flagBox), mapFlagY(0.58, 0.25, flagBox), mapFlagX(0.42, 0.75, flagBox), mapFlagY(0.42, 0.75, flagBox), {
    stroke: "#fbfdfa",
    strokeWidth: 3,
    roughness: 2.2,
    bowing: 1.5,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** KG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKgFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const cx = mapFlagX(0.5, 0.5, flagBox);
  const cy = mapFlagY(0.5, 0.5, flagBox);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  roughCanvas.circle(cx, cy, 90, {
    stroke: "#b68b12",
    strokeWidth: 1.2,
    fill: "#ffd84c",
    fillStyle: "hachure",
    hachureGap: 9,
    fillWeight: 0.7,
    roughness: 2.3,
    bowing: 1.2,
  });
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8;
    roughCanvas.line(cx, cy, cx + Math.cos(angle) * 68, cy + Math.sin(angle) * 68, {
      stroke: "#c83c4a",
      strokeWidth: 1,
      roughness: 2,
      bowing: 1.3,
    });
  }
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** KH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKhFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0, 1, 0.25, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.75, 1, 1, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0.38, 0.48, 0.62, 0.66, "#fbfdfa", "#c7d1cc");
  roughCanvas.polygon(
    [
      [mapFlagX(0.4, 0.48, flagBox), mapFlagY(0.4, 0.48, flagBox)],
      [mapFlagX(0.5, 0.34, flagBox), mapFlagY(0.5, 0.34, flagBox)],
      [mapFlagX(0.6, 0.48, flagBox), mapFlagY(0.6, 0.48, flagBox)],
    ],
    { stroke: "#c7d1cc", strokeWidth: 1, fill: "#fbfdfa", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** KI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKiFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ki);
}

/** KM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKmFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.25, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0.25, 1, 0.5, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.75, 1, 1, "#253f78", "#1b2c56");
  roughCanvas.polygon(
    [[mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)], [mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox)], [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)]],
    { stroke: "#176847", strokeWidth: 1.2, fill: "#249064", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  roughCanvas.circle(mapFlagX(0.17, 0.5, flagBox), mapFlagY(0.17, 0.5, flagBox), 54, {
    stroke: "#c7d1cc",
    strokeWidth: 1,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.2, 0.5, flagBox), mapFlagY(0.2, 0.5, flagBox), 48, {
    stroke: "#176847",
    strokeWidth: 1,
    fill: "#249064",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** KN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKnFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  roughCanvas.polygon(
    [[mapFlagX(1, 0, flagBox), mapFlagY(1, 0, flagBox)], [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)], [mapFlagX(1, 1, flagBox), mapFlagY(1, 1, flagBox)]],
    { stroke: "#8f2633", strokeWidth: 1, fill: "#c83c4a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawCantonLine(flagBox, 0, 1, 1, 0, "#f0c83a", 46);
  drawCantonLine(flagBox, 0, 1, 1, 0, "#262d2b", 28);
  [
    [0.38, 0.58],
    [0.62, 0.42],
  ].forEach(([u, v]) =>
    drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 18, -18, {
      stroke: "#c7d1cc",
      fill: "#fbfdfa",
      hatch: "rgba(251, 253, 250, 0.7)",
    }),
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
  drawFlagBorder(flagBox);
}

/** KP 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKpFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0, 1, 0.18, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.18, 1, 0.24, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.76, 1, 0.82, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.82, 1, 1, "#253f78", "#1b2c56");
  roughCanvas.circle(mapFlagX(0.32, 0.5, flagBox), mapFlagY(0.32, 0.5, flagBox), 82, {
    stroke: "#c7d1cc",
    strokeWidth: 1,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  drawSketchStarWithColors(mapFlagX(0.32, 0.5, flagBox), mapFlagY(0.32, 0.5, flagBox), 30, -18, {
    stroke: "#8f2633",
    fill: "#c83c4a",
    hatch: "#d8585f",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** KR 国旗专门模板：白底、太极双色圆和四组手绘卦线。 */
function drawKrFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const cx = mapFlagX(0.5, 0.5, flagBox);
  const cy = mapFlagY(0.5, 0.5, flagBox);
  const radius = flagBox.height * 0.18;

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((-34 * Math.PI) / 180);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#c83c4a";
  ctx.fillRect(-radius, -radius, radius * 2, radius);
  ctx.fillStyle = "#253f78";
  ctx.fillRect(-radius, 0, radius * 2, radius);
  ctx.beginPath();
  ctx.arc(-radius / 2, 0, radius / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#253f78";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(radius / 2, 0, radius / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#c83c4a";
  ctx.fill();
  ctx.restore();

  roughCanvas.circle(cx, cy, radius * 2, {
    stroke: "#28332e",
    strokeWidth: 1.1,
    fill: "transparent",
    roughness: 2.1,
    bowing: 1.1,
  });

  drawKoreanTrigram(flagBox, 0.28, 0.27, -34, [true, true, true]);
  drawKoreanTrigram(flagBox, 0.72, 0.27, 34, [false, true, false]);
  drawKoreanTrigram(flagBox, 0.28, 0.73, 34, [true, false, true]);
  drawKoreanTrigram(flagBox, 0.72, 0.73, -34, [false, false, false]);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#cbd8ce");
  drawFlagBorder(flagBox);
}

/** KW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKwFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)],
      [mapFlagX(0.28, 1 / 3, flagBox), mapFlagY(0.28, 1 / 3, flagBox)],
      [mapFlagX(0.28, 2 / 3, flagBox), mapFlagY(0.28, 2 / 3, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
    ],
    { stroke: "#111615", strokeWidth: 1.2, fill: "#262d2b", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** KY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKyFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ky);
}

/** KZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawKzFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
  drawFlagBand(flagBox, 0.08, 0.08, 0.12, 0.92, "#f0c83a", "#a98218");
  roughCanvas.circle(mapFlagX(0.55, 0.42, flagBox), mapFlagY(0.55, 0.42, flagBox), 76, {
    stroke: "#b68b12",
    strokeWidth: 1,
    fill: "#ffd84c",
    fillStyle: "hachure",
    hachureGap: 8,
    fillWeight: 0.6,
    roughness: 2.2,
    bowing: 1.2,
  });
  roughCanvas.line(mapFlagX(0.42, 0.62, flagBox), mapFlagY(0.42, 0.62, flagBox), mapFlagX(0.68, 0.62, flagBox), mapFlagY(0.68, 0.62, flagBox), {
    stroke: "#a98218",
    strokeWidth: 5,
    roughness: 2.2,
    bowing: 1.6,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
  drawFlagBorder(flagBox);
}

/** LA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#273f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#273f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.34, {
    stroke: "#c7d1cc",
    strokeWidth: 1.2,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4f4e86");
  drawFlagBorder(flagBox);
}

/** LB 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLbFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.75, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.polygon(
    [
      [mapFlagX(0.5, 0.34, flagBox), mapFlagY(0.5, 0.34, flagBox)],
      [mapFlagX(0.6, 0.6, flagBox), mapFlagY(0.6, 0.6, flagBox)],
      [mapFlagX(0.53, 0.6, flagBox), mapFlagY(0.53, 0.6, flagBox)],
      [mapFlagX(0.53, 0.68, flagBox), mapFlagY(0.53, 0.68, flagBox)],
      [mapFlagX(0.47, 0.68, flagBox), mapFlagY(0.47, 0.68, flagBox)],
      [mapFlagX(0.47, 0.6, flagBox), mapFlagY(0.47, 0.6, flagBox)],
      [mapFlagX(0.4, 0.6, flagBox), mapFlagY(0.4, 0.6, flagBox)],
    ],
    { stroke: "#176847", strokeWidth: 1.2, fill: "#249064", fillStyle: "solid", roughness: 2.3, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** LC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLcFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
  roughCanvas.polygon(
    [[mapFlagX(0.5, 0.2, flagBox), mapFlagY(0.5, 0.2, flagBox)], [mapFlagX(0.73, 0.78, flagBox), mapFlagY(0.73, 0.78, flagBox)], [mapFlagX(0.27, 0.78, flagBox), mapFlagY(0.27, 0.78, flagBox)]],
    { stroke: "#111615", strokeWidth: 1.2, fill: "#262d2b", fillStyle: "solid", roughness: 2.3, bowing: 1.2 },
  );
  roughCanvas.polygon(
    [[mapFlagX(0.5, 0.29, flagBox), mapFlagY(0.5, 0.29, flagBox)], [mapFlagX(0.64, 0.74, flagBox), mapFlagY(0.64, 0.74, flagBox)], [mapFlagX(0.36, 0.74, flagBox), mapFlagY(0.36, 0.74, flagBox)]],
    { stroke: "#a98218", strokeWidth: 1.1, fill: "#f0c83a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
  drawFlagBorder(flagBox);
}

/** LI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLiFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.circle(mapFlagX(0.18, 0.24, flagBox), mapFlagY(0.18, 0.24, flagBox), 34, {
    stroke: "#b68b12",
    strokeWidth: 1,
    fill: "#ffd84c",
    fillStyle: "hachure",
    hachureGap: 6,
    fillWeight: 0.8,
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFlagBand(flagBox, 0.13, 0.29, 0.23, 0.34, "#ffd84c", "#b68b12");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** LK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLkFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0.08, 0.1, 0.22, 0.9, "#249064", "#176847");
  drawFlagBand(flagBox, 0.22, 0.1, 0.36, 0.9, "#ee8b2c", "#a9601d");
  drawFlagBand(flagBox, 0.4, 0.1, 0.92, 0.9, "#7b314b", "#572439");
  drawSketchStarWithColors(mapFlagX(0.66, 0.5, flagBox), mapFlagY(0.66, 0.5, flagBox), 42, -18, {
    stroke: "#b68b12",
    fill: "#ffd84c",
    hatch: "#ffec62",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#80623f");
  drawFlagBorder(flagBox);
}

/** LR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLrFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  for (let row = 0; row < 11; row += 1) {
    if (row % 2 === 0) {
      drawFlagBand(flagBox, 0, row / 11, 1, (row + 1) / 11, "#c83c4a", "#8f2633");
    }
  }
  drawFlagBand(flagBox, 0, 0, 0.36, 5 / 11, "#253f78", "#1b2c56");
  drawSketchStarWithColors(mapFlagX(0.18, 0.23, flagBox), mapFlagY(0.18, 0.23, flagBox), 18, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** LS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLsFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.3, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.3, 1, 0.7, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.7, 1, 1, "#249064", "#176847");
  roughCanvas.polygon(
    [[mapFlagX(0.5, 0.42, flagBox), mapFlagY(0.5, 0.42, flagBox)], [mapFlagX(0.6, 0.62, flagBox), mapFlagY(0.6, 0.62, flagBox)], [mapFlagX(0.4, 0.62, flagBox), mapFlagY(0.4, 0.62, flagBox)]],
    { stroke: "#111615", strokeWidth: 1.2, fill: "#262d2b", fillStyle: "solid", roughness: 2.3, bowing: 1.2 },
  );
  roughCanvas.line(mapFlagX(0.38, 0.63, flagBox), mapFlagY(0.38, 0.63, flagBox), mapFlagX(0.62, 0.63, flagBox), mapFlagY(0.62, 0.63, flagBox), {
    stroke: "#262d2b",
    strokeWidth: 4,
    roughness: 2.2,
    bowing: 1.5,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#4d5d86");
  drawFlagBorder(flagBox);
}

/** LT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLtFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** LU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLuFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#56a9d8", "#35789d");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6d7082");
  drawFlagBorder(flagBox);
}

/** LV 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLvFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#8b2934", "#63202a");
  drawFlagBand(flagBox, 0, 0, 1, 0.4, "#8b2934", "#63202a");
  drawFlagBand(flagBox, 0, 0.4, 1, 0.6, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.6, 1, 1, "#8b2934", "#63202a");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#63202a");
  drawFlagBorder(flagBox);
}

/** LY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawLyFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.25, 1, 0.75, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 0.75, 1, 1, "#249064", "#176847");
  roughCanvas.circle(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), flagBox.height * 0.25, {
    stroke: "#c7d1cc",
    strokeWidth: 1.1,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.53, 0.5, flagBox), mapFlagY(0.53, 0.5, flagBox), flagBox.height * 0.22, {
    stroke: "#111615",
    strokeWidth: 1,
    fill: "#262d2b",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  drawSketchStarWithColors(mapFlagX(0.6, 0.5, flagBox), mapFlagY(0.6, 0.5, flagBox), 18, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#111615");
  drawFlagBorder(flagBox);
}

/** MA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 54, -18, {
    stroke: "#176847",
    fill: "rgba(36, 144, 100, 0.16)",
    hatch: "#249064",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** MC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMcFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** MD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMdFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawShieldBadge(flagBox, 0.5, 0.5, "#fbfdfa", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
  drawFlagBorder(flagBox);
}

/** ME 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMeFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.me);
}

/** MF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMfFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#2d4e8c", "#1e3768");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#cf3d45", "#912936");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6d7082");
  drawFlagBorder(flagBox);
}

/** MG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMgFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.35, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.35, 0, 1, 0.5, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.35, 0.5, 1, 1, "#249064", "#176847");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#71634e");
  drawFlagBorder(flagBox);
}

/** MH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMhFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.mh);
}

/** MK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMkFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const cx = mapFlagX(0.5, 0.5, flagBox);
  const cy = mapFlagY(0.5, 0.5, flagBox);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8;
    roughCanvas.line(cx, cy, cx + Math.cos(angle) * flagBox.width * 0.55, cy + Math.sin(angle) * flagBox.height * 0.55, {
      stroke: "#f0c83a",
      strokeWidth: 13,
      roughness: 2.3,
      bowing: 1.5,
    });
  }
  roughCanvas.circle(cx, cy, 76, {
    stroke: "#a98218",
    strokeWidth: 1.2,
    fill: "#ffd84c",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** ML 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMlFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** MM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMmFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
  drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 58, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** MN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMnFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.12, 0.22, 0.2, 0.78, "#ffd84c", "#b68b12");
  roughCanvas.circle(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 38, {
    stroke: "#b68b12",
    strokeWidth: 1,
    fill: "transparent",
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** MO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMoFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.mo);
}

/** MP 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMpFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.mp);
}

/** MQ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMqFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.mq);
}

/** MR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMrFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#176847", "#0f4f37");
  drawFlagBand(flagBox, 0, 0, 1, 0.18, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.82, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.circle(mapFlagX(0.5, 0.47, flagBox), mapFlagY(0.5, 0.47, flagBox), flagBox.height * 0.32, {
    stroke: "#b68b12",
    strokeWidth: 1.2,
    fill: "transparent",
    roughness: 2.2,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.5, 0.41, flagBox), mapFlagY(0.5, 0.41, flagBox), flagBox.height * 0.3, {
    stroke: "#0f4f37",
    strokeWidth: 1,
    fill: "#176847",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  drawSketchStar(mapFlagX(0.5, 0.38, flagBox), mapFlagY(0.5, 0.38, flagBox), 25, -18);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
  drawFlagBorder(flagBox);
}

/** MS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMsFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ms);
}

/** MT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMtFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.5, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.5, 0, 1, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.11, 0.16, 0.17, 0.31, "#c7d1cc", "#8f9b96");
  drawFlagBand(flagBox, 0.07, 0.2, 0.21, 0.27, "#c7d1cc", "#8f9b96");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** MU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMuFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 0, 1, 0.25, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.25, 1, 0.5, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.5, 1, 0.75, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0.75, 1, 1, "#249064", "#176847");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
  drawFlagBorder(flagBox);
}

/** MV 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMvFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.18, 0.22, 0.82, 0.78, "#176847", "#0f4f37");
  roughCanvas.circle(mapFlagX(0.53, 0.5, flagBox), mapFlagY(0.53, 0.5, flagBox), flagBox.height * 0.27, {
    stroke: "#c7d1cc",
    strokeWidth: 1.2,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.58, 0.5, flagBox), mapFlagY(0.58, 0.5, flagBox), flagBox.height * 0.24, {
    stroke: "#0f4f37",
    strokeWidth: 1,
    fill: "#176847",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** MW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMwFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
  roughCanvas.circle(mapFlagX(0.5, 0.19, flagBox), mapFlagY(0.5, 0.19, flagBox), 56, {
    stroke: "#8f2633",
    strokeWidth: 1,
    fill: "#c83c4a",
    fillStyle: "hachure",
    hachureGap: 8,
    fillWeight: 0.7,
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** MX 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMxFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#176847", "#0f4f37");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 58, {
    stroke: "#a98218",
    strokeWidth: 1.2,
    fill: "#f0c83a",
    fillStyle: "hachure",
    hachureGap: 8,
    fillWeight: 0.45,
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** MY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMyFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  for (let row = 0; row < 14; row += 1) {
    if (row % 2 === 0) {
      drawFlagBand(flagBox, 0, row / 14, 1, (row + 1) / 14, "#c83c4a", "#8f2633");
    }
  }
  drawFlagBand(flagBox, 0, 0, 0.48, 0.55, "#253f78", "#1b2c56");
  roughCanvas.circle(mapFlagX(0.22, 0.28, flagBox), mapFlagY(0.22, 0.28, flagBox), 54, {
    stroke: "#b68b12",
    strokeWidth: 1,
    fill: "#ffd84c",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.26, 0.28, flagBox), mapFlagY(0.26, 0.28, flagBox), 48, {
    stroke: "#1b2c56",
    strokeWidth: 1,
    fill: "#253f78",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  drawSketchStar(mapFlagX(0.34, 0.28, flagBox), mapFlagY(0.34, 0.28, flagBox), 20, -18);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** MZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawMzFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 0.35, 1, 0.65, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 0.7, 1, 1, "#f0c83a", "#a98218");
  roughCanvas.polygon(
    [[mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)], [mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox)], [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)]],
    { stroke: "#8f2633", strokeWidth: 1.2, fill: "#c83c4a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawSketchStar(mapFlagX(0.16, 0.5, flagBox), mapFlagY(0.16, 0.5, flagBox), 22, -18);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** NA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#253f78", "#1b2c56");
  roughCanvas.polygon(
    [[mapFlagX(1, 0, flagBox), mapFlagY(1, 0, flagBox)], [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)], [mapFlagX(1, 1, flagBox), mapFlagY(1, 1, flagBox)]],
    { stroke: "#176847", strokeWidth: 1, fill: "#249064", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawCantonLine(flagBox, 0, 1, 1, 0, "#fbfdfa", 38);
  drawCantonLine(flagBox, 0, 1, 1, 0, "#c83c4a", 22);
  roughCanvas.circle(mapFlagX(0.2, 0.22, flagBox), mapFlagY(0.2, 0.22, flagBox), 48, {
    stroke: "#b68b12",
    strokeWidth: 1,
    fill: "#ffd84c",
    fillStyle: "hachure",
    hachureGap: 7,
    fillWeight: 0.7,
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** NC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNcFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.nc);
}

/** NE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#ee8b2c", "#a9601d");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
  roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 42, {
    stroke: "#a9601d",
    strokeWidth: 1,
    fill: "#ee8b2c",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#756b4d");
  drawFlagBorder(flagBox);
}

/** NF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNfFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.nf);
}

/** NG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNgFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#249064", "#176847");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
  drawFlagBorder(flagBox);
}

/** NI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNiFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ni);
}

/** NL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNlFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#b63842", "#7d2530");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#2f4f9d", "#203a74");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#634b67");
  drawFlagBorder(flagBox);
}

/** NO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNoFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.28, 0, 0.46, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.36, 1, 0.58, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.33, 0, 0.41, 1, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.43, 1, 0.51, "#253f78", "#1b2c56");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** NP 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNpFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.np);
}

/** NR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNrFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.nr);
}

/** NU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNuFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.nu);
}

/** NZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawNzFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.nz);
}

/** OM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawOmFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.25, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.25, 0, 1, 1 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.25, 1 / 3, 1, 2 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0.25, 2 / 3, 1, 1, "#249064", "#176847");
  drawShieldBadge(flagBox, 0.125, 0.2, "#fbfdfa", "#c7d1cc");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** PA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 0.5, 0.5, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0.5, 0, 1, 0.5, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.5, 0.5, 1, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 0.5, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
  drawSketchStarWithColors(mapFlagX(0.25, 0.25, flagBox), mapFlagY(0.25, 0.25, flagBox), 22, -18, {
    stroke: "#203a74",
    fill: "#2f4f9d",
    hatch: "#4770bd",
  });
  drawSketchStarWithColors(mapFlagX(0.75, 0.75, flagBox), mapFlagY(0.75, 0.75, flagBox), 22, -18, {
    stroke: "#8f2633",
    fill: "#c83c4a",
    hatch: "#d8585f",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** PE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawShieldBadge(flagBox, 0.5, 0.5, "#f0c83a", "#249064");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** PF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPfFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.pf);
}

/** PG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPgFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.pg);
}

/** PH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPhFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
  roughCanvas.polygon(
    [[mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)], [mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox)], [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)]],
    { stroke: "#c7d1cc", strokeWidth: 1.2, fill: "#fbfdfa", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  roughCanvas.circle(mapFlagX(0.17, 0.5, flagBox), mapFlagY(0.17, 0.5, flagBox), 34, {
    stroke: "#b68b12",
    strokeWidth: 1,
    fill: "#ffd84c",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** PK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPkFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#176847", "#0f4f37");
  drawFlagBand(flagBox, 0, 0, 0.25, 1, "#fbfdfa", "#c7d1cc");
  roughCanvas.circle(mapFlagX(0.58, 0.47, flagBox), mapFlagY(0.58, 0.47, flagBox), flagBox.height * 0.35, {
    stroke: "#c7d1cc",
    strokeWidth: 1.2,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.64, 0.45, flagBox), mapFlagY(0.64, 0.45, flagBox), flagBox.height * 0.31, {
    stroke: "#0f4f37",
    strokeWidth: 1,
    fill: "#176847",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawSketchStarWithColors(mapFlagX(0.68, 0.34, flagBox), mapFlagY(0.68, 0.34, flagBox), 24, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#0f4f37");
  drawFlagBorder(flagBox);
}

/** PL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPlFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** PM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPmFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.pm);
}

/** PN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPnFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.pn);
}

/** PR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPrFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.pr);
}

/** PS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPsFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#262d2b", "#111615");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#249064", "#176847");
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)],
      [mapFlagX(0.38, 0.5, flagBox), mapFlagY(0.38, 0.5, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
    ],
    { stroke: "#8f2633", strokeWidth: 1.2, fill: "#c83c4a", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** PT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPtFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.pt);
}

/** PW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPwFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.pw);
}

/** PY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawPyFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.py);
}

/** QA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawQaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const teeth = 9;
  const zigzag = [[mapFlagX(0.25, 0, flagBox), mapFlagY(0.25, 0, flagBox)]];

  for (let i = 0; i < teeth; i += 1) {
    zigzag.push([mapFlagX(0.36, (i + 0.5) / teeth, flagBox), mapFlagY(0.36, (i + 0.5) / teeth, flagBox)]);
    zigzag.push([mapFlagX(0.25, (i + 1) / teeth, flagBox), mapFlagY(0.25, (i + 1) / teeth, flagBox)]);
  }

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#7b314b", "#572439");
  roughCanvas.polygon(
    [[mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)], ...zigzag, [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)]],
    { stroke: "#c7d1cc", strokeWidth: 1.2, fill: "#fbfdfa", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#572439");
  drawFlagBorder(flagBox);
}

/** RE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawReFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.re);
}

/** RO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawRoFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705c4d");
  drawFlagBorder(flagBox);
}

/** RS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawRsFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.rs);
}

/** RU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawRuFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#2f4f9d", "#203a74");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6b4e74");
  drawFlagBorder(flagBox);
}

/** RW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawRwFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.rw);
}

/** SA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSaFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sa);
}

/** SB 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSbFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sb);
}

/** SC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawScFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sc);
}

/** SD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSdFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
  roughCanvas.polygon(
    [
      [mapFlagX(0, 0, flagBox), mapFlagY(0, 0, flagBox)],
      [mapFlagX(0.36, 0.5, flagBox), mapFlagY(0.36, 0.5, flagBox)],
      [mapFlagX(0, 1, flagBox), mapFlagY(0, 1, flagBox)],
    ],
    { stroke: "#176847", strokeWidth: 1.2, fill: "#249064", fillStyle: "solid", roughness: 2.2, bowing: 1.2 },
  );
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** SE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#2f78bd", "#20588e");
  drawFlagBand(flagBox, 0.28, 0, 0.42, 1, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0.4, 1, 0.56, "#f0c83a", "#a98218");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d6e98");
  drawFlagBorder(flagBox);
}

/** SG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSgFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#fbfdfa", "#c7d1cc");
  roughCanvas.circle(mapFlagX(0.22, 0.25, flagBox), mapFlagY(0.22, 0.25, flagBox), flagBox.height * 0.24, {
    stroke: "#c7d1cc",
    strokeWidth: 1,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.26, 0.25, flagBox), mapFlagY(0.26, 0.25, flagBox), flagBox.height * 0.2, {
    stroke: "#8f2633",
    strokeWidth: 1,
    fill: "#c83c4a",
    fillStyle: "solid",
    roughness: 2.2,
    bowing: 1.2,
  });
  [
    [0.34, 0.15],
    [0.39, 0.21],
    [0.38, 0.31],
    [0.3, 0.35],
    [0.28, 0.23],
  ].forEach(([u, v], index) => {
    drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), 8, -18 + index * 5, {
      stroke: "#c7d1cc",
      fill: "#fbfdfa",
      hatch: "rgba(251, 253, 250, 0.7)",
    });
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** SH 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawShFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sh);
}

/** SI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSiFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.si);
}

/** SJ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSjFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sj);
}

/** SK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSkFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sk);
}

/** SL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSlFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#249064", "#176847");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#4f9fd3", "#2c6f9b");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3f755c");
  drawFlagBorder(flagBox);
}

/** SM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSmFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sm);
}

/** SN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSnFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#249064", "#176847");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 30, -18, {
    stroke: "#176847",
    fill: "#249064",
    hatch: "#38a975",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#70623c");
  drawFlagBorder(flagBox);
}

/** SO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSoFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#4f9fd3", "#2c6f9b");
  drawSketchStarWithColors(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 44, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#2c6f9b");
  drawFlagBorder(flagBox);
}

/** SR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSrFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sr);
}

/** SS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSsFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ss);
}

/** ST 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawStFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.st);
}

/** SV 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSvFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sv);
}

/** SX 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSxFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sx);
}

/** SY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSyFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
  drawSketchStarWithColors(mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox), 20, -18, {
    stroke: "#176847",
    fill: "#249064",
    hatch: "#38a975",
  });
  drawSketchStarWithColors(mapFlagX(0.58, 0.5, flagBox), mapFlagY(0.58, 0.5, flagBox), 20, -18, {
    stroke: "#176847",
    fill: "#249064",
    hatch: "#38a975",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** SZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawSzFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.sz);
}

/** TC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTcFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tc);
}

/** TD 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTdFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1 / 3, 1, "#253f78", "#1b2c56");
  drawFlagBand(flagBox, 1 / 3, 0, 2 / 3, 1, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 2 / 3, 0, 1, 1, "#c83c4a", "#8f2633");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#705b4a");
  drawFlagBorder(flagBox);
}

/** TF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTfFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tf);
}

/** TG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTgFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tg);
}

/** TJ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTjFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tj);
}

/** TK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTkFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tk);
}

/** TL 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTlFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tl);
}

/** TM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTmFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tm);
}

/** TN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTnFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  roughCanvas.circle(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), flagBox.height * 0.44, {
    stroke: "#c7d1cc",
    strokeWidth: 1.2,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.48, 0.5, flagBox), mapFlagY(0.48, 0.5, flagBox), flagBox.height * 0.25, {
    stroke: "#8f2633",
    strokeWidth: 1.2,
    fill: "#c83c4a",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.53, 0.5, flagBox), mapFlagY(0.53, 0.5, flagBox), flagBox.height * 0.21, {
    stroke: "#c7d1cc",
    strokeWidth: 1,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawSketchStarWithColors(mapFlagX(0.58, 0.5, flagBox), mapFlagY(0.58, 0.5, flagBox), 20, -18, {
    stroke: "#8f2633",
    fill: "#c83c4a",
    hatch: "#d8585f",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** TO 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawToFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.to);
}

/** TR 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTrFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  roughCanvas.circle(mapFlagX(0.42, 0.5, flagBox), mapFlagY(0.42, 0.5, flagBox), flagBox.height * 0.36, {
    stroke: "#c7d1cc",
    strokeWidth: 1.2,
    fill: "#fbfdfa",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  roughCanvas.circle(mapFlagX(0.47, 0.5, flagBox), mapFlagY(0.47, 0.5, flagBox), flagBox.height * 0.29, {
    stroke: "#8f2633",
    strokeWidth: 1,
    fill: "#c83c4a",
    fillStyle: "solid",
    roughness: 2.3,
    bowing: 1.2,
  });
  drawSketchStarWithColors(mapFlagX(0.59, 0.5, flagBox), mapFlagY(0.59, 0.5, flagBox), 26, -18, {
    stroke: "#c7d1cc",
    fill: "#fbfdfa",
    hatch: "rgba(251, 253, 250, 0.7)",
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** TT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTtFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tt);
}

/** TV 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTvFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tv);
}

/** TW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTwFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tw);
}

/** TZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawTzFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.tz);
}

/** UA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawUaFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#f0c83a", "#a98218");
  drawFlagBand(flagBox, 0, 0, 1, 0.5, "#3d78bd", "#284f84");
  drawFlagBand(flagBox, 0, 0.5, 1, 1, "#f0c83a", "#a98218");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#5d7653");
  drawFlagBorder(flagBox);
}

/** UG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawUgFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ug);
}

/** UM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawUmFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.um);
}

/** UY 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawUyFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  for (let row = 1; row < 9; row += 2) {
    drawFlagBand(flagBox, 0, row / 9, 1, (row + 1) / 9, "#2f78bd", "#20588e");
  }
  drawFlagBand(flagBox, 0, 0, 0.34, 5 / 9, "#fbfdfa", "#c7d1cc");
  roughCanvas.circle(mapFlagX(0.17, 0.27, flagBox), mapFlagY(0.17, 0.27, flagBox), 40, {
    stroke: "#b68b12",
    strokeWidth: 1.2,
    fill: "#ffd84c",
    fillStyle: "hachure",
    hachureGap: 7,
    fillWeight: 0.8,
    roughness: 2.2,
    bowing: 1.2,
  });
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#3d6e98");
  drawFlagBorder(flagBox);
}

/** UZ 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawUzFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.uz);
}

/** VC 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawVcFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.vc);
}

/** VE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawVeFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ve);
}

/** VG 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawVgFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.vg);
}

/** VI 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawViFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.vi);
}

/** VN 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawVnFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#c83c4a", "#8f2633");
  drawSketchStar(mapFlagX(0.5, 0.5, flagBox), mapFlagY(0.5, 0.5, flagBox), 54, -18);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8f2633");
  drawFlagBorder(flagBox);
}

/** VU 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawVuFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.vu);
}

/** WF 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawWfFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.wf);
}

/** WS 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawWsFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.ws);
}

/** XK 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawXkFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.xk);
}

/** YE 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawYeFlag() {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 0, 1, 1 / 3, "#c83c4a", "#8f2633");
  drawFlagBand(flagBox, 0, 1 / 3, 1, 2 / 3, "#fbfdfa", "#c7d1cc");
  drawFlagBand(flagBox, 0, 2 / 3, 1, 1, "#262d2b", "#111615");
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#6f353c");
  drawFlagBorder(flagBox);
}

/** YT 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawYtFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.yt);
}

/** ZA 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawZaFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.za);
}

/** ZM 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawZmFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.zm);
}

/** ZW 国旗专门模板：复用采样式手绘 primitive，保持与已有模板一致的纸张、抖动和布纹风格。 */
function drawZwFlag() {
  drawSampledFlagTemplate(TEMPLATE_FLAGS.zw);
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

/** 绘制简化盾徽，供少数中心徽章旗帜在独立函数内组合使用。 */
function drawShieldBadge(flagBox, u, v, fill, accent) {
  const cx = mapFlagX(u, v, flagBox);
  const cy = mapFlagY(u, v, flagBox);
  const width = flagBox.width * 0.13;
  const height = flagBox.height * 0.22;

  roughCanvas.polygon(
    [
      [cx - width / 2, cy - height / 2],
      [cx + width / 2, cy - height / 2],
      [cx + width * 0.42, cy + height * 0.16],
      [cx, cy + height / 2],
      [cx - width * 0.42, cy + height * 0.16],
    ],
    {
      stroke: softenColor(accent, 0.75),
      strokeWidth: 1.2,
      fill,
      fillStyle: "solid",
      roughness: 2.2,
      bowing: 1.15,
    },
  );
  roughCanvas.line(cx - width * 0.32, cy, cx + width * 0.32, cy, {
    stroke: accent,
    strokeWidth: 1,
    roughness: 2.1,
    bowing: 1.4,
  });
  roughCanvas.line(cx, cy - height * 0.36, cx, cy + height * 0.28, {
    stroke: accent,
    strokeWidth: 1,
    roughness: 2.1,
    bowing: 1.4,
  });
}

/** 用旋转局部坐标绘制韩国国旗四卦，true 为整线，false 为断线。 */
function drawKoreanTrigram(flagBox, u, v, rotationDegrees, rows) {
  const cx = mapFlagX(u, v, flagBox);
  const cy = mapFlagY(u, v, flagBox);
  const rotation = (rotationDegrees * Math.PI) / 180;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const lineLength = flagBox.width * 0.17;
  const rowGap = flagBox.height * 0.044;
  const breakGap = flagBox.width * 0.032;

  const toCanvasPoint = (localX, localY) => [
    cx + localX * cos - localY * sin,
    cy + localX * sin + localY * cos,
  ];

  rows.forEach((isSolid, index) => {
    const y = (index - 1) * rowGap;

    if (isSolid) {
      const [x1, y1] = toCanvasPoint(-lineLength / 2, y);
      const [x2, y2] = toCanvasPoint(lineLength / 2, y);
      roughCanvas.line(x1, y1, x2, y2, {
        stroke: "#262d2b",
        strokeWidth: 5.2,
        roughness: 2.1,
        bowing: 1.45,
      });
      return;
    }

    [
      [-lineLength / 2, -breakGap],
      [breakGap, lineLength / 2],
    ].forEach(([startX, endX]) => {
      const [x1, y1] = toCanvasPoint(startX, y);
      const [x2, y2] = toCanvasPoint(endX, y);
      roughCanvas.line(x1, y1, x2, y2, {
        stroke: "#262d2b",
        strokeWidth: 5.2,
        roughness: 2.1,
        bowing: 1.45,
      });
    });
  });
}

/** 专门模板使用低密度结构采样，避免新增旗帜呈现为像素 fallback。 */
function drawSampledFlagTemplate(flagEmoji: TemplateFlag) {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const source = rasterizeFlagEmoji(flagEmoji, 460);
  const segments = collectFlagSegments(source, flagBox, 18, 12);
  const dominant = getDominantFlagColor(segments) || "#d94444";

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#b9c4c0");
  drawTemplateBaseWash(flag, dominant);
  drawTemplateFlagSegments(segments);
  drawTemplateDetailMarks(source, flagBox, dominant);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, softenColor(dominant, 0.28));
  drawFlagBorder(flagBox);
}

/** 未覆盖输入的兜底绘制流程，保留较克制的细节数量以控制性能。 */
function drawGenericFlag(flagEmoji: string) {
  drawSampledFlag(flagEmoji, { detailLimit: 180, hachureGap: 18, textureWeight: 0.38 });
}

/** 给结构化模板铺一层类似已有手写旗面的主色 hachure 底纹。 */
function drawTemplateBaseWash(flag, dominant: string) {
  roughCanvas.polygon(flag, {
    stroke: softenColor(dominant, 0.34),
    strokeWidth: 1.1,
    fill: dominant,
    fillStyle: "hachure",
    hachureAngle: -10,
    hachureGap: 18,
    fillWeight: 0.32,
    roughness: 2.1,
    bowing: 1.15,
  });
}

/** 用大色块绘制新增模板，弱化像素采样感，贴近原有旗帜的粗糙布面。 */
function drawTemplateFlagSegments(segments) {
  segments
    .filter((segment) => segment.area > 420)
    .forEach((segment, index) => {
      roughCanvas.polygon(segment.outline, {
        stroke: segment.isLightNeutral ? "rgba(38, 49, 45, 0.12)" : softenColor(segment.color, 0.4),
        strokeWidth: segment.isLightNeutral ? 0.55 : 1.05,
        fill: segment.color,
        fillStyle: "solid",
        roughness: 2.35,
        bowing: 1.32,
      });

      if (!segment.isLightNeutral && (segment.area > 2600 || index % 3 === 0)) {
        roughCanvas.polygon(segment.outline, {
          stroke: "rgba(38, 49, 45, 0.09)",
          strokeWidth: 0.45,
          fill: segment.color,
          fillStyle: "hachure",
          hachureAngle: -12,
          hachureGap: 15,
          fillWeight: 0.42,
          roughness: 1.95,
        });
      }
    });
}

/** 为复杂徽章、星月和小 canton 留少量手绘标记，但避免密集像素点。 */
function drawTemplateDetailMarks(source, flagBox, dominant: string) {
  const { data, bounds } = source;
  const pixels = data.data;
  const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
  const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
  const step = Math.max(14, Math.floor(data.width / 30));
  let detailCount = 0;

  for (let y = bounds.minY + step; y < bounds.maxY - step; y += step) {
    for (let x = bounds.minX + step; x < bounds.maxX - step; x += step) {
      const index = (y * data.width + x) * 4;
      const alpha = pixels[index + 3];

      if (alpha < 64 || !isFlagDetailPixel(pixels, data.width, data.height, x, y, step)) {
        continue;
      }

      const metrics = normalizeFlagMetrics(getColorMetrics(pixels, index));
      const isLightNeutral = metrics.brightness > 232 && metrics.saturation < 30;
      if (isLightNeutral && detailCount % 4 !== 0) {
        continue;
      }

      const u = (x - bounds.minX) / contentWidth;
      const v = (y - bounds.minY) / contentHeight;
      const px = mapFlagX(u, v, flagBox) + jitter(1.5);
      const py = mapFlagY(u, v, flagBox) + jitter(1.5);
      const color = "rgba(" + metrics.red + ", " + metrics.green + ", " + metrics.blue + ", " + (isLightNeutral ? 0.42 : 0.76) + ")";

      if (!isLightNeutral && metrics.brightness > 150 && metrics.saturation > 42 && detailCount % 5 === 0) {
        drawSketchStarWithColors(px, py, randomBetween(6, 9), -18 + detailCount * 3, {
          stroke: softenColor(color, 0.45),
          fill: color,
          hatch: softenColor(color, 0.24),
        });
      } else {
        roughCanvas.circle(px, py, randomBetween(5.2, 9.4), {
          stroke: isLightNeutral ? "rgba(38, 49, 45, 0.2)" : softenColor(color, 0.46),
          strokeWidth: isLightNeutral ? 0.55 : 0.9,
          fill: color,
          fillStyle: "solid",
          roughness: 2.2,
          bowing: 1.15,
        });
      }

      if (!isLightNeutral && detailCount % 6 === 0) {
        roughCanvas.line(px + jitter(5), py + jitter(4), px + jitter(16), py + jitter(10), {
          stroke: "rgba(38, 49, 45, 0.2)",
          strokeWidth: randomBetween(0.45, 0.75),
          roughness: 2.4,
          bowing: 1.7,
        });
      }

      detailCount += 1;
      if (detailCount > 38) {
        return;
      }
    }
  }

  if (detailCount < 4) {
    roughCanvas.line(
      flagBox.x + flagBox.width * 0.18,
      flagBox.y + flagBox.height * 0.5 + jitter(7),
      flagBox.x + flagBox.width * 0.82,
      flagBox.y + flagBox.height * 0.5 + jitter(7),
      {
        stroke: softenColor(dominant, 0.2),
        strokeWidth: 0.65,
        roughness: 2.4,
        bowing: 1.8,
      },
    );
  }
}

/**
 * 采样式国旗绘制 primitive：
 * 1. 先把 emoji 画到离屏 canvas 取得像素；
 * 2. 把有效像素按网格采样并合并成颜色段；
 * 3. 将颜色段映射回旗面坐标，叠加轮廓、细节点、布纹和边框。
 */
function drawSampledFlag(
  flagEmoji: string,
  options: { detailLimit: number; hachureGap: number; textureWeight: number },
) {
  const flagBox = makeStandardFlagBox();
  const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
  const source = rasterizeFlagEmoji(flagEmoji, 560);
  const segments = collectFlagSegments(source, flagBox);
  const dominant = getDominantFlagColor(segments) || "#d94444";

  drawFlagShadow(flag);
  drawBlankFlag(flag, "#fbfdfa", "#b9c4c0");

  roughCanvas.polygon(flag, {
    stroke: softenColor(dominant, 0.34),
    strokeWidth: 1.1,
    fill: dominant,
    fillStyle: "hachure",
    hachureAngle: -10,
    hachureGap: options.hachureGap,
    fillWeight: options.textureWeight,
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

  drawFlagImageDetails(source, flagBox, options.detailLimit);
  drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, softenColor(dominant, 0.28));
  drawFlagBorder(flagBox);
}
/**
 * 从栅格图里寻找边缘/高对比细节，把它们转成旗面上的小圆点和短线。
 * 这些细节弥补颜色段过于块状的问题，尤其适合徽章、十字和星月等小图案。
 */
function drawFlagImageDetails(source, flagBox, maxDetails = 180) {
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

      if (detailCount > maxDetails) {
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
function collectFlagSegments(source, flagBox, columns = 64, rows = 40) {
  const { data, bounds } = source;
  const pixels = data.data;
  const segments = [];
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

