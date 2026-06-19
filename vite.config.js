import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function injectSiteMeta() {
  const siteUrl = (process.env.VITE_SITE_URL || 'https://annamariakitchen.rs').replace(/\/$/, '');

  return {
    name: 'inject-site-meta',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl);
    },
  };
}

function injectGoogleTags() {
  const DEFAULT_GA_ID = 'G-D1SNVZYBNF';
  const DEFAULT_ADS_ID = 'AW-18236270443';

  return {
    name: 'inject-google-tags',
    transformIndexHtml(html) {
      const gaId = process.env.VITE_GA_ID || DEFAULT_GA_ID;
      const adsId = process.env.VITE_GOOGLE_ADS_ID || DEFAULT_ADS_ID;

      const primaryId = gaId || adsId;
      const configs = [];

      if (gaId) {
        configs.push(`gtag('config', '${gaId}', {
        anonymize_ip: true,
        send_page_view: true,
        debug_mode: new URLSearchParams(location.search).has('ga_debug')
          || new URLSearchParams(location.search).has('debug_mode'),
      });`);
      }

      if (adsId) {
        configs.push(`gtag('config', '${adsId}');`);
      }

      const snippet = `
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=${primaryId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      ${configs.join('\n      ')}
    </script>`;

      return html.replace('</head>', `${snippet}\n  </head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), injectSiteMeta(), injectGoogleTags()],
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
