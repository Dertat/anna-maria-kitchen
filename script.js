const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const form = document.getElementById('contact-form');
const curtain = document.getElementById('curtain');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initPageReveal() {
  const finishIntro = () => {
    setTimeout(() => {
      curtain?.classList.add('is-done');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');
    }, 280);

    curtain?.addEventListener('transitionend', () => {
      curtain.remove();
    }, { once: true });
  };

  if (prefersReducedMotion) {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    curtain?.remove();
    return;
  }

  const logoContainer = document.getElementById('logo-intro-curtain');

  if (logoContainer && typeof initLogoIntro === 'function') {
    const intro = initLogoIntro(logoContainer, { onComplete: finishIntro });
    intro.ready.catch(() => finishIntro());
    return;
  }

  setTimeout(() => finishIntro(), 900);
}

function initScrollReveals() {
  if (prefersReducedMotion) return;

  const targets = document.querySelectorAll('.reveal, .reveal-stagger');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

initPageReveal();
initScrollReveals();

window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 20);
});

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--open');
  nav.classList.toggle('nav--open');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('burger--open');
    nav.classList.remove('nav--open');
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get('name');
  const contact = data.get('contact');
  const service = form.querySelector('[name="service"] option:checked').textContent;
  const message = data.get('message') || '';

  const text = [
    'Здравствуйте! Хочу заказать:',
    '',
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    `Услуга: ${service}`,
    message ? `Сообщение: ${message}` : '',
  ].filter(Boolean).join('\n');

  const igUrl = 'https://www.instagram.com/anna_maria.kitchen/';

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Заявка скопирована! Откройте Instagram Direct и вставьте текст.');
      window.open(igUrl, '_blank');
    });
  } else {
    alert(`Скопируйте и отправьте в Direct:\n\n${text}`);
    window.open(igUrl, '_blank');
  }

  form.reset();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
