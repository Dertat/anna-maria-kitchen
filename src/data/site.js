export const SITE = {
  url: import.meta.env.VITE_SITE_URL || 'https://annamariakitchen.rs',
  name: 'Anna-Maria Kitchen',
  ogImage: '/images/og.jpg',
  address: {
    street: 'Prvomajska 57',
    postalCode: '11000',
    locality: 'Belgrade',
    country: 'RS',
  },
  geo: {
    latitude: 44.8154,
    longitude: 20.4182,
  },
  priceRange: 'RSD 2000+',
  openingHours: ['Mo-Sa 08:00-20:00'],
};

export function siteAsset(path) {
  return `${SITE.url}${path}`;
}

export const LINKS = {
  instagram: 'https://www.instagram.com/anna_maria.kitchen/',
  instagramUsername: 'anna_maria.kitchen',
  telegram: 'https://t.me/anna_maria_belgrade',
  telegramUsername: 'anna_maria_belgrade',
};

export function telegramOrderUrl(text) {
  return `${LINKS.telegram}?text=${encodeURIComponent(text)}`;
}
