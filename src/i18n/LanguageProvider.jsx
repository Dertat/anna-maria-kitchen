import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en';
import ru from './locales/ru';
import sr from './locales/sr';

export const LOCALES = {
  ru: { label: 'RU', messages: ru },
  en: { label: 'EN', messages: en },
  sr: { label: 'SR', messages: sr },
};

const STORAGE_KEY = 'anna-maria-lang';
const SUPPORTED = Object.keys(LOCALES);

function detectLocale() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;

  const browser = navigator.language.slice(0, 2).toLowerCase();
  if (SUPPORTED.includes(browser)) return browser;

  return 'ru';
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function interpolate(template, vars = {}) {
  if (typeof template !== 'string') return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ''));
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale);

  const messages = LOCALES[locale].messages;

  const setLocale = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = messages.meta.lang;
    document.title = messages.meta.title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', messages.meta.description);
  }, [messages]);

  const t = useCallback(
    (key, vars) => {
      const value = getByPath(messages, key);
      return interpolate(value, vars);
    },
    [messages],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, messages }),
    [locale, setLocale, t, messages],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
