import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageProvider';

export function PrivacyPolicy() {
  const { t, messages } = useLanguage();
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('open-privacy', onOpen);
    return () => window.removeEventListener('open-privacy', onOpen);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="privacy-dialog fixed inset-0 z-[110] m-auto max-h-[85vh] w-[min(42rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-premium border border-border bg-card p-0 text-foreground shadow-xl backdrop:bg-black/50 open:flex open:flex-col"
      onClose={() => setOpen(false)}
    >
      <div className="border-b border-border px-6 py-5">
        <h2 className="font-serif text-2xl font-semibold text-primary">{t('privacy.title')}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('privacy.updated')}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
          {messages.privacy.sections.map((section) => (
            <section key={section.heading}>
              <h3 className="mb-2 font-medium text-primary">{section.heading}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
      <div className="border-t border-border px-6 py-4">
        <Button type="button" onClick={() => setOpen(false)}>
          {t('privacy.close')}
        </Button>
      </div>
    </dialog>
  );
}
