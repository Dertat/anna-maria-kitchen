import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useTheme } from '@/theme/ThemeProvider';

export function ThemeSwitcher({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:text-primary ${className}`}
      aria-label={t('theme.toggle')}
      title={isDark ? t('theme.light') : t('theme.dark')}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
