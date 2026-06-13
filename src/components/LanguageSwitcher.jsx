import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { LOCALES, useLanguage } from '@/i18n/LanguageProvider';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const LOCALE_NAMES = {
  ru: 'Русский',
  en: 'English',
  sr: 'Srpski',
};

export function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

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
  }, [open]);

  const selectLocale = (code) => {
    setLocale(code);
    trackEvent('language_change', { language: code });
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn('relative w-fit shrink-0', className)}>
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
          className={cn('size-3.5 shrink-0 opacity-70 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute left-0 top-full z-[60] mt-2 w-44 overflow-hidden rounded-soft border border-border bg-card py-1 shadow-lg"
        >
          {Object.entries(LOCALES).map(([code, { label }]) => {
            const isActive = locale === code;

            return (
              <li key={code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => selectLocale(code)}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs transition-colors',
                    isActive
                      ? 'bg-secondary text-primary'
                      : 'text-foreground/80 hover:bg-secondary hover:text-primary',
                  )}
                >
                  <span className="w-6 font-semibold tracking-wide">{label}</span>
                  <span className="flex-1 text-muted-foreground">{LOCALE_NAMES[code]}</span>
                  {isActive && <Check className="size-3.5 shrink-0" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
