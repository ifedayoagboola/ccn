"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Check, Sparkles, Users, Award, TrendingUp, FileText, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/NewsletterSection";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const curriculum = [
  {
    title: "Weeks 1-2 · Your story",
    items: [
      "Map your nursing journey and goals",
      "Write a clear personal statement",
      "Record a sample case-study voice note",
    ],
  },
  {
    title: "Weeks 3-4 · Build proof",
    items: [
      "Turn bedside experience into 3 mini projects",
      "Design a simple online portfolio",
      "Practise introductions with mentors",
    ],
  },
  {
    title: "Weeks 5-6 · Offer value",
    items: [
      "Package your skills into services or roles",
      "Set fair pricing and create rate cards",
      "Learn how to pitch on LinkedIn and email",
    ],
  },
  {
    title: "Weeks 7-9 · Remote-ready",
    items: [
      "Work with real partner briefs",
      "Join live feedback labs each week",
      "Shadow mentors on client calls",
    ],
  },
  {
    title: "Weeks 10-12 · Launch",
    items: [
      "Publish your updated portfolio",
      "Join interview practise sessions",
      "Draft 3 job or client proposals",
    ],
  },
];

const bonuses = [
  "Weekly live studio with design mentor",
  "Done-for-you portfolio templates",
  "Job leads from partner hospitals and startups",
  "Private community support circle",
  "Lifetime access to recordings and worksheets",
];

const partnerCourses = [
  {
    title: "Telehealth Operations Bootcamp",
    partner: "HealthLink Africa",
    discount: "30% off",
    duration: "4 weeks · Weekend classes",
    summary:
      "Learn remote patient documentation, scheduling tools, and compliance so you can support global telehealth teams.",
  },
  {
    title: "Medical Writing for Digital Clinics",
    partner: "Scripted Health",
    discount: "25% off",
    duration: "6 weeks · Hybrid",
    summary:
      "Turn clinical notes into blog posts, education modules, and ghostwritten articles. Includes template pack and mentor edits.",
  },
  {
    title: "Community Health Product Support",
    partner: "CareBridge Labs",
    discount: "40% off",
    duration: "5 weeks · Self-paced + live labs",
    summary:
      "Train on customer support, triage flows, and data tools used by digital health startups across Africa and Europe.",
  },
];

