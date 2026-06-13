import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    const id = import.meta.env.VITE_GA_ID;
    if (!id || document.getElementById('ga-script')) return;

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id);
  }, []);

  return null;
}
