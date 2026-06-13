import { useEffect, useRef, useState } from 'react';
import { initLogoIntro } from '../lib/logoIntro';

export function Curtain({ onReady, onRemoved }) {
  const containerRef = useRef(null);
  const curtainRef = useRef(null);
  const startedRef = useRef(false);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const finishIntro = () => {
      setTimeout(() => {
        setDone(true);
        onReady?.();
      }, 280);
    };

    if (reduced) {
      onReady?.();
      setRemoved(true);
      onRemoved?.();
      return;
    }

    const container = containerRef.current;
    if (!container) {
      setTimeout(finishIntro, 900);
      return;
    }

    const intro = initLogoIntro(container, { onComplete: finishIntro });
    intro.ready.catch(() => finishIntro());
  }, [onReady, onRemoved]);

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
    <div
      ref={curtainRef}
      className={`curtain${done ? ' is-done' : ''}`}
      aria-hidden="true"
    >
      <div id="logo-intro-curtain" ref={containerRef} />
    </div>
  );
}
