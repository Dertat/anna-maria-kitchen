import { buttonVariants } from '@/components/ui/button';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/i18n/LanguageProvider';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <ScrollReveal className="flex flex-col gap-6" stagger>
          <h1 className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className={buttonVariants({ size: 'lg', className: 'rounded-full px-8' })}
            >
              {t('hero.ctaOrder')}
            </a>
            <a
              href="#menu"
              className={buttonVariants({
                size: 'lg',
                variant: 'accent',
                className: 'rounded-full px-8',
              })}
            >
              {t('hero.ctaMenu')}
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-8 border-t border-border pt-6">
            <div>
              <p className="font-serif text-3xl font-semibold text-primary">2–18</p>
              <p className="text-sm text-muted-foreground">{t('hero.statDays')}</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-primary">2</p>
              <p className="text-sm text-muted-foreground">{t('hero.statTrial')}</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">{t('hero.statProduction')}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-premium border border-border shadow-2xl shadow-primary/10">
            <OptimizedImage
              src="/images/hero-table.webp"
              alt={t('hero.imageAlt')}
              className="size-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-premium border border-border bg-card px-6 py-4 shadow-xl sm:block">
            <p className="font-serif text-lg font-semibold text-primary">{t('hero.cardTitle')}</p>
            <p className="text-sm text-muted-foreground">{t('hero.cardText')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
