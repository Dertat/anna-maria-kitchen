import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-xl">
            <Image
              src="/images/about-chef.png"
              alt="Anna-Maria plating a gourmet dish in her kitchen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Our Story
          </span>
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-primary sm:text-5xl">
            Cooking with heart since 2013
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Anna-Maria Kitchen began as a small family table and grew into a
            beloved catering studio. Founded by chef Anna-Maria Russo, our
            kitchen is built on a simple belief: extraordinary food brings
            people together.
          </p>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            We work hand in hand with local farmers and artisan producers,
            letting the season guide every menu. Each event is a collaboration,
            crafted around your story and served with genuine warmth.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-6 border-t border-border pt-6">
            <div>
              <p className="font-serif text-lg font-semibold text-primary">
                Locally sourced
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Partnered with regional farms &amp; markets
              </p>
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-primary">
                Made from scratch
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Every sauce, bread &amp; dessert in-house
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
