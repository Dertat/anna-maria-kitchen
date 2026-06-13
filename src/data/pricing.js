/**
 * Цены рационов — RSD за день.
 * Чем длиннее программа, тем ниже дневная ставка.
 */
export const PRICING_PLANS = [
  { days: 2, pricePerDay: 2600 },
  { days: 6, pricePerDay: 2300 },
  { days: 12, pricePerDay: 2100, popular: true },
  { days: 18, pricePerDay: 2000 },
];

export function formatRsd(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function planTotal(days, pricePerDay) {
  return days * pricePerDay;
}
