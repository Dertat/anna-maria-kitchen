import { useEffect } from 'react';
import { isAnalyticsEnabled, trackSectionView } from '@/lib/analytics';

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
    gtag('config', id, {
      send_page_view: true,
      anonymize_ip: true,
    });
  }, []);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const trackFromHash = () => {
      const sectionId = window.location.hash.replace(/^#/, '');
      if (sectionId) trackSectionView(sectionId);
    };

    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const sectionId = anchor.getAttribute('href')?.slice(1);
      if (sectionId) trackSectionView(sectionId);
    };

    const onOutbound = (e) => {
      const link = e.target.closest('a[href^="http"]');
      if (!link || link.hostname === window.location.hostname) return;
      if (typeof window.gtag !== 'function') return;
      window.gtag('event', 'click', {
        event_category: 'outbound',
        event_label: link.hostname,
        link_url: link.href,
        transport_type: 'beacon',
      });
    };

    trackFromHash();
    document.addEventListener('click', onClick);
    document.addEventListener('click', onOutbound);
    window.addEventListener('hashchange', trackFromHash);

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('click', onOutbound);
      window.removeEventListener('hashchange', trackFromHash);
    };
  }, []);

  return null;
}
