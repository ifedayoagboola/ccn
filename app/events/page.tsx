"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlarmClock,
  ArrowRight,
  CalendarCheck,
  CalendarClock,
  Download,
  MapPin,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { EventJoinModal } from "@/components/modals/EventJoinModal";
import { cn } from "@/lib/utils";

const UPCOMING_EVENTS = [
  {
    title: "CCN Launch: Welcome First 100 Members",
    date: "December 12, 2024",
    time: "Launch Day · Virtual",
    location: "Online",
    description:
      "We welcome the first 100 registered members into the CCN community. AI-powered learning path selection helps you choose the right program for your goals. Get personalized recommendations based on your experience and aspirations.",
    cta: "Join the waitlist",
    href: "/join",
    type: "sprint",
    featured: true,
  },
  {
    title: "Mentoring & Enlightenment Event: Why Be a Counter-Cultural Nurse?",
    date: "December 2024",
    time: "TBA · Virtual",
    location: "Online",
    description:
      "A transformative event designed to help members understand the power and purpose of being a counter-cultural nurse. Learn from successful nurses who&apos;ve broken free from traditional constraints and built fulfilling remote careers.",
    cta: "Reserve your spot",
    href: "/join",
    type: "partner",
    featured: true,
  },
  {
    title: "New Year Goals: Setting Intentions for 2025",
    date: "Late December 2024",
    time: "TBA · Virtual",
    location: "Online",
    description:
      "Join us for a virtual event focused on setting meaningful goals for the new year. Learn how to create actionable plans for your remote career journey, connect with peers, and start 2025 with clarity and purpose.",
    cta: "Save the date",
    href: "/join",
    type: "clinic",
    featured: true,
  },
];

const HIGHLIGHTS = [
  {
    label: "Orientation",
    title: "Portfolio Sprint Walkthrough",
    time: "Thursdays · 7:00 PM WAT",
    detail: "Live demo of the 12-week studio with mentor Q&A",
  },
  {
    label: "Partner preview",
    title: "Telehealth Operations Tour",
    time: "Bi-weekly · Hybrid",
    detail: "Meet HealthLink Africa trainers and alumni",
  },
  {
    label: "Clinic",
    title: "Pricing & Proposal Night",
    time: "Sundays · 5:30 PM WAT",
    detail: "Practise pitching and get live pricing feedback",
  },
];

const PAST_EVENTS = [
  {
    title: "CCN x CareBridge Labs: Community Support Roles",
    date: "February 18",
    replayLink: "#",
  },
  {
    title: "Writing Health Content That Converts",
    date: "February 3",
    replayLink: "#",
  },
  {
    title: "Remote Interview Practice Night",
    date: "January 28",
    replayLink: "#",
  },
];

const REMINDERS = [
  {
    heading: "Add events to your calendar",
    copy: "Download the .ics file so each session appears in your preferred calendar app.",
    icon: <Download className="h-5 w-5 text-primary" />,
    action: "Download schedule",
    href: "#",
  },
  {
    heading: "Request a reminder",
    copy: "Drop your WhatsApp number and we will send a reminder an hour before the event starts.",
    icon: <AlarmClock className="h-5 w-5 text-primary" />,
    action: "Get WhatsApp reminder",
    href: "/join",
  },
  {
    heading: "Watch past replays",
    copy: "Missed an event? Access recordings and summaries to catch up on what you need.",
    icon: <PlayCircle className="h-5 w-5 text-primary" />,
    action: "Browse replays",
    href: "#past-events",
  },
];

