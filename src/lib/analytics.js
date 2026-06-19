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

/** Fire lead + conversion before leaving the page (Telegram redirect). */
export function trackLeadSubmission({ service, method = 'telegram' }, callback) {
  if (typeof window.gtag !== 'function') {
    callback?.();
    return;
  }

  const debug = new URLSearchParams(window.location.search).has('ga_debug')
    || new URLSearchParams(window.location.search).has('debug_mode');

  if (debug) {
    // eslint-disable-next-line no-console
    console.info('[analytics] firing generate_lead', { service, method });
  }

  window.gtag('event', 'generate_lead', {
    service,
    method,
    transport_type: 'beacon',
  });

  const sendTo = getGoogleAdsLeadSendTo();
  if (sendTo) {
    window.gtag('event', 'conversion', {
      send_to: sendTo,
      value: 1.0,
      currency: 'RSD',
      transport_type: 'beacon',
    });
  }

  // Brief pause so beacon reaches GA4/DebugView before Telegram opens
  window.setTimeout(() => callback?.(), 600);
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
