"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#steps" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex flex-col leading-none">
          <span className="font-serif text-xl font-semibold tracking-tight text-primary">
            Anna-Maria
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Kitchen
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact" className={buttonVariants({ className: "rounded-full px-6" })}>
            Book Now
          </a>
        </div>

        <button
          className="text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={buttonVariants({ className: "mt-2 rounded-full" })}
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
