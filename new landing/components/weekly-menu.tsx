const days = [
  {
    day: "Monday",
    title: "Tuscan Comfort",
    dishes: [
      "Wild mushroom risotto, aged parmesan",
      "Braised short rib, rosemary jus",
      "Olive oil cake, candied orange",
    ],
  },
  {
    day: "Tuesday",
    title: "Coastal Catch",
    dishes: [
      "Seared scallops, citrus beurre blanc",
      "Herb-crusted sea bass, fennel slaw",
      "Lemon posset, almond tuile",
    ],
  },
  {
    day: "Wednesday",
    title: "Garden Table",
    dishes: [
      "Heirloom tomato burrata salad",
      "Charred vegetable galette, goat cheese",
      "Honey panna cotta, summer berries",
    ],
  },
  {
    day: "Thursday",
    title: "Provence Evening",
    dishes: [
      "Duck confit, cherry gastrique",
      "Ratatouille tian, basil oil",
      "Lavender crème brûlée",
    ],
  },
  {
    day: "Friday",
    title: "Chef's Signature",
    dishes: [
      "Truffle gnocchi, brown butter",
      "Filet mignon, red wine reduction",
      "Dark chocolate fondant, sea salt",
    ],
  },
]

export function WeeklyMenu() {
  return (
    <section id="menu" className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            This Week
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-primary sm:text-5xl">
            Weekly Tasting Menu
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Our menus rotate with the season and the freshest market finds. Here
            is what our kitchen is serving this week.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {days.map((d, i) => (
            <article
              key={d.day}
              className={`flex flex-col rounded-xl border border-border bg-card p-7 transition-shadow hover:shadow-lg ${
                i === 4 ? "ring-1 ring-accent sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {d.day}
                </span>
                {i === 4 && (
                  <span className="rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent-foreground">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-primary">
                {d.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {d.dishes.map((dish) => (
                  <li
                    key={dish}
                    className="flex gap-3 text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {dish}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
