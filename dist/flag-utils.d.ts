/** 把任意输入规范化为可绘制的国旗 emoji；非法输入回退到中国国旗。 */
export declare function resolveFlag(value: unknown): string;
/** 判断字符串是否由两个区域指示符组成，这是 Unicode 国旗 emoji 的编码形式。 */
export declare function isFlagEmoji(value: string): boolean;
