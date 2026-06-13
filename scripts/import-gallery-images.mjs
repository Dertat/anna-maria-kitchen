import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = '/Users/ekaterinanabieva/.cursor/projects/Users-ekaterinanabieva-annamaria/assets';
const parallaxDir = path.join(root, 'public/assets/instagram/parallax');
const galleryDir = path.join(root, 'public/assets/instagram');

const IMAGE_MAP = [
  { file: 'post-03.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_32__5_-65766eb4-e73a-43c4-a229-5f31513e2baa.png' },
  { file: 'post-04.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_33__7_-7292377c-55a3-4758-999c-11f34446c77b.png' },
  { file: 'post-05.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_33__6_-1474c293-60a4-4670-b2c0-e8bc1ae2b5c3.png' },
  { file: 'post-06.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_32__4_-460d10b4-bd45-42b3-ab01-25d460d0feaf.png' },
  { file: 'post-07.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_30__1_-8e1e2cf0-5468-4be7-9146-e5305e83abd5.png' },
  { file: 'post-08.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_31__2_-23281433-acac-4bd8-919b-0c7649d8b527.png' },
  { file: 'post-09.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_32__3_-379b8fcf-9380-44de-9e23-f45293e90361.png' },
  { file: 'post-13.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_33__8_-8eaf9ab7-738c-420d-bb9c-74c6008d2cf0.png' },
  { file: 'post-14.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_33__9_-94f5223d-8511-4181-81b4-6466dc993538.png' },
  { file: 'post-15.webp', src: 'ChatGPT_Image_13____._2026__.__20_54_33__10_-16d23ad5-3ec1-4087-ad13-b3408e87ba03.png' },
  { file: 'post-16.webp', src: 'ChatGPT_Image_13____._2026__.__21_07_21__4_-64bfefad-0456-46b5-8d33-1fe89c43c4f7.png' },
  { file: 'post-17.webp', src: 'ChatGPT_Image_13____._2026__.__21_07_20__2_-c1e67bfb-9433-492e-abda-1bff17d08e16.png' },
  { file: 'post-18.webp', src: 'ChatGPT_Image_13____._2026__.__21_07_18__1_-483ba79d-0ca1-4316-bb05-d1f1c3ee627c.png' },
  { file: 'post-19.webp', src: 'ChatGPT_Image_13____._2026__.__21_07_21__3_-70e892f4-0f16-4832-9e6c-761c392861b6.png' },
  { file: 'post-20.webp', src: 'ChatGPT_Image_13____._2026__.__20_58_26__1_-4716ad46-7d53-48f6-822d-42e8e34dfd23.png' },
  { file: 'post-21.webp', src: 'ChatGPT_Image_13____._2026__.__20_58_26__2_-070a7677-ad29-440c-a258-3b6905da5e33.png' },
];

fs.mkdirSync(parallaxDir, { recursive: true });
fs.mkdirSync(galleryDir, { recursive: true });

for (const { file, src } of IMAGE_MAP) {
  const input = path.join(assetsDir, src);
  const parallaxOut = path.join(parallaxDir, file);
  const galleryOut = path.join(galleryDir, file);

  const pipeline = sharp(input).rotate();

  await pipeline.clone().webp({ quality: 92, effort: 6 }).toFile(parallaxOut);
  await pipeline
    .clone()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(galleryOut);

  const meta = await sharp(parallaxOut).metadata();
  const { size } = fs.statSync(parallaxOut);
  console.log(`${file}: ${meta.width}x${meta.height}, ${Math.round(size / 1024)}KB`);
}

console.log('Gallery parallax images updated.');
