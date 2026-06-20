import { COOKIE_CONSENT_KEY } from './storageKeys';

export function getConsent() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setConsent(granted) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, granted ? 'granted' : 'denied');
  } catch {
    /* ignore */
  }
}

export function hasAnalyticsConsent() {
  return getConsent() === 'granted';
}
