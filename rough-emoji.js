(function () {
  const canvas = document.querySelector("#rough-canvas");
  const form = document.querySelector("#emoji-form");
  const input = document.querySelector("#emoji-input");
  const downloadButton = document.querySelector("#download-button");
  let ctx;
  let roughCanvas;
  let size;
  const pixelRatio = window.devicePixelRatio || 1;
  const palette = {
    ink: "#26312d",
    paper: "#fbfdfa",
    frame: "#d9e3db",
    shadow: "rgba(36, 49, 44, 0.08)",
    accent: "#6f8f7a",
  };
  const namedEmoji = new Map([
    ["中国", "🇨🇳"],
    ["中国国旗", "🇨🇳"],
    ["中华人民共和国", "🇨🇳"],
    ["日本", "🇯🇵"],
    ["日本国旗", "🇯🇵"],
    ["美国", "🇺🇸"],
    ["美国国旗", "🇺🇸"],
    ["英国", "🇬🇧"],
    ["英国国旗", "🇬🇧"],
    ["法国", "🇫🇷"],
    ["法国国旗", "🇫🇷"],
    ["德国", "🇩🇪"],
    ["德国国旗", "🇩🇪"],
    ["韩国", "🇰🇷"],
    ["韩国国旗", "🇰🇷"],
    ["意大利", "🇮🇹"],
    ["加拿大", "🇨🇦"],
    ["澳大利亚", "🇦🇺"],
    ["俄罗斯", "🇷🇺"],
    ["西班牙", "🇪🇸"],
    ["巴西", "🇧🇷"],
    ["印度", "🇮🇳"],
  ]);

  window.RoughEmoji = {
    draw(canvasElement, value) {
      withCanvas(canvasElement, () => drawEmoji(resolveEmoji(value)));
    },
    isFlagEmoji,
    resolveEmoji,
  };

  if (canvas && form && input && downloadButton) {
    withCanvas(canvas, () => {
      const params = new URLSearchParams(window.location.search);
      const initialEmoji =
        params.get("emoji") || window.prompt("请输入要绘制的 emoji", "😀") || "😀";

      input.value = initialEmoji;
      drawEmoji(resolveEmoji(initialEmoji));

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        drawEmoji(resolveEmoji(input.value.trim() || "😀"));
      });

      downloadButton.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = `rough-emoji-${input.value.trim() || "emoji"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    });
  }

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

  function drawEmoji(emoji) {
    clearCanvas();
    drawPaper();

    if (drawCustomEmoji(emoji)) {
      return;
    }

    const source = rasterizeEmoji(emoji);
    const sampledPixels = collectShapePoints(source);
    const blobs = buildColorBlobs(sampledPixels.colorPoints);

    if (blobs.length) {
      drawBlobShadows(blobs);
      drawColorBlobs(blobs);
      drawCleanEdges(sampledPixels.edgePoints);
      drawBlobTexture(blobs);
      drawDetailLines(sampledPixels.detailPoints);
      return;
    }

    drawFallbackSketch(sampledPixels.colorPoints, sampledPixels.edgePoints);
  }

  function drawCustomEmoji(emoji) {
    if (emoji === "🇨🇳") {
      drawChinaFlag();
      return true;
    }

    if (emoji === "🇯🇵") {
      drawJapanFlag();
      return true;
    }

    if (emoji === "🇺🇸") {
      drawUnitedStatesFlag();
      return true;
    }

    if (isFlagEmoji(emoji)) {
      drawGenericFlag(emoji);
      return true;
    }

    return false;
  }

  function resolveEmoji(value) {
    return namedEmoji.get(value.trim()) || value.trim() || "😀";
  }

  function isFlagEmoji(value) {
    const codePoints = [...value].map((char) => char.codePointAt(0));
    return (
      codePoints.length === 2 &&
      codePoints.every((codePoint) => codePoint >= 0x1f1e6 && codePoint <= 0x1f1ff)
    );
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, size, size);
  }

  function drawPaper() {
    ctx.fillStyle = palette.paper;
    ctx.fillRect(0, 0, size, size);

    roughCanvas.rectangle(46, 46, size - 92, size - 92, {
      roughness: 1.4,
      bowing: 0.8,
      stroke: palette.frame,
      strokeWidth: 1.2,
      fill: palette.paper,
      fillStyle: "hachure",
      hachureGap: 24,
      fillWeight: 0.28,
    });
  }

  function drawChinaFlag() {
    const flag = makeWavyRect(118, 174, 486, 342, 13);

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

    roughCanvas.polygon(makeWavyRect(118, 174, 486, 342, 13), {
      stroke: "#28332e",
      strokeWidth: 2.1,
      fill: "transparent",
      roughness: 2.8,
      bowing: 1.6,
    });
  }

  function drawJapanFlag() {
    const flag = makeWavyRect(128, 172, 464, 344, 11);

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

  function drawUnitedStatesFlag() {
    const flagBox = {
      x: 118,
      y: 174,
      width: 486,
      height: 342,
      wave: 13,
    };
    const flag = makeWavyRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height, flagBox.wave);
    roughCanvas.polygon(offsetPoints(flag, 8, 10), {
      stroke: "transparent",
      fill: palette.shadow,
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

    roughCanvas.polygon(makeWavyRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height, flagBox.wave), {
      stroke: "#28332e",
      strokeWidth: 2,
      fill: "transparent",
      roughness: 2.8,
      bowing: 1.6,
    });
  }

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

  function drawGenericFlag(emoji) {
    const flagBox = {
      x: 118,
      y: 174,
      width: 486,
      height: 342,
      wave: 13,
    };
    const flag = makeWavyRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height, flagBox.wave);
    const source = rasterizeFlatEmoji(emoji, 420);
    const segments = collectFlagSegments(source, flagBox);
    const dominant = getDominantFlagColor(segments) || "#d94444";
    const shadow = offsetPoints(flag, 8, 10);

    roughCanvas.polygon(shadow, {
      stroke: "transparent",
      fill: palette.shadow,
      fillStyle: "solid",
      roughness: 2.2,
      bowing: 1.2,
    });

    roughCanvas.polygon(flag, {
      stroke: softenColor(dominant, 0.72),
      strokeWidth: 2.8,
      fill: dominant,
      fillStyle: "solid",
      roughness: 2.5,
      bowing: 1.45,
    });

    segments.forEach((segment) => {
      if (segment.isLightNeutral && segment.area < 620) {
        return;
      }

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

    drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, softenColor(dominant, 0.28));

    roughCanvas.polygon(makeWavyRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height, flagBox.wave), {
      stroke: "#28332e",
      strokeWidth: 2,
      fill: "transparent",
      roughness: 2.8,
      bowing: 1.6,
    });
  }

  function drawFlagImageOnCanvas(source, flagBox, flag) {
    const { data, bounds } = source;
    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = data.width;
    sourceCanvas.height = data.height;
    sourceCanvas.getContext("2d").putImageData(data, 0, 0);

    ctx.save();
    ctx.beginPath();
    flag.forEach(([x, y], index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
        return;
      }

      ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      sourceCanvas,
      bounds.minX,
      bounds.minY,
      Math.max(1, bounds.maxX - bounds.minX),
      Math.max(1, bounds.maxY - bounds.minY),
      flagBox.x,
      flagBox.y,
      flagBox.width,
      flagBox.height,
    );
    ctx.restore();

    roughCanvas.polygon(flag, {
      stroke: "rgba(38, 49, 45, 0.12)",
      strokeWidth: 0.9,
      fill: "rgba(251, 253, 250, 0.08)",
      fillStyle: "hachure",
      hachureAngle: -10,
      hachureGap: 24,
      fillWeight: 0.2,
      roughness: 2.2,
      bowing: 1.2,
    });
  }

  function makeWavyRect(x, y, width, height, wave) {
    const steps = 8;
    const points = [];

    for (let i = 0; i <= steps; i += 1) {
      points.push([x + (width * i) / steps, y + Math.sin(i * 0.9) * wave]);
    }
    for (let i = 0; i <= steps; i += 1) {
      points.push([x + width + Math.sin(i * 0.8) * wave * 0.55, y + (height * i) / steps]);
    }
    for (let i = steps; i >= 0; i -= 1) {
      points.push([x + (width * i) / steps, y + height + Math.cos(i * 0.85) * wave]);
    }
    for (let i = steps; i >= 0; i -= 1) {
      points.push([x + Math.cos(i * 0.8) * wave * 0.55, y + (height * i) / steps]);
    }

    return points;
  }

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

  function drawSketchStar(cx, cy, radius, rotationDegrees) {
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
      stroke: "#b68b12",
      strokeWidth: Math.max(1.2, radius * 0.08),
      fill: "#ffd84c",
      fillStyle: "solid",
      roughness: 2.3,
      bowing: 1.2,
    });

    roughCanvas.polygon(points, {
      stroke: "#f4c62a",
      strokeWidth: Math.max(0.8, radius * 0.04),
      fill: "#ffec62",
      fillStyle: "hachure",
      hachureAngle: -22,
      hachureGap: Math.max(6, radius * 0.22),
      fillWeight: 1,
      roughness: 2.2,
    });
  }

  function rasterizeFlatEmoji(emoji, offscreenSize) {
    const offscreen = document.createElement("canvas");
    offscreen.width = offscreenSize * pixelRatio;
    offscreen.height = offscreenSize * pixelRatio;

    const offscreenCtx = offscreen.getContext("2d", {
      willReadFrequently: true,
    });
    offscreenCtx.scale(pixelRatio, pixelRatio);
    offscreenCtx.clearRect(0, 0, offscreenSize, offscreenSize);
    offscreenCtx.textAlign = "center";
    offscreenCtx.textBaseline = "middle";
    offscreenCtx.font = `${Math.round(offscreenSize * 0.68)}px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif`;
    offscreenCtx.fillText(emoji, offscreenSize / 2, offscreenSize / 2 + offscreenSize * 0.02);

    const imageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    return { data: imageData, bounds: findPixelBounds(imageData) };
  }

  function getDominantImageColor(imageData, bounds) {
    const groups = new Map();
    const pixels = imageData.data;
    const step = Math.max(6, Math.floor(imageData.width / 80));

    for (let y = bounds.minY; y <= bounds.maxY; y += step) {
      for (let x = bounds.minX; x <= bounds.maxX; x += step) {
        const index = (Math.round(y) * imageData.width + Math.round(x)) * 4;

        if (pixels[index + 3] < 40) {
          continue;
        }

        const metrics = normalizeFlagMetrics(getColorMetrics(pixels, index));

        if (metrics.brightness > 232 && metrics.saturation < 30) {
          continue;
        }

        const key = `${Math.round(metrics.red / 36) * 36}-${Math.round(metrics.green / 36) * 36}-${
          Math.round(metrics.blue / 36) * 36
        }`;
        const current = groups.get(key) || { count: 0, red: 0, green: 0, blue: 0 };
        current.count += 1;
        current.red += metrics.red;
        current.green += metrics.green;
        current.blue += metrics.blue;
        groups.set(key, current);
      }
    }

    const dominant = [...groups.values()].sort((a, b) => b.count - a.count)[0];

    if (!dominant) {
      return null;
    }

    return `rgb(${Math.round(dominant.red / dominant.count)}, ${Math.round(
      dominant.green / dominant.count,
    )}, ${Math.round(dominant.blue / dominant.count)})`;
  }

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

  function getFlagSegmentBucket(metrics, isLightNeutral) {
    if (isLightNeutral) {
      return "light";
    }

    return `${Math.round(metrics.red / 34) * 34}-${Math.round(metrics.green / 34) * 34}-${
      Math.round(metrics.blue / 34) * 34
    }`;
  }

  function createFlagSegment(run, row, columns, rows, flagBox) {
    const metrics = averageMetrics(run.cells);
    const isLightNeutral = run.cells.filter((cell) => cell.isLightNeutral).length > run.cells.length * 0.58;
    const u0 = run.startColumn / columns;
    const u1 = (run.endColumn + 1) / columns;
    const v0 = row / rows;
    const v1 = (row + 1) / rows;

    return {
      color: `rgba(${metrics.red}, ${metrics.green}, ${metrics.blue}, ${isLightNeutral ? 0.72 : 0.96})`,
      metrics,
      isLightNeutral,
      area: ((run.endColumn - run.startColumn + 1) * flagBox.width * flagBox.height) / (columns * rows),
      shouldTexture: row % 4 === 0 && run.endColumn - run.startColumn > 2,
      outline: makeFlagCellOutline(u0, v0, u1, v1, flagBox),
    };
  }

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

  function makeFlagCellOutline(u0, v0, u1, v1, flagBox) {
    const insetU = 0.002;
    const insetV = 0.002;
    const points = [
      [u0 + insetU, v0 + insetV],
      [(u0 + u1) / 2, v0 + insetV + jitter(0.001)],
      [u1 - insetU, v0 + insetV],
      [u1 - insetU, (v0 + v1) / 2],
      [u1 - insetU, v1 - insetV],
      [(u0 + u1) / 2, v1 - insetV + jitter(0.001)],
      [u0 + insetU, v1 - insetV],
      [u0 + insetU, (v0 + v1) / 2],
    ];

    return points.map(([u, v]) => [
      mapFlagX(Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v)), flagBox) + jitter(1.8),
      mapFlagY(Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v)), flagBox) + jitter(1.8),
    ]);
  }

  function mapFlagX(u, v, flagBox) {
    return flagBox.x + flagBox.width * u + Math.sin(v * Math.PI * 2.1) * flagBox.wave * 0.42;
  }

  function mapFlagY(u, v, flagBox) {
    return flagBox.y + flagBox.height * v + Math.sin(u * Math.PI * 2.4) * flagBox.wave;
  }

  function rasterizeEmoji(emoji) {
    const offscreen = document.createElement("canvas");
    const offscreenSize = 420;
    offscreen.width = offscreenSize * pixelRatio;
    offscreen.height = offscreenSize * pixelRatio;

    const offscreenCtx = offscreen.getContext("2d", {
      willReadFrequently: true,
    });
    offscreenCtx.scale(pixelRatio, pixelRatio);
    offscreenCtx.clearRect(0, 0, offscreenSize, offscreenSize);
    offscreenCtx.textAlign = "center";
    offscreenCtx.textBaseline = "middle";
    offscreenCtx.font = "284px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif";
    offscreenCtx.fillText(emoji, offscreenSize / 2, offscreenSize / 2 + 8);

    const imageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    const bounds = findPixelBounds(imageData);

    return { data: imageData, transform: makeContentTransform(bounds, offscreen.width) };
  }

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

  function makeContentTransform(bounds, fallbackSize) {
    const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
    const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
    const drawingSize = size * 0.8;
    const scale = Math.min(drawingSize / contentWidth, drawingSize / contentHeight);
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;

    return {
      scale: Number.isFinite(scale) ? scale : size / fallbackSize,
      offsetX: size / 2 - centerX * scale,
      offsetY: size / 2 - centerY * scale,
    };
  }

  function collectShapePoints(source) {
    const { data, transform } = source;
    const pixels = data.data;
    const width = data.width;
    const height = data.height;
    const edgePoints = [];
    const detailPoints = [];
    const colorPoints = [];
    const corePoints = [];
    const step = Math.max(6, Math.floor(width / 70));

    for (let y = step; y < height - step; y += step) {
      for (let x = step; x < width - step; x += step) {
        const index = (y * width + x) * 4;
        const alpha = pixels[index + 3];

        if (alpha < 30) {
          continue;
        }

        const metrics = getColorMetrics(pixels, index);
        const isLightNeutral = metrics.brightness > 224 && metrics.saturation < 34;
        const onEdge = isEdgePixel(pixels, width, height, x, y, step);
        const isDetail = isDetailPixel(pixels, width, height, x, y, step);

        if (isLightNeutral && !onEdge && !isDetail && Math.random() > 0.05) {
          continue;
        }

        const alphaBoost = isLightNeutral ? 0.32 : 0.96;
        const color = rgbaFromPixel(pixels, index, Math.min(alpha / 255, alphaBoost));
        const importance = isLightNeutral ? 0.42 : 1 + Math.min(metrics.saturation / 255, 0.5);
        const mapped = {
          x: x * transform.scale + transform.offsetX + jitter(0.7),
          y: y * transform.scale + transform.offsetY + jitter(0.7),
          color,
          metrics,
          isLightNeutral,
          importance,
          sourceX: x,
          sourceY: y,
          radius: step * transform.scale * importance * randomBetween(1.28, 1.58),
        };

        colorPoints.push(mapped);
        if (!isLightNeutral) {
          corePoints.push(mapped);
        }

        if (onEdge) {
          edgePoints.push(mapped);
        }

        if (isDetail) {
          detailPoints.push(mapped);
        }
      }
    }

    return { edgePoints, detailPoints, colorPoints, corePoints };
  }

  function rgbaFromPixel(pixels, index, alpha) {
    return `rgba(${pixels[index]}, ${pixels[index + 1]}, ${pixels[index + 2]}, ${alpha})`;
  }

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

  function isEdgePixel(pixels, width, height, x, y, distance) {
    const centerAlpha = pixels[(y * width + x) * 4 + 3];
    const offsets = [
      [-distance, 0],
      [distance, 0],
      [0, -distance],
      [0, distance],
    ];

    return offsets.some(([dx, dy]) => {
      const nextX = Math.min(width - 1, Math.max(0, x + dx));
      const nextY = Math.min(height - 1, Math.max(0, y + dy));
      const alpha = pixels[(nextY * width + nextX) * 4 + 3];
      return Math.abs(centerAlpha - alpha) > 80 || alpha < 30;
    });
  }

  function isDetailPixel(pixels, width, height, x, y, distance) {
    const index = (y * width + x) * 4;
    const offsets = [
      [-distance, 0],
      [distance, 0],
      [0, -distance],
      [0, distance],
    ];

    return offsets.some(([dx, dy]) => {
      const nextX = Math.min(width - 1, Math.max(0, x + dx));
      const nextY = Math.min(height - 1, Math.max(0, y + dy));
      const nextIndex = (nextY * width + nextX) * 4;
      const alpha = pixels[nextIndex + 3];

      if (alpha < 30) {
        return false;
      }

      const diff =
        Math.abs(pixels[index] - pixels[nextIndex]) +
        Math.abs(pixels[index + 1] - pixels[nextIndex + 1]) +
        Math.abs(pixels[index + 2] - pixels[nextIndex + 2]);

      return diff > 92;
    });
  }

  function buildColorBlobs(points) {
    const groups = new Map();

    points.forEach((point) => {
      const key = getColorBucket(point);

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key).push(point);
    });

    return [...groups.values()]
      .filter((group) => group.length >= 6)
      .map(createBlobFromGroup)
      .filter(Boolean)
      .sort((a, b) => a.isLightNeutral - b.isLightNeutral || b.area - a.area)
      .slice(0, 9);
  }

  function getColorBucket(point) {
    if (point.isLightNeutral) {
      return "light";
    }

    const red = Math.round(point.metrics.red / 48) * 48;
    const green = Math.round(point.metrics.green / 48) * 48;
    const blue = Math.round(point.metrics.blue / 48) * 48;

    return `${red}-${green}-${blue}`;
  }

  function createBlobFromGroup(group) {
    const minX = Math.min(...group.map((point) => point.x));
    const minY = Math.min(...group.map((point) => point.y));
    const maxX = Math.max(...group.map((point) => point.x));
    const maxY = Math.max(...group.map((point) => point.y));
    const width = maxX - minX;
    const height = maxY - minY;

    if (width < 10 || height < 10) {
      return null;
    }

    const sorted = [...group].sort((a, b) => b.radius - a.radius);
    const color = averageColor(sorted);
    const isLightNeutral = group.filter((point) => point.isLightNeutral).length > group.length * 0.55;

    return {
      color,
      isLightNeutral,
      area: width * height,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2,
      width,
      height,
      outline: makeBlobOutline(group, minX, minY, maxX, maxY),
      points: sorted.slice(0, 32),
    };
  }

  function averageColor(points) {
    const totals = points.reduce(
      (acc, point) => {
        acc.red += point.metrics.red;
        acc.green += point.metrics.green;
        acc.blue += point.metrics.blue;
        return acc;
      },
      { red: 0, green: 0, blue: 0 },
    );
    const count = points.length || 1;

    return `rgb(${Math.round(totals.red / count)}, ${Math.round(totals.green / count)}, ${Math.round(
      totals.blue / count,
    )})`;
  }

  function makeBlobOutline(group, minX, minY, maxX, maxY) {
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const sectors = 18;
    const sectorPoints = Array.from({ length: sectors }, () => null);

    group.forEach((point) => {
      const angle = Math.atan2(point.y - centerY, point.x - centerX);
      const sector = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * sectors) % sectors;
      const distance = Math.hypot(point.x - centerX, point.y - centerY);
      const existing = sectorPoints[sector];

      if (!existing || distance > existing.distance) {
        sectorPoints[sector] = { ...point, distance };
      }
    });

    return sectorPoints
      .filter(Boolean)
      .map((point) => [
        point.x + jitter(Math.max(2, point.radius * 0.22)),
        point.y + jitter(Math.max(2, point.radius * 0.22)),
      ]);
  }

  function drawBlobShadows(blobs) {
    blobs
      .filter((blob) => !blob.isLightNeutral)
      .forEach((blob) => {
        roughCanvas.polygon(offsetPoints(blob.outline, 7, 9), {
          stroke: "transparent",
          fill: palette.shadow,
          fillStyle: "solid",
          roughness: 2.1,
          bowing: 1.2,
        });
      });
  }

  function drawColorBlobs(blobs) {
    blobs.forEach((blob) => {
      roughCanvas.polygon(blob.outline, {
        stroke: blob.isLightNeutral ? "rgba(38, 49, 45, 0.16)" : softenColor(blob.color, 0.82),
        strokeWidth: blob.isLightNeutral ? 0.8 : 2.2,
        fill: blob.color,
        fillStyle: "solid",
        roughness: blob.isLightNeutral ? 2 : 2.35,
        bowing: 1.35,
      });
    });
  }

  function drawBlobTexture(blobs) {
    blobs
      .filter((blob) => !blob.isLightNeutral)
      .forEach((blob) => {
        roughCanvas.polygon(blob.outline, {
          stroke: "rgba(38, 49, 45, 0.15)",
          strokeWidth: 0.8,
          fill: blob.color,
          fillStyle: "hachure",
          hachureAngle: -18,
          hachureGap: Math.max(10, Math.min(18, Math.max(blob.width, blob.height) / 10)),
          fillWeight: 0.9,
          roughness: 2.1,
          bowing: 1.2,
        });

        drawGestureStrokes(blob);
      });
  }

  function drawGestureStrokes(blob) {
    const strokes = Math.min(6, Math.max(2, Math.round(blob.area / 18000)));

    for (let i = 0; i < strokes; i += 1) {
      const x = blob.centerX - blob.width * 0.32 + (blob.width * (i + 0.5)) / strokes + jitter(9);
      roughCanvas.line(
        x,
        blob.centerY - blob.height * 0.38 + jitter(12),
        x + jitter(24),
        blob.centerY + blob.height * 0.38 + jitter(12),
        {
          stroke: "rgba(38, 49, 45, 0.32)",
          strokeWidth: randomBetween(0.8, 1.45),
          roughness: 2.6,
          bowing: 2.1,
        },
      );
    }
  }

  function offsetPoints(points, x, y) {
    return points.map((point) => [point[0] + x, point[1] + y]);
  }

  function softenColor(color, alpha) {
    return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  function drawDetailLines(points) {
    points
      .filter((point, index) => !point.isLightNeutral && index % 6 === 0)
      .forEach((point) => {
        const length = randomBetween(4, 9) * point.importance;
        const angle = randomBetween(-Math.PI, Math.PI);
        roughCanvas.line(
          point.x - Math.cos(angle) * length,
          point.y - Math.sin(angle) * length,
          point.x + Math.cos(angle) * length,
          point.y + Math.sin(angle) * length,
          {
            stroke: palette.ink,
            strokeWidth: randomBetween(0.38, 0.72),
            roughness: 1.35,
            bowing: 0.9,
          },
        );
      });
  }

  function drawFallbackSketch(colorPoints, edgePoints) {
    colorPoints
      .filter((point, index) => !point.isLightNeutral || index % 8 === 0)
      .forEach((point) => {
        roughCanvas.circle(point.x, point.y, point.radius * 1.25, {
          stroke: "transparent",
          fill: point.color,
          fillStyle: "solid",
          roughness: 2.2,
        });
      });

    drawCleanEdges(edgePoints);
  }

  function drawCleanEdges(points) {
    points.forEach((point, index) => {
      if (index % 2 !== 0 || (point.isLightNeutral && index % 5 !== 0)) {
        return;
      }

      roughCanvas.circle(point.x, point.y, randomBetween(1.6, 3.8) * point.importance, {
        stroke: palette.ink,
        strokeWidth: randomBetween(0.38, 0.82) * point.importance,
        roughness: 1.9,
        fill: "transparent",
      });

      if (!point.isLightNeutral && index % 10 === 0) {
        roughCanvas.line(
          point.x + jitter(7),
          point.y + jitter(7),
          point.x + jitter(16),
          point.y + jitter(16),
          {
            stroke: palette.ink,
            strokeWidth: randomBetween(0.55, 1),
            roughness: 2.5,
            bowing: 1.4,
          },
        );
      }
    });
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function jitter(amount) {
    return randomBetween(-amount, amount);
  }
})();
