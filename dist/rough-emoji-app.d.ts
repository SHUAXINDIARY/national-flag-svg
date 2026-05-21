import type { RoughEmojiApi } from "./types";
/** 浏览器单页主流程：发现 DOM、初始化国旗、绑定表单与下载事件。 */
export declare class RoughEmojiApp {
    private readonly api;
    private readonly doc;
    private readonly win;
    constructor(api: RoughEmojiApi, doc?: Document, win?: Window);
    /** 如果当前页面包含交互表单，就自动完成首次绘制和表单事件绑定。 */
    mount(): void;
    /** 查询单页演示 DOM；QA 页面没有这些节点时返回 null。 */
    private queryElements;
}
