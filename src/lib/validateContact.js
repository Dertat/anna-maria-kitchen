const TELEGRAM_HANDLE = /^@[\w]{4,31}$/;
const TELEGRAM_URL = /^https?:\/\/(t\.me|telegram\.me)\/[\w]{4,32}\/?$/i;

export function isValidContact(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;

  if (TELEGRAM_HANDLE.test(trimmed) || TELEGRAM_URL.test(trimmed)) {
    return true;
  }

  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}
