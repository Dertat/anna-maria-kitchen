import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = '/Users/ekaterinanabieva/.cursor/projects/Users-ekaterinanabieva-annamaria/assets';
const outDir = path.join(root, 'public/assets/instagram/parallax');

const IMAGE_MAP = [
  { file: 'post-03.webp', src: 'ChatGPT_Image_13____._2026__.__15_30_24-e8b6ae82-2aea-4de4-87c2-7553ad20b148.png' },
  { file: 'post-04.webp', src: 'ChatGPT_Image_13____._2026__.__15_32_18-dcf12d8c-139a-4d86-bf85-a2680950907d.png' },
  { file: 'post-05.webp', src: 'ChatGPT_Image_13____._2026__.__15_31_24-3b7e6d8d-6005-4c6c-9e56-bf9dd3771e82.png' },
  { file: 'post-06.webp', src: 'ChatGPT_Image_13____._2026__.__15_29_27-e4581431-04bc-4d79-b763-6d5e723ae5eb.png' },
  { file: 'post-07.webp', src: 'ChatGPT_Image_13____._2026__.__15_24_49-4063b42b-8d1f-4bcc-b01b-98c29aef3095.png' },
  { file: 'post-08.webp', src: 'ChatGPT_Image_13____._2026__.__15_26_37-df1f8979-ed8d-49d1-a4f6-a873193608bc.png' },
  { file: 'post-09.webp', src: 'ChatGPT_Image_13____._2026__.__15_28_22-4218ae9f-e8fc-4b1e-8901-d57574601d6f.png' },
  { file: 'post-13.webp', src: 'ChatGPT_Image_13____._2026__.__15_37_00-9bca39fd-bce4-45bf-9120-58fa54f7359d.png' },
  { file: 'post-14.webp', src: 'ChatGPT_Image_13____._2026__.__15_44_47-47bcf65d-ca90-4d07-939a-45c99d59e22f.png' },
  { file: 'post-15.webp', src: 'ChatGPT_Image_13____._2026__.__15_45_11-c00c0b68-4660-4813-be9f-93ff40d809fb.png' },
  { file: 'post-16.webp', src: 'ChatGPT_Image_13____._2026__.__15_45_30-0d76d7a9-f767-4a43-aca0-a5a22c62f8d9.png' },
  { file: 'post-17.webp', src: 'ChatGPT_Image_13____._2026__.__15_45_21-f8ede592-89df-4f1a-96a7-71d420198c25.png' },
  { file: 'post-18.webp', src: 'ChatGPT_Image_13____._2026__.__15_54_38__1_-19c0f498-4f3e-4837-a16e-9d131242cf6c.png' },
  { file: 'post-19.webp', src: 'ChatGPT_Image_13____._2026__.__15_54_38__2_-4013e71a-bc0e-450a-a930-1b789a87d849.png' },
  { file: 'post-20.webp', src: 'ChatGPT_Image_13____._2026__.__15_54_39__3_-7705abf1-fbb6-4ca6-9e09-3ef3c70a966c.png' },
  { file: 'post-21.webp', src: 'ChatGPT_Image_13____._2026__.__15_56_32-1ba4471a-4924-417e-babb-d771aace1721.png' },
];

fs.mkdirSync(outDir, { recursive: true });

for (const { file, src } of IMAGE_MAP) {
  const input = path.join(assetsDir, src);
  const output = path.join(outDir, file);

  await sharp(input)
    .webp({ quality: 92, effort: 6 })
    .toFile(output);

  const meta = await sharp(output).metadata();
  const { size } = fs.statSync(output);
  console.log(`${file}: ${meta.width}x${meta.height}, ${Math.round(size / 1024)}KB`);
}

console.log('Gallery parallax images updated.');
