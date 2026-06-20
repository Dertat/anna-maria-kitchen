let loaded = false;

export function loadGoogleTags() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;

  const gaId = import.meta.env.VITE_GA_ID || 'G-D1SNVZYBNF';
  const adsId = import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-18236270443';
  const primaryId = gaId || adsId;

  if (!primaryId) return;

  if (!document.querySelector('script[data-google-tags]')) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://www.googletagmanager.com';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`;
    script.dataset.googleTags = 'loader';
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());

  const debug =
    new URLSearchParams(window.location.search).has('ga_debug')
    || new URLSearchParams(window.location.search).has('debug_mode');

  if (gaId) {
    gtag('config', gaId, {
      anonymize_ip: true,
      send_page_view: true,
      debug_mode: debug,
    });
  }

  if (adsId) {
    gtag('config', adsId);
  }
}
