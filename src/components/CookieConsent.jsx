import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageProvider';
import { getConsent, hasAnalyticsConsent, setConsent } from '@/lib/consent';
import { loadGoogleTags } from '@/lib/googleTags';

export function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const status = getConsent();
    if (status === 'granted') {
      loadGoogleTags();
      return;
    }
    if (status === null) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    setConsent(true);
    loadGoogleTags();
    setVisible(false);
  };

  const decline = () => {
    setConsent(false);
    setVisible(false);
  };

  const openPrivacy = () => {
    window.dispatchEvent(new Event('open-privacy'));
  };

  if (!visible || hasAnalyticsConsent()) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-card/95 p-4 shadow-lg backdrop-blur-md sm:p-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p id="cookie-consent-title" className="font-medium text-primary">
            {t('cookies.title')}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t('cookies.text')}{' '}
            <button
              type="button"
              onClick={openPrivacy}
              className="underline underline-offset-2 hover:text-primary"
            >
              {t('cookies.privacyLink')}
            </button>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={decline}>
            {t('cookies.decline')}
          </Button>
          <Button type="button" onClick={accept}>
            {t('cookies.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
