const hslToRgb = (h, s, l) => {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};
const lum = (rgb) => rgb.map((v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}).reduce((sum, val, i) => sum + val * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => ((Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05)).toFixed(2);
const mix = (a, b, f) => a.map((v, i) => Math.round(v * (1 - f) + b[i] * f));
const white = [255, 255, 255];
const results = [];
for (let h = 30; h <= 50; h += 1) {
  for (let s = 20; s <= 55; s += 1) {
    for (let l = 30; l <= 48; l += 1) {
      const rgb = hslToRgb(h, s, l);
      const cWhite = parseFloat(contrast(rgb, white));
      const cBg10 = parseFloat(contrast(rgb, mix(white, rgb, 0.1)));
      if (cWhite >= 4.5 && cBg10 >= 4.5) {
        results.push({ h, s, l, cWhite, cBg10 });
      }
    }
  }
}
results.sort((a, b) => (a.cWhite + a.cBg10) - (b.cWhite + b.cBg10));
console.log('found', results.length);
if (results.length > 0) {
  console.log(results.slice(0, 20).map(r => `hsl(${r.h} ${r.s}% ${r.l}%) white:${r.cWhite} bg10:${r.cBg10}`).join('\n'));
}
