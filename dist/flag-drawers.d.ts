import { TEMPLATE_FLAGS } from "./constant";
/** 专门模板绘制函数签名。 */
export type FlagDrawer = () => void;
/** 专门模板覆盖的国旗 emoji 联合类型。 */
export type TemplateFlag = (typeof TEMPLATE_FLAGS)[keyof typeof TEMPLATE_FLAGS];
/** 未覆盖输入的兜底绘制流程，保留较克制的细节数量以控制性能。 */
export declare function drawGenericFlag(flagEmoji: string): void;
/** 专门模板分发表：每个标准国旗都有独立绘制入口，避免大量 if 分支。 */
export declare const templateDrawers: Record<TemplateFlag, FlagDrawer>;
