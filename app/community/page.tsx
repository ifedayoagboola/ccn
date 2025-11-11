"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles, Users, Video } from "lucide-react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/NewsletterSection";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const PILLARS = [
  {
    title: "Mentor circle",
    copy: "Nurses who have already transitioned into remote work host weekly office hours, answer questions, and share their processes.",
  },
  {
    title: "Accountability pods",
    copy: "You’re matched with peers pursuing similar goals—whether that’s telehealth, health writing, or launching a digital product.",
  },
  {
    title: "Partner lab",
    copy: "Collaborate with hospitals, startups, and NGOs who trust CCN nurses for contract roles, pilots, and research projects.",
  },
];

const CHANNELS = [
  "Monday focus voice notes",
  "Wednesday live critique lab",
  "Friday wins and gratitude round",
  "Monthly partner demo day",
];

const MENTORS = [
  {
    name: "Adaeze M.",
    specialty: "Telehealth operations",
    bio: "Led nurse onboarding at a US telehealth startup. Guides CCN nurses on SOP design, documentation, and time management.",
    image: "/assets/remote3.jpeg",
  },
  {
    name: "Bola K.",
    specialty: "Medical communications",
    bio: "Former ward sister turned medical writer. Helps members turn patient education into high-paying content gigs.",
    image: "/assets/remote8.jpeg",
  },
  {
    name: "Chiamaka T.",
    specialty: "Community leadership",
    bio: "Builds onboarding experiences for African health tech startups. Coaches members on building their own learning circles.",
    image: "/assets/remote10.jpeg",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="community" />
      <main>
        <HeroSection />
        <PillarsSection />
        <MentorSection />
        <ChannelSection />
        <PartnerInviteSection />
        <NewsletterSection variant="feature" />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-[#f3f0ff] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:px-8">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6e4bd9]/20 bg-white px-4 py-1.5 text-xs uppercase tracking-[0.26em] text-[#5a39c6]">
            CCN community
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-[54px]">
            A circle where nurses learn, experiment, and grow together.
          </h1>
          <p className="text-lg leading-relaxed text-foreground/75">
            Join a living studio of Nigerian nurses building remote careers. You’ll get mentors, pods, and weekly programming designed to keep you moving forward.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-[#5a39c6] px-7 text-sm font-semibold uppercase tracking-[0.22em] text-white hover:bg-[#4c2faf]">
              <Link href="/join">
                Join the community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#5a39c6]/30 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a39c6] hover:border-[#5a39c6] hover:bg-[#5a39c6]/10"
            >
              <Link href="/events">See weekly schedule</Link>
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[36px] border border-[#5a39c6]/20 bg-white p-8 shadow-[0_40px_80px_-50px_rgba(56,31,136,0.35)]">
          <div className="grid gap-6 text-sm text-foreground/70">
            <div className="flex items-start gap-3">
              <Users className="mt-1 h-5 w-5 text-[#5a39c6]" />
              <p>3 signature pods: Telehealth, Content & Communication, and Digital Ventures. Each pod has its own lead mentor.</p>
            </div>
            <div className="flex items-start gap-3">
              <Video className="mt-1 h-5 w-5 text-[#5a39c6]" />
              <p>Monthly docuseries nights featuring alumni stories and behind-the-scenes workshops.</p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 text-[#5a39c6]" />
              <p>Partner hotline: ask for feedback on a proposal, contract, or interview within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#5a39c6]/60">What keeps the circle strong</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
            Three anchors that shape your experience.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="rounded-[28px] border border-[#5a39c6]/15 bg-[#f7f4ff] p-8 text-sm text-foreground/70 shadow-[0_30px_60px_-48px_rgba(56,31,136,0.3)]">
              <p className="text-base font-semibold text-[#5a39c6]">{pillar.title}</p>
              <p className="mt-3 leading-relaxed">{pillar.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MentorSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#5a39c6]/60">Meet a few of the guides</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
            Nurses and allied experts who have already crossed over.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {MENTORS.map((mentor) => (
            <article key={mentor.name} className="rounded-[28px] border border-[#5a39c6]/15 bg-white p-6 shadow-[0_30px_60px_-48px_rgba(56,31,136,0.25)]">
              <div className="relative h-52 w-full overflow-hidden rounded-3xl">
                <ImageWithFallback
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 28vw, 100vw"
                />
              </div>
              <div className="mt-6 space-y-3 text-sm text-foreground/70">
                <div>
                  <p className="text-base font-semibold text-foreground">{mentor.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#5a39c6]/70">{mentor.specialty}</p>
                </div>
                <p>{mentor.bio}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-[#5a39c6]/30 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a39c6] hover:border-[#5a39c6] hover:bg-[#5a39c6]/10"
          >
            <Link href="/events">Join the next mentor panel</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ChannelSection() {
  return (
    <section className="bg-[#f7f4ff] py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#5a39c6]/60">Rhythm of the week</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">What to expect once you&apos;re inside.</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            Each channel has a clear intention—focus, critique, celebration, or opportunity. Join live or catch replays at your own pace.
          </p>
        </div>

        <div className="mt-12 grid gap-4 text-sm text-foreground/70 sm:grid-cols-2">
          {CHANNELS.map((channel) => (
            <div key={channel} className="rounded-[24px] border border-[#5a39c6]/15 bg-white/90 p-5 shadow-[0_24px_50px_-44px_rgba(56,31,136,0.3)]">
              {channel}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center text-sm text-foreground/70">
          <MessageCircle className="h-5 w-5 text-[#5a39c6]" />
          <p>Stay in touch through Slack, WhatsApp, and live co-working rooms. All details appear in your welcome pack.</p>
        </div>
      </div>
    </section>
  );
}

function PartnerInviteSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#5a39c6]/15 bg-[#f3f0ff] p-10 text-center shadow-[0_36px_70px_-52px_rgba(56,31,136,0.3)]">
          <h2 className="text-3xl font-semibold text-foreground sm:text-[40px]">Want to empower your nurses?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            We collaborate with hospitals, startups, and NGOs to run private labs, cohorts, and talent pilots. Let’s design a programme that fits your organisation.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild className="rounded-full bg-[#5a39c6] px-7 text-sm font-semibold uppercase tracking-[0.22em] text-white hover:bg-[#4c2faf]">
              <Link href="/partnerships">
                Partner with CCN
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#5a39c6]/30 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-[#5a39c6] hover:border-[#5a39c6] hover:bg-[#5a39c6]/10"
            >
              <Link href="/events">Book a private session</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
