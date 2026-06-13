import { MessageCircle, ClipboardList, Truck } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/i18n/LanguageProvider';

const stepIcons = [MessageCircle, ClipboardList, Truck];

export function Steps() {
  const { t, messages } = useLanguage();

  return (
    <section id="steps" className="bg-brand py-20 text-brand-fg lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-brand-fg/60">
            {t('steps.eyebrow')}
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold sm:text-5xl">
            {t('steps.title')}
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-brand-fg/70">
            {t('steps.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal stagger className="mt-14 grid gap-8 sm:grid-cols-3">
          {messages.steps.items.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={step.title} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-serif text-3xl font-semibold text-brand-fg/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-brand-fg/70">
                  {step.description}
                </p>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
