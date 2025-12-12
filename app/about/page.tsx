"use client";

import Link from "next/link";
import { ArrowRight, Heart, Sparkles, Target, Users } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const VALUES = [
  {
    title: "Calm, well-paid careers",
    copy: "We help African nurses earn on their own terms with remote-friendly skills, positioning, and partners who value their expertise.",
    icon: <Heart className="h-5 w-5 text-primary" />,
  },
  {
    title: "Clear playbooks",
    copy: "No fluff—just step-by-step programmes, templates, and critiques that show you exactly what to do next.",
    icon: <Target className="h-5 w-5 text-primary" />,
  },
  {
    title: "Community first",
    copy: "Mentors, pods, and weekly programming keep you accountable, supported, and ready when opportunities appear.",
    icon: <Users className="h-5 w-5 text-primary" />,
  },
  {
    title: "Visibility & access",
    copy: "We champion your work, connect you to partners, and make sure your story is heard in the right rooms.",
    icon: <Sparkles className="h-5 w-5 text-primary" />,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="about" />
      <main>
        <HeroSection />
        <StorySection />
        <ValuesSection />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary/8 via-white to-secondary/10 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:px-8">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs uppercase tracking-[0.26em] text-primary">
            About CCN
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-[52px]">
              The mission behind Counter Cultural Nurses.
            </h1>
            <p className="text-lg leading-relaxed text-foreground/75">
              CCN exists to help African nurses build calm, well-paid remote careers. We break the journey into simple steps, surround you with mentors, and connect you to partners who respect your skill.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="rounded-full bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark">
              <Link href="/join">
                Join the movement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary/30 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
            >
              <Link href="/programmes">See programmes</Link>
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[36px] border border-primary/12 bg-white/90 p-6 shadow-[0_38px_80px_-52px_rgba(41,18,15,0.55)] backdrop-blur">
          <div className="relative h-[360px] overflow-hidden rounded-[28px] border border-primary/15 bg-primary/5">
            <ImageWithFallback
              src="/assets/founder.jpeg"
              alt="Founder of CCN"
              fill
              className="object-cover object-center"
              sizes="480px"
            />
          </div>
          <div className="mt-4 space-y-1">
            <p className="text-sm font-semibold text-foreground">Lillian Bamigboye</p>
            <p className="text-xs text-foreground/60">Founder · Counter Cultural Nurses</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
          <article className="space-y-6">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-2/70">Why we exist</p>
            <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              African nurses deserve peace of mind, good pay, and time for self and family.
            </h2>
            <p className="text-lg leading-relaxed text-foreground/75">
              Many hardworking nurses feel stuck—long shifts, low pay, and few paths into better roles. CCN breaks everything into plain steps so you can learn new skills, practise with support, and grow without feeling lost or alone.
            </p>
            <div className="rounded-3xl border border-primary/12 bg-secondary/60 p-6 shadow-[0_24px_48px_-36px_rgba(41,18,15,0.45)]">
              <p className="text-lg italic text-foreground">
                “You can keep caring for people and also build a life that feels calm, respected, and well paid.”
              </p>
            </div>
            <p className="text-lg leading-relaxed text-foreground/75">
              Through structured programmes, practical templates, and mentors who understand the African healthcare context, you will discover your strengths, build a clear career vision, connect with opportunities that match your goals, and learn how to position yourself for remote work and digital income streams.
            </p>
          </article>

          <div className="space-y-6 rounded-[32px] border border-primary/10 bg-white/85 p-8 shadow-[0_36px_72px_-48px_rgba(41,18,15,0.5)]">
            <div className="rounded-2xl border border-primary/12 bg-primary/5 p-4">
              <p className="text-sm font-semibold text-primary">What started CCN</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                Lillian watched brilliant nurses leave the profession out of frustration. CCN began as a simple circle to swap scripts, portfolios, and gig leads—now it&apos;s a full studio helping nurses transition into remote work.
              </p>
            </div>

            <div className="grid gap-4 rounded-2xl border border-primary/10 bg-white p-4">
              {[
                "Weekly mentor circles with nurses who have already made the leap.",
                "Portfolio and positioning critiques that use simple, clear language.",
                "Partner hotline for proposals, contracts, and interview prep.",
                "Accountability pods so you never feel alone while you build.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm leading-relaxed text-foreground/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="bg-gradient-to-br from-primary/6 via-white to-secondary/12 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center sm:items-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/70">What guides us</p>
          <h3 className="text-3xl font-semibold text-foreground sm:text-[38px]">How we build for nurses</h3>
          <p className="max-w-3xl text-base leading-relaxed text-foreground/70">
            Every programme, partnership, and template is designed to lower friction, keep you visible, and shorten the distance between your skill and your next opportunity.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {VALUES.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-primary/12 bg-white/90 p-6 text-left shadow-[0_28px_60px_-48px_rgba(41,18,15,0.45)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">{item.icon}</div>
                <p className="text-base font-semibold text-foreground">{item.title}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[32px] border border-primary/12 bg-gradient-to-r from-primary/10 via-white to-secondary/10 px-8 py-10 text-center shadow-[0_32px_70px_-46px_rgba(41,18,15,0.5)] sm:px-12">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">Join us</p>
        <h4 className="text-3xl font-semibold text-foreground sm:text-[34px]">Ready to build your next chapter?</h4>
        <p className="text-base leading-relaxed text-foreground/70">
          Step into a community that pairs structure with warmth. Programmes, mentors, and partners are ready to help you earn in calmer, more flexible ways.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <Button asChild className="rounded-full bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark">
            <Link href="/join">
              Join the movement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-primary/30 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
          >
            <Link href="/community">See how the circle works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

