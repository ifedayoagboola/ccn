"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Check, Users, Award, TrendingUp, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const bonuses = [
  "Weekly live studio with design mentor",
  "Done-for-you portfolio templates",
  "Job leads from partner hospitals and startups",
  "Private community support circle",
  "Lifetime access to recordings and worksheets",
];

const faqs = [
  {
    question: "Who is the Portfolio Power-Up Challenge for?",
    answer:
      "Registered nurses who want to move into remote-friendly work, improve their income, or start service-based businesses. You do not need tech experience - just a willingness to learn and share your story.",
  },
  {
    question: "How much time do I need each week?",
    answer:
      "Plan for 4 to 6 hours. Two live sessions (which are recorded), one mentor check-in, and solo work on your portfolio tasks.",
  },
  {
    question: "Do I get a certificate?",
    answer:
      "Yes. Graduates receive a CCN digital certificate and a partner reference letter once they submit their portfolio.",
  },
  {
    question: "How do the partner course discounts work?",
    answer:
      "Join the CCN waitlist, choose a course, and we send you the partner code plus payment instructions. Discounts are limited each quarter.",
  },
];

const testimonials = [
  {
    quote: "Built a two-page triage case study - landed a $32/hr weekend contract two weeks later.",
    name: "Chika Okafor",
    role: "Nurse Educator → Remote Care Coordinator",
    result: "$32/hr remote triage",
    location: "Abuja → US clinic",
    timeframe: "Cohort: Apr 2025",
    color: "from-amber-100/80 via-white to-primary/15",
    image: "/assets/remote2.jpeg",
  },
  {
    quote: "Walked into panel with an ops pack they could feel - left with Telehealth Ops Lead at 3x ward pay.",
    name: "Ngozi Eze",
    role: "Ward Sister → Telehealth Ops Lead",
    result: "3x salary + relocation",
    location: "Enugu → Nairobi",
    timeframe: "Cohort: Jan 2025",
    color: "from-emerald-100/80 via-white to-secondary/18",
    image: "/assets/remote5.jpeg",
  },
  {
    quote: "Framed oncology wins as onboarding proof - hired remote to run patient success while keeping 4-day rota.",
    name: "Fatima Bello",
    role: "Oncology RN → Patient Success Manager",
    result: "Remote offer, 3 interviews",
    location: "Lagos → Remote",
    timeframe: "Cohort: Sep 2024",
    color: "from-sky-100/80 via-white to-primary/16",
    image: "/assets/remote7.jpeg",
  },
];

