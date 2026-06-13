import { gsap } from 'gsap';

const LAYERS = '/assets/layers/';
const VIEW_BOX = '220 270 760 220';

async function fetchSvgFragment(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  const doc = new DOMParser().parseFromString(await res.text(), 'image/svg+xml');
  return [...doc.documentElement.childNodes]
    .filter((n) => n.nodeType === Node.ELEMENT_NODE)
    .map((n) => n.outerHTML)
    .join('');
}

export function initLogoIntro(container, options = {}) {
  const { autoplay = true, onComplete, staticMode = false } = options;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  container.classList.add('logo-intro');
  container.innerHTML = `
    <svg class="logo-intro__svg logo-intro__svg--flat" viewBox="${VIEW_BOX}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anna-Maria kitchen">
      <g id="layer-title"></g>
      <g id="layer-subtitle"></g>
    </svg>
  `;

  const svg = container.querySelector('.logo-intro__svg');
  const title = svg.querySelector('#layer-title');
  const subtitle = svg.querySelector('#layer-subtitle');

  let animationControl = null;

  function runAnimation() {
    const titleText = title.querySelector('text');
    const subtitleText = subtitle.querySelector('text');

    if (reduced || staticMode) {
      if (titleText) gsap.set(titleText, { opacity: 1 });
      if (subtitleText) gsap.set(subtitleText, { opacity: 1, attr: { 'letter-spacing': 22 } });
      onComplete?.();
      return { play: onComplete };
    }

    if (subtitleText) {
      subtitleText.setAttribute('letter-spacing', '22');
    }

    if (titleText) {
      gsap.set(titleText, { opacity: 0 });
    }
    if (subtitleText) {
      gsap.set(subtitleText, { opacity: 0 });
    }

    const tl = gsap.timeline({
      paused: !autoplay,
      onComplete: () => {
        if (titleText) gsap.set(titleText, { clearProps: 'all' });
        if (subtitleText) gsap.set(subtitleText, { clearProps: 'all' });
        onComplete?.();
      },
    });

    if (titleText) {
      tl.to(titleText, { opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.12);
    }

    if (subtitleText) {
      tl.to(subtitleText, { opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.28);
    }

    return { timeline: tl, play: () => tl.play() };
  }

  const ready = Promise.all([
    fetchSvgFragment(`${LAYERS}layer_anna_maria_flat.svg`).then((html) => { title.innerHTML = html; }),
    fetchSvgFragment(`${LAYERS}layer_kitchen_flat.svg`).then((html) => { subtitle.innerHTML = html; }),
  ]).then(() => {
    svg.querySelectorAll('text').forEach((el) => el.removeAttribute('fill'));
    animationControl = runAnimation();
    return animationControl;
  });

  ready.catch(() => {
    container.innerHTML = `<img src="/assets/logo-flat.png?v=24" alt="Anna-Maria kitchen" class="curtain__logo" width="520" height="520">`;
    onComplete?.();
  });

  return {
    ready,
    skip() {
      animationControl?.timeline?.kill();
      gsap.killTweensOf(container);
    },
  };
}
