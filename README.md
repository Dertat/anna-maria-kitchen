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

## Аналитика (Google Analytics 4)

### 1. Создать свойство GA4

1. Откройте [Google Analytics](https://analytics.google.com/)
2. **Администратор** → **Создать** → **Свойство**
3. Название: `Anna-Maria Kitchen`, часовой пояс: Белград
4. Поток данных → **Веб** → URL: `https://anna-maria-kitchen.onrender.com`
5. Скопируйте **Идентификатор потока** вида `G-XXXXXXXXXX`

### 2. Добавить на Render

Render Dashboard → **anna-maria-kitchen** → **Environment** → Add Variable:

| Key | Value |
|-----|-------|
| `VITE_GA_ID` | `G-XXXXXXXXXX` |

Сохранить → Render пересоберёт сайт автоматически.

### 3. Проверить

**Блокировщики рекламы** (uBlock, AdGuard, Brave) отключают GA. Проверяйте в инкогнито без расширений.

1. GA4 → **Отчёты** → **В реальном времени** — откройте сайт, подождите 30–60 сек
2. Или **Администратор** → **DebugView** + URL с параметром:
   `https://anna-maria-kitchen.onrender.com/?ga_debug=1`
3. Убедитесь, что ID потока в GA4 = **`G-D1SNVZYBNF`**
   (Администратор → Потоки данных → Веб)

### Локальная проверка

```bash
cp .env.example .env.local
# вставьте G-D1SNVZYBNF в .env.local
npm run dev
```

### Отслеживаемые события

| Событие | Когда |
|---------|-------|
| `page_view` | Просмотр секции (#menu, #pricing, …) |
| `select_plan` | Клик «Заказать» на карточке тарифа |
| `generate_lead` | Отправка формы → Telegram |
| `language_change` | Смена языка RU/EN/SR |
| `click` (outbound) | Клик на Instagram / Telegram |
