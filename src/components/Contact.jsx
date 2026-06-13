import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollReveal } from '@/components/ScrollReveal';
import { telegramOrderUrl } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageProvider';
import { trackEvent, trackGoogleAdsLeadConversion } from '@/lib/analytics';
import { consumePresetService } from '@/lib/storageKeys';

export function Contact() {
  const { t, messages } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    contact: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    const applyPreset = () => {
      const preset = consumePresetService();
      if (preset) {
        setForm((prev) => ({ ...prev, service: preset }));
      }
    };

    applyPreset();
    window.addEventListener('hashchange', applyPreset);
    window.addEventListener('contact-preset', applyPreset);
    return () => {
      window.removeEventListener('hashchange', applyPreset);
      window.removeEventListener('contact-preset', applyPreset);
    };
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const serviceLabel =
      messages.contact.serviceOptions.find((opt) => opt.value === form.service)?.label
      ?? form.service;

    const text = [
      t('contact.formGreeting'),
      '',
      `${t('contact.formName')}: ${form.name}`,
      `${t('contact.formContact')}: ${form.contact}`,
      `${t('contact.formService')}: ${serviceLabel}`,
      form.message ? `${t('contact.formMessage')}: ${form.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const trackLead = () => {
      trackEvent('generate_lead', {
        service: form.service,
        method: 'telegram',
      });
      trackGoogleAdsLeadConversion({ value: 1.0, currency: 'RSD' });
    };

    const url = telegramOrderUrl(text);
    const opened = window.open(url, '_blank');

    if (opened) {
      trackLead();
      toast.success(t('contact.toastSuccess'));
      setForm({ name: '', contact: '', service: '', message: '' });
    } else {
      trackLead();
      window.location.href = url;
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 rounded-premium border border-border bg-card p-8 lg:grid-cols-2 lg:gap-16 lg:p-12">
          <ScrollReveal variant="left" className="flex flex-col gap-6">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {t('contact.eyebrow')}
            </span>
            <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-primary sm:text-5xl">
              {t('contact.title')}
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {t('contact.subtitle')}
            </p>

            <p className="text-sm text-muted-foreground">{t('contact.location')}</p>
          </ScrollReveal>

          <ScrollReveal variant="right" as="form" onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">{t('contact.name')}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t('contact.namePlaceholder')}
                  required
                  value={form.name}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact">{t('contact.contact')}</Label>
                <Input
                  id="contact"
                  name="contact"
                  placeholder={t('contact.contactPlaceholder')}
                  required
                  value={form.contact}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="service">{t('contact.service')}</Label>
              <select
                id="service"
                name="service"
                required
                value={form.service}
                onChange={onChange}
                className="h-10 w-full rounded-soft border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {messages.contact.serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message">{t('contact.message')}</Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t('contact.messagePlaceholder')}
                value={form.message}
                onChange={onChange}
              />
            </div>

            <Button type="submit" size="lg" className="mt-2 rounded-full">
              {t('contact.submit')}
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
