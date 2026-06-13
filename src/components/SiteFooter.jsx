import { LINKS } from '@/data/site';
import { PRICING_PLANS, formatRsd } from '@/data/pricing';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TelegramIcon } from '@/components/icons/TelegramIcon';
import { useLanguage } from '@/i18n/LanguageProvider';
import { presetContactService } from '@/lib/storageKeys';
import { Instagram } from 'lucide-react';

const FOOTER_PLAN_LABELS = {
  2: 'footer.planTrial',
  6: 'footer.plan6',
  12: 'footer.plan12',
  18: 'footer.plan18',
};

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-secondary/50">
      <ScrollReveal className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-semibold tracking-tight text-primary">
                Anna-Maria
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Kitchen
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex gap-4 text-sm">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Instagram className="size-4 shrink-0" />
                Instagram
              </a>
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <TelegramIcon className="size-4 shrink-0" />
                Telegram
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                {t('footer.sections')}
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                <li><a href="#menu" className="transition-colors hover:text-primary">{t('nav.menu')}</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-primary">{t('nav.pricing')}</a></li>
                <li><a href="#gallery" className="transition-colors hover:text-primary">{t('nav.gallery')}</a></li>
                <li><a href="#about" className="transition-colors hover:text-primary">{t('nav.about')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                {t('footer.plans')}
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                {PRICING_PLANS.map((plan) => (
                  <li key={plan.days}>
                    <a
                      href="#contact"
                      onClick={() => presetContactService(plan.days)}
                      className="transition-colors hover:text-primary"
                    >
                      {t(FOOTER_PLAN_LABELS[plan.days])}
                      {' · '}
                      {formatRsd(plan.pricePerDay)} RSD/{t('footer.perDayShort')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                {t('footer.contacts')}
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href={LINKS.instagram}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Instagram className="size-4 shrink-0" />
                    @{LINKS.instagramUsername}
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.telegram}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <TelegramIcon className="size-4 shrink-0" />
                    @{LINKS.telegramUsername}
                  </a>
                </li>
                <li>{t('footer.city')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </ScrollReveal>
    </footer>
  );
}
