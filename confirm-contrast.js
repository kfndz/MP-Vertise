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
const luminance = (rgb) => rgb.map((v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}).reduce((sum, val, i) => sum + val * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => ((Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05)).toFixed(2);
const mix = (a, b, f) => a.map((v, i) => Math.round(v * (1 - f) + b[i] * f));
const white = [255,255,255];
const candidates = [
  {name:'accent-28',h:44,s:83,l:28},
  {name:'accent-26',h:44,s:83,l:26},
  {name:'champ-34-27-40',h:34,s:27,l:40},
  {name:'champ-35-35-39',h:35,s:35,l:39},
  {name:'champ-38-35-42',h:38,s:35,l:42},
  {name:'champ-40-30-42',h:40,s:30,l:42},
  {name:'champ-40-45-36',h:40,s:45,l:36}
];
for (const c of candidates) {
  const rgb = hslToRgb(c.h, c.s, c.l);
  const bg10 = mix(white, rgb, 0.1);
  console.log(`${c.name} hsl(${c.h} ${c.s}% ${c.l}%) white:${contrast(rgb, white)} bg10:${contrast(rgb, bg10)}`);
}
