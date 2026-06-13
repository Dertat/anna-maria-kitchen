import { useEffect } from 'react';
import { LINKS, SITE, siteAsset } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageProvider';

export function JsonLd() {
  const { messages } = useLanguage();

  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FoodEstablishment',
      name: SITE.name,
      url: SITE.url,
      image: siteAsset(SITE.ogImage),
      description: messages.meta.description,
      servesCuisine: ['Russian', 'European', 'Homemade'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Belgrade',
        addressCountry: 'RS',
      },
      sameAs: [LINKS.instagram, LINKS.telegram],
    };

    let el = document.getElementById('json-ld-local-business');
    if (!el) {
      el = document.createElement('script');
      el.id = 'json-ld-local-business';
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }, [messages]);

  return null;
}
