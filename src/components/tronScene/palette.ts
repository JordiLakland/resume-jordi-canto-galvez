// Shared by the CSS accent and the 3D scene so both shift from cyan (frontend)
// to orange (backend) at the same pace while scrolling.
//
// The blend happens in Oklab (perceptual color space): a straight cross-fade
// from cyan to orange without detouring through blue, violet or red.

export const BG_COLOR = '#05070d';
export const CYAN = '#00e5ff';
export const ORANGE = '#ff8a00';

type Triplet = [number, number, number];

function smoothstep(edge0: number, edge1: number, x: number) {
    const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
    return t * t * (3 - 2 * t);
}

function hexToRgb(hex: string): Triplet {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

function rgbToOklab(rgb: Triplet): Triplet {
    const [r, g, b] = rgb.map((c) => toLinear(c / 255));
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    ];
}

function oklabToRgb([L, a, b]: Triplet): Triplet {
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const linear = [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
    return linear.map((c) => Math.round(Math.min(Math.max(toSrgb(c), 0), 1) * 255)) as Triplet;
}

const CYAN_LAB = rgbToOklab(hexToRgb(CYAN));
const ORANGE_LAB = rgbToOklab(hexToRgb(ORANGE));

/** 0 = fully cyan, 1 = fully orange, for a page scroll progress in [0, 1]. */
export function accentMix(progress: number) {
    return smoothstep(0.35, 0.65, progress);
}

/** sRGB accent color (0-255 per channel) for the given accent mix. */
export function accentRgb(mix: number): Triplet {
    return oklabToRgb(CYAN_LAB.map((c, i) => c + (ORANGE_LAB[i] - c) * mix) as Triplet);
}
