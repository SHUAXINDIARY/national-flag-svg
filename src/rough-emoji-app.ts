import { DEFAULT_FLAG, DOWNLOAD_FILE_PREFIX, ELEMENT_SELECTORS, FLAG_PROMPT_MESSAGE } from "./constant";
import type { RoughEmojiApi } from "./types";

/** 单页演示入口依赖的 DOM 节点集合，缺失时只保留全局 API。 */
interface RoughEmojiAppElements {
  canvas: HTMLCanvasElement;
  form: HTMLFormElement;
  input: HTMLInputElement;
  downloadButton: HTMLButtonElement;
}

/** 浏览器单页主流程：发现 DOM、初始化国旗、绑定表单与下载事件。 */
export class RoughEmojiApp {
  constructor(
    private readonly api: RoughEmojiApi,
    private readonly doc: Document = document,
    private readonly win: Window = window,
  ) {}

  /** 如果当前页面包含交互表单，就自动完成首次绘制和表单事件绑定。 */
  mount() {
    const elements = this.queryElements();

    if (!elements) {
      return;
    }

    const { canvas, form, input, downloadButton } = elements;
    const params = new URLSearchParams(this.win.location.search);
    const initialFlag = params.get("flag") || this.win.prompt(FLAG_PROMPT_MESSAGE, DEFAULT_FLAG) || DEFAULT_FLAG;

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
  private queryElements(): RoughEmojiAppElements | null {
    const canvas = this.doc.querySelector<HTMLCanvasElement>(ELEMENT_SELECTORS.canvas);
    const form = this.doc.querySelector<HTMLFormElement>(ELEMENT_SELECTORS.form);
    const input = this.doc.querySelector<HTMLInputElement>(ELEMENT_SELECTORS.input);
    const downloadButton = this.doc.querySelector<HTMLButtonElement>(ELEMENT_SELECTORS.downloadButton);

    if (!canvas || !form || !input || !downloadButton) {
      return null;
    }

    return { canvas, form, input, downloadButton };
  }
}
