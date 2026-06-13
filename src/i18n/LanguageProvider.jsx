import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SITE } from '@/data/site';
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
const HREFLANG_MAP = { ru: 'ru', en: 'en', sr: 'sr' };

function detectLocale() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;

  const browser = navigator.language.slice(0, 2).toLowerCase();
  if (SUPPORTED.includes(browser)) return browser;

  return 'ru';
}

function setMetaName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function setHreflangAlternates(url) {
  document.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove());

  for (const locale of SUPPORTED) {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = HREFLANG_MAP[locale];
    link.href = url;
    link.setAttribute('data-hreflang', '1');
    document.head.appendChild(link);
  }

  const fallback = document.createElement('link');
  fallback.rel = 'alternate';
  fallback.hreflang = 'x-default';
  fallback.href = url;
  fallback.setAttribute('data-hreflang', '1');
  document.head.appendChild(fallback);
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

    setMetaName('description', messages.meta.description);
    setMetaProperty('og:title', messages.meta.title);
    setMetaProperty('og:description', messages.meta.description);
    setMetaProperty('og:url', SITE.url);
    setMetaProperty('og:image', `${SITE.url}/images/hero-table.webp`);
    setMetaProperty('og:locale', messages.meta.ogLocale);
    setMetaName('twitter:title', messages.meta.title);
    setMetaName('twitter:description', messages.meta.description);
    setMetaName('twitter:image', `${SITE.url}/images/hero-table.webp`);
    setCanonical(SITE.url);
    setHreflangAlternates(SITE.url);
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
