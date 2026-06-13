import { CalendarCheck, ChefHat, Sparkles, Utensils } from "lucide-react"

const steps = [
  {
    icon: CalendarCheck,
    title: "Share Your Vision",
    description:
      "Tell us about your event, your guests, and the experience you imagine.",
  },
  {
    icon: ChefHat,
    title: "Design the Menu",
    description:
      "We craft a tailored seasonal menu and refine it together at a tasting.",
  },
  {
    icon: Utensils,
    title: "We Handle Everything",
    description:
      "From sourcing to setup, our team manages every detail on the day.",
  },
  {
    icon: Sparkles,
    title: "Savor the Moment",
    description:
      "Relax and enjoy. Your guests experience flawless food and service.",
  },
]

export function Steps() {
  return (
    <section id="steps" className="bg-primary py-20 text-primary-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/60">
            How It Works
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold sm:text-5xl">
            From Idea to Unforgettable
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/70">
            A simple, guided process that takes the stress out of catering your
            next event.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <step.icon className="size-5" />
                </div>
                <span className="font-serif text-3xl font-semibold text-primary-foreground/30">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
