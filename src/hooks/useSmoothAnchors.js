import { useEffect } from 'react';

export function useSmoothAnchors() {
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
