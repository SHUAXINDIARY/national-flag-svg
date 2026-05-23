/**
 * Canvas 旗面导出 SVG 工具：裁剪旗面、纸张透明化、嵌入 PNG data URL。
 */

/** 720 画布下常见旗面区域（makeStandardFlagBox 与日本模板并集）。 */
const FLAG_SEED_BOUNDS = [
    { x: 118, y: 174, width: 486, height: 342 },
    { x: 128, y: 172, width: 464, height: 344 },
];
/** Rough 外框内边距，搜索与裁剪不得越过此边界。 */
const FLAG_FRAME_INSET = 46;
/** 库内标准绘制尺寸，用于按实际 canvas 宽度等比缩放。 */
const FLAG_CANVAS_SIZE = 720;
/** 导出矩形在旗面边界外的留白像素（720 基准）。 */
const FLAG_EXPORT_PAD = 6;
/** 与库内 PALETTE.paper / PALETTE.frame 一致。 */
const PAPER_RGB = [251, 253, 250];
const FRAME_RGB = [217, 227, 219];
/** 纸张 / 边框 RGB 与像素色的曼哈顿距离阈值。 */
const PAPER_COLOR_TOLERANCE = 18;

/** 按 scale 等比缩放矩形坐标与尺寸。 */
function scaleRect(rect, scale) {
    return {
        x: Math.floor(rect.x * scale),
        y: Math.floor(rect.y * scale),
        width: Math.ceil(rect.width * scale),
        height: Math.ceil(rect.height * scale),
    };
}

/** 合并多个矩形为最小外接矩形。 */
function unionRects(rects) {
    const x = Math.min(...rects.map((rect) => rect.x));
    const y = Math.min(...rects.map((rect) => rect.y));
    const right = Math.max(...rects.map((rect) => rect.x + rect.width));
    const bottom = Math.max(...rects.map((rect) => rect.y + rect.height));
    return { x, y, width: right - x, height: bottom - y };
}

/** 四向扩展矩形边距 pad。 */
function expandRect(rect, pad) {
    return {
        x: rect.x - pad,
        y: rect.y - pad,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
    };
}

/** 将矩形裁剪到 [minX, maxX] × [minY, maxY] 范围内。 */
function clampRect(rect, minX, minY, maxX, maxY) {
    const x = Math.max(minX, rect.x);
    const y = Math.max(minY, rect.y);
    const right = Math.min(maxX, rect.x + rect.width);
    const bottom = Math.min(maxY, rect.y + rect.height);
    return {
        x,
        y,
        width: Math.max(0, right - x),
        height: Math.max(0, bottom - y),
    };
}

/** RGB 与目标色的 L1 距离，用于近似色判定。 */
function colorDistance(red, green, blue, target) {
    return (
        Math.abs(red - target[0]) +
        Math.abs(green - target[1]) +
        Math.abs(blue - target[2])
    );
}

/** 判断是否为纸张底色或近白色 hachure 留白，导出 SVG 时置为透明。 */
function isBackgroundPaperPixel(red, green, blue, alpha) {
    if (alpha < 8) {
        return true;
    }

    if (colorDistance(red, green, blue, PAPER_RGB) <= PAPER_COLOR_TOLERANCE) {
        return true;
    }

    if (colorDistance(red, green, blue, FRAME_RGB) <= PAPER_COLOR_TOLERANCE) {
        return true;
    }

    const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;
    const maxChannel = Math.max(red, green, blue);
    const minChannel = Math.min(red, green, blue);
    return luminance > 238 && maxChannel - minChannel < 12;
}

