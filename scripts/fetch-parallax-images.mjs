import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const postsPath = path.join(root, 'public/assets/instagram/posts.json');
const outDir = path.join(root, 'public/assets/instagram/parallax');

const { posts } = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const galleryPosts = posts.filter((post) => post.gallery).slice(0, 7);

fs.mkdirSync(outDir, { recursive: true });

for (const post of galleryPosts) {
  const mediaUrl = `https://www.instagram.com/p/${post.shortcode}/media/?size=l`;
  const response = await fetch(mediaUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });

  if (!response.ok) {
    console.error(`Failed ${post.file}: ${response.status}`);
    continue;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const outPath = path.join(outDir, post.file);

  await sharp(buffer)
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  const { size } = fs.statSync(outPath);
  console.log(`${post.file}: ${meta.width}x${meta.height}, ${Math.round(size / 1024)}KB`);
}

console.log(`Done — ${galleryPosts.length} parallax images in ${outDir}`);
