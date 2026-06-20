import { useCallback, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LINKS } from '@/data/site';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLanguage } from '@/i18n/LanguageProvider';

const navKeys = [
  { key: 'nav.menu', href: '#menu' },
  { key: 'nav.pricing', href: '#pricing' },
  { key: 'nav.gallery', href: '#gallery' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.steps', href: '#steps' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useFocusTrap(menuPanelRef, open, {
    onEscape: closeMenu,
    returnFocusRef: menuButtonRef,
  });

  return (
    <header className="site-header sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex flex-col leading-none">
          <span className="font-serif text-xl font-semibold tracking-tight text-primary">
            Anna-Maria
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Kitchen
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label={t('nav.menuAria')}>
          {navKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'accent', className: 'rounded-full px-5' })}
          >
            {t('nav.telegram')}
          </a>
          <a href="#contact" className={buttonVariants({ className: 'rounded-full px-6' })}>
            {t('nav.order')}
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={t('nav.menuAria')}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={menuPanelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menuAria')}
          className="border-t border-border/60 bg-background md:hidden overflow-visible"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {t(link.key)}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className={buttonVariants({ variant: 'accent', className: 'rounded-full' })}
              >
                {t('nav.telegram')}
              </a>
              <a
                href="#contact"
                onClick={closeMenu}
                className={buttonVariants({ className: 'rounded-full' })}
              >
                {t('nav.order')}
              </a>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
