import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { LOCALES, useLanguage } from '@/i18n/LanguageProvider';
import { trackEvent } from '@/lib/analytics';

const LOCALE_NAMES = {
  ru: 'Русский',
  en: 'English',
  sr: 'Srpski',
};

function LocaleOption({ code, label, isActive, onSelect, compact = false }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isActive}
      onClick={() => onSelect(code)}
      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors ${
        isActive
          ? 'bg-secondary text-primary'
          : 'text-foreground/80 hover:bg-secondary hover:text-primary'
      }`}
    >
      {!compact && <span className="w-6 font-semibold tracking-wide">{label}</span>}
      <span className={compact ? 'font-medium' : 'flex-1 text-muted-foreground'}>
        {LOCALE_NAMES[code]}
      </span>
      {isActive && <Check className="ml-auto size-3.5 shrink-0" aria-hidden="true" />}
    </button>
  );
}

export function LanguageSwitcher({ className = '', layout = 'dropdown' }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open || layout !== 'dropdown') return undefined;

    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, layout]);

  const selectLocale = (code) => {
    setLocale(code);
    trackEvent('language_change', { language: code });
    setOpen(false);
  };

  if (layout === 'inline') {
    return (
      <div
        className={`overflow-hidden rounded-soft border border-border bg-card ${className}`}
        role="listbox"
        aria-label="Language"
      >
        {Object.entries(LOCALES).map(([code, { label }]) => (
          <LocaleOption
            key={code}
            code={code}
            label={label}
            isActive={locale === code}
            onSelect={selectLocale}
            compact
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-semibold tracking-wide text-foreground transition-colors hover:text-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
      >
        {LOCALES[locale].label}
        <ChevronDown
          className={`size-3.5 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute right-0 z-[60] mt-2 w-44 overflow-hidden rounded-soft border border-border bg-card py-1 shadow-lg"
        >
          {Object.entries(LOCALES).map(([code, { label }]) => (
            <li key={code} role="presentation">
              <LocaleOption
                code={code}
                label={label}
                isActive={locale === code}
                onSelect={selectLocale}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
