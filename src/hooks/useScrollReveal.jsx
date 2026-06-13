import { createContext, useContext, useEffect, useRef } from 'react';

const ScrollRevealContext = createContext(true);

export function ScrollRevealProvider({ enabled, children }) {
  return (
    <ScrollRevealContext.Provider value={enabled}>{children}</ScrollRevealContext.Provider>
  );
}

function useScrollRevealEnabled() {
  return useContext(ScrollRevealContext);
}

export function useScrollReveal() {
  const ref = useRef(null);
  const enabled = useScrollRevealEnabled();

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  return ref;
}
