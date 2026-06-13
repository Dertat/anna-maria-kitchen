import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'public/images/og.jpg');
const heroPath = path.join(root, 'public/images/hero-table.webp');

const WIDTH = 1200;
const HEIGHT = 630;
const HERO_WIDTH = 560;
const HERO_LEFT = WIDTH - HERO_WIDTH;

const hero = await sharp(heroPath)
  .resize(HERO_WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
  .toBuffer();

const background = await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 3,
    background: { r: 250, g: 246, b: 241 },
  },
})
  .png()
  .toBuffer();

const overlay = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#faf6f1" stop-opacity="1" />
      <stop offset="100%" stop-color="#faf6f1" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect x="${HERO_LEFT - 120}" y="0" width="120" height="${HEIGHT}" fill="url(#fade)" />
  <rect x="72" y="88" width="56" height="4" fill="#c4a574" rx="2" />
  <text x="72" y="190"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="78"
        font-weight="600"
        fill="#1e3358">Anna-Maria</text>
  <text x="72" y="232"
        font-family="Inter, Arial, sans-serif"
        font-size="18"
        font-weight="500"
        letter-spacing="9"
        fill="#6b7280">KITCHEN</text>
  <text x="72" y="310"
        font-family="Inter, Arial, sans-serif"
        font-size="34"
        font-weight="500"
        fill="#1e3358">Доставка готовой еды</text>
  <text x="72" y="358"
        font-family="Inter, Arial, sans-serif"
        font-size="34"
        font-weight="500"
        fill="#1e3358">Белград</text>
  <text x="72" y="430"
        font-family="Inter, Arial, sans-serif"
        font-size="24"
        fill="#6b7280">Рационы на 2, 6, 12 и 18 дней</text>
  <text x="72" y="468"
        font-family="Inter, Arial, sans-serif"
        font-size="24"
        fill="#6b7280">от 2000 RSD / день</text>
  <rect x="72" y="520" width="250" height="52" rx="26" fill="#1e3358" />
  <text x="197" y="552"
        font-family="Inter, Arial, sans-serif"
        font-size="20"
        font-weight="600"
        fill="#faf6f1"
        text-anchor="middle">Заказать</text>
</svg>
`);

await sharp(background)
  .composite([
    { input: hero, left: HERO_LEFT, top: 0 },
    { input: overlay, left: 0, top: 0 },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(outPath);

const meta = await sharp(outPath).metadata();
console.log(`Created ${outPath} (${meta.width}x${meta.height})`);
