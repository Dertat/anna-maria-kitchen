const GA_ID = import.meta.env.VITE_GA_ID || 'G-D1SNVZYBNF';
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-18236270443';
const GOOGLE_ADS_LEAD_LABEL = import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL || 'PwViCOjom8IcEOvO3fdD';

export function isAnalyticsEnabled() {
  return Boolean(GA_ID && typeof window !== 'undefined');
}

export function isGoogleAdsEnabled() {
  return Boolean(GOOGLE_ADS_ID && typeof window !== 'undefined');
}

export function getGoogleAdsLeadSendTo() {
  if (!GOOGLE_ADS_ID || !GOOGLE_ADS_LEAD_LABEL) return null;
  return `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`;
}

export function trackEvent(name, params = {}) {
  if (typeof window.gtag !== 'function') return;
  if (!isAnalyticsEnabled() && !isGoogleAdsEnabled()) return;
  window.gtag('event', name, params);
}

export function trackGoogleAdsLeadConversion(params = {}) {
  const sendTo = getGoogleAdsLeadSendTo();
  if (!sendTo || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: sendTo,
    ...params,
  });
}

export function trackSectionView(sectionId) {
  if (!sectionId || !isAnalyticsEnabled() || typeof window.gtag !== 'function') return;

  const path = `/#${sectionId}`;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: sectionId,
  });
  trackEvent('section_view', { section_id: sectionId });
}

export function trackOutboundLink(url, label) {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label,
    link_url: url,
  });
}
