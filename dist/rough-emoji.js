(()=>{
    const ELEMENT_SELECTORS = {
        canvas: "#rough-canvas",
        form: "#emoji-form",
        input: "#emoji-input",
        downloadButton: "#download-button"
    };
    const DEFAULT_FLAG = "🇨🇳";
    const DOWNLOAD_FILE_PREFIX = "rough-flag";
    const FLAG_PROMPT_MESSAGE = "请输入要绘制的国旗";
    const TEMPLATE_FLAGS = {
        china: "🇨🇳",
        japan: "🇯🇵",
        unitedStates: "🇺🇸",
        australia: "🇦🇺",
        thailand: "🇹🇭",
        france: "🇫🇷",
        italy: "🇮🇹",
        spain: "🇪🇸",
        vatican: "🇻🇦"
    };
    const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
    const PALETTE = {
        paper: "#fbfdfa",
        frame: "#d9e3db",
        shadow: "rgba(36, 49, 44, 0.08)"
    };
    const canvas = document.querySelector(ELEMENT_SELECTORS.canvas);
    const rough_emoji_form = document.querySelector(ELEMENT_SELECTORS.form);
    const rough_emoji_input = document.querySelector(ELEMENT_SELECTORS.input);
    const downloadButton = document.querySelector(ELEMENT_SELECTORS.downloadButton);
    let ctx;
    let roughCanvas;
    let size = 0;
    const RoughEmoji = {
        draw (canvasElement, value) {
            withCanvas(canvasElement, ()=>drawFlag(resolveFlag(value)));
        },
        isFlagEmoji,
        resolveFlag
    };
    const browserWindow = window;
    browserWindow.RoughEmoji = RoughEmoji;
    if (canvas && rough_emoji_form && rough_emoji_input && downloadButton) withCanvas(canvas, ()=>{
        const params = new URLSearchParams(window.location.search);
        const initialFlag = params.get("flag") || window.prompt(FLAG_PROMPT_MESSAGE, DEFAULT_FLAG) || DEFAULT_FLAG;
        rough_emoji_input.value = initialFlag;
        drawFlag(resolveFlag(initialFlag));
        rough_emoji_form.addEventListener("submit", (event)=>{
            event.preventDefault();
            drawFlag(resolveFlag(rough_emoji_input.value));
        });
        downloadButton.addEventListener("click", ()=>{
            const link = document.createElement("a");
            link.download = `${DOWNLOAD_FILE_PREFIX}-${resolveFlag(rough_emoji_input.value)}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    });
    function withCanvas(canvasElement, callback) {
        const previous = {
            ctx,
            roughCanvas,
            size
        };
        ctx = canvasElement.getContext("2d", {
            willReadFrequently: true
        });
        roughCanvas = rough.canvas(canvasElement);
        size = canvasElement.width;
        callback();
        ctx = previous.ctx;
        roughCanvas = previous.roughCanvas;
        size = previous.size;
    }
    function drawFlag(flag) {
        clearCanvas();
        drawPaper();
        if (flag === TEMPLATE_FLAGS.china) return void drawChinaFlag();
        if (flag === TEMPLATE_FLAGS.japan) return void drawJapanFlag();
        if (flag === TEMPLATE_FLAGS.unitedStates) return void drawUnitedStatesFlag();
        if (flag === TEMPLATE_FLAGS.australia) return void drawAustraliaFlag();
        if (flag === TEMPLATE_FLAGS.thailand) return void drawThailandFlag();
        if (flag === TEMPLATE_FLAGS.france) return void drawFranceFlag();
        if (flag === TEMPLATE_FLAGS.italy) return void drawItalyFlag();
        if (flag === TEMPLATE_FLAGS.spain) return void drawSpainFlag();
        if (flag === TEMPLATE_FLAGS.vatican) return void drawVaticanFlag();
        drawGenericFlag(flag);
    }
    function resolveFlag(value) {
        const input = String(value || "").trim();
        return isFlagEmoji(input) ? input : DEFAULT_FLAG;
    }
    function isFlagEmoji(value) {
        const codePoints = [
            ...value
        ].map((char)=>char.codePointAt(0));
        return 2 === codePoints.length && codePoints.every((codePoint)=>codePoint >= 127462 && codePoint <= 127487);
    }
    function clearCanvas() {
        ctx.clearRect(0, 0, size, size);
    }
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
            fillWeight: 0.28
        });
    }
    function drawChinaFlag() {
        const flag = makeSketchRect(118, 174, 486, 342);
        roughCanvas.polygon(flag, {
            stroke: "#8c1f23",
            strokeWidth: 3.2,
            fill: "#de2f36",
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.4
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
            bowing: 1.1
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
            bowing: 1.6
        });
    }
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
            bowing: 1.2
        });
        roughCanvas.circle(360, 344, 166, {
            stroke: "#9f2936",
            strokeWidth: 2.4,
            fill: "#cf3346",
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.3
        });
        roughCanvas.circle(360, 344, 155, {
            stroke: "rgba(159, 41, 54, 0.48)",
            strokeWidth: 1.1,
            fill: "#cf3346",
            fillStyle: "hachure",
            hachureAngle: -12,
            hachureGap: 13,
            fillWeight: 0.9,
            roughness: 2.1
        });
        drawFabricStrokes(150, 198, 420, 280, "#cbd8ce");
        roughCanvas.polygon(flag, {
            stroke: "#28332e",
            strokeWidth: 1.6,
            fill: "transparent",
            roughness: 2.5,
            bowing: 1.5
        });
    }
    function drawUnitedStatesFlag() {
        const flagBox = {
            x: 118,
            y: 174,
            width: 486,
            height: 342
        };
        const flag = makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height);
        roughCanvas.polygon(offsetPoints(flag, 8, 10), {
            stroke: "transparent",
            fill: PALETTE.shadow,
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.polygon(flag, {
            stroke: "#b9c4c0",
            strokeWidth: 2.4,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.4
        });
        for(let row = 0; row < 13; row += 1)if (row % 2 === 0) drawFlagBand(flagBox, 0, row / 13, 1, (row + 1) / 13, "#c83c4a", "#8f2633");
        drawFlagBand(flagBox, 0, 0, 0.43, 7 / 13, "#314d7c", "#20375e");
        drawUSStars(flagBox);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#8d2d37");
        roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
            stroke: "#28332e",
            strokeWidth: 2,
            fill: "transparent",
            roughness: 2.8,
            bowing: 1.6
        });
    }
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
            hatch: "rgba(251, 253, 250, 0.72)"
        });
        [
            [
                0.74,
                0.28,
                13,
                4
            ],
            [
                0.84,
                0.44,
                11,
                -12
            ],
            [
                0.72,
                0.58,
                13,
                10
            ],
            [
                0.62,
                0.45,
                12,
                -8
            ],
            [
                0.78,
                0.72,
                8,
                18
            ]
        ].forEach(([u, v, radius, rotation])=>{
            drawSketchStarWithColors(mapFlagX(u, v, flagBox), mapFlagY(u, v, flagBox), radius, rotation, {
                stroke: "#c7d1cc",
                fill: "#fbfdfa",
                hatch: "rgba(251, 253, 250, 0.68)"
            });
        });
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, "#1a315e");
        drawFlagBorder(flagBox);
    }
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
    function makeStandardFlagBox() {
        return {
            x: 118,
            y: 174,
            width: 486,
            height: 342
        };
    }
    function drawFlagShadow(flag) {
        roughCanvas.polygon(offsetPoints(flag, 8, 10), {
            stroke: "transparent",
            fill: PALETTE.shadow,
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
    }
    function drawBlankFlag(flag, fill, stroke) {
        roughCanvas.polygon(flag, {
            stroke,
            strokeWidth: 2.4,
            fill,
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.4
        });
    }
    function drawFlagBorder(flagBox) {
        roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
            stroke: "#28332e",
            strokeWidth: 2,
            fill: "transparent",
            roughness: 2.8,
            bowing: 1.6
        });
    }
    function drawUnionJackCanton(flagBox) {
        const canton = {
            x: flagBox.x,
            y: flagBox.y,
            width: 0.5 * flagBox.width,
            height: 0.5 * flagBox.height
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
    function drawCantonLine(flagBox, u0, v0, u1, v1, stroke, strokeWidth) {
        roughCanvas.line(mapFlagX(u0, v0, flagBox), mapFlagY(u0, v0, flagBox), mapFlagX(u1, v1, flagBox), mapFlagY(u1, v1, flagBox), {
            stroke,
            strokeWidth,
            roughness: 2.4,
            bowing: 1.6
        });
    }
    function drawSpainEmblem(flagBox) {
        const cx = mapFlagX(0.31, 0.5, flagBox);
        const cy = mapFlagY(0.5, 0.5, flagBox);
        const shieldWidth = 44;
        const shieldHeight = 58;
        const shield = [
            [
                cx - shieldWidth / 2 + jitter(1.4),
                cy - shieldHeight / 2 + jitter(1.4)
            ],
            [
                cx + shieldWidth / 2 + jitter(1.4),
                cy - shieldHeight / 2 + jitter(1.4)
            ],
            [
                cx + 0.42 * shieldWidth + jitter(1.4),
                cy + 0.22 * shieldHeight + jitter(1.4)
            ],
            [
                cx + jitter(1.2),
                cy + shieldHeight / 2 + jitter(1.4)
            ],
            [
                cx - 0.42 * shieldWidth + jitter(1.4),
                cy + 0.22 * shieldHeight + jitter(1.4)
            ]
        ];
        roughCanvas.polygon(shield, {
            stroke: "#6f2a2b",
            strokeWidth: 1.25,
            fill: "#d8483f",
            fillStyle: "solid",
            roughness: 2.1,
            bowing: 1.2
        });
        roughCanvas.rectangle(cx - 14 + jitter(1), cy - 18 + jitter(1), 28, 25, {
            stroke: "#a77613",
            strokeWidth: 0.9,
            fill: "#f4d24a",
            fillStyle: "hachure",
            hachureGap: 6,
            fillWeight: 0.75,
            roughness: 1.9,
            bowing: 1.1
        });
        roughCanvas.circle(cx, cy - 42, 19, {
            stroke: "#8b6418",
            strokeWidth: 1,
            fill: "#f4d24a",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        drawSketchStar(cx, cy - 44, 7, 0);
        roughCanvas.line(cx - 24, cy - 33, cx + 24, cy - 33 + jitter(2), {
            stroke: "#8b6418",
            strokeWidth: 1.05,
            roughness: 2.3,
            bowing: 1.6
        });
    }
    function drawVaticanEmblem(flagBox) {
        const cx = mapFlagX(0.74, 0.53, flagBox);
        const cy = mapFlagY(0.53, 0.53, flagBox);
        roughCanvas.line(cx - 44, cy + 42, cx + 36, cy - 46, {
            stroke: "#b78716",
            strokeWidth: 4.2,
            roughness: 2.5,
            bowing: 1.8
        });
        roughCanvas.line(cx + 44, cy + 42, cx - 36, cy - 46, {
            stroke: "#a7adb1",
            strokeWidth: 4.2,
            roughness: 2.5,
            bowing: 1.8
        });
        roughCanvas.circle(cx - 36, cy - 42, 27, {
            stroke: "#8b6418",
            strokeWidth: 1.5,
            fill: "#f4d24a",
            fillStyle: "hachure",
            hachureGap: 7,
            fillWeight: 0.85,
            roughness: 2.1,
            bowing: 1.2
        });
        roughCanvas.circle(cx + 36, cy - 42, 27, {
            stroke: "#7d858a",
            strokeWidth: 1.5,
            fill: "#dce2e0",
            fillStyle: "hachure",
            hachureGap: 7,
            fillWeight: 0.85,
            roughness: 2.1,
            bowing: 1.2
        });
        roughCanvas.circle(cx, cy - 58, 34, {
            stroke: "#a98218",
            strokeWidth: 1.5,
            fill: "#f7e1a0",
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.3
        });
        roughCanvas.rectangle(cx - 24 + jitter(1), cy - 72 + jitter(1), 48, 24, {
            stroke: "#a98218",
            strokeWidth: 1.2,
            fill: "#fbfdfa",
            fillStyle: "hachure",
            hachureGap: 6,
            fillWeight: 0.7,
            roughness: 2,
            bowing: 1.2
        });
        roughCanvas.line(cx - 34, cy - 19, cx + 34, cy - 19 + jitter(2), {
            stroke: "#c23d45",
            strokeWidth: 3.2,
            roughness: 2.4,
            bowing: 1.5
        });
    }
    function drawFlagBand(flagBox, u0, v0, u1, v1, fill, stroke) {
        roughCanvas.polygon(makeFlagCellOutline(u0, v0, u1, v1, flagBox), {
            stroke,
            strokeWidth: 1.2,
            fill,
            fillStyle: "solid",
            roughness: 2.2,
            bowing: 1.2
        });
        roughCanvas.polygon(makeFlagCellOutline(u0, v0, u1, v1, flagBox), {
            stroke: softenColor(stroke, 0.28),
            strokeWidth: 0.65,
            fill,
            fillStyle: "hachure",
            hachureAngle: -12,
            hachureGap: 12,
            fillWeight: 0.55,
            roughness: 2
        });
    }
    function drawUSStars(flagBox) {
        const startX = 0.055;
        const endX = 0.395;
        const startY = 0.055;
        const endY = 0.49;
        for(let row = 0; row < 9; row += 1){
            const stars = row % 2 === 0 ? 6 : 5;
            const rowOffset = row % 2 === 0 ? 0 : 0.5;
            for(let column = 0; column < stars; column += 1){
                const u = startX + (column + rowOffset) / 5.5 * (endX - startX);
                const v = startY + row / 8 * (endY - startY);
                const x = mapFlagX(u, v, flagBox);
                const y = mapFlagY(u, v, flagBox);
                drawSketchStar(x, y, 6.4, -18 + 2 * row);
            }
        }
    }
    function drawGenericFlag(flagEmoji) {
        const flagBox = {
            x: 118,
            y: 174,
            width: 486,
            height: 342
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
            bowing: 1.2
        });
        roughCanvas.polygon(flag, {
            stroke: "#b9c4c0",
            strokeWidth: 2.4,
            fill: "#fbfdfa",
            fillStyle: "solid",
            roughness: 2.4,
            bowing: 1.4
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
            bowing: 1.15
        });
        segments.forEach((segment)=>{
            roughCanvas.polygon(segment.outline, {
                stroke: segment.isLightNeutral ? "rgba(38, 49, 45, 0.08)" : softenColor(segment.color, 0.42),
                strokeWidth: segment.isLightNeutral ? 0.35 : 0.75,
                fill: segment.color,
                fillStyle: "solid",
                roughness: 2.25,
                bowing: 1.35
            });
            if (!segment.isLightNeutral && segment.shouldTexture) roughCanvas.polygon(segment.outline, {
                stroke: "rgba(38, 49, 45, 0.08)",
                strokeWidth: 0.35,
                fill: segment.color,
                fillStyle: "hachure",
                hachureAngle: -12,
                hachureGap: 20,
                fillWeight: 0.3,
                roughness: 1.8
            });
        });
        drawFlagImageDetails(source, flagBox);
        drawFabricStrokes(flagBox.x + 14, flagBox.y + 22, flagBox.width - 36, flagBox.height - 50, softenColor(dominant, 0.28));
        roughCanvas.polygon(makeSketchRect(flagBox.x, flagBox.y, flagBox.width, flagBox.height), {
            stroke: "#28332e",
            strokeWidth: 2,
            fill: "transparent",
            roughness: 2.8,
            bowing: 1.6
        });
    }
    function drawFlagImageDetails(source, flagBox) {
        const { data, bounds } = source;
        const pixels = data.data;
        const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
        const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
        const step = Math.max(5, Math.floor(data.width / 88));
        let detailCount = 0;
        let candidateCount = 0;
        for(let y = bounds.minY + step; y < bounds.maxY - step; y += step)for(let x = bounds.minX + step; x < bounds.maxX - step; x += step){
            const index = (y * data.width + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha < 48 || !isFlagDetailPixel(pixels, data.width, data.height, x, y, step)) continue;
            const metrics = normalizeFlagMetrics(getColorMetrics(pixels, index));
            const isLightNeutral = metrics.brightness > 232 && metrics.saturation < 30;
            candidateCount += 1;
            if (isLightNeutral && candidateCount % 3 !== 0) continue;
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
                bowing: 1.1
            });
            if (!isLightNeutral && detailCount % 4 === 0) roughCanvas.line(px + jitter(5), py + jitter(5), px + jitter(14), py + jitter(12), {
                stroke: "rgba(38, 49, 45, 0.24)",
                strokeWidth: randomBetween(0.45, 0.8),
                roughness: 2.4,
                bowing: 1.6
            });
            detailCount += 1;
            if (detailCount > 180) return;
        }
    }
    function isFlagDetailPixel(pixels, width, height, x, y, distance) {
        const index = (y * width + x) * 4;
        const centerAlpha = pixels[index + 3];
        const offsets = [
            [
                -distance,
                0
            ],
            [
                distance,
                0
            ],
            [
                0,
                -distance
            ],
            [
                0,
                distance
            ],
            [
                -distance,
                -distance
            ],
            [
                distance,
                distance
            ]
        ];
        return offsets.some(([dx, dy])=>{
            const nextX = Math.min(width - 1, Math.max(0, x + dx));
            const nextY = Math.min(height - 1, Math.max(0, y + dy));
            const nextIndex = (nextY * width + nextX) * 4;
            const alpha = pixels[nextIndex + 3];
            if (Math.abs(centerAlpha - alpha) > 90 || alpha < 32) return true;
            const diff = Math.abs(pixels[index] - pixels[nextIndex]) + Math.abs(pixels[index + 1] - pixels[nextIndex + 1]) + Math.abs(pixels[index + 2] - pixels[nextIndex + 2]);
            return diff > 118;
        });
    }
    function makeSketchRect(x, y, width, height) {
        const steps = 6;
        const edgeJitter = 5.2;
        const alongJitter = 2.2;
        const points = [];
        for(let i = 0; i <= steps; i += 1)points.push([
            x + width * i / steps + jitter(alongJitter),
            y + jitter(edgeJitter)
        ]);
        for(let i = 0; i <= steps; i += 1)points.push([
            x + width + jitter(edgeJitter),
            y + height * i / steps + jitter(alongJitter)
        ]);
        for(let i = steps; i >= 0; i -= 1)points.push([
            x + width * i / steps + jitter(alongJitter),
            y + height + jitter(edgeJitter)
        ]);
        for(let i = steps; i >= 0; i -= 1)points.push([
            x + jitter(edgeJitter),
            y + height * i / steps + jitter(alongJitter)
        ]);
        return points;
    }
    function drawFabricStrokes(x, y, width, height, color) {
        for(let i = 0; i < 5; i += 1){
            const px = x + width * (i + 0.6) / 7 + jitter(10);
            roughCanvas.line(px, y + jitter(14), px + jitter(18), y + height + jitter(14), {
                stroke: color,
                strokeWidth: randomBetween(0.55, 1.05),
                roughness: 2.2,
                bowing: 2.4
            });
        }
        for(let i = 0; i < 3; i += 1){
            const py = y + height * (i + 0.8) / 5 + jitter(8);
            roughCanvas.line(x + jitter(10), py, x + width + jitter(10), py + jitter(18), {
                stroke: color,
                strokeWidth: randomBetween(0.45, 0.85),
                roughness: 2.4,
                bowing: 1.9
            });
        }
    }
    function drawSketchStar(cx, cy, radius, rotationDegrees) {
        drawSketchStarWithColors(cx, cy, radius, rotationDegrees, {
            stroke: "#b68b12",
            fill: "#ffd84c",
            hatch: "#ffec62"
        });
    }
    function drawSketchStarWithColors(cx, cy, radius, rotationDegrees, colors) {
        const points = [];
        const rotation = rotationDegrees * Math.PI / 180 - Math.PI / 2;
        for(let i = 0; i < 10; i += 1){
            const angle = rotation + i * Math.PI / 5;
            const pointRadius = i % 2 === 0 ? radius : 0.42 * radius;
            points.push([
                cx + Math.cos(angle) * pointRadius + jitter(0.05 * radius),
                cy + Math.sin(angle) * pointRadius + jitter(0.05 * radius)
            ]);
        }
        roughCanvas.polygon(points, {
            stroke: colors.stroke,
            strokeWidth: Math.max(1.2, 0.08 * radius),
            fill: colors.fill,
            fillStyle: "solid",
            roughness: 2.3,
            bowing: 1.2
        });
        roughCanvas.polygon(points, {
            stroke: colors.hatch,
            strokeWidth: Math.max(0.8, 0.04 * radius),
            fill: colors.fill,
            fillStyle: "hachure",
            hachureAngle: -22,
            hachureGap: Math.max(6, 0.22 * radius),
            fillWeight: 1,
            roughness: 2.2
        });
    }
    function rasterizeFlagEmoji(flagEmoji, offscreenSize) {
        const offscreen = document.createElement("canvas");
        offscreen.width = offscreenSize * DEVICE_PIXEL_RATIO;
        offscreen.height = offscreenSize * DEVICE_PIXEL_RATIO;
        const offscreenCtx = offscreen.getContext("2d", {
            willReadFrequently: true
        });
        offscreenCtx.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);
        offscreenCtx.clearRect(0, 0, offscreenSize, offscreenSize);
        offscreenCtx.textAlign = "center";
        offscreenCtx.textBaseline = "middle";
        offscreenCtx.font = `${Math.round(0.68 * offscreenSize)}px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif`;
        offscreenCtx.fillText(flagEmoji, offscreenSize / 2, offscreenSize / 2 + 0.02 * offscreenSize);
        const imageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height);
        return {
            data: imageData,
            bounds: findPixelBounds(imageData)
        };
    }
    function collectFlagSegments(source, flagBox) {
        const { data, bounds } = source;
        const pixels = data.data;
        const segments = [];
        const columns = 64;
        const rows = 40;
        const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
        const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
        for(let row = 0; row < rows; row += 1){
            let run = null;
            for(let column = 0; column < columns; column += 1){
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
                const cell = {
                    column,
                    metrics,
                    isLightNeutral,
                    bucket
                };
                if (run && run.bucket === bucket) {
                    run.endColumn = column;
                    run.cells.push(cell);
                } else {
                    if (run) segments.push(createFlagSegment(run, row, columns, rows, flagBox));
                    run = {
                        bucket,
                        startColumn: column,
                        endColumn: column,
                        cells: [
                            cell
                        ]
                    };
                }
            }
            if (run) segments.push(createFlagSegment(run, row, columns, rows, flagBox));
        }
        return segments;
    }
    function sampleFlagCell(pixels, width, bounds, contentWidth, contentHeight, u0, v0, u1, v1) {
        const points = [
            [
                (u0 + u1) / 2,
                (v0 + v1) / 2
            ],
            [
                u0 + (u1 - u0) * 0.28,
                v0 + (v1 - v0) * 0.35
            ],
            [
                u0 + (u1 - u0) * 0.72,
                v0 + (v1 - v0) * 0.35
            ],
            [
                u0 + (u1 - u0) * 0.28,
                v0 + (v1 - v0) * 0.72
            ],
            [
                u0 + (u1 - u0) * 0.72,
                v0 + (v1 - v0) * 0.72
            ]
        ];
        const totals = points.reduce((acc, [u, v])=>{
            const x = Math.round(bounds.minX + u * contentWidth);
            const y = Math.round(bounds.minY + v * contentHeight);
            const index = (y * width + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha < 30) return acc;
            acc.red += pixels[index];
            acc.green += pixels[index + 1];
            acc.blue += pixels[index + 2];
            acc.alpha += alpha;
            acc.count += 1;
            return acc;
        }, {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
            count: 0
        });
        if (!totals.count) return null;
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
                saturation: max - min
            }
        };
    }
    function normalizeFlagMetrics(metrics) {
        const isSystemHighlight = metrics.saturation < 28 && metrics.brightness > 110;
        if (isSystemHighlight) return {
            red: 250,
            green: 252,
            blue: 249,
            brightness: 250.3,
            saturation: 3
        };
        return metrics;
    }
    function getFlagSegmentBucket(metrics, isLightNeutral) {
        if (isLightNeutral) return "light";
        return `${34 * Math.round(metrics.red / 34)}-${34 * Math.round(metrics.green / 34)}-${34 * Math.round(metrics.blue / 34)}`;
    }
    function createFlagSegment(run, row, columns, rows, flagBox) {
        const metrics = averageMetrics(run.cells);
        const isLightNeutral = run.cells.filter((cell)=>cell.isLightNeutral).length > 0.58 * run.cells.length;
        const u0 = run.startColumn / columns;
        const u1 = (run.endColumn + 1) / columns;
        const v0 = row / rows;
        const v1 = (row + 1) / rows;
        return {
            color: `rgba(${metrics.red}, ${metrics.green}, ${metrics.blue}, ${isLightNeutral ? 0.88 : 0.98})`,
            metrics,
            isLightNeutral,
            area: (run.endColumn - run.startColumn + 1) * flagBox.width * flagBox.height / (columns * rows),
            shouldTexture: row % 4 === 0 && run.endColumn - run.startColumn > 2,
            outline: makeFlagCellOutline(u0, v0, u1, v1, flagBox)
        };
    }
    function averageMetrics(cells) {
        const totals = cells.reduce((acc, cell)=>{
            acc.red += cell.metrics.red;
            acc.green += cell.metrics.green;
            acc.blue += cell.metrics.blue;
            return acc;
        }, {
            red: 0,
            green: 0,
            blue: 0
        });
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
            saturation: max - min
        };
    }
    function getDominantFlagColor(cells) {
        const groups = new Map();
        cells.forEach((cell)=>{
            if (cell.isLightNeutral) return;
            const key = `${36 * Math.round(cell.metrics.red / 36)}-${36 * Math.round(cell.metrics.green / 36)}-${36 * Math.round(cell.metrics.blue / 36)}`;
            const current = groups.get(key) || {
                count: 0,
                red: 0,
                green: 0,
                blue: 0
            };
            current.count += 1;
            current.red += cell.metrics.red;
            current.green += cell.metrics.green;
            current.blue += cell.metrics.blue;
            groups.set(key, current);
        });
        const dominant = [
            ...groups.values()
        ].sort((a, b)=>b.count - a.count)[0];
        if (!dominant) return null;
        return `rgb(${Math.round(dominant.red / dominant.count)}, ${Math.round(dominant.green / dominant.count)}, ${Math.round(dominant.blue / dominant.count)})`;
    }
    function makeFlagCellOutline(u0, v0, u1, v1, flagBox) {
        const overlapU = 0.003;
        const overlapV = 0.004;
        const points = [
            [
                u0 - overlapU,
                v0 - overlapV
            ],
            [
                (u0 + u1) / 2,
                v0 - overlapV + jitter(0.0006)
            ],
            [
                u1 + overlapU,
                v0 - overlapV
            ],
            [
                u1 + overlapU,
                (v0 + v1) / 2
            ],
            [
                u1 + overlapU,
                v1 + overlapV
            ],
            [
                (u0 + u1) / 2,
                v1 + overlapV + jitter(0.0006)
            ],
            [
                u0 - overlapU,
                v1 + overlapV
            ],
            [
                u0 - overlapU,
                (v0 + v1) / 2
            ]
        ];
        return points.map(([u, v])=>[
                mapFlagX(Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v)), flagBox) + jitter(0.45),
                mapFlagY(Math.min(1, Math.max(0, u)), Math.min(1, Math.max(0, v)), flagBox) + jitter(0.45)
            ]);
    }
    function mapFlagX(u, v, flagBox) {
        return flagBox.x + flagBox.width * u;
    }
    function mapFlagY(u, v, flagBox) {
        return flagBox.y + flagBox.height * v;
    }
    function findPixelBounds(imageData) {
        const { data, width, height } = imageData;
        const bounds = {
            minX: width,
            minY: height,
            maxX: 0,
            maxY: 0
        };
        for(let y = 0; y < height; y += 1)for(let x = 0; x < width; x += 1)if (!(data[(y * width + x) * 4 + 3] < 24)) {
            bounds.minX = Math.min(bounds.minX, x);
            bounds.minY = Math.min(bounds.minY, y);
            bounds.maxX = Math.max(bounds.maxX, x);
            bounds.maxY = Math.max(bounds.maxY, y);
        }
        if (bounds.minX > bounds.maxX || bounds.minY > bounds.maxY) return {
            minX: 0,
            minY: 0,
            maxX: width,
            maxY: height
        };
        return bounds;
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
            saturation: max - min
        };
    }
    function offsetPoints(points, x, y) {
        return points.map((point)=>[
                point[0] + x,
                point[1] + y
            ]);
    }
    function softenColor(color, alpha) {
        const channels = color.match(/rgba?\(([^)]+)\)/);
        if (!channels) return color;
        return `rgba(${channels[1].split(",").slice(0, 3).join(",")}, ${alpha})`;
    }
    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }
    function jitter(amount) {
        return randomBetween(-amount, amount);
    }
})();
