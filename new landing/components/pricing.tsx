import { Check } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

const tiers = [
  {
    name: "Intimate",
    price: "$48",
    unit: "per guest",
    description: "Perfect for small gatherings and private dinners.",
    features: [
      "Three-course seasonal menu",
      "Up to 20 guests",
      "Two service staff",
      "Standard table linens",
    ],
    featured: false,
  },
  {
    name: "Celebration",
    price: "$85",
    unit: "per guest",
    description: "Our most popular package for weddings and events.",
    features: [
      "Five-course tasting menu",
      "Up to 120 guests",
      "Full service team & bar",
      "Premium linens & tableware",
      "Custom menu consultation",
    ],
    featured: true,
  },
  {
    name: "Signature",
    price: "Custom",
    unit: "tailored quote",
    description: "A fully bespoke experience designed around you.",
    features: [
      "Chef-designed bespoke menu",
      "Unlimited guests",
      "Dedicated event manager",
      "Floral & styling coordination",
      "Wine pairing program",
    ],
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Packages
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-primary sm:text-5xl">
            Catering Packages
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Transparent pricing with the flexibility to tailor every detail.
            Each package includes menu planning and a dedicated coordinator.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                tier.featured
                  ? "border-primary bg-primary text-primary-foreground shadow-2xl shadow-primary/20 lg:-mt-4 lg:mb-4"
                  : "border-border bg-card"
              }`}
            >
              {tier.featured && (
                <span className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent-foreground">
                  Most Popular
                </span>
              )}
              <h3
                className={`font-serif text-2xl font-semibold ${
                  tier.featured ? "text-primary-foreground" : "text-primary"
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  tier.featured
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {tier.description}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-semibold">
                  {tier.price}
                </span>
                <span
                  className={`text-sm ${
                    tier.featured
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {tier.unit}
                </span>
              </div>
              <ul className="mt-8 flex flex-col gap-3.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${
                        tier.featured ? "text-accent" : "text-accent"
                      }`}
                    />
                    <span
                      className={
                        tier.featured
                          ? "text-primary-foreground/90"
                          : "text-foreground/80"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={buttonVariants({
                  variant: tier.featured ? "default" : "outline",
                  className: `mt-8 rounded-full ${
                    tier.featured
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : ""
                  }`,
                })}
              >
                Choose {tier.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
