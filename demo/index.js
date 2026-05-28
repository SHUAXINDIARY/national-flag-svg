/**
 * index.html 批量国旗 QA 页脚本：渲染全部地区旗面、搜索筛选与复制 SVG。
 */
import { canvasToSvg } from "./index-svg-export.js";

/** file:// 协议下 ES module 无法加载时的状态栏提示文案。 */
const FILE_PROTOCOL_HINT =
    "无法通过 file:// 加载本地脚本。请先运行 pnpm run dev，再打开 http://localhost:3000/";

/** ISO 3166-1 alpha-2 地区码列表，用于批量渲染 QA 网格。 */
const regionCodes = [
    "AD",
    "AE",
    "AF",
    "AG",
    "AI",
    "AL",
    "AM",
    "AO",
    "AQ",
    "AR",
    "AS",
    "AT",
    "AU",
    "AW",
    "AX",
    "AZ",
    "BA",
    "BB",
    "BD",
    "BE",
    "BF",
    "BG",
    "BH",
    "BI",
    "BJ",
    "BL",
    "BM",
    "BN",
    "BO",
    "BQ",
    "BR",
    "BS",
    "BT",
    "BV",
    "BW",
    "BY",
    "BZ",
    "CA",
    "CC",
    "CD",
    "CF",
    "CG",
    "CH",
    "CI",
    "CK",
    "CL",
    "CM",
    "CN",
    "CO",
    "CR",
    "CU",
    "CV",
    "CW",
    "CX",
    "CY",
    "CZ",
    "DE",
    "DJ",
    "DK",
    "DM",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "EH",
    "ER",
    "ES",
    "ET",
    "FI",
    "FJ",
    "FK",
    "FM",
    "FO",
    "FR",
    "GA",
    "GB",
    "GD",
    "GE",
    "GF",
    "GG",
    "GH",
    "GI",
    "GL",
    "GM",
    "GN",
    "GP",
    "GQ",
    "GR",
    "GS",
    "GT",
    "GU",
    "GW",
    "GY",
    "HK",
    "HM",
    "HN",
    "HR",
    "HT",
    "HU",
    "ID",
    "IE",
    "IL",
    "IM",
    "IN",
    "IO",
    "IQ",
    "IR",
    "IS",
    "IT",
    "JE",
    "JM",
    "JO",
    "JP",
    "KE",
    "KG",
    "KH",
    "KI",
    "KM",
    "KN",
    "KP",
    "KW",
    "KY",
    "KZ",
    "LA",
    "LB",
    "LC",
    "LI",
    "LK",
    "LR",
    "LS",
    "LT",
    "LU",
    "LV",
    "LY",
    "MA",
    "MC",
    "MD",
    "ME",
    "MF",
    "MG",
    "MH",
    "MK",
    "ML",
    "MM",
    "MN",
    "MO",
    "MP",
    "MQ",
    "MR",
    "MS",
    "MT",
    "MU",
    "MV",
    "MW",
    "MX",
    "MY",
    "MZ",
    "NA",
    "NC",
    "NE",
    "NF",
    "NG",
    "NI",
    "NL",
    "NO",
    "NP",
    "NR",
    "NU",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PF",
    "PG",
    "PH",
    "PK",
    "PL",
    "PM",
    "PN",
    "PR",
    "PS",
    "PT",
    "PW",
    "PY",
    "QA",
    "RE",
    "RO",
    "RS",
    "RU",
    "RW",
    "SA",
    "SB",
    "SC",
    "SD",
    "SE",
    "SG",
    "SH",
    "SI",
    "SJ",
    "SK",
    "SL",
    "SM",
    "SN",
    "SO",
    "SR",
    "SS",
    "ST",
    "SV",
    "SX",
    "SY",
    "SZ",
    "TC",
    "TD",
    "TF",
    "TG",
    "TH",
    "TJ",
    "TK",
    "TL",
    "TM",
    "TN",
    "TO",
    "TR",
    "TT",
    "TV",
    "TW",
    "TZ",
    "UA",
    "UG",
    "UM",
    "US",
    "UY",
    "UZ",
    "VA",
    "VC",
    "VE",
    "VG",
    "VI",
    "VN",
    "VU",
    "WF",
    "WS",
    "XK",
    "YE",
    "YT",
    "ZA",
    "ZM",
    "ZW",
];

/** 浏览器内置中文地区名解析器。 */
const regionNames = new Intl.DisplayNames(["zh-CN"], {
    type: "region",
});
/** Intl 未覆盖或需特殊表述的地区中文名。 */
const regionNameFallbacks = {
    HK: "中国香港",
    MO: "中国澳门",
    TW: "中国台湾",
    UN: "联合国",
    XK: "科索沃",
};

/** 顶部「示例」区块优先展示的地区码。 */
const sampleCodes = [
    "CN",
    "JP",
    "US",
    "AU",
    "TH",
    "FR",
    "IT",
    "ES",
    "VA",
    "KR",
    "UN",
];

