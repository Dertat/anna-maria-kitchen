import Image from "next/image"

const images = [
  { src: "/images/gallery-1.png", alt: "Plated gourmet appetizer with microgreens", span: "row-span-2" },
  { src: "/images/gallery-2.png", alt: "Luxurious catering dessert table" },
  { src: "/images/gallery-3.png", alt: "Elegant catering buffet station" },
  { src: "/images/gallery-4.png", alt: "Beautifully set dinner table for a private event", span: "row-span-2" },
  { src: "/images/gallery-5.png", alt: "Chef garnishing a gourmet main course" },
  { src: "/images/gallery-6.png", alt: "Fresh seasonal salad platter" },
]

export function Gallery() {
  return (
    <section id="gallery" className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Gallery
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-semibold text-primary sm:text-5xl">
            A Taste of Our Work
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            From plated tastings to grand celebrations, every detail is composed
            with intention.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.src}
              className={`group relative overflow-hidden rounded-xl border border-border ${img.span ?? ""}`}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
