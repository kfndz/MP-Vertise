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
  return rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }).reduce((sum, val, i) => sum + val * [0.2126, 0.7152, 0.0722][i], 0);
};
const contrast = (a, b) => {
  const L1 = luminance(a);
  const L2 = luminance(b);
  return ((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)).toFixed(2);
};
const mix = (a, b, f) => a.map((v, i) => Math.round(v * (1 - f) + b[i] * f));
const white = [255, 255, 255];
const accentCandidates = [
  { name: 'accent-26', h: 44, s: 83, l: 26 },
  { name: 'accent-28', h: 44, s: 83, l: 28 },
  { name: 'accent-30', h: 44, s: 83, l: 30 },
  { name: 'accent-32', h: 44, s: 83, l: 32 },
  { name: 'accent-34', h: 44, s: 83, l: 34 },
  { name: 'accent-36', h: 44, s: 83, l: 36 },
];
const champagneCandidates = [
  { name: 'champ-40-40-42', h: 40, s: 40, l: 42 },
  { name: 'champ-40-35-42', h: 40, s: 35, l: 42 },
  { name: 'champ-38-35-42', h: 38, s: 35, l: 42 },
  { name: 'champ-40-30-42', h: 40, s: 30, l: 42 },
  { name: 'champ-40-35-45', h: 40, s: 35, l: 45 },
  { name: 'champ-40-30-45', h: 40, s: 30, l: 45 },
  { name: 'champ-40-35-40', h: 40, s: 35, l: 40 },
];
console.log('accent candidates:');
accentCandidates.forEach((c) => {
  const rgb = hslToRgb(c.h, c.s, c.l);
  const bg10 = mix(white, rgb, 0.1);
  console.log(`${c.name} hsl(${c.h} ${c.s}% ${c.l}%) white:${contrast(rgb, white)} bg10:${contrast(rgb, bg10)}`);
});
console.log('\nchampagne candidates:');
champagneCandidates.forEach((c) => {
  const rgb = hslToRgb(c.h, c.s, c.l);
  const bg10 = mix(white, rgb, 0.1);
  console.log(`${c.name} hsl(${c.h} ${c.s}% ${c.l}%) white:${contrast(rgb, white)} bg10:${contrast(rgb, bg10)}`);
});
