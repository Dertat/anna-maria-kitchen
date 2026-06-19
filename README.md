# Anna-Maria Kitchen

Лендинг доставки готовой еды в Белграде (React + Vite + Tailwind).

**Сайт:** https://annamariakitchen.rs

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
| Фото для parallax (HQ) | `public/assets/instagram/parallax/` — обновить: `npm run fetch:parallax` |
| Hero / About фото | `public/images/hero-table.webp`, `about-chef.webp` |
| Превью для ссылок (OG) | `public/images/og.jpg` — пересобрать: `npm run generate:og` |

### Галерея Instagram

1. Положите JPG в `public/assets/instagram/`
2. Добавьте запись в `public/assets/instagram/posts.json`
3. `"gallery": true` — показывать на сайте; `captions.ru/en/sr` — подписи при наведении

## Домен `annamariakitchen.rs`

Сайт хостится на Render. Код уже использует `https://annamariakitchen.rs` (canonical, OG, sitemap, JSON-LD).

### 1. Render — добавить домен

1. [Render Dashboard](https://dashboard.render.com/) → **anna-maria-kitchen** → **Settings** → **Custom Domains**
2. **Add Custom Domain** → `annamariakitchen.rs`
3. Добавьте также `www.annamariakitchen.rs` (опционально, Render перенаправит на основной)
4. Скопируйте DNS-записи, которые покажет Render

### 2. DNS у регистратора (.rs)

В панели регистратора домена (RNIDS / Registar) создайте записи:

| Тип | Имя | Значение |
|-----|-----|----------|
| **A** | `@` (корень) | IP из Render (обычно `216.24.57.1`) |
| **CNAME** | `www` | `anna-maria-kitchen.onrender.com` |

> Точные значения Render покажет после добавления домена — используйте их.

Проверка DNS: [dnschecker.org](https://dnschecker.org/) — обновление может занять от 15 минут до 48 часов.

### 3. HTTPS

Render выпустит SSL-сертификат автоматически после верификации DNS.

### 4. Переменная окружения

В Render → **Environment** должно быть:

| Key | Value |
|-----|-------|
| `VITE_SITE_URL` | `https://annamariakitchen.rs` |

После смены — **Manual Deploy** или push в `main`.

### 5. Google Analytics / Ads

Обновите URL потока данных в GA4 и объявлений Google Ads на `https://annamariakitchen.rs`.

---

## Деплой (Render)

Push в `main` → автодеплой. Конфиг: `render.yaml`.

### Переменные окружения

| Переменная | Назначение |
|------------|------------|
| `VITE_SITE_URL` | Публичный URL (для canonical, OG, sitemap). При своём домене — обновить здесь |
| `VITE_GA_ID` | Google Analytics 4 (`G-D1SNVZYBNF`) |
| `VITE_GOOGLE_ADS_ID` | Google Ads ID (`AW-XXXXXXXXXX`) |
| `VITE_GOOGLE_ADS_LEAD_LABEL` | Метка конверсии «Заявка» из Google Ads |

## Аналитика (Google Analytics 4)

### 1. Создать свойство GA4

1. Откройте [Google Analytics](https://analytics.google.com/)
2. **Администратор** → **Создать** → **Свойство**
3. Название: `Anna-Maria Kitchen`, часовой пояс: Белград
4. Поток данных → **Веб** → URL: `https://annamariakitchen.rs`
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
   `https://annamariakitchen.rs/?ga_debug=1`
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

## Google Реклама

### Шаг 1 — Аккаунт и связка с GA4

1. Откройте [ads.google.com](https://ads.google.com/) → создайте аккаунт (валюта **RSD** или **EUR**)
2. **Инструменты** → **Менеджер данных** → **Связанные продукты** → **Google Аналитика**
3. Свяжите свойство GA4 (`G-D1SNVZYBNF`) с аккаунтом Google Ads
4. В Google Ads: **Цели** → **Конверсии** → **Импорт** → **Google Analytics 4** → событие **`generate_lead`**

### Шаг 2 — Тег конверсии на сайте

1. Google Ads → **Цели** → **Конверсии** → **+ Создать** → **Сайт**
2. Категория: **Потенциальный клиент**, название: `Заявка с сайта`
3. Скопируйте **ID** (`AW-XXXXXXXXXX`) и **метку конверсии**
4. Добавьте в Render → **Environment**:

| Key | Value |
|-----|-------|
| `VITE_GOOGLE_ADS_ID` | `AW-XXXXXXXXXX` |
| `VITE_GOOGLE_ADS_LEAD_LABEL` | метка конверсии |

### Шаг 3 — Первая кампания (Поиск)

| Параметр | Значение |
|----------|----------|
| Тип | **Поиск** |
| Цель | Конверсия `Заявка` / `generate_lead` |
| Гео | **Белград** + 15–20 км |
| Языки | Русский, Сербский, Английский |
| URL | `https://annamariakitchen.rs` |
| Бюджет | **500–1000 RSD/день** для старта |

**Ключевые слова:** `доставка готовой еды белград`, `готовая еда белград`, `meal prep belgrade`, `dostava hrane beograd`

**Минус-слова:** `рецепт`, `бесплатно`, `работа`, `вакансия`

**Объявление (RU):** Заголовки — `Доставка еды · Белград` / `Рационы 2–18 дней`. Описание — `Готовим сами. От 2000 RSD/день. Пробные 2 дня.`