export default function EventsPage() {
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState<string | undefined>();

  const handleEventClick = (eventTitle: string) => {
    setSelectedEventTitle(eventTitle);
    setEventModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="events" />
      <EventJoinModal 
        open={eventModalOpen} 
        onOpenChange={setEventModalOpen}
        eventTitle={selectedEventTitle}
      />
      <main>
        <HeroSection />
        <UpcomingEvents onEventClick={handleEventClick} />
        <ReminderSection />
        <PastEvents />
        <Footer />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-[#fdf4ee] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-xs uppercase tracking-[0.26em] text-primary">
              Upcoming at CCN
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-[56px]">
              Three touchpoints to help you decide, prepare, and show up.
            </h1>
            <p className="text-lg leading-relaxed text-foreground/75">
              Whether you are curious about the Portfolio Power-Up Challenge or exploring partner courses, join the session that matches your next move - and we will keep you updated along the way.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <Button asChild className="w-full rounded-full bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark sm:w-auto">
                <Link href="/join">
                  Reserve your seat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-primary/30 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10 sm:w-auto"
              >
                <Link href="#past-events">Browse replays</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex-1 rounded-[32px] border border-primary/15 bg-white p-8 shadow-[0_36px_80px_-48px_rgba(41,18,15,0.45)]">
            <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-primary/20 blur-xl" />
            <div className="absolute -bottom-8 -right-8 h-20 w-20 rounded-full bg-accent/20 blur-xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.24em] text-primary/70">Weekly timetable</p>
              <div className="mt-6 space-y-6">
                {HIGHLIGHTS.map((item) => (
                  <div key={item.title} className="grid gap-1 rounded-2xl border border-primary/10 bg-primary/5 p-5">
                    <div className="text-xs uppercase tracking-[0.28em] text-foreground/50">{item.label}</div>
                    <div className="text-lg font-semibold text-foreground">{item.title}</div>
                    <div className="text-sm font-medium text-primary">{item.time}</div>
                    <div className="text-sm text-foreground/70">{item.detail}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-primary/15 bg-white/80 p-5 text-xs uppercase tracking-[0.2em] text-foreground/60">
                <span className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  Reminders via email & WhatsApp
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Small group breakout rooms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UpcomingEvents({ onEventClick }: { onEventClick: (eventTitle: string) => void }) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Launch events</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
            Join us as we launch CCN and welcome our first members.
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            We&apos;re launching on December 12th with three key events designed to welcome members, inspire transformation, and set goals for the new year.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {UPCOMING_EVENTS.map((event) => (
            <article
              key={event.title}
              className={cn(
                "flex h-full flex-col justify-between rounded-[28px] border border-primary/12 bg-background/90 p-8 text-sm text-foreground/70 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.45)]",
                event.featured && "border-primary/25 bg-gradient-to-br from-primary/5 via-white to-secondary/10 shadow-[0_36px_80px_-52px_rgba(41,18,15,0.5)]",
              )}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  {event.featured ? "Launch event" : event.type === "sprint"
                    ? "Portfolio sprint"
                    : event.type === "partner"
                    ? "Partner course"
                    : "Career clinic"}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/60">
                  <CalendarCheck className="h-4 w-4" />
                  {event.date}
                </p>
                <p>{event.time}</p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {event.location}
                </p>
                <p>{event.description}</p>
              </div>
              <Button
                onClick={() => onEventClick(event.title)}
                className="mt-6 rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary-dark"
              >
                {event.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReminderSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-white to-secondary/30 -z-10" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Never miss a session</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Stay organised and show up with confidence.</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            These resources keep every CCN session within reach, even on busy hospital weeks.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 text-sm text-foreground/70">
          {REMINDERS.map((item) => (
            <div
              key={item.heading}
              className="rounded-[28px] border border-primary/12 bg-white/90 p-6 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.45)]"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-primary/70">
                {item.icon}
                <span>{item.heading}</span>
              </div>
              <p className="mt-3 leading-relaxed">{item.copy}</p>
              <Button
                asChild
                variant="outline"
                className="mt-5 rounded-full border-primary/25 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
              >
                <Link href={item.href}>{item.action}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PastEvents() {
  return (
    <section id="past-events" className="bg-white py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Catch up</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Watch replays and download session notes.</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            These recordings cover pricing, storytelling, partner interviews, and more - perfect if you want to learn on your own schedule.
          </p>
        </div>

        <div className="mt-12 grid gap-6 text-sm text-foreground/70">
          {PAST_EVENTS.map((event) => (
            <div key={event.title} className="flex flex-col gap-4 rounded-[26px] border border-primary/12 bg-background/85 p-6 shadow-[0_28px_60px_-48px_rgba(41,18,15,0.45)] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/70">{event.date}</p>
                <p className="mt-1 text-base font-semibold text-foreground">{event.title}</p>
              </div>
              <Button
                asChild
                variant="secondary"
                className="rounded-full border border-primary/20 bg-primary/10 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
              >
                <Link href={event.replayLink}>Download replay</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 text-center text-sm text-foreground/70">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary/70">
            <Users className="h-4 w-4" />
            Want a custom session for your hospital or nursing school?
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-primary/25 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
          >
            <Link href="/partnerships">Book a private workshop</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
