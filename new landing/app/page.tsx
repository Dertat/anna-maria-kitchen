import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { WeeklyMenu } from "@/components/weekly-menu"
import { Pricing } from "@/components/pricing"
import { Gallery } from "@/components/gallery"
import { About } from "@/components/about"
import { Steps } from "@/components/steps"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <WeeklyMenu />
      <About />
      <Steps />
      <Pricing />
      <Gallery />
      <Contact />
      <SiteFooter />
      <Toaster position="top-center" />
    </main>
  )
}