const faqs = [
  {
    question: "Who is the Portfolio Power-Up Challenge for?",
    answer:
      "Registered nurses who want to move into remote-friendly work, improve their income, or start service-based businesses. You do not need tech experience—just a willingness to learn and share your story.",
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
    quote:
      "\"This sprint forced me to slow down, organise my wins, and speak clearly about the value I bring. Two weeks after graduating I landed my first remote care coordination role.\"",
    name: "Chika · Nurse Educator",
  },
  {
    quote:
      "\"The partner course on telehealth operations plus the CCN community helped me transition from ward sister to remote operations lead. My income tripled within six months.\"",
    name: "Ngozi · Telehealth Ops Lead",
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
        <HeroSection />
        <PastProgrammesSection />

        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-background to-secondary/40 -z-10" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
              <div className="space-y-8 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  Past Programme
                </span>
                <h2 className="text-4xl font-semibold text-foreground sm:text-[46px]">
                  Portfolio Power-Up
                </h2>
                <p className="text-lg leading-relaxed text-foreground/70">
                  A 14-day challenge that helped 37 participants build captivating portfolios. Learn strategies to increase visibility, attract job opportunities, and work with real brands to power up your portfolio.
                </p>
                <div className="grid gap-3 text-sm text-foreground/70">
                  <p><strong className="text-foreground">Duration:</strong> 14 days challenge</p>
                  <p><strong className="text-foreground">Dates:</strong> 5th - 19th June, 2025</p>
                  <p><strong className="text-foreground">Participants:</strong> 37 nurses</p>
                  <p><strong className="text-foreground">Coordinator:</strong> Lillian Bamigboye</p>
                </div>

                <div className="grid gap-6 rounded-3xl border border-primary/12 bg-white/90 p-8 shadow-[0_32px_72px_-48px_rgba(41,18,15,0.55)]">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-4">What participants received:</p>
                    <div className="grid gap-3 text-sm text-foreground/70">
                      {[
                        'Daily LinkedIn content',
                        'Strategies to increase visibility and attract job opportunities',
                        'Recommendation letters to participants',
                        'Access to ATS friendly Resume and cover letter templates',
                        'Exclusive opportunity to work with real brands to power up your portfolio',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <Check className="mt-1 h-4 w-4 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button asChild className="w-full rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark sm:w-auto">
                      <Link href="/join">
                        Join the waitlist
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full rounded-full border-primary/25 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary hover:border-primary hover:bg-primary/10 sm:w-auto">
                      <Link href="#past-programmes">View all past programmes</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-[36px] border border-primary/12 bg-white/90 p-6 shadow-[0_32px_72px_-50px_rgba(41,18,15,0.55)]">
                  <div className="relative h-64 w-full overflow-hidden rounded-3xl">
                    <ImageWithFallback
                      src="/assets/remote11.jpeg"
                      alt="Nurses studying together"
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 28vw, 100vw"
                    />
                  </div>
                  <div className="mt-6 space-y-3 text-sm text-foreground/70">
                    <p className="text-sm font-semibold text-primary">Programme Highlights</p>
                    <p>37 nurses completed this challenge and built their portfolios</p>
                    <p>Real brand collaborations to showcase work</p>
                    <p>Daily guidance and support throughout the 14 days</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-foreground/60">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      14 days
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      37 participants
                    </span>
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Real brands
                    </span>
                  </div>
                </div>

                <div className="rounded-[28px] border border-primary/12 bg-white/80 p-6 text-center text-sm text-foreground/70 shadow-[0_24px_60px_-48px_rgba(41,18,15,0.45)] lg:text-left">
                  <p className="text-base font-semibold text-primary">Need help deciding?</p>
                  <p className="mt-2">
                    Join our next info session to meet the mentors, view past portfolios, and ask anything about payment plans.
                  </p>
                  <Button asChild variant="secondary" className="mt-4 w-full rounded-full px-6 text-sm font-semibold text-primary sm:w-auto">
                    <Link href="/events">Book an info session</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="curriculum" className="bg-white py-24 sm:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 text-center">
              <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Inside the sprint</p>
              <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Week-by-week guidance that leaves no nurse behind</h2>
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
                Every week includes live sessions, on-demand lessons, and mentor checkpoints. Missed a class? Replays are waiting for you within one hour.
              </p>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-5">
              {curriculum.map((block) => (
                <div
                  key={block.title}
                  className="space-y-4 rounded-[28px] border border-primary/10 bg-background/80 p-6 text-sm text-foreground/70 shadow-[0_32px_64px_-54px_rgba(41,18,15,0.5)]"
                >
                  <p className="text-sm font-semibold text-primary">{block.title}</p>
                  <ul className="space-y-3">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-1 h-3.5 w-3.5 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="partner-courses" className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-secondary/40 -z-10" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 text-center">
              <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Partner courses</p>
              <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Claim discounted learning paths from trusted providers</h2>
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
                CCN partners with digital health companies and training studios so you can keep learning after the sprint. Enrol through us to enjoy partner-only discounts and mentorship support.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {partnerCourses.map((course) => (
                <div
                  key={course.title}
                  className="flex h-full flex-col justify-between rounded-[28px] border border-primary/12 bg-white p-8 text-sm text-foreground/70 shadow-[0_32px_72px_-50px_rgba(41,18,15,0.45)]"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {course.discount} · {course.partner}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{course.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">{course.duration}</p>
                    <p>{course.summary}</p>
                  </div>
                  <Button
                    asChild
                    className="mt-6 rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary-dark"
                  >
                    <Link href="/join">
                      Enrol with discount
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-[36px] border border-primary/12 bg-white/80 p-8 text-center text-sm text-foreground/70 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.45)]">
              <p className="text-base font-semibold text-primary">Want to add your course?</p>
              <p className="mt-2">
                If you run a programme that supports African nurses, we would love to collaborate. Share your details and we will reach out.
              </p>
              <Button asChild variant="outline" className="mt-4 rounded-full border-primary/25 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10">
                <Link href="/partnerships">Become a partner</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Nurse voices</p>
              <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Stories from women who already made the leap</h2>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-[30px] border border-primary/12 bg-background/90 p-8 text-sm text-foreground/70 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.45)]">
                  <p className="text-lg italic text-foreground">{item.quote}</p>
                  <p className="mt-6 text-sm font-semibold text-primary">{item.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Button asChild className="rounded-full bg-primary px-8 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark">
                <Link href="/stories">
                  Read more stories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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

        <NewsletterSection variant="feature" />
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

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/14 via-white to-secondary/30 -z-10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)] lg:items-center">
          <div className="space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs uppercase tracking-[0.26em] text-primary">
              Programmes overview
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-[56px]">
              Two trusted paths to build your remote nursing career
            </h1>
            <p className="text-lg leading-relaxed text-foreground/70">
              Start with the Portfolio Power-Up Challenge to shape your story, then continue with discounted partner courses to sharpen specialised skills. CCN stays beside you at every step.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-primary px-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark">
                <Link href="/join">
                  Join the next sprint
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary/25 px-7 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
              >
                <Link href="#partner-courses">View partner courses</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Sprint graduates", value: "300+" },
                { label: "Average income lift", value: "2.4×" },
                { label: "Active partners", value: "20+" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-primary/12 bg-white/90 p-6 shadow-[0_28px_60px_-48px_rgba(41,18,15,0.5)]">
                  <p className="text-2xl font-semibold text-primary">{item.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-foreground/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -top-12 rounded-[42px] bg-gradient-to-br from-primary/20 via-secondary/40 to-accent/18 blur-3xl" />
            <div className="relative overflow-hidden rounded-[40px] border border-primary/12 bg-white/85 p-6 shadow-[0_40px_80px_-54px_rgba(41,18,15,0.6)] backdrop-blur">
              <div className="relative h-72 w-full overflow-hidden rounded-3xl">
                <ImageWithFallback
                  src="/assets/remote1.jpeg"
                  alt="Nurse presenting her digital portfolio"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 28vw, 100vw"
                />
              </div>
              <div className="mt-6 space-y-3 text-sm text-foreground/70">
                <p className="text-sm font-semibold text-primary">Real deliverables</p>
                <p>Graduate with a polished portfolio, LinkedIn update pack, and three ready-to-send proposals.</p>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">Support</p>
                <p>Weekly feedback from mentors, accountability pods, and partner-led masterclasses.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
