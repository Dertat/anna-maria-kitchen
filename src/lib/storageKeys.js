export const INTRO_SEEN_KEY = 'anna-maria-intro-seen';
export const PRESET_SERVICE_KEY = 'anna-maria-preset-service';

export function presetContactService(days) {
  sessionStorage.setItem(PRESET_SERVICE_KEY, String(days));
  window.dispatchEvent(new Event('contact-preset'));
}

export function consumePresetService() {
  const value = sessionStorage.getItem(PRESET_SERVICE_KEY);
  if (!value) return null;
  sessionStorage.removeItem(PRESET_SERVICE_KEY);
  return value;
}
