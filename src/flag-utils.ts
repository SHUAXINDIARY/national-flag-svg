import { DEFAULT_FLAG, REGION_INDICATOR_MAX_CODE_POINT, REGION_INDICATOR_MIN_CODE_POINT } from "./constant";

/** 把任意输入规范化为可绘制的国旗 emoji；非法输入回退到中国国旗。 */
export function resolveFlag(value: unknown) {
  const input = String(value || "").trim();

  return isFlagEmoji(input) ? input : DEFAULT_FLAG;
}

/** 判断字符串是否由两个区域指示符组成，这是 Unicode 国旗 emoji 的编码形式。 */
export function isFlagEmoji(value: string) {
  const codePoints = [...value].map((char) => char.codePointAt(0));
  return (
    codePoints.length === 2 &&
    codePoints.every(
      (codePoint) =>
        codePoint !== undefined &&
        codePoint >= REGION_INDICATOR_MIN_CODE_POINT &&
        codePoint <= REGION_INDICATOR_MAX_CODE_POINT,
    )
  );
}
