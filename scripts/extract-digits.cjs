// Extrae los contornos de «7» y «6» de Plus Jakarta Sans 800 para la animación de la slide 3.
const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');
const font = opentype.loadSync(path.join(__dirname, '../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff'));
const size = 400, baseline = 330;
const out = {};
for (const ch of ['7', '6']) {
  const g = font.charToGlyph(ch);
  const adv = (g.advanceWidth / font.unitsPerEm) * size;
  const p = g.getPath((300 - adv) / 2, baseline, size);
  // Separa subtrazos (el 6 tiene contorno exterior + hueco).
  const d = p.toPathData(2);
  const subs = d.split(/(?=M)/).map(s => s.trim()).filter(Boolean);
  out[ch] = subs;
}
const ts = `// Generado por scripts/extract-digits.cjs — no editar a mano.\n// viewBox 0 0 300 400\nexport const digitPaths = ${JSON.stringify(out, null, 2)} as const;\n`;
fs.writeFileSync(path.join(__dirname, '../src/components/digitPaths.ts'), ts);
console.log(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.map(s => s.length)])));
