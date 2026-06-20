import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TelegramIcon } from '@/components/icons/TelegramIcon';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LINKS, telegramOrderUrl } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageProvider';
import { trackLeadSubmission, trackOutboundLink } from '@/lib/analytics';
import { consumePresetService } from '@/lib/storageKeys';
import { isValidContact } from '@/lib/validateContact';

const DEFAULT_SERVICE = '2';

export function Contact() {
  const { t, messages } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    contact: '',
    service: DEFAULT_SERVICE,
    message: '',
  });
  const [contactError, setContactError] = useState('');

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
    if (name === 'contact' && contactError) {
      setContactError('');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isValidContact(form.contact)) {
      setContactError(t('contact.contactInvalid'));
      return;
    }

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

    const url = telegramOrderUrl(text);

    trackLeadSubmission({ service: form.service }, () => {
      const opened = window.open(url, '_blank');
      if (opened) {
        toast.success(t('contact.toastSuccess'));
        setForm({ name: '', contact: '', service: DEFAULT_SERVICE, message: '' });
      } else {
        window.location.href = url;
      }
    });
  };

  const onTelegramDirect = () => {
    trackOutboundLink(LINKS.telegram, 'contact_telegram_direct');
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

            <div className="rounded-soft border border-border bg-secondary/40 p-5">
              <p className="text-sm font-medium text-primary">{t('contact.telegramTitle')}</p>
              <p className="mt-2 font-medium text-foreground">@{LINKS.telegramUsername}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t('contact.telegramHint')}</p>
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onTelegramDirect}
                className={buttonVariants({
                  variant: 'accent',
                  size: 'lg',
                  className: 'mt-4 w-full rounded-full sm:w-auto',
                })}
              >
                <TelegramIcon className="size-4" />
                {t('contact.telegramDirect')}
              </a>
            </div>
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
                  aria-invalid={Boolean(contactError)}
                  value={form.contact}
                  onChange={onChange}
                />
                {contactError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {contactError}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="service">{t('contact.service')}</Label>
              <Select
                id="service"
                name="service"
                required
                value={form.service}
                onChange={onChange}
              >
                {messages.contact.serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
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
