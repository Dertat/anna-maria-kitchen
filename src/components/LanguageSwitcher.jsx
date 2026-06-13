import { LOCALES, useLanguage } from '@/i18n/LanguageProvider';

export function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-card p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {Object.entries(LOCALES).map(([code, { label }]) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors ${
            locale === code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-primary'
          }`}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
