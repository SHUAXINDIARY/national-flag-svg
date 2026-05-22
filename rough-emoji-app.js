/** 单页演示入口使用的 DOM 选择器，QA 页面不存在这些节点时只暴露全局 API。 */
const ELEMENT_SELECTORS = {
  canvas: "#rough-canvas",
  form: "#emoji-form",
  input: "#emoji-input",
  downloadButton: "#download-button",
};

/** 默认绘制国旗，供首次打开页面、prompt 默认值和非法输入回退共用。 */
const DEFAULT_FLAG = "🇨🇳";

/** 下载文件名前缀，最终文件名会追加当前绘制的国旗 emoji。 */
const DOWNLOAD_FILE_PREFIX = "rough-flag";

/** 首次进入单页演示时提示用户输入国旗的文案。 */
const FLAG_PROMPT_MESSAGE = "请输入要绘制的国旗";

/** 浏览器单页主流程：发现 DOM、初始化国旗、绑定表单与下载事件。 */
class RoughEmojiApp {
  constructor(api, doc = document, win = window) {
    this.api = api;
    this.doc = doc;
    this.win = win;
  }

  /** 如果当前页面包含交互表单，就自动完成首次绘制和表单事件绑定。 */
  mount() {
    const elements = this.queryElements();

    if (!elements) {
      return;
    }

    const { canvas, form, input, downloadButton } = elements;
    const params = new URLSearchParams(this.win.location.search);
    const initialFlag =
      params.get("flag") ||
      this.win.prompt(FLAG_PROMPT_MESSAGE, DEFAULT_FLAG) ||
      DEFAULT_FLAG;

    input.value = initialFlag;
    this.api.draw(canvas, initialFlag);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.api.draw(canvas, input.value);
    });

    downloadButton.addEventListener("click", () => {
      const link = this.doc.createElement("a");
      const resolvedFlag = this.api.resolveFlag(input.value);

      link.download = `${DOWNLOAD_FILE_PREFIX}-${resolvedFlag}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  /** 查询单页演示 DOM；QA 页面没有这些节点时返回 null。 */
  queryElements() {
    const canvas = this.doc.querySelector(ELEMENT_SELECTORS.canvas);
    const form = this.doc.querySelector(ELEMENT_SELECTORS.form);
    const input = this.doc.querySelector(ELEMENT_SELECTORS.input);
    const downloadButton = this.doc.querySelector(
      ELEMENT_SELECTORS.downloadButton,
    );

    if (!canvas || !form || !input || !downloadButton) {
      return null;
    }

    return { canvas, form, input, downloadButton };
  }
}

new RoughEmojiApp(window.RoughEmoji).mount();
