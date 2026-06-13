import { LINKS } from '@/data/site';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/i18n/LanguageProvider';

function MenuDay({ day, items, withBorder }) {
  return (
    <div className={`menu-day p-6 sm:p-8 lg:p-10 ${withBorder ? 'menu-day--bordered' : ''}`}>
      <h3 className="menu-day__title">{day}</h3>
      <ul className="menu-day__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function WeeklyMenu() {
  const { t, messages } = useLanguage();
  const menuDays = messages.menu.days;
  const rows = [
    [menuDays[0], menuDays[1]],
    [menuDays[2], menuDays[3]],
    [menuDays[4], menuDays[5]],
  ];

  return (
    <section id="menu" className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {t('menu.eyebrow')}
          </span>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {t('menu.subtitle')}
          </p>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener"
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            @anna_maria.kitchen →
          </a>
        </ScrollReveal>

        <ScrollReveal variant="scale" className="menu-board mx-auto mt-12 max-w-5xl">
          <header className="menu-board__head">
            <p className="menu-board__label">{t('menu.label')}</p>
            <p className="menu-board__period">{t('menu.period')}</p>
            <div className="menu-board__line" aria-hidden="true" />
          </header>

          <div className="menu-board__body">
            {rows.map((pair, rowIndex) => (
              <div
                key={pair[0].day}
                className={`menu-board__row ${rowIndex < rows.length - 1 ? 'menu-board__row--split' : ''}`}
              >
                <MenuDay day={pair[0].day} items={pair[0].items} withBorder />
                <MenuDay day={pair[1].day} items={pair[1].items} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
