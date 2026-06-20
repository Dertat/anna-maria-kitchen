import { Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/i18n/LanguageProvider';

export function Testimonials() {
  const { t, messages } = useLanguage();

  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {t('testimonials.eyebrow')}
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-primary sm:text-5xl">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {messages.testimonials.items.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-premium border border-border bg-card p-6 lg:p-8"
            >
              <Quote className="size-8 text-brand/40" aria-hidden />
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
                «{item.quote}»
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-medium text-primary">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
