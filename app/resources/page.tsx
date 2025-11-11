"use client";

import Link from "next/link";
import { ArrowRight, BookCopy, Download, FileText, Mic, Search } from "lucide-react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/NewsletterSection";

const GUIDES = [
  {
    title: "Remote-ready CV template",
    summary: "Craft a CV that highlights transferable skills, remote experience, and clinical achievements.",
    href: "#",
  },
  {
    title: "Portfolio story framework",
    summary: "Turn bedside cases into digital narratives that resonate with telehealth and content clients.",
    href: "#",
  },
  {
    title: "Pricing calculator",
    summary: "Set fair rates for telehealth, consulting, and education services based on your experience.",
    href: "#",
  },
];

const PLAYLISTS = [
  {
    title: "From ward to remote: getting started",
    description: "A 30-minute audio primer on mindsets, tools, and quick wins for your first digital role.",
  },
  {
    title: "Money systems for nurses",
    description: "Learn how to track income, save smart, and reinvest in your growth.",
  },
  {
    title: "Building your personal brand",
    description: "Tactics for LinkedIn, podcasts, and community participation that attract remote opportunities.",
  },
];

const PATHWAYS = [
  {
    persona: "Telehealth operations",
    steps: ["Download the telehealth CV template", "Attend orientation clinic", "Apply for partner course discount"],
  },
  {
    persona: "Medical communications",
    steps: ["Use portfolio story guide", "Join writing accountability pod", "Pitch to CCN content partners"],
  },
  {
    persona: "Community leadership",
    steps: ["Watch ambassador replay", "Shadow community mentor", "Host your first micro event"],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="resources" />
      <main>
        <HeroSection />
        <GuideSection />
        <AudioSection />
        <PathwaySection />
        <NewsletterSection variant="feature" />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-[#eef6f5] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs uppercase tracking-[0.26em] text-primary">
              Resource library
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-[54px]">
              Self-serve guides, templates, and playlists for ambitious nurses.
            </h1>
            <p className="text-lg leading-relaxed text-foreground/75">
              Dive into the materials our community uses to pitch, price, and pivot. Updated monthly with fresh insight from mentors and partners.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark">
                <Link href="/join">
                  Join to unlock more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary/30 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
              >
                <Link href="#guides">See latest templates</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[36px] border border-primary/15 bg-white p-8 shadow-[0_36px_80px_-50px_rgba(41,18,15,0.35)]">
            <div className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm text-foreground/70">
              <Search className="h-5 w-5 text-primary" />
              <span>Use the filters below to find exactly what you need.</span>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-foreground/70">
              <FilterBadge label="Skill level" value="Beginner · Intermediate · Expert" />
              <FilterBadge label="Format" value="PDF · Audio · Video · Worksheet" />
              <FilterBadge label="Focus" value="Telehealth · Content · Community · Business" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuideSection() {
  return (
    <section id="guides" className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/60">Action-ready templates</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Start with these downloads.</h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {GUIDES.map((guide) => (
            <article key={guide.title} className="rounded-[28px] border border-primary/12 bg-background/80 p-8 text-sm text-foreground/70 shadow-[0_30px_64px_-48px_rgba(41,18,15,0.35)]">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-xl font-semibold text-foreground">{guide.title}</h3>
              <p className="mt-3 leading-relaxed">{guide.summary}</p>
              <Button asChild variant="outline" className="mt-6 rounded-full border-primary/25 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10">
                <Link href={guide.href}>
                  Download
                  <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudioSection() {
  return (
    <section className="bg-[#f5f1ec] py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/60">Listen on the go</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Curated audio playlists.</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            Press play during commutes or in-between shifts. These episodes distill key lessons from nurse mentors and partners.
          </p>
        </div>

        <div className="mt-12 grid gap-6 text-sm text-foreground/70 sm:grid-cols-3">
          {PLAYLISTS.map((playlist) => (
            <div key={playlist.title} className="rounded-[28px] border border-primary/12 bg-white/90 p-6 shadow-[0_30px_60px_-48px_rgba(41,18,15,0.35)]">
              <Mic className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold text-foreground">{playlist.title}</h3>
              <p className="mt-3 leading-relaxed">{playlist.description}</p>
              <Button asChild variant="outline" className="mt-5 rounded-full border-primary/25 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10">
                <Link href="#">Listen now</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PathwaySection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/60">Choose your track</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Simple roadmaps based on your next move.</h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {PATHWAYS.map((pathway) => (
            <div key={pathway.persona} className="rounded-[28px] border border-primary/12 bg-background/90 p-8 text-sm text-foreground/70 shadow-[0_30px_64px_-48px_rgba(41,18,15,0.35)]">
              <h3 className="text-base font-semibold text-foreground">{pathway.persona}</h3>
              <ol className="mt-4 space-y-3 list-decimal list-inside">
                {pathway.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <Button asChild variant="outline" className="mt-6 rounded-full border-primary/25 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10">
                <Link href="/join">
                  Follow this path
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-primary/15 bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary/70">
      <span className="font-semibold text-primary/80">{label}:</span> {value}
    </div>
  );
}
