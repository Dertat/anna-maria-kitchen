import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { collapseGalleryTrack } from '@/lib/galleryScroll';

const SHOW_AFTER = 480;

export function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    collapseGalleryTrack();
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('backToTop.label')}
      title={t('backToTop.label')}
      className={`fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lg transition-all duration-300 hover:bg-brand hover:text-brand-fg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
