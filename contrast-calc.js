const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
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
const luminance = (rgb) => {
  const srgb = rgb.map((v) => {
    const channel = v / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
};
const contrast = (a, b) => {
  const L1 = luminance(a);
  const L2 = luminance(b);
  return ((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)).toFixed(2);
};
const mix = (a, b, f) => a.map((v, i) => Math.round(v * (1 - f) + b[i] * f));
const white = [255, 255, 255];
const candidates = [
  { name: 'accent current', h: 44, s: 83, l: 44 },
  { name: 'accent darker 34', h: 44, s: 83, l: 34 },
  { name: 'accent darker 32', h: 44, s: 83, l: 32 },
  { name: 'accent darker 30', h: 44, s: 83, l: 30 },
  { name: 'accent warmer 42 80 35', h: 42, s: 80, l: 35 },
  { name: 'accent warmer 42 70 34', h: 42, s: 70, l: 34 },
  { name: 'accent warmer 42 75 33', h: 42, s: 75, l: 33 }
];
const champ = [
  { name: 'champagne 40 35 58', h: 40, s: 35, l: 58 },
  { name: 'champagne 40 30 60', h: 40, s: 30, l: 60 },
  { name: 'champagne 40 30 55', h: 40, s: 30, l: 55 },
  { name: 'champagne 42 35 55', h: 42, s: 35, l: 55 },
  { name: 'champagne 40 30 52', h: 40, s: 30, l: 52 },
  { name: 'champagne 38 30 55', h: 38, s: 30, l: 55 },
  { name: 'champagne 35 30 55', h: 35, s: 30, l: 55 },
  { name: 'champagne 42 25 58', h: 42, s: 25, l: 58 }
];
console.log('accent candidates');
for (const c of candidates) {
  const rgb = hslToRgb(c.h, c.s, c.l);
  const bg10 = mix(white, rgb, 0.1);
  console.log(`${c.name}: hsl(${c.h} ${c.s}% ${c.l}%) -> contrast white ${contrast(rgb, white)} | contrast bg10 ${contrast(rgb, bg10)}`);
}
console.log('\nchampagne candidates');
for (const c of champ) {
  const rgb = hslToRgb(c.h, c.s, c.l);
  const bg10 = mix(white, rgb, 0.1);
  console.log(`${c.name}: hsl(${c.h} ${c.s}% ${c.l}%) -> contrast white ${contrast(rgb, white)} | contrast bg10 ${contrast(rgb, bg10)}`);
}