/** 将两位地区码转为对应 regional indicator 国旗 emoji。 */
function flagFromCode(code) {
    return [...code]
        .map((letter) =>
            String.fromCodePoint(0x1f1e6 + letter.charCodeAt(0) - 65),
        )
        .join("");
}

/** 解析地区码对应的中文显示名，优先 fallback 表。 */
function regionNameFromCode(code) {
    return regionNameFallbacks[code] || regionNames.of(code) || code;
}

/** 复制文本到剪贴板，Clipboard API 不可用时降级为 execCommand。 */
async function copyText(text) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
}

/** 复制成功后短暂切换按钮文案与样式。 */
function showCopyFeedback(button) {
    const originalText = button.textContent;
    button.classList.add("copy-svg-btn--copied");
    button.textContent = "已复制";
    window.setTimeout(() => {
        button.classList.remove("copy-svg-btn--copied");
        button.textContent = originalText;
    }, 1400);
}

/** 将画布旗面导出为 SVG 字符串并写入剪贴板。 */
async function handleCopySvg(button, canvas) {
    if (button.disabled) {
        return;
    }

    button.disabled = true;

    try {
        await copyText(canvasToSvg(canvas));
        showCopyFeedback(button);
    } catch {
        button.textContent = "复制失败";
        window.setTimeout(() => {
            button.textContent = "复制 SVG";
        }, 1400);
    } finally {
        button.disabled = false;
    }
}

/** 创建单个国旗卡片：canvas 绘制、标签信息与复制 SVG 按钮。 */
function renderFlagCard(parent, code, RoughEmoji) {
    const item = document.createElement("article");
    item.className = "item";
    const name = regionNameFromCode(code);
    item.dataset.code = code;
    item.dataset.name = name;

    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 720;

    const label = document.createElement("div");
    label.className = "label";

    const codeSpan = document.createElement("span");
    codeSpan.textContent = code;

    const nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.title = name;
    nameSpan.textContent = name;

    const labelActions = document.createElement("div");
    labelActions.className = "label-actions";

    const copySvgButton = document.createElement("button");
    copySvgButton.type = "button";
    copySvgButton.className = "copy-svg-btn";
    copySvgButton.textContent = "复制 SVG";
    copySvgButton.setAttribute("aria-label", `复制 ${code} 国旗 SVG`);
    copySvgButton.addEventListener("click", () => {
        handleCopySvg(copySvgButton, canvas);
    });

    const emojiSpan = document.createElement("span");
    emojiSpan.className = "emoji";
    const emoji = flagFromCode(code);
    emojiSpan.textContent = emoji;

    labelActions.append(copySvgButton, emojiSpan);
    label.append(codeSpan, nameSpan, labelActions);
    item.append(canvas, label);
    parent.append(item);
    RoughEmoji.draw(canvas, emoji);
}

/** 从页面 data-theme 同步库内绘制色板。 */
function syncDrawThemeFromPage(RoughEmoji) {
    const theme =
        document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    RoughEmoji.setTheme(theme);
}

/** 收集待重绘的国旗 canvas 与 emoji。 */
function collectFlagRedrawTargets() {
    const targets = [];

    document.querySelectorAll(".item").forEach((item) => {
        const canvas = item.querySelector("canvas");
        const emoji = item.querySelector(".emoji")?.textContent;
        if (!canvas || !emoji) {
            return;
        }

        targets.push({ canvas, emoji });
    });

    return targets;
}

/** 对页面上所有国旗 canvas 重新绘制。 */
function redrawAllFlags(RoughEmoji) {
    collectFlagRedrawTargets().forEach(({ canvas, emoji }) => {
        RoughEmoji.draw(canvas, emoji);
    });
}

const THEME_REDRAW_BATCH_SIZE = 12;

/** 更新主题重绘 loading 文案。 */
function updateThemeRedrawProgress(done, total) {
    const progress = document.querySelector("#theme-redraw-progress");
    if (!progress) {
        return;
    }

    progress.textContent =
        total === 0
            ? "准备中…"
            : `正在重绘 ${done} / ${total} 面国旗…`;
}

/** 显示主题切换重绘 loading，并暂时禁用相关交互。 */
function showThemeRedrawLoading() {
    const overlay = document.querySelector("#theme-redraw-overlay");
    const themeToggle = document.querySelector("#theme-toggle");
    const searchInput = document.querySelector("#flag-search");

    document.body.classList.add("theme-redraw-busy");
    overlay?.classList.add("theme-redraw-overlay--visible");
    overlay?.setAttribute("aria-hidden", "false");
    themeToggle?.setAttribute("disabled", "");
    searchInput?.setAttribute("disabled", "");
    updateThemeRedrawProgress(0, 0);
}

/** 隐藏主题切换重绘 loading，并恢复交互。 */
function hideThemeRedrawLoading() {
    const overlay = document.querySelector("#theme-redraw-overlay");
    const themeToggle = document.querySelector("#theme-toggle");
    const searchInput = document.querySelector("#flag-search");

    document.body.classList.remove("theme-redraw-busy");
    overlay?.classList.remove("theme-redraw-overlay--visible");
    overlay?.setAttribute("aria-hidden", "true");
    themeToggle?.removeAttribute("disabled");
    searchInput?.removeAttribute("disabled");
}

