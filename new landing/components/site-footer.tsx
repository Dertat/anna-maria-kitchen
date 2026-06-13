import { Globe, AtSign, Share2 } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-semibold tracking-tight text-primary">
                Anna-Maria
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Kitchen
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Premium catering and private dining crafted with seasonal
              ingredients and genuine warmth.
            </p>
            <div className="mt-6 flex gap-3">
              {[Globe, AtSign, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Explore
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                <li><a href="#menu" className="transition-colors hover:text-primary">Weekly Menu</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-primary">Pricing</a></li>
                <li><a href="#gallery" className="transition-colors hover:text-primary">Gallery</a></li>
                <li><a href="#about" className="transition-colors hover:text-primary">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Services
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-primary">Weddings</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">Corporate</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">Private Dinners</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">Celebrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Contact
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                <li>(555) 123-4567</li>
                <li>hello@annamariakitchen.com</li>
                <li>Hudson Valley, NY</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} Anna-Maria Kitchen. All rights reserved.`}
        </div>
      </div>
    </footer>
  )
}
