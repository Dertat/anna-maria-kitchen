const GA_ID = import.meta.env.VITE_GA_ID;

export function isAnalyticsEnabled() {
  return Boolean(GA_ID && typeof window !== 'undefined');
}

export function trackEvent(name, params = {}) {
  if (!isAnalyticsEnabled() || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
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
