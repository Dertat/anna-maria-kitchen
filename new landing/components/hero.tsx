import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Premium Catering &amp; Private Dining
          </span>
          <h1 className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
            Crafted plates for your most memorable moments
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Anna-Maria Kitchen brings seasonal, chef-driven menus and seamless
            full-service catering to weddings, celebrations, and intimate
            dinners.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className={buttonVariants({ size: "lg", className: "rounded-full px-8" })}
            >
              Plan Your Event
            </a>
            <a
              href="#menu"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "rounded-full border-primary/30 px-8 text-primary hover:bg-secondary",
              })}
            >
              View This Week&apos;s Menu
            </a>
          </div>
          <div className="mt-4 flex items-center gap-8 border-t border-border pt-6">
            <div>
              <p className="font-serif text-3xl font-semibold text-primary">12+</p>
              <p className="text-sm text-muted-foreground">Years of service</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-primary">800+</p>
              <p className="text-sm text-muted-foreground">Events catered</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Seasonal sourcing</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-2xl shadow-primary/10">
            <Image
              src="/images/hero-table.png"
              alt="Elegantly styled catering table with gourmet plated dishes"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card px-6 py-4 shadow-xl sm:block">
            <p className="font-serif text-lg font-semibold text-primary">
              Bespoke menus
            </p>
            <p className="text-sm text-muted-foreground">
              Tailored to every occasion
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
