import { canvasToSvg } from "./index-svg-export.js";

const FILE_PROTOCOL_HINT =
    "无法通过 file:// 加载本地脚本。请先运行 pnpm run dev，再打开 http://localhost:3000/";

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

const regionNames = new Intl.DisplayNames(["zh-CN"], {
    type: "region",
});
const regionNameFallbacks = {
    HK: "中国香港",
    MO: "中国澳门",
    TW: "中国台湾",
    UN: "联合国",
    XK: "科索沃",
};

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

function flagFromCode(code) {
    return [...code]
        .map((letter) =>
            String.fromCodePoint(0x1f1e6 + letter.charCodeAt(0) - 65),
        )
        .join("");
}

function regionNameFromCode(code) {
    return regionNameFallbacks[code] || regionNames.of(code) || code;
}

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

function showCopyFeedback(button) {
    const originalText = button.textContent;
    button.classList.add("copy-svg-btn--copied");
    button.textContent = "已复制";
    window.setTimeout(() => {
        button.classList.remove("copy-svg-btn--copied");
        button.textContent = originalText;
    }, 1400);
}

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

function flagItemMatchesQuery(item, query) {
    const code = item.dataset.code?.toLowerCase() ?? "";
    const name = item.dataset.name?.toLowerCase() ?? "";
    return code.includes(query) || name.includes(query);
}

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

function setupSearchFilter() {
    const searchInput = document.querySelector("#flag-search");
    searchInput.addEventListener("input", applySearchFilter);
    searchInput.addEventListener("search", applySearchFilter);
}

async function bootstrap() {
    const status = document.querySelector("#status");

    try {
        const { RoughEmoji } = await import("../dist/index.js");
        renderAllFlags(RoughEmoji);
    } catch {
        status.textContent =
            "加载 dist/index.js 失败，请先运行 pnpm run build";
    }
}

if (location.protocol === "file:") {
    document.querySelector("#status").textContent = FILE_PROTOCOL_HINT;
} else {
    bootstrap();
}
