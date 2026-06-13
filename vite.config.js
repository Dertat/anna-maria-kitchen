import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function injectGoogleAnalytics() {
  return {
    name: 'inject-google-analytics',
    transformIndexHtml(html) {
      const id = process.env.VITE_GA_ID;
      if (!id) return html;

      const snippet = `
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${id}', {
        anonymize_ip: true,
        send_page_view: true,
        debug_mode: new URLSearchParams(location.search).has('ga_debug'),
      });
    </script>`;

      return html.replace('</head>', `${snippet}\n  </head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), injectGoogleAnalytics()],
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
