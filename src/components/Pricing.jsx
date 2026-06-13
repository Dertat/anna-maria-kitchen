import { Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/i18n/LanguageProvider';

export function Pricing() {
  const { t, messages } = useLanguage();

  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {t('pricing.eyebrow')}
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-primary sm:text-5xl">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {t('pricing.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {messages.pricing.plans.map((plan) => (
            <div
              key={plan.days}
              className={`flex flex-col rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-brand bg-brand text-brand-fg shadow-2xl shadow-black/20 lg:-mt-4 lg:mb-4'
                  : 'border-border bg-card'
              }`}
            >
              {plan.popular && (
                <span className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent-foreground">
                  {t('pricing.popular')}
                </span>
              )}
              <h3
                className={`font-serif text-2xl font-semibold ${
                  plan.popular ? 'text-brand-fg' : 'text-primary'
                }`}
              >
                {t('pricing.days', { count: plan.days })}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  plan.popular ? 'text-brand-fg/70' : 'text-muted-foreground'
                }`}
              >
                {plan.desc}
              </p>
              <ul className="mt-8 flex flex-col gap-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className={plan.popular ? 'text-brand-fg/90' : 'text-foreground/80'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={buttonVariants({
                  variant: plan.popular ? 'default' : 'outline',
                  className: `mt-8 rounded-full ${
                    plan.popular ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''
                  }`,
                })}
              >
                {t('pricing.order')}
              </a>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
