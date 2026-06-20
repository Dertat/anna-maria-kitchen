export default {
  meta: {
    lang: 'en',
    title: 'Anna-Maria Kitchen — Meal Delivery · Belgrade',
    description:
      'Ready-made meal delivery in Belgrade. Meal plans for 2, 6, 12, and 18 days — from 2000 RSD/day. Order on the website or via Telegram.',
    ogLocale: 'en_US',
  },
  theme: {
    light: 'Light theme',
    dark: 'Dark theme',
    toggle: 'Toggle theme',
  },
  backToTop: {
    label: 'Back to top',
  },
  intro: {
    skip: 'Skip',
  },
  nav: {
    menu: 'Menu',
    pricing: 'Plans',
    gallery: 'Gallery',
    about: 'About',
    steps: 'How to order',
    order: 'Order',
    telegram: 'Telegram',
    menuAria: 'Menu',
  },
  hero: {
    title: 'Home cooking without the cooking',
    subtitle:
      'Meal plans for 2, 6, 12, or 18 days — from 2000 RSD/day. We cook everything ourselves — no ready-made products, with our own bakery and full quality control.',
    ctaOrder: 'Order now',
    ctaMenu: 'Weekly menu',
    statDays: 'days of meals',
    statTrial: 'trial days',
    statProduction: 'in-house production',
    imageAlt: 'Table with Anna-Maria kitchen dishes',
    cardTitle: 'Personal meal plans',
    cardText: 'Created for your lifestyle',
  },
  menu: {
    eyebrow: 'Weekly menu',
    subtitle: 'The current menu is updated every week.',
    label: 'Menu',
  },
  about: {
    eyebrow: 'About',
    title: 'Our own production',
    p1: 'We do not use ready-made products — we cook everything ourselves and control quality at every stage. From milk to syrniki and ready meal plans — everything is under our control.',
    p2: 'We deliver in Belgrade every 2 days. The menu is updated weekly, and we take preferences and allergies into account.',
    feature1Title: 'No ready-made products',
    feature1Text: 'We cook everything ourselves',
    feature2Title: 'Our own bakery',
    feature2Text: 'Bread, pastries, desserts',
    imageAlt: 'Anna-Maria kitchen — in-house production',
  },
  steps: {
    eyebrow: 'How to order',
    title: 'Three simple steps',
    subtitle: 'From your website request to regular delivery — three simple steps.',
    items: [
      {
        title: 'Place your order',
        description: 'Fill out the form — we open Telegram with your request ready.',
      },
      {
        title: 'We coordinate',
        description: 'We choose the menu, schedule, and your preferences.',
      },
      {
        title: 'Receive',
        description: 'Fresh food at a convenient time — every 2 days.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Meal plans',
    title: 'Choose your program',
    subtitle: 'Delivery every 2 days. You can start with a 2-day trial.',
    popular: 'Popular',
    perDay: '{{price}} RSD/day',
    total: '{{total}} RSD for the program',
    order: 'Order',
    plans: [
      {
        days: 2,
        label: '2 days',
        desc: 'Trial format — get to know the meal plan',
        features: ['3–4 meals per day', 'Delivery every 2 days'],
      },
      {
        days: 6,
        label: '6 days',
        desc: 'One week without worrying about food',
        features: ['3–4 meals per day', 'Delivery every 2 days'],
      },
      {
        days: 12,
        label: '12 days',
        desc: 'Two weeks without worrying about food',
        features: ['Menu updated weekly', 'Our own production and confectionery'],
      },
      {
        days: 18,
        label: '18 days',
        desc: 'Maximum results',
        features: ['We take preferences and allergies into account', 'Three weeks of meals'],
      },
    ],
  },
  gallery: {
    eyebrow: 'Gallery',
    title: 'Our kitchen',
    subtitle: 'Real dishes from our kitchen — everything made in-house, no shortcuts.',
    instagramTitle: 'Follow our kitchen',
    instagramSubtitle:
      'New dishes, behind-the-scenes, and fresh menus — every day in the feed.',
  },
  testimonials: {
    eyebrow: 'Reviews',
    title: 'What clients say',
    subtitle: 'Real feedback from trial days and ongoing meal plans in Belgrade.',
    items: [
      {
        quote:
          'We tried the 2-day trial — everything was fresh and filling. Finally stopped ordering fast food for work.',
        name: 'Maria K.',
        meta: '2-day trial · New Belgrade',
      },
      {
        quote:
          'Delivery every two days is convenient. Varied menu, and the bakery items are a real bonus — tastes homemade.',
        name: 'Alexey V.',
        meta: '12-day meal plan',
      },
      {
        quote:
          'Asked for lactose-free options — they got it right from day one. Ordering via Telegram took just a couple of minutes.',
        name: 'Jelena M.',
        meta: '6-day meal plan · Dorćol',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Place an order',
    subtitle:
      'We reply within a day. Fill out the form — we will open Telegram with your request ready to send.',
    location: 'Belgrade · delivery every 2 days',
    telegramTitle: 'Telegram',
    telegramHint: 'You can message us directly — no form required.',
    telegramDirect: 'Message on Telegram',
    name: 'Name',
    namePlaceholder: 'Your name',
    contact: 'Contact',
    contactPlaceholder: '@username or phone',
    contactInvalid: 'Enter a Telegram @username or phone number (at least 8 digits)',
    service: 'Service',
    message: 'Comment',
    messagePlaceholder: 'Preferences, allergies, date',
    submit: 'Send via Telegram',
    serviceOptions: [
      { value: '2', label: '2-day trial' },
      { value: '6', label: 'Meal plan — 6 days' },
      { value: '12', label: 'Meal plan — 12 days' },
      { value: '18', label: 'Meal plan — 18 days' },
    ],
    formGreeting: 'Hello! I would like to order:',
    formName: 'Name',
    formContact: 'Contact',
    formService: 'Service',
    formMessage: 'Message',
    toastSuccess: 'Telegram opened — send the message.',
  },
  footer: {
    tagline:
      'Ready-made meal delivery in Belgrade. Meal plans for 2, 6, 12, and 18 days — from 2000 RSD/day. Order on the website.',
    perDayShort: 'day',
    sections: 'Sections',
    plans: 'Meal plans',
    contacts: 'Contact',
    plan6: '6 days',
    plan12: '12 days',
    plan18: '18 days',
    planTrial: '2-day trial',
    city: 'Belgrade',
    privacy: 'Privacy policy',
    copyright: '© {{year}} Anna-Maria Kitchen. Belgrade.',
  },
  cookies: {
    title: 'We use cookies',
    text: 'This site uses cookies and Google Analytics / Google Ads for analytics and ad measurement. By clicking Accept, you agree to data processing.',
    accept: 'Accept',
    decline: 'Decline',
    privacyLink: 'Learn more',
  },
  privacy: {
    title: 'Privacy policy',
    updated: 'Updated: June 2026',
    close: 'Close',
    sections: [
      {
        heading: 'Who we are',
        body: 'Anna-Maria Kitchen delivers ready-made meals in Belgrade. Contact: Telegram @anna_maria_belgrade, address: Prvomajska 57, Belgrade.',
      },
      {
        heading: 'What we collect',
        body: 'When you submit the form, you provide your name and contact (Telegram or phone) — this is sent to Telegram to process your order. With cookie consent, we use Google Analytics and Google Ads for visit statistics and advertising.',
      },
      {
        heading: 'Cookies',
        body: 'Technical cookies: language, theme, intro status. Analytics cookies (only with consent): Google Analytics (G-D1SNVZYBNF), Google Ads (AW-18236270443). IP addresses are anonymized in GA4.',
      },
      {
        heading: 'Legal basis & retention',
        body: 'Order processing — contract performance. Analytics — your consent. Form data is stored in Telegram chat. You can withdraw analytics consent by clearing cookies in your browser.',
      },
      {
        heading: 'Your rights',
        body: 'You may request access, correction, or deletion of personal data by messaging Telegram @anna_maria_belgrade.',
      },
    ],
  },
};
