import { useCallback, useEffect, useRef, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageProvider';
import { INTRO_SEEN_KEY } from '@/lib/storageKeys';
import { initLogoIntro } from '../lib/logoIntro';

function markIntroSeen() {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function Curtain({ onReady, onRemoved }) {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const curtainRef = useRef(null);
  const introRef = useRef(null);
  const startedRef = useRef(false);
  const skippingRef = useRef(false);
  const finishedRef = useRef(false);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  const finishIntro = useCallback(
    (immediate = false) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      markIntroSeen();
      const delay = immediate ? 0 : 280;
      setTimeout(() => {
        setDone(true);
        onReady?.();
      }, delay);
    },
    [onReady],
  );

  const handleSkip = useCallback(() => {
    if (skippingRef.current || done || removed) return;
    skippingRef.current = true;
    introRef.current?.skip();
    finishIntro(true);
  }, [done, removed, finishIntro]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      markIntroSeen();
      onReady?.();
      setRemoved(true);
      onRemoved?.();
      return;
    }

    const container = containerRef.current;
    if (!container) {
      const timer = setTimeout(() => finishIntro(), 900);
      return () => clearTimeout(timer);
    }

    const intro = initLogoIntro(container, { onComplete: () => finishIntro() });
    introRef.current = intro;
    intro.ready.catch(() => finishIntro());

    const safetyTimer = setTimeout(() => finishIntro(), 5000);
    return () => clearTimeout(safetyTimer);
  }, [onReady, onRemoved, finishIntro]);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!done || !curtain) return;

    const onEnd = () => {
      setRemoved(true);
      onRemoved?.();
    };
    curtain.addEventListener('transitionend', onEnd, { once: true });
    return () => curtain.removeEventListener('transitionend', onEnd);
  }, [done, onRemoved]);

  if (removed) return null;

  return (
    <div ref={curtainRef} className={`curtain${done ? ' is-done' : ''}`}>
      {!done && (
        <button
          type="button"
          onClick={handleSkip}
          className={buttonVariants({
            variant: 'outline',
            className:
              'curtain__skip absolute top-6 right-6 z-10 rounded-full border-border/80 bg-background/80 px-5 backdrop-blur-sm',
          })}
        >
          {t('intro.skip')}
        </button>
      )}
      <div id="logo-intro-curtain" ref={containerRef} aria-hidden={done} />
    </div>
  );
}
