# Anna-Maria Kitchen

Лендинг доставки готовой еды в Белграде (React + Vite + Tailwind).

**Сайт:** https://anna-maria-kitchen.onrender.com

## Локальная разработка

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Что и где редактировать

| Задача | Файл |
|--------|------|
| Меню на неделю | `src/data/weeklyMenu.js` — `period` и блоки `ru` / `en` / `sr` |
| Цены рационов | `src/data/pricing.js` — `pricePerDay` в RSD |
| Тексты интерфейса | `src/i18n/locales/ru.js`, `en.js`, `sr.js` |
| Ссылки Instagram / Telegram | `src/data/site.js` |
| Фото галереи | `public/assets/instagram/` + `posts.json` |
| Hero / About фото | `public/images/hero-table.webp`, `about-chef.webp` |

### Галерея Instagram

1. Положите JPG в `public/assets/instagram/`
2. Добавьте запись в `public/assets/instagram/posts.json`
3. `"gallery": true` — показывать на сайте; `captions.ru/en/sr` — подписи при наведении

## Деплой (Render)

Push в `main` → автодеплой. Конфиг: `render.yaml`.

### Переменные окружения

| Переменная | Назначение |
|------------|------------|
| `VITE_SITE_URL` | Публичный URL (для canonical, OG, sitemap). При своём домене — обновить здесь |
| `VITE_GA_ID` | Google Analytics 4, например `G-XXXXXXXXXX` (опционально) |

## Аналитика

Добавьте `VITE_GA_ID` в Render Dashboard → Environment. Скрипт подключится автоматически (`src/components/Analytics.jsx`).
