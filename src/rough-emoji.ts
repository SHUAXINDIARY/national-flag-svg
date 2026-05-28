import { getDrawTheme, getPalette, setDrawTheme } from "./constant";
import { drawGenericFlag, templateDrawers, type TemplateFlag } from "./flag-drawers";
import { isFlagEmoji, resolveFlag } from "./flag-utils";
import { ctx, roughCanvas, size, withCanvas } from "./render-context";
import type { RoughEmojiApi } from "./types";

/** 绘制流程封装实例，外部入口只需要把已解析的国旗交给它。 */
let renderer: RoughEmojiRenderer;

/** 页面和 QA 工具共享的绘制门面：输入 emoji，输出到指定 canvas。 */
export const RoughEmoji: RoughEmojiApi = {
    draw(canvasElement, value) {
        withCanvas(canvasElement, () => renderer.draw(resolveFlag(value)));
    },
    isFlagEmoji,
    resolveFlag,
    setTheme: setDrawTheme,
    getTheme: getDrawTheme,
};

/** 国旗绘制器：负责清理画布、绘制纸张背景、模板分发和 fallback。 */
class RoughEmojiRenderer {
    /** 绘制总入口：先铺纸张背景，再按已知旗帜走专门模板，未知旗帜走像素采样流程。 */
    draw(flag: string) {
        this.clearCanvas();
        this.drawPaper();

        const templateDrawer = templateDrawers[flag as TemplateFlag];
        if (templateDrawer) {
            templateDrawer();
            return;
        }

        drawGenericFlag(flag);
    }

    /** 清空当前画布，为下一次完整重绘做准备。 */
    private clearCanvas() {
        ctx.clearRect(0, 0, size, size);
    }

    /** 绘制统一纸张底色和粗糙边框，给所有旗帜提供一致的手写载体。 */
    private drawPaper() {
        const palette = getPalette();
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
}

renderer = new RoughEmojiRenderer();