/** 截取 exportRect 区域并将纸张底色像素 alpha 置 0，返回 PNG data URL。 */
function canvasExportToTransparentDataUrl(canvas, exportRect) {
    const { x, y, width, height } = exportRect;
    const context = canvas.getContext("2d");
    if (!context || width <= 0 || height <= 0) {
        return canvas.toDataURL("image/png");
    }

    const imageData = context.getImageData(x, y, width, height);
    const pixels = imageData.data;

    for (let index = 0; index < pixels.length; index += 4) {
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];

        if (isBackgroundPaperPixel(red, green, blue, alpha)) {
            pixels[index + 3] = 0;
        }
    }

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = width;
    exportCanvas.height = height;
    exportCanvas.getContext("2d").putImageData(imageData, 0, 0);
    return exportCanvas.toDataURL("image/png");
}

/** 识别旗面手绘笔触与色块，忽略 Rough 外框内的空白纸张。 */
/** 判断像素是否属于旗面手绘墨迹（非纸张留白）。 */
function isFlagInkPixel(red, green, blue, alpha) {
    if (alpha < 20) {
        return false;
    }

    const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;
    if (luminance < 130) {
        return true;
    }

    const maxChannel = Math.max(red, green, blue);
    const minChannel = Math.min(red, green, blue);
    return maxChannel - minChannel > 16 && luminance < 248;
}

/** 在 searchRect 内扫描墨迹像素，返回最小包围盒；无墨迹时返回 null。 */
function detectInkBounds(canvas, searchRect) {
    const context = canvas.getContext("2d");
    if (!context) {
        return null;
    }

    const { x, y, width, height } = searchRect;
    if (width <= 0 || height <= 0) {
        return null;
    }

    const image = context.getImageData(x, y, width, height).data;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let found = false;

    for (let row = 0; row < height; row += 1) {
        for (let col = 0; col < width; col += 1) {
            const index = (row * width + col) * 4;
            const red = image[index];
            const green = image[index + 1];
            const blue = image[index + 2];
            const alpha = image[index + 3];

            if (!isFlagInkPixel(red, green, blue, alpha)) {
                continue;
            }

            found = true;
            minX = Math.min(minX, x + col);
            minY = Math.min(minY, y + row);
            maxX = Math.max(maxX, x + col);
            maxY = Math.max(maxY, y + row);
        }
    }

    if (!found) {
        return null;
    }

    return {
        x: minX,
        y: minY,
        width: maxX - minX + 1,
        height: maxY - minY + 1,
    };
}

/** 结合种子区域与墨迹检测，计算最终 SVG 导出裁剪矩形。 */
function getFlagExportRect(canvas) {
    const scale = canvas.width / FLAG_CANVAS_SIZE;
    const frameInset = Math.round(FLAG_FRAME_INSET * scale);
    const innerMax = canvas.width - frameInset;
    const seedRect = scaleRect(unionRects(FLAG_SEED_BOUNDS), scale);
    const searchRect = clampRect(
        expandRect(seedRect, Math.ceil(32 * scale)),
        frameInset,
        frameInset,
        innerMax,
        innerMax,
    );
    const inkRect = detectInkBounds(canvas, searchRect);
    const exportRect = expandRect(
        inkRect ? unionRects([seedRect, inkRect]) : seedRect,
        Math.ceil(FLAG_EXPORT_PAD * scale),
    );

    return clampRect(exportRect, 0, 0, canvas.width, canvas.height);
}

/** 将 canvas 旗面区域转为背景透明的 SVG 字符串。 */
export function canvasToSvg(canvas) {
    const exportRect = getFlagExportRect(canvas);
    const { width, height } = exportRect;
    const dataUrl = canvasExportToTransparentDataUrl(canvas, exportRect);
    return [
        `<svg xmlns="http://www.w3.org/2000/svg"`,
        `xmlns:xlink="http://www.w3.org/1999/xlink"`,
        `width="${width}" height="${height}"`,
        `viewBox="0 0 ${width} ${height}">`,
        `<image width="${width}" height="${height}"`,
        `href="${dataUrl}" xlink:href="${dataUrl}"/>`,
        `</svg>`,
    ].join(" ");
}
