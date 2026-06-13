/**
 * Anna-Maria kitchen — animated logo intro (SVG + GSAP)
 */
const LOGO_SVG_INNER = `
  <g id="logo-fill">
    <circle cx="100" cy="100" r="99" fill="#f5f0e8"/>
  </g>
  <g id="logo-stroke-group">
    <circle id="logo-stroke-outer" cx="100" cy="100" r="99" stroke="#1a2840" stroke-width="1.5" fill="none"/>
    <circle id="logo-stroke-inner" cx="100" cy="100" r="94.5" stroke="#1a2840" stroke-width="0.75" fill="none"/>
  </g>
  <g id="logo-utensils">
    <g id="logo-spoon">
      <path d="M129 166.5 L100.5 137.5" stroke="#1a2840" stroke-width="2.35" stroke-linecap="round"/>
      <path d="M100.5 137.5
               C106.2 122.8 119.5 117.2 129.2 122.8
               C138.2 127.8 136.5 141.2 125.8 143.2
               C117.2 144.8 106.8 139.5 100.5 137.5 Z" fill="#1a2840"/>
    </g>
    <g id="logo-whisk">
      <path d="M71 166.5 L99.5 137.5" stroke="#1a2840" stroke-width="2.35" stroke-linecap="round"/>
      <ellipse cx="79.5" cy="150.5" rx="6.4" ry="2.65" stroke="#1a2840" stroke-width="1.08" fill="none" transform="rotate(-39 79.5 150.5)"/>
      <ellipse cx="83.8" cy="145" rx="6.1" ry="2.5" stroke="#1a2840" stroke-width="1.08" fill="none" transform="rotate(-39 83.8 145)"/>
      <ellipse cx="87.8" cy="139.8" rx="5.8" ry="2.35" stroke="#1a2840" stroke-width="1.08" fill="none" transform="rotate(-39 87.8 139.8)"/>
      <ellipse cx="91.5" cy="135" rx="5.4" ry="2.2" stroke="#1a2840" stroke-width="1.08" fill="none" transform="rotate(-39 91.5 135)"/>
      <ellipse cx="94.8" cy="130.8" rx="4.9" ry="2" stroke="#1a2840" stroke-width="1.08" fill="none" transform="rotate(-39 94.8 130.8)"/>
      <ellipse cx="97.5" cy="127.2" rx="4.2" ry="1.75" stroke="#1a2840" stroke-width="1.08" fill="none" transform="rotate(-39 97.5 127.2)"/>
    </g>
  </g>
  <text id="logo-title" x="100" y="76" text-anchor="middle" fill="#1a2840" font-family="'Cormorant Garamond', Georgia, serif" font-size="23.5" font-weight="500">Anna-Maria</text>
  <text id="logo-subtitle" x="100" y="94" text-anchor="middle" fill="#1a2840" font-family="Inter, system-ui, sans-serif" font-size="9.5" letter-spacing="0.55">kitchen</text>
`;

function initLogoIntro(container, options = {}) {
  const { autoplay = true, onComplete, staticMode = false } = options;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  container.classList.add('logo-intro');
  container.innerHTML = `
    <svg class="logo-intro__svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anna-Maria kitchen">
      ${LOGO_SVG_INNER}
    </svg>
  `;

  const svg = container.querySelector('.logo-intro__svg');
  const fill = svg.querySelector('#logo-fill');
  const strokeOuter = svg.querySelector('#logo-stroke-outer');
  const strokeInner = svg.querySelector('#logo-stroke-inner');
  const whisk = svg.querySelector('#logo-whisk');
  const spoon = svg.querySelector('#logo-spoon');
  const utensils = svg.querySelector('#logo-utensils');
  const title = svg.querySelector('#logo-title');
  const subtitle = svg.querySelector('#logo-subtitle');

  if (reduced || staticMode || typeof gsap === 'undefined') {
    gsap?.set?.([fill, strokeOuter, strokeInner, whisk, spoon, title, subtitle], { opacity: 1, clearProps: 'all' });
    onComplete?.();
    return { play: onComplete };
  }

  const outerLen = strokeOuter.getTotalLength();
  const innerLen = strokeInner.getTotalLength();

  gsap.set(strokeOuter, { strokeDasharray: outerLen, strokeDashoffset: outerLen });
  gsap.set(strokeInner, { strokeDasharray: innerLen, strokeDashoffset: innerLen });
  gsap.set(fill, { opacity: 0, scale: 0.92, transformOrigin: '50% 50%' });
  gsap.set([whisk, spoon], { opacity: 0 });
  gsap.set(whisk, { x: -38, y: 26, rotation: -8, transformOrigin: '71px 166px' });
  gsap.set(spoon, { x: 38, y: 26, rotation: 8, transformOrigin: '129px 166px' });
  gsap.set([title, subtitle], { opacity: 0 });
  gsap.set(title, { y: 8 });
  gsap.set(subtitle, { attr: { 'letter-spacing': 2.8 } });

  const tl = gsap.timeline({ paused: !autoplay, onComplete });

  tl.to(fill, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, 0);

  tl.to(strokeOuter, { strokeDashoffset: 0, duration: 0.55, ease: 'power1.inOut' }, 0.3);
  tl.to(strokeInner, { strokeDashoffset: 0, duration: 0.45, ease: 'power1.inOut' }, 0.4);

  tl.to(whisk, {
    x: 0, y: 0, rotation: 0, opacity: 1,
    duration: 0.6, ease: 'power3.out',
  }, 0.72);

  tl.to(spoon, {
    x: 0, y: 0, rotation: 0, opacity: 1,
    duration: 0.6, ease: 'power3.out',
  }, 0.78);

  tl.to(utensils, {
    scale: 1.04,
    duration: 0.08,
    ease: 'power2.out',
    transformOrigin: '100px 152px',
  }, 1.22);

  tl.to(utensils, {
    scale: 1,
    duration: 0.24,
    ease: 'elastic.out(1, 0.55)',
    transformOrigin: '100px 152px',
  }, 1.32);

  tl.to(title, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 1.32);
  tl.to(subtitle, { opacity: 1, attr: { 'letter-spacing': 0.55 }, duration: 0.5, ease: 'power2.out' }, 1.52);

  return { timeline: tl, play: () => tl.play() };
}

if (typeof module !== 'undefined') module.exports = { initLogoIntro };