const pastProgrammes = [
  {
    title: "Portfolio Power-Up",
    subtitle: "Helping participants build a captivating portfolio",
    duration: "14 days challenge",
    dates: "5th - 19th June, 2025",
    participants: 37,
    coordinator: "Lillian Bamigboye",
    perks: [
      "Daily LinkedIn content",
      "Strategies to increase visibility and attract job opportunities",
      "Recommendation letters to participants",
      "Access to ATS friendly Resume and cover letter templates",
      "Exclusive opportunity to work with real brands to power up your portfolio",
    ],
    hashtag: null,
    fee: null,
  },
  {
    title: "Unmute your brand with Lillian",
    subtitle: "20 days intensive LinkedIn challenge to double your brand virtual presence",
    duration: "20 days",
    dates: "30th April - 20th May",
    participants: null,
    coordinator: "Lillian Bamigboye",
    speakers: ["Lillian Bamigboye", "Adu Joshua Opeyemi"],
    perks: [
      "Content templates that spark engagement",
      "Daily LinkedIn consistency tasks",
      "LinkedIn consistency secrets for brand owners",
      "Q and A section with top LinkedIn creators",
      "Daily affirmations",
    ],
    hashtag: null,
    fee: "N4,000 / $3",
  },
  {
    title: "Unmute your brand with Lillian 2.0",
    subtitle: "Visible November - 11 days intensive brand visibility challenge",
    duration: "11 days",
    dates: "November 16th - November 26th",
    participants: null,
    coordinator: "Lillian Bamigboye",
    hashtag: "#visiblenovember",
    fee: null,
    wins: [
      "A complete LinkedIn Optimization Bundle",
      "Increased visibility for your personal or business brand",
      "A 10-day post idea plan designed to help you stay consistent",
      "Accountability and daily guidance to keep you on track",
      "Improved engagement and profile traction",
      "A supportive community of professionals just like you",
      "Networking opportunities with new collaborators",
      "A Certificate of Completion at the end of the challenge",
    ],
    dailyPrompts: [
      { day: 1, title: "Audit Your Digital Presence", prompt: "Before showing up, check what people see when they visit your page. Post your first impressions of your LinkedIn profile, what works, what you're changing, what surprised you." },
      { day: 2, title: "Clarify Your Core Message", prompt: "Write one post explaining what you want to be known for. If someone mentions your name in a room, what should come to mind?" },
      { day: 3, title: "Demonstrate Expertise", prompt: "Share a mini case study, something you did, how you did it, and the result. Even a small win counts." },
      { day: 4, title: "Educate, Don't Just Post", prompt: "Teach your audience one small thing related to your niche. A shortcut, a framework, or a step-by-step breakdown." },
      { day: 5, title: "Join a Conversation", prompt: "Find a trending topic in your field and share your take on it. You don't have to agree, your perspective matters." },
      { day: 6, title: "Leverage Social Proof", prompt: "Share a screenshot, testimonial, or kind feedback you've received (with permission)." },
      { day: 7, title: "Collaborate or Give Value", prompt: "Mention someone in your field, highlight their work, or collaborate on a short post. Visibility grows faster when shared." },
      { day: 8, title: "Build in Public", prompt: "Share something you're currently working on or learning, even if it's unfinished." },
      { day: 9, title: "Share a Bold Opinion", prompt: "Say something you believe deeply about your industry, career growth, or mindset, something most people overlook or disagree with." },
      { day: 10, title: "Visibility Reflection", prompt: "Write about your #VisibleNovember experience, what changed for you, what you learned, and how you plan to keep showing up." },
    ],
  },
];

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="programmes" />
      <main>
        <PastProgrammesSection />

        <section className="relative overflow-hidden bg-white py-24 sm:py-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute right-10 bottom-6 h-80 w-80 rounded-full bg-secondary/25 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-primary/5" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-sm">
                  Nurse voices
                  <Check className="h-3 w-3" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-4xl font-semibold text-foreground sm:text-[44px] leading-tight">
                    Real nurses, real wins - captured in colour.
                  </h2>
                  <p className="max-w-xl text-base leading-relaxed text-foreground/70">
                    Fresh, believable snapshots from the last three cohorts. Short, visual, and proof-first so you can picture your own leap.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Offers in weeks
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                    <Check className="h-4 w-4 text-secondary-foreground" />
                    Verified artefacts
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    Remote & relocation
                  </span>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {testimonials.map((item, index) => (
                  <article
                    key={item.name}
                    className={cn(
                      "group relative overflow-hidden rounded-[28px] border border-primary/12 bg-gradient-to-br p-4 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.45)] backdrop-blur",
                      item.color,
                      index === 0 ? "sm:col-span-2" : ""
                    )}
                  >
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 32vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary shadow-sm">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {item.result}
                      </div>
                      <div className="absolute top-3 right-3 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/80">
                        {item.timeframe}
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-foreground/60">{item.role}</p>
                          <p className="text-lg font-semibold text-foreground">{item.name}</p>
                          {item.location && <p className="text-[11px] text-foreground/60 mt-1">{item.location}</p>}
                        </div>
                        <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                          Proof
                        </span>
                      </div>
                      <p className="text-base leading-relaxed text-foreground/85">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/14 via-white to-secondary/30 -z-10" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Questions</p>
              <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Frequently asked</h2>
              <p className="text-base leading-relaxed text-foreground/70">
                Still unsure? Our mentors are happy to jump on a call. Email hello@counterculturalnurses.com or message us on WhatsApp after you join the waitlist.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-[28px] border border-primary/12 bg-white/90 p-6 shadow-[0_28px_60px_-48px_rgba(41,18,15,0.45)]"
                >
                  <summary className={cn("cursor-pointer text-base font-semibold text-foreground", "marker:hidden flex items-center justify-between gap-4")}
                  >
                    {faq.question}
                    <span className="text-xl text-primary transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/70">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

function PastProgrammesSection() {
  return (
    <section id="past-programmes" className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-16">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">CCN&apos;s past programmes</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
            Proven programmes that have transformed careers
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            These programmes have helped nurses build portfolios, amplify their brands, and connect with opportunities. See what participants achieved and get ready for what&apos;s next.
          </p>
        </div>

        <div className="space-y-12">
          {pastProgrammes.map((programme, index) => (
            <div
              key={programme.title}
              className={`grid gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="rounded-[32px] border border-primary/12 bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-8 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.35)] h-full">
                  <div className="space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-4">
                        <Award className="h-3 w-3" />
                        Past Programme
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-2">{programme.title}</h3>
                      <p className="text-sm text-foreground/70">{programme.subtitle}</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span><strong className="text-foreground">Duration:</strong> {programme.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span><strong className="text-foreground">Dates:</strong> {programme.dates}</span>
                      </div>
                      {programme.participants && (
                        <div className="flex items-center gap-2 text-foreground/70">
                          <Users className="h-4 w-4 text-primary" />
                          <span><strong className="text-foreground">Participants:</strong> {programme.participants}</span>
                        </div>
                      )}
                      {programme.fee && (
                        <div className="flex items-center gap-2 text-foreground/70">
                          <span><strong className="text-foreground">Fee:</strong> {programme.fee}</span>
                        </div>
                      )}
                      {programme.hashtag && (
                        <div className="flex items-center gap-2 text-foreground/70">
                          <span><strong className="text-foreground">Hashtag:</strong> {programme.hashtag}</span>
                        </div>
                      )}
                      <div className="pt-3 border-t border-primary/10">
                        <p className="text-xs font-semibold text-primary mb-2">Coordinator</p>
                        <p className="text-sm text-foreground">{programme.coordinator}</p>
                        {programme.speakers && (
                          <>
                            <p className="text-xs font-semibold text-primary mb-2 mt-3">Speakers</p>
                            <div className="space-y-1">
                              {programme.speakers.map((speaker) => (
                                <p key={speaker} className="text-sm text-foreground">{speaker}</p>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="rounded-[32px] border border-primary/12 bg-white p-8 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.35)] h-full">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        {programme.wins ? 'Wins for Participants' : 'Perks'}
                      </h4>
                      <ul className="space-y-3">
                        {(programme.wins || programme.perks || []).map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-foreground/70">
                            <Check className="mt-1 h-4 w-4 text-primary flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {programme.dailyPrompts && (
                      <div className="pt-6 border-t border-primary/10">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          10-Day Posting Prompts
                        </h4>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                          {programme.dailyPrompts.map((prompt) => (
                            <div key={prompt.day} className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                  {prompt.day}
                                </span>
                                <span className="text-sm font-semibold text-foreground">Day {prompt.day} - {prompt.title}</span>
                              </div>
                              <p className="text-xs text-foreground/70 leading-relaxed">{prompt.prompt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="rounded-[32px] border border-primary/12 bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-8 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.35)]">
            <h3 className="text-2xl font-semibold text-foreground mb-3">Ready to join the next programme?</h3>
            <p className="text-base text-foreground/70 mb-6 max-w-2xl mx-auto">
              Be the first to know when we launch new programmes. Join the waitlist and get early access to registration.
            </p>
            <Button asChild className="rounded-full bg-primary px-8 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark">
              <Link href="/join">
                Join the waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
