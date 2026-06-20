import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = (process.env.VITE_SITE_URL || 'https://annamariakitchen.rs').replace(/\/$/, '');
const lastmod = new Date().toISOString().slice(0, 10);
const locales = ['ru', 'en', 'sr'];

const alternates = [
  ...locales.map(
    (locale) =>
      `    <xhtml:link rel="alternate" hreflang="${locale}" href="${siteUrl}/" />`,
  ),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`,
].join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${alternates}
  </url>
</urlset>
`;

const outPath = path.join(root, 'public/sitemap.xml');
writeFileSync(outPath, xml);
console.log(`Wrote ${outPath} (lastmod: ${lastmod})`);
