"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Contact() {
  const [eventType, setEventType] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast.success("Thank you! We'll be in touch within 24 hours.")
    e.currentTarget.reset()
    setEventType("")
  }

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 rounded-2xl border border-border bg-card p-8 lg:grid-cols-2 lg:gap-16 lg:p-12">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Get In Touch
            </span>
            <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-primary sm:text-5xl">
              Let&apos;s plan something delicious
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Tell us about your event and we&apos;ll craft a proposal tailored
              to your taste, guest count, and occasion.
            </p>

            <div className="mt-2 flex flex-col gap-5">
              <a
                href="tel:+15551234567"
                className="flex items-center gap-4 text-foreground/80 transition-colors hover:text-primary"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <Phone className="size-4" />
                </span>
                (555) 123-4567
              </a>
              <a
                href="mailto:hello@annamariakitchen.com"
                className="flex items-center gap-4 text-foreground/80 transition-colors hover:text-primary"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <Mail className="size-4" />
                </span>
                hello@annamariakitchen.com
              </a>
              <div className="flex items-center gap-4 text-foreground/80">
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <MapPin className="size-4" />
                </span>
                42 Vineyard Lane, Hudson Valley, NY
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Jane Doe" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger id="event-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="private">Private Dinner</SelectItem>
                    <SelectItem value="celebration">Celebration</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="guests">Guest Count</Label>
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  placeholder="50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Tell us about your event</Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Date, location, dietary needs, and anything else we should know..."
              />
            </div>

            <Button type="submit" size="lg" className="mt-2 rounded-full">
              Request a Proposal
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
