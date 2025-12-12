"use client";

import Link from "next/link";
import {
  ArrowRight,
  Quote,
  Sparkles,
  Users,
  Video,
  BookOpen,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Footer } from "@/components/Footer";

const STORIES = [
  {
    name: "Amaka O.",
    role: "Telehealth Nurse · Lagos",
    before:
      "Worked double shifts in a private hospital to make ends meet, with little time for family or personal growth.",
    after:
      "Now serves global telehealth clients, earns more while working fewer hours, and mentors other CCN nurses.",
    quote:
      "CCN helped me see that my bedside stories were powerful. I turned them into a portfolio and secured remote contracts in under two months.",
    image: "/assets/remote2.jpeg",
  },
  {
    name: "Chidi E.",
    role: "Medical Writer · Abuja",
    before:
      "Loved patient education but struggled to land writing gigs and translate clinical knowledge into digital content.",
    after:
      "Graduated from the sprint, took a partner writing course, and now works with US digital clinics on long-term contracts.",
    quote:
      "The templates and feedback circles gave me clarity. I landed my first paid writing job within four weeks of graduating.",
    image: "/assets/remote5.jpeg",
  },
  {
    name: "Folake A.",
    role: "Health Educator · Ibadan",
    before:
      "Taught health seminars in-person but felt the income ceiling and wanted to reach a wider audience.",
    after:
      "Runs online health classes, sells digital products, and earns in dollars while staying close to her community.",
    quote:
      "CCN showed me how to package my knowledge. Now I host live classes, sell recordings, and collaborate with global brands.",
    image: "/assets/remote6.jpeg",
  },
];

const MEDIA_HIGHLIGHTS = [
  {
    type: "video",
    title: "Behind the scenes of the Portfolio Power-Up Challenge",
    description: "Watch a recording of our orientation call. See how nurses present their work and the kind of feedback they receive.",
    link: "#",
  },
  {
    type: "audio",
    title: "Community podcast: Building remote confidence",
    description: "Listen to three alumni discuss imposter syndrome, client relationships, and pricing strategies.",
    link: "#",
  },
  {
    type: "guide",
    title: "Download the case study template",
    description: "Use the same worksheet CCN nurses use to turn bedside stories into portfolio pieces.",
    link: "#",
  },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="stories" />
      <main>
        <HeroSection />
        <StoriesGrid />
        <MediaSection />
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto overflow-hidden rounded-[48px] border border-primary/12 bg-[#f9f1ee]">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
          <div className="space-y-8 px-6 py-14 text-center sm:px-10 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/90 px-4 py-1.5 text-xs uppercase tracking-[0.26em] text-primary">
              Stories & proof
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-[56px]">
              A living archive of nurses who refused to stay small.
            </h1>
            <p className="text-lg leading-relaxed text-foreground/75">
              Peek inside the studio, see how alumni reframed their bedside experience, and borrow ideas for your own remote path.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard label="Average income lift" value="2.4×" description="within six months of completing the sprint" />
              <StatCard label="Portfolio sprint alumni" value="300+" description="now working remotely or growing side businesses" />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <Button asChild className="w-full rounded-full bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark sm:w-auto">
                <Link href="/join">
                  Start your own story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-primary/25 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10 sm:w-auto"
              >
                <Link href="/programmes">Explore programmes</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="/assets/remote7.jpeg"
              alt="CCN alumni celebrating"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1d0f0b]/80 via-[#1d0f0b]/40 to-transparent p-8 text-sm text-white">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5" />
                <p>
                  “Every Thursday we meet for victory rollcall. No win is too small - publishing a LinkedIn post counts just as much as landing a new client.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-primary/12 bg-white/90 p-6 shadow-[0_30px_60px_-48px_rgba(41,18,15,0.45)]">
      <p className="text-3xl font-semibold text-primary">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/60">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">{description}</p>
    </div>
  );
}

function StoriesGrid() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Nurse narratives</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
            “If they did it, so can I.”
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            Every success story below includes the programme path they chose - flagship sprint, partner course, or both - so you can model your own journey.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {STORIES.map((story) => (
            <article key={story.name} className="rounded-[32px] border border-primary/12 bg-background/90 p-8 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.45)]">
              <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 28vw, 100vw"
                />
              </div>
              <div className="mt-6 space-y-3 text-sm text-foreground/70">
                <div>
                  <p className="text-base font-semibold text-foreground">{story.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">{story.role}</p>
                </div>
                <div className="rounded-2xl border border-primary/12 bg-white/90 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/70">Before CCN</p>
                  <p className="mt-2 text-sm leading-relaxed">{story.before}</p>
                </div>
                <div className="rounded-2xl border border-primary/12 bg-white/90 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/70">After joining</p>
                  <p className="mt-2 text-sm leading-relaxed">{story.after}</p>
                </div>
                <div className="rounded-2xl border border-primary/12 bg-primary/8 p-4 text-sm italic text-foreground">
                  <div className="flex items-center gap-2 text-primary">
                    <Quote className="h-4 w-4" />
                    Alumni voice
                  </div>
                  <p className="mt-2 leading-relaxed">{story.quote}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-white to-secondary/30 -z-10" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Watch, listen, download</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
            Learn directly from nurses inside the movement.
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            Mix and match video clips, podcast episodes, and templates to keep learning at your own pace.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 text-sm text-foreground/70">
          {MEDIA_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-primary/12 bg-white/90 p-6 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.45)]">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {item.type === "video"
                  ? "Video"
                  : item.type === "audio"
                  ? "Audio"
                  : "Template"}
              </div>
              <p className="mt-4 text-base font-semibold text-foreground">{item.title}</p>
              <p className="mt-2 leading-relaxed">{item.description}</p>
              <Button
                asChild
                variant="outline"
                className="mt-5 rounded-full border-primary/25 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
              >
                <Link href={item.link}>Access now</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Ready to write your own CCN story?</h2>
        <p className="mt-5 text-lg leading-relaxed text-foreground/70">
          Whether you want to join the Portfolio Power-Up Challenge or explore our programmes, the first step is the same:
          submit your application and hop on a human onboarding call.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild className="h-12 rounded-full bg-primary px-8 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark">
            <Link href="/join">
              Join the sprint
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full border-primary/25 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-primary hover:border-primary hover:bg-primary/10">
            <Link href="/programmes">
              Explore programmes
              <BookOpen className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
