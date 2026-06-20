import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcPath = path.join(root, 'public/images/hero-table.webp');
const outDir = path.join(root, 'public/images');

const WIDTHS = [640, 960, 1400];

for (const width of WIDTHS) {
  const outPath = path.join(outDir, `hero-table-${width}.webp`);
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: width <= 1024 })
    .webp({ quality: 82, effort: 4 })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  const size = (await import('fs')).statSync(outPath).size;
  console.log(`Created ${path.basename(outPath)} (${meta.width}x${meta.height}, ${size} bytes)`);
}
