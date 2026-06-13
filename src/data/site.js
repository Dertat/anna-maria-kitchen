export const SITE = {
  url: import.meta.env.VITE_SITE_URL || 'https://anna-maria-kitchen.onrender.com',
  name: 'Anna-Maria Kitchen',
};

export const LINKS = {
  instagram: 'https://www.instagram.com/anna_maria.kitchen/',
  instagramUsername: 'anna_maria.kitchen',
  telegram: 'https://t.me/anna_maria_belgrade',
  telegramUsername: 'anna_maria_belgrade',
};

export function telegramOrderUrl(text) {
  return `${LINKS.telegram}?text=${encodeURIComponent(text)}`;
}
