"use client";

import Link from "next/link";
import { ArrowRight, Building2, ClipboardCheck, Globe2, Sparkles, MapPin, Rocket } from "lucide-react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/NewsletterSection";

const BENEFITS = [
  {
    title: "Tailored programmes",
    summary: "Design a custom sprint or lab aligned with your organisation’s goals—talent pipelines, leadership training, or community outreach.",
  },
  {
    title: "Verified talent pool",
    summary: "Access nurses who have completed the Portfolio Power-Up Challenge and partner courses, ready for internships or contract roles.",
  },
  {
    title: "Shared success metrics",
    summary: "Track outcomes alongside our team: portfolio submissions, performance reviews, and conversion into remote roles.",
  },
];

const CASE_STUDIES = [
  {
    partner: "HealthLink Africa",
    highlight: "12-week remote ops residency",
    result: "Placed 8 nurses in telehealth operations roles across Lagos and Nairobi.",
  },
  {
    partner: "CareBridge Labs",
    highlight: "Community leadership fellowship",
    result: "CCN nurses designed patient engagement playbooks used by 3 partner hospitals.",
  },
  {
    partner: "Scripted Health",
    highlight: "Medical writing accelerator",
    result: "Graduates now produce education content for clinics in Nigeria, Ghana, and the UK.",
  },
];

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="partnerships" />
      <main>
        <HeroSection />
        <BenefitSection />
        <CaseStudySection />
        <EngagementSection />
        <NewsletterSection variant="feature" />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-[#fff3ec] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:px-8 lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs uppercase tracking-[0.26em] text-primary">
            Partnerships & hiring
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-[54px]">
            Collaborate with CCN to build future-ready nursing teams.
          </h1>
          <p className="text-lg leading-relaxed text-foreground/75">
            We partner with hospitals, startups, NGOs, and health tech companies to design programmes, source talent, and deliver measurable outcomes for African nurses.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark">
              <Link href="#contact">Book a discovery call</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary/30 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
            >
              <Link href="#case-studies">See success stories</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-[36px] border border-primary/20 bg-white p-8 shadow-[0_36px_80px_-50px_rgba(192,54,49,0.35)]">
          <div className="grid gap-4 text-sm text-foreground/70">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 text-primary" />
              <p>Co-create labs and training pathways tailored to your talent needs.</p>
            </div>
            <div className="flex items-start gap-3">
              <Globe2 className="mt-1 h-5 w-5 text-primary" />
              <p>Access a pan-African network of nurses skilled in telehealth, communications, and community leadership.</p>
            </div>
            <div className="flex items-start gap-3">
              <ClipboardCheck className="mt-1 h-5 w-5 text-primary" />
              <p>Track performance with shared dashboards and quarterly impact reviews.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/60">Why partners choose CCN</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Build with a trusted ally.</h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="rounded-[28px] border border-primary/12 bg-background/85 p-8 text-sm text-foreground/70 shadow-[0_30px_64px_-48px_rgba(192,54,49,0.3)]">
              <p className="text-base font-semibold text-foreground">{benefit.title}</p>
              <p className="mt-3 leading-relaxed">{benefit.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudySection() {
  return (
    <section id="case-studies" className="bg-[#fffaf6] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/60">Partner spotlight</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Stories of collaboration and impact.</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            Every partnership is anchored in clear outcomes—employment, revenue, or community change.
          </p>
        </div>

        <div className="mt-12 grid gap-6 text-sm text-foreground/70">
          {CASE_STUDIES.map((study) => (
            <div key={study.partner} className="rounded-[28px] border border-primary/12 bg-white p-6 shadow-[0_28px_60px_-46px_rgba(192,54,49,0.28)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/60">{study.partner}</p>
                  <p className="text-base font-semibold text-foreground">{study.highlight}</p>
                </div>
                <p className="text-sm text-foreground/70">{study.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EngagementSection() {
  return (
    <section id="contact" className="bg-white py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-primary/15 bg-background/90 p-10 shadow-[0_36px_70px_-52px_rgba(192,54,49,0.3)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:items-start">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.28em] text-primary/60">How we work with you</p>
              <h2 className="text-3xl font-semibold text-foreground sm:text-[40px]">From interest to launch in four steps.</h2>
              <ol className="space-y-3 text-sm text-foreground/70">
                <li>1. Discovery call to understand your goals, timeline, and talent needs.</li>
                <li>2. Co-design sprint, residency, or micro fellowship with CCN mentors.</li>
                <li>3. Launch cohort, monitor progress, and adjust with weekly reports.</li>
                <li>4. Debrief, document outcomes, and plan follow-on engagements.</li>
              </ol>
              <Button
                asChild
                className="rounded-full bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark"
              >
                <Link href="mailto:partnerships@counterculturalnurses.com">Email the partnerships team</Link>
              </Button>
            </div>

            <div className="space-y-4 rounded-[28px] border border-primary/15 bg-white p-6 text-sm text-foreground/70">
              <MapPin className="h-5 w-5 text-primary" />
              <p className="font-semibold text-foreground">Where we operate</p>
              <p>Nigeria, Ghana, Kenya, Rwanda, South Africa, United Kingdom.</p>
              <Rocket className="h-5 w-5 text-primary" />
              <p className="font-semibold text-foreground">Preferred timelines</p>
              <p>We recommend an eight-week runway to co-design and recruit a pilot cohort.</p>
              <Building2 className="h-5 w-5 text-primary" />
              <p className="font-semibold text-foreground">Ideal cohort size</p>
              <p>10–20 nurses per engagement keeps feedback loops tight and outcomes measurable.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
