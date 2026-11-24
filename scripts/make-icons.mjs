// Builds the portfolio's logo files from one drawing: the Keystone A (2026-11-24).
// Keystone: an open A with no crossbar; a red keystone sits where the bar would be, the one
// piece that holds the arch together.
// Usage: node scripts/make-icons.mjs [previewDir]
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const INK = "#eef3ef";
const RED = "#ef4444";
const TILE = "#08110c";

/** The glyph on a 64 x 64 grid. */
export const glyph = (ink = INK) => `
  <path d="M12 54C21 39 28 24 32 9C36 24 43 39 52 54" fill="none" stroke="${ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M32 33 37 40 32 47 27 40Z" fill="${RED}"/>`;

/** The glyph centred on a dark rounded tile; `scale` leaves room for maskable safe zones. */
const tile = (size, { scale = 0.78, radius = 14, bg = TILE } = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="${bg}"/>
  <rect x="0.5" y="0.5" width="63" height="63" rx="${radius - 0.5}" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>
  <g transform="translate(32 32) scale(${scale}) translate(-32 -31.5)">${glyph()}</g>
</svg>`;

const png = (svg, file) => sharp(Buffer.from(svg)).png().toFile(file);

await Promise.all([
  png(tile(256), "src/app/icon.png"),
  png(tile(180, { radius: 0 }), "src/app/apple-icon.png"),
  png(tile(1024), "public/logo.png"),
  png(tile(192, { scale: 0.6, radius: 0 }), "public/Pwa-logos/new-icons/manifest-icon-192.maskable.png"),
  png(tile(512, { scale: 0.6, radius: 0 }), "public/Pwa-logos/new-icons/manifest-icon-512.maskable.png"),
]);

// Optional preview sheet: the icon at real sizes and the header lockup.
const dir = process.argv[2];
if (dir) {
  mkdirSync(dir, { recursive: true });
  const sizes = [512, 128, 64, 32, 16];
  const icons = await Promise.all(sizes.map((s) => sharp(Buffer.from(tile(s))).png().toBuffer()));
  const lockup = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="140" viewBox="0 0 760 140">
    <rect width="760" height="140" fill="${TILE}"/>
    <g transform="translate(40 30) scale(1.25)">${glyph()}</g>
    <text x="140" y="92" font-family="Segoe UI, Arial" font-size="56" font-weight="700" fill="${INK}">AbrarAli S.</text>
  </svg>`;
  let x = 40;
  const comp = sizes.map((s, i) => {
    const c = { input: icons[i], left: x, top: 40 + (512 - s) };
    x += s + 40;
    return c;
  });
  comp.push({ input: await sharp(Buffer.from(lockup)).png().toBuffer(), left: 40, top: 620 });
  await sharp({ create: { width: x, height: 800, channels: 4, background: "#030705" } })
    .composite(comp)
    .png()
    .toFile(`${dir}/logo-preview.png`);
  console.log(`${dir}/logo-preview.png`);
}
