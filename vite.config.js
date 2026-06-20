import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const DEFAULT_SITE_URL = 'https://annamariakitchen.rs';
const DEFAULT_GA_ID = 'G-D1SNVZYBNF';
const LINKS = {
  instagram: 'https://www.instagram.com/anna_maria.kitchen/',
  telegram: 'https://t.me/anna_maria_belgrade',
};

function siteUrlFromEnv() {
  return (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
}

function buildJsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': ['FoodEstablishment', 'LocalBusiness'],
    name: 'Anna-Maria Kitchen',
    url: `${siteUrl}/`,
    image: `${siteUrl}/images/og.jpg`,
    description:
      'Доставка готовой еды в Белграде. Рационы на 2, 6, 12 и 18 дней — от 2000 RSD/день. Заказ на сайте или в Telegram.',
    servesCuisine: ['Russian', 'European', 'Homemade'],
    priceRange: 'RSD 2000+',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Prvomajska 57',
      postalCode: '11000',
      addressLocality: 'Belgrade',
      addressCountry: 'RS',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.8154,
      longitude: 20.4182,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: LINKS.telegram,
      availableLanguage: ['Russian', 'English', 'Serbian'],
    },
    sameAs: [LINKS.instagram, LINKS.telegram],
  };
}

function injectSiteMeta() {
  const siteUrl = siteUrlFromEnv();

  return {
    name: 'inject-site-meta',
    transformIndexHtml(html) {
      const jsonLd = `<script type="application/ld+json">${JSON.stringify(buildJsonLd(siteUrl))}</script>`;
      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replace('</head>', `    ${jsonLd}\n  </head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), injectSiteMeta()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    strictPort: true,
    open: true,
  },
  preview: {
    port: 8080,
    strictPort: true,
    open: true,
  },
});
