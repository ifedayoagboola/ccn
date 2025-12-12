"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { WaitlistModal } from './modals/WaitlistModal';
import { CommunityJoinModal } from './modals/CommunityJoinModal';
import { EventJoinModal } from './modals/EventJoinModal';
import { CommunityJoinPaymentModal } from './modals/CommunityJoinPaymentModal';
import { 
  Laptop, 
  Users, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Brain,
  UserCheck,
  FileText,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { Logo } from './Logo';
import { Footer } from './Footer';

type HeroPromotionType = 'waitlist' | 'community' | 'event';

interface LandingPageProps {
  onJoinClick: () => void;
  onNavigate?: (page: string) => void;
}

export function LandingPage({ onJoinClick, onNavigate }: LandingPageProps) {
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [communityModalOpen, setCommunityModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  // For now, focus is on waitlist. This can be changed to 'community' or 'event' later
  const heroPromotion: HeroPromotionType = 'waitlist';
  const partners = [
    { name: 'Nodeshift', logoSrc: '/assets/nodeshift.jpeg' },
    { name: 'Sellexa', logoSrc: '/assets/sellexa-high-resolution-logo-transparent.png' },
    { name: 'BSIS', logoSrc: '/assets/bsis.avif' },
    { name: 'The Bull Squad', logoSrc: '/assets/thebullsquad.svg' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <WaitlistModal open={waitlistModalOpen} onOpenChange={setWaitlistModalOpen} />
      <CommunityJoinModal open={communityModalOpen} onOpenChange={setCommunityModalOpen} />
      <EventJoinModal open={eventModalOpen} onOpenChange={setEventModalOpen} />
      <CommunityJoinPaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-background to-secondary -z-10" />
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute bottom-16 left-1/4 h-72 w-72 rounded-full bg-accent-2/12 blur-[140px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.1fr)_420px]">
            <div className="space-y-12">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary">
                <span>Counter Cultural Nurses</span>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span>For African Nurses</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-semibold leading-[1.1] text-foreground sm:text-5xl lg:text-[58px]">
                  Helping African Nurses Soar Beyond the Bedside.
                </h1>
                <p className="text-lg leading-relaxed text-foreground/75 sm:text-xl">
                  Empowering nurses with digital skills, remote opportunities, and financial freedom.
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <Button
                  onClick={() => setPaymentModalOpen(true)}
                  size="lg"
                  className="h-14 rounded-full bg-primary px-8 text-base font-semibold tracking-wide text-primary-foreground shadow-[0_22px_40px_-24px_rgba(192,54,49,0.55)] hover:bg-primary-dark"
                >
                  Join the movement
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-full border-primary/30 px-7 text-base font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                  onClick={() => onNavigate?.('about')}
                >
                  Learn More
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  { value: '200+', label: 'Nurses on the waitlist' },
                  { value: 'Dec 12', label: 'Official launch date' },
                  { value: 'Partners ready', label: 'Education, mentoring, HR & more' },
                ].map((item) => (
                  <div key={item.label} className="group">
                    <div className="flex h-full flex-col gap-2 rounded-3xl border border-primary/10 bg-card/80 p-6 shadow-[0_18px_40px_-28px_rgba(41,18,15,0.35)] backdrop-blur">
                      <span className="text-3xl font-semibold text-primary">{item.value}</span>
                      <span className="text-sm leading-relaxed text-foreground/70">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -left-6 rounded-[40px] bg-gradient-to-br from-primary/18 via-secondary/40 to-accent/18 blur-3xl" />
              <div className="relative overflow-hidden rounded-[38px] border border-primary/12 bg-card/85 p-10 shadow-[0_32px_64px_-34px_rgba(41,18,15,0.55)] backdrop-blur">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-accent-2/70">Launching soon</p>
                      <p className="mt-2 text-lg font-semibold text-foreground">December 12, 2025</p>
                    </div>
                    <div className="rounded-full border border-primary/15 bg-primary/12 px-4 py-1 text-xs font-medium text-primary">
                      Launch Day
                    </div>
                  </div>

                  <div className="relative h-48 overflow-hidden rounded-3xl">
                    <ImageWithFallback
                      src="/assets/remote4.jpeg"
                      alt="Workshop with African nurses"
                      fill
                      className="object-cover object-top"
                      sizes="420px"
                    />
                  </div>

                  <div className="space-y-5 text-sm text-foreground/70">
                    <div className="flex items-center justify-between">
                      <span>First 100 members</span>
                      <span className="font-semibold text-primary">Personalized career guidance</span>
                    </div>
                    <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                      <div className="flex items-start gap-3">
                        <Users className="mt-0.5 h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Mentor support</p>
                          <p className="text-xs text-foreground/60">Nurses who already work remotely</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-5">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">200+ nurses waiting</span>
                        <span className="text-xs text-primary font-semibold">Be among the first 50</span>
                      </div>
                      <div className="h-2 rounded-full bg-primary/10 overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                      </div>
                      <p className="text-xs text-foreground/60">15 spots remaining for launch day</p>
                    </div>
                    <Button
                      variant="secondary"
                      className="w-full h-11 rounded-full border border-primary/20 bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground text-sm font-semibold"
                      onClick={() => setWaitlistModalOpen(true)}
                    >
                      Secure your spot
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why We Exist */}
      <section id="about" className="relative overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-background/60 to-white -z-10" />
        <div className="absolute top-24 right-16 hidden h-64 w-64 rounded-full bg-accent/12 blur-3xl lg:block" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,0.45fr)]">
            <article className="space-y-8">
              <div className="text-xs uppercase tracking-[0.28em] text-accent-2/70">
                Why we exist
              </div>
              <h2 className="text-4xl font-semibold leading-tight text-foreground sm:text-[44px]">
                African nurses deserve peace of mind, good pay, and time for self and family.
              </h2>
              <p className="text-lg leading-relaxed text-foreground/75 first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-semibold first-letter:text-primary">
                Many hardworking nurses feel stuck. Shifts are long, salaries are low, and it is hard to see a clear path
                into better roles. CCN breaks everything into plain steps so you can learn new skills, practise with support,
                and grow without feeling lost or alone.
              </p>
              <div className="rounded-3xl border border-primary/15 bg-secondary/60 p-8 shadow-[0_24px_48px_-36px_rgba(41,18,15,0.45)]">
                <p className="text-lg italic text-foreground">
                  &ldquo;You can keep caring for people and also build a life that feels calm, respected, and well paid.&rdquo;
                </p>
              </div>
              <p className="text-lg leading-relaxed text-foreground/75">
                We provide structured programs, practical templates, and mentors who understand the African healthcare context. Through our community, you&apos;ll discover your strengths, build a clear career vision, connect with opportunities that match your goals, and learn how to position yourself for remote work and digital income streams.
              </p>
            </article>

            <div className="space-y-6 rounded-[36px] border border-primary/10 bg-white/80 p-10 shadow-[0_30px_60px_-32px_rgba(41,18,15,0.55)] backdrop-blur">
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-[0.2em] text-primary">What CCN offers you</h3>
                {[
                  {
                    title: 'Personalized career guidance',
                    copy: 'Get clear direction on your career path. We help you understand your strengths, identify opportunities that fit you, and create a roadmap to reach your goals.'
                  },
                  {
                    title: 'Mentorship',
                    copy: 'Connect with nurses who&apos;ve already made the transition. Get honest advice, feedback on your work, and support from people who understand your journey.'
                  },
                  {
                    title: 'Vibrant community',
                    copy: 'Join a supportive circle of African nurses building remote careers. Share wins, ask questions, and grow together with accountability pods and weekly programming.'
                  },
                  {
                    title: 'Remote work opportunities',
                    copy: 'Access verified remote job listings, contract gigs, and partnership openings. We connect you with opportunities that match the skills you&apos;re developing.'
                  },
                ].map((item) => (
                  <div key={item.title} className="border-t border-dashed border-primary/15 pt-6 first:border-t-0 first:pt-0">
                    <p className="text-base font-semibold text-primary">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.copy}</p>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-primary/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
              >
                <Link href="/about">Read the full story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Community Preview */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary">
                <span>CCN Community</span>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span>Live & Active</span>
              </div>
              <h2 className="text-4xl font-semibold leading-tight text-foreground sm:text-[44px]">
                A circle where nurses learn, experiment, and grow together.
              </h2>
              <p className="text-lg leading-relaxed text-foreground/75">
                Join a living studio of African nurses building remote careers. You&apos;ll get mentors, accountability pods, and weekly programming designed to keep you moving forward.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: 'Mentor circle',
                    description: 'Nurses who have already transitioned into remote work host weekly office hours, answer questions, and share their processes.',
                  },
                  {
                    title: 'Accountability pods',
                    description: 'You&apos;re matched with peers pursuing similar goals - whether that&apos;s telehealth, health writing, or launching a digital product.',
                  },
                  {
                    title: 'Partner lab',
                    description: 'Collaborate with hospitals, startups, and NGOs who trust CCN nurses for contract roles, pilots, and research projects.',
                  },
                  {
                    title: 'Weekly rhythm',
                    description: 'Monday focus notes, Wednesday critique labs, Friday wins, and monthly partner demo days keep the momentum going.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-primary/12 bg-white/90 p-6 shadow-[0_24px_56px_-44px_rgba(41,18,15,0.5)]">
                    <p className="text-sm font-semibold text-primary">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  className="h-12 rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary-dark"
                  onClick={() => setPaymentModalOpen(true)}
                >
                  Join the movement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative order-first overflow-hidden rounded-[32px] border border-primary/12 bg-white/90 shadow-[0_40px_80px_-50px_rgba(41,18,15,0.55)] lg:order-last">
              <div className="relative h-[480px]">
                <ImageWithFallback
                  src="/assets/remote9.jpeg"
                  alt="Nurses collaborating in community"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-primary/10 bg-white/95 p-6 backdrop-blur shadow-[0_20px_40px_-24px_rgba(41,18,15,0.35)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/70">Community highlights</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                    500+ nurses actively learning and growing together. Weekly mentor sessions, accountability pods, and partner opportunities keep everyone moving forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Partners / Clients */}
      <section
        id="community"
        className="bg-background py-8 sm:py-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-center sm:items-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-accent-2/70">Partners & Clients</p>
            <h2 className="max-w-3xl text-3xl font-semibold text-foreground sm:text-[38px]">
              Trusted by teams who want remote-ready African nurses.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/70">
              A quick look at some of the organisations collaborating with CCN.
            </p>
          </div>

          <div className="mt-6 rounded-[18px] border border-primary/12 bg-white/90 p-4 shadow-[0_24px_50px_-50px_rgba(41,18,15,0.45)] sm:p-5">
            <div className="relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/90 to-white/0 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/90 to-white/0 pointer-events-none" />
              <div className="marquee flex items-center gap-4 sm:gap-6 md:gap-7 py-1">
                {partners
                  .concat(partners)
                  .map((partner, idx) => (
                    <div
                      key={`${partner.name}-${idx}`}
                      className="flex min-w-[140px] items-center justify-center gap-3 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/6 via-white to-secondary/8 px-3.5 py-2.5 shadow-[0_16px_38px_-34px_rgba(41,18,15,0.4)]"
                    >
                      {partner.logoSrc ? (
                        <div
                          className={`
                            flex items-center justify-center rounded-xl bg-primary/6
                            ${partner.name.toLowerCase() === 'sellexa' ? 'h-10 w-16' : 'h-9 w-9'}
                          `}
                        >
                          <ImageWithFallback
                            src={partner.logoSrc}
                            alt={`${partner.name} logo`}
                            width={partner.name.toLowerCase() === 'sellexa' ? 64 : 36}
                            height={partner.name.toLowerCase() === 'sellexa' ? 40 : 36}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/12 text-xs font-semibold text-primary">
                          {partner.name
                            .split(' ')
                            .map((word) => word[0])
                            .join('')
                            .slice(0, 3)
                            .toUpperCase()}
                        </div>
                      )}
                      {partner.name.toLowerCase() !== 'sellexa' && (
                        <span className="text-sm font-semibold text-foreground/80 whitespace-nowrap">{partner.name}</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-sm font-semibold text-primary hover:text-primary-dark"
                asChild
              >
                <Link href="/partnerships">Explore partnerships</Link>
              </Button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .marquee {
            width: max-content;
            animation: marquee 20s linear infinite;
          }
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

      {/* Section 5: What We Do */}
      <section id="programs" className="bg-white py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-16">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.28em] text-accent-2/70">Our programmes</p>
              <h2 className="text-4xl font-semibold text-foreground sm:text-[42px]">
                Programs that make it easy to move from bedside work to online earnings.
              </h2>
              <p className="text-base leading-relaxed text-foreground/70">
                Every program uses simple language, live support, and practical assignments so you always know what to do next.
              </p>
            </div>
            <Button
              variant="outline"
              className="self-start rounded-full border-primary/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
              asChild
            >
              <Link href="/programmes">See our past Programmes</Link>
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: <FileText className="h-6 w-6 text-primary" />,
                title: 'Portfolio Power-Up',
                subtitle: '14 days challenge',
                dates: '5th - 19th June, 2025',
                participants: '37 participants',
                description: 'Helping participants build a captivating portfolio with daily LinkedIn content, visibility strategies, and real brand opportunities.',
                coordinator: 'Lillian Bamigboye',
                cta: 'View details',
                href: '/programmes#portfolio-power-up',
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-primary" />,
                title: 'Unmute your brand with Lillian',
                subtitle: '20 days intensive',
                dates: '30th April - 20th May',
                participants: null,
                description: 'Double your brand virtual presence with content templates, daily consistency tasks, and Q&A sessions with top LinkedIn creators.',
                coordinator: 'Lillian Bamigboye',
                cta: 'View details',
                href: '/programmes#unmute-brand',
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-primary" />,
                title: 'Visible November',
                subtitle: '11 days challenge',
                dates: '16th - 26th November',
                participants: null,
                description: 'Complete LinkedIn optimization with 10-day posting prompts, accountability guidance, and networking opportunities.',
                coordinator: 'Lillian Bamigboye',
                cta: 'View details',
                href: '/programmes#visible-november',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-[32px] border border-primary/12 bg-white p-8 shadow-[0_26px_60px_-40px_rgba(41,18,15,0.45)] transition hover:-translate-y-1 hover:shadow-[0_42px_80px_-48px_rgba(41,18,15,0.5)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 bg-primary/10">
                  {item.icon}
                </div>
                <div className="mb-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
                    {item.subtitle}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <div className="space-y-1 text-xs text-foreground/60 mb-3">
                    <p><strong>Dates:</strong> {item.dates}</p>
                    {item.participants && <p><strong>Participants:</strong> {item.participants}</p>}
                    <p><strong>Coordinator:</strong> {item.coordinator}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/70">{item.description}</p>
                </div>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary-dark"
                >
                  {item.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: AI Career Navigator */}
      <section className="bg-white py-24 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary">
                <Brain className="h-4 w-4" />
                <span>Coming Soon</span>
              </div>
              <h2 className="text-4xl font-semibold leading-tight text-foreground sm:text-[44px]">
                AI Career Navigator: Your Personal Guide to Success
              </h2>
              <p className="text-lg leading-relaxed text-foreground/75">
                We&apos;re building an AI-powered tool designed to help you create a clearer vision and navigate your career more smoothly. Our AI integration will help confused individuals identify their strengths and weaknesses, and recommend mentors, programmes, and courses to help take them to their next level.
              </p>
              <div className="rounded-3xl border border-primary/15 bg-primary/5 p-6">
                <p className="text-sm font-semibold text-primary mb-4">What the AI will help you with:</p>
                <ul className="space-y-3 text-sm text-foreground/70">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Create a clearer vision for your remote career journey</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Identify your strengths and areas for growth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Get personalized recommendations for mentors who match your goals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Discover programmes and courses tailored to your career path</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Navigate your career transition with confidence and clarity</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/12 bg-background/50 p-6">
                <p className="text-sm text-foreground/70">
                  <strong className="text-foreground">Note:</strong> The AI Career Navigator is currently in development. We&apos;re working hard to bring you this powerful tool that will make your career journey smoother and more personalized. Stay tuned for updates!
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="sticky top-24">
                <div className="rounded-[32px] border border-primary/12 bg-gradient-to-br from-primary/5 via-white to-secondary/10 p-8 shadow-[0_36px_80px_-52px_rgba(41,18,15,0.35)]">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="rounded-full border border-primary/20 bg-primary/10 p-6">
                      <Brain className="h-12 w-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">AI Career Navigator</h3>
                      <p className="text-sm text-foreground/70">Coming Soon</p>
                    </div>
                    <div className="w-full space-y-3 text-sm text-foreground/70">
                      <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white/50 p-3">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span>Personalized career guidance</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white/50 p-3">
                        <UserCheck className="h-5 w-5 text-primary" />
                        <span>Mentor matching</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white/50 p-3">
                        <Target className="h-5 w-5 text-primary" />
                        <span>Programme recommendations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

