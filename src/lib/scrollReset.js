export function resetScrollOnReload() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const navEntry = performance.getEntriesByType('navigation')[0];
  const isReload = navEntry?.type === 'reload';

  if (!isReload) return;

  window.scrollTo(0, 0);

  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}
