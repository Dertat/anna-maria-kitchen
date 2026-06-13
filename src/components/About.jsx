import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/i18n/LanguageProvider';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <ScrollReveal variant="left" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-xl">
            <img
              src="/images/about-chef.png"
              alt={t('about.imageAlt')}
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal variant="right" className="flex flex-col gap-6">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {t('about.eyebrow')}
          </span>
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-primary sm:text-5xl">
            {t('about.title')}
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">{t('about.p1')}</p>
          <p className="text-pretty leading-relaxed text-muted-foreground">{t('about.p2')}</p>
          <div className="mt-2 grid grid-cols-2 gap-6 border-t border-border pt-6">
            <div>
              <p className="font-serif text-lg font-semibold text-primary">{t('about.feature1Title')}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{t('about.feature1Text')}</p>
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-primary">{t('about.feature2Title')}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{t('about.feature2Text')}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
