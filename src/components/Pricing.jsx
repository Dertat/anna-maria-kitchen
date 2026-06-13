import { Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PRICING_PLANS, formatRsd, planTotal } from '@/data/pricing';
import { useLanguage } from '@/i18n/LanguageProvider';
import { trackEvent } from '@/lib/analytics';
import { presetContactService } from '@/lib/storageKeys';

export function Pricing() {
  const { t, messages } = useLanguage();

  const plans = PRICING_PLANS.map((pricePlan) => {
    const localePlan = messages.pricing.plans.find((p) => p.days === pricePlan.days);
    return { ...localePlan, ...pricePlan };
  });

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

        <ScrollReveal stagger className="mx-auto mt-14 grid max-w-4xl items-stretch gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.days}
              className={`flex h-full flex-col rounded-premium border p-8 ${
                plan.popular
                  ? 'border-brand bg-brand text-brand-fg shadow-2xl shadow-black/20'
                  : 'border-border bg-card'
              }`}
            >
              <div className="mb-4 flex min-h-7 items-start">
                {plan.popular ? (
                  <span className="w-fit rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent-foreground">
                    {t('pricing.popular')}
                  </span>
                ) : (
                  <span
                    className="invisible w-fit rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider"
                    aria-hidden
                  >
                    {t('pricing.popular')}
                  </span>
                )}
              </div>
              <h3
                className={`font-serif text-4xl font-semibold leading-none ${
                  plan.popular ? 'text-brand-fg' : 'text-primary'
                }`}
              >
                {plan.label}
              </h3>
              <p
                className={`mt-3 font-serif text-xl font-medium ${
                  plan.popular ? 'text-brand-fg/90' : 'text-primary/80'
                }`}
              >
                {t('pricing.perDay', { price: plan.pricePerDay })}
              </p>
              <p
                className={`mt-1 text-sm ${
                  plan.popular ? 'text-brand-fg/70' : 'text-muted-foreground'
                }`}
              >
                {t('pricing.total', { total: formatRsd(planTotal(plan.days, plan.pricePerDay)) })}
              </p>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  plan.popular ? 'text-brand-fg/70' : 'text-muted-foreground'
                }`}
              >
                {plan.desc}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3.5">
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
                onClick={() => {
                  presetContactService(plan.days);
                  trackEvent('select_plan', {
                    plan_days: plan.days,
                    price_per_day: plan.pricePerDay,
                  });
                }}
                className={buttonVariants({
                  variant: 'accent',
                  size: 'lg',
                  className: 'mt-8 w-full shrink-0 rounded-full',
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
