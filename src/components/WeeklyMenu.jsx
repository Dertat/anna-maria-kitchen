import { motion, useReducedMotion } from 'framer-motion';
import { WEEKLY_MENU } from '@/data/weeklyMenu';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1];

const boardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

const dayVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.28 + index * 0.09,
      duration: 0.55,
      ease: EASE,
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: EASE },
  },
};

function MenuDay({ day, items, withBorder, dayIndex, reducedMotion }) {
  const motionProps = reducedMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.3 },
        variants: dayVariants,
        custom: dayIndex,
      };

  return (
    <motion.div
      {...motionProps}
      className={cn('menu-day p-6 sm:p-8 lg:p-10', withBorder && 'menu-day--bordered')}
    >
      <h3 className="menu-day__title">{day}</h3>
      <ul className="menu-day__list">
        {items.map((item) => (
          <motion.li
            key={item}
            variants={reducedMotion ? undefined : itemVariants}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function WeeklyMenu() {
  const { t, locale } = useLanguage();
  const reducedMotion = useReducedMotion();
  const menuDays = WEEKLY_MENU[locale] ?? WEEKLY_MENU.ru;
  const rows = [
    [menuDays[0], menuDays[1]],
    [menuDays[2], menuDays[3]],
    [menuDays[4], menuDays[5]],
  ];

  let dayIndex = 0;

  const boardMotion = reducedMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.18 },
        variants: boardVariants,
      };

  return (
    <section id="menu" className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <span className="pl-[0.3em] text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {t('menu.eyebrow')}
          </span>
          <p className="mt-4 w-full max-w-xl text-center text-pretty leading-relaxed text-muted-foreground">
            {t('menu.subtitle')}
          </p>
        </ScrollReveal>

        <motion.article
          {...boardMotion}
          className="menu-board mx-auto mt-12 max-w-5xl"
        >
          <header className="menu-board__head">
            <motion.p
              className="menu-board__label"
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 16 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.55, ease: EASE, delay: 0.1 },
                  })}
            >
              {t('menu.label')}
            </motion.p>
            <motion.p
              className="menu-board__period"
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 12 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.5, ease: EASE, delay: 0.2 },
                  })}
            >
              {WEEKLY_MENU.period}
            </motion.p>
            <motion.div
              aria-hidden="true"
              className="menu-board__line"
              {...(reducedMotion
                ? {}
                : {
                    initial: { scaleX: 0, opacity: 0.4 },
                    whileInView: { scaleX: 1, opacity: 1 },
                    viewport: { once: true },
                    transition: { duration: 0.65, ease: EASE, delay: 0.3 },
                    style: { transformOrigin: 'center' },
                  })}
            />
          </header>

          <div className="menu-board__body">
            {rows.map((pair, rowIndex) => (
              <div
                key={pair[0].day}
                className={cn(
                  'menu-board__row',
                  rowIndex < rows.length - 1 && 'menu-board__row--split',
                )}
              >
                <MenuDay
                  day={pair[0].day}
                  items={pair[0].items}
                  withBorder
                  dayIndex={dayIndex++}
                  reducedMotion={reducedMotion}
                />
                <MenuDay
                  day={pair[1].day}
                  items={pair[1].items}
                  dayIndex={dayIndex++}
                  reducedMotion={reducedMotion}
                />
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