/** 分批重绘全部国旗，避免长时间阻塞主线程且可更新进度。 */
async function redrawAllFlagsBatched(RoughEmoji) {
    const targets = collectFlagRedrawTargets();
    const total = targets.length;

    if (total === 0) {
        return;
    }

    updateThemeRedrawProgress(0, total);
    await new Promise((resolve) => requestAnimationFrame(resolve));

    for (let index = 0; index < total; index += THEME_REDRAW_BATCH_SIZE) {
        const batch = targets.slice(index, index + THEME_REDRAW_BATCH_SIZE);
        batch.forEach(({ canvas, emoji }) => {
            RoughEmoji.draw(canvas, emoji);
        });
        updateThemeRedrawProgress(
            Math.min(index + batch.length, total),
            total,
        );
        await new Promise((resolve) => requestAnimationFrame(resolve));
    }
}

/** 渲染示例区与全量网格，并初始化搜索筛选。 */
function renderAllFlags(RoughEmoji) {
    const sampleCodeSet = new Set(sampleCodes);
    const samples = document.querySelector("#samples");
    const grid = document.querySelector("#grid");

    sampleCodes.forEach((code) => renderFlagCard(samples, code, RoughEmoji));
    regionCodes.forEach((code) => {
        if (sampleCodeSet.has(code)) {
            return;
        }

        renderFlagCard(grid, code, RoughEmoji);
    });

    setupSearchFilter();
    updateStatusText();
}

/** 判断卡片是否匹配搜索词（地区码或中文名）。 */
function flagItemMatchesQuery(item, query) {
    const code = item.dataset.code?.toLowerCase() ?? "";
    const name = item.dataset.name?.toLowerCase() ?? "";
    return code.includes(query) || name.includes(query);
}

/** 按搜索框内容隐藏不匹配卡片，并更新区块空态。 */
function applySearchFilter() {
    const searchInput = document.querySelector("#flag-search");
    const query = searchInput.value.trim().toLowerCase();
    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
        const visible =
            query.length === 0 || flagItemMatchesQuery(item, query);
        item.classList.toggle("item--hidden", !visible);
    });

    document.querySelectorAll("#samples, #grid").forEach((section) => {
        const hasVisible = section.querySelector(".item:not(.item--hidden)");
        section.classList.toggle("flag-section--empty", !hasVisible);
    });

    updateStatusText();
}

/** 刷新底部状态栏：总数或筛选结果计数。 */
function updateStatusText() {
    const status = document.querySelector("#status");
    const searchInput = document.querySelector("#flag-search");
    const query = searchInput?.value.trim() ?? "";
    const total = document.querySelectorAll(".item").length;
    const visible = document.querySelectorAll(".item:not(.item--hidden)").length;

    if (!query) {
        status.textContent = `共 ${total} 个地区，统一手绘风格`;
        return;
    }

    status.textContent =
        visible === 0
            ? `未找到与「${query}」匹配的地区`
            : `筛选结果：${visible} / ${total}`;
}

/** 绑定搜索框 input / search 事件。 */
function setupSearchFilter() {
    const searchInput = document.querySelector("#flag-search");
    searchInput.addEventListener("input", applySearchFilter);
    searchInput.addEventListener("search", applySearchFilter);
}

let themeRedrawInProgress = false;

/** 主题切换后同步色板并重绘页面上全部国旗 canvas（带 loading）。 */
async function handleThemeChange(RoughEmoji) {
    const targets = collectFlagRedrawTargets();
    syncDrawThemeFromPage(RoughEmoji);

    if (targets.length === 0) {
        return;
    }

    if (themeRedrawInProgress) {
        return;
    }

    themeRedrawInProgress = true;
    showThemeRedrawLoading();

    try {
        await redrawAllFlagsBatched(RoughEmoji);
    } finally {
        hideThemeRedrawLoading();
        themeRedrawInProgress = false;
        updateStatusText();
    }
}

/** 注册主题切换回调：index.html 在 applyTheme 后调用以重绘全部 canvas。 */
function setupThemeRedraw(RoughEmoji) {
    window.redrawRoughEmojiFlags = () => {
        void handleThemeChange(RoughEmoji);
    };
}

/** 动态加载库产物并启动批量渲染。 */
async function bootstrap() {
    const status = document.querySelector("#status");

    try {
        const { RoughEmoji } = await import("../dist/index.js");
        syncDrawThemeFromPage(RoughEmoji);
        renderAllFlags(RoughEmoji);
        setupThemeRedraw(RoughEmoji);
    } catch {
        status.textContent =
            "加载 dist/index.js 失败，请先运行 pnpm run build";
    }
}

/** file:// 下无法加载 ES module，否则启动主流程。 */
if (location.protocol === "file:") {
    document.querySelector("#status").textContent = FILE_PROTOCOL_HINT;
} else {
    bootstrap();
}
