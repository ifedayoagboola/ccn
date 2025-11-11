"use client";

import Link from "next/link";
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NewsletterSection } from './NewsletterSection';
import { 
  Laptop, 
  Users, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  ExternalLink
} from 'lucide-react';
import { Logo } from './Logo';
import { Footer } from './Footer';

interface LandingPageProps {
  onJoinClick: () => void;
  onNavigate?: (page: string) => void;
}

export function LandingPage({ onJoinClick, onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">

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
                <span>For Nigerian Nurses</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-semibold leading-[1.1] text-foreground sm:text-5xl lg:text-[58px]">
                  Learn new skills, earn better, and still remain a proud nurse.
                </h1>
                <p className="text-lg leading-relaxed text-foreground/75 sm:text-xl">
                  We take you by the hand, showing simple lessons, real examples, and friendly support so you can start a
                  remote job, build a side business, or grow into a bigger role.
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <Button
                  onClick={onJoinClick}
                  size="lg"
                  className="h-14 rounded-full bg-primary px-8 text-base font-semibold tracking-wide text-primary-foreground shadow-[0_22px_40px_-24px_rgba(192,54,49,0.55)] hover:bg-primary-dark"
                  asChild
                >
                  <Link href="/join">
                    Join the waitlist
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-full border-primary/30 px-7 text-base font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                  onClick={() => onNavigate?.('about')}
                >
                  How it works
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  { value: '500+ nurses', label: 'Already learning with CCN' },
                  { value: '4.8 / 5', label: 'Average rating from our members' },
                  { value: '20+ partners', label: 'Hospitals, brands, and startups we work with' },
                ].map((item) => (
                  <div key={item.label} className="group">
                    <div className="flex flex-col gap-2 rounded-3xl border border-primary/10 bg-card/80 p-6 shadow-[0_18px_40px_-28px_rgba(41,18,15,0.35)] backdrop-blur">
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
                      <p className="text-xs uppercase tracking-[0.28em] text-accent-2/70">Flagship programme</p>
                      <p className="mt-2 text-lg font-semibold text-foreground">Remote Career Blueprint</p>
                    </div>
                    <div className="rounded-full border border-primary/15 bg-primary/12 px-4 py-1 text-xs font-medium text-primary">
                      Cohort 07 · 12 weeks
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
                      <span>Next class</span>
                      <span className="font-semibold text-primary">March 28 · Online</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {['AO', 'CE', 'FA'].map((initials) => (
                        <div
                          key={initials}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 bg-primary/12 text-sm font-semibold text-primary"
                        >
                          {initials}
                        </div>
                      ))}
                      <div>
                        <p className="text-sm font-medium text-foreground">Mentor support</p>
                        <p className="text-xs text-foreground/60">Nurses who already work remotely</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    className="h-12 rounded-full border border-primary/20 bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground"
                    onClick={onJoinClick}
                  >
                    Save my seat
                  </Button>
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
                Nigerian nurses deserve peace of mind, good pay, and time for family.
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
                We give you short lessons, easy-to-use templates, and mentors who understand the Nigerian health system. You leave
                knowing what to learn, how to talk about yourself, and where to find remote jobs or extra income ideas that match your goals.
              </p>
            </article>

            <div className="space-y-6 rounded-[36px] border border-primary/10 bg-white/80 p-10 shadow-[0_30px_60px_-32px_rgba(41,18,15,0.55)] backdrop-blur">
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-[0.2em] text-primary">What you get</h3>
                {[
                  {
                    title: 'Plain teaching',
                    copy: 'Short videos and guides that show you what to do first, next, and after.'
                  },
                  {
                    title: 'Friendly community',
                    copy: 'Learn with other nurses, ask questions freely, and get encouragement from mentors.'
                  },
                  {
                    title: 'Simple action plan',
                    copy: 'Leave with a checklist, sample portfolio, and money ideas you can start immediately.'
                  },
                ].map((item) => (
                  <div key={item.title} className="border-t border-dashed border-primary/15 pt-6 first:border-t-0 first:pt-0">
                    <p className="text-base font-semibold text-primary">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What We Do */}
      <section id="programs" className="bg-white py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.28em] text-accent-2/70">What we design</p>
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
              <Link href="/programmes">View full program guide</Link>
            </Button>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-[36px] border border-primary/12 bg-gradient-to-br from-primary/12 via-white to-secondary/30 p-[1.5px] shadow-[0_30px_70px_-40px_rgba(41,18,15,0.55)] lg:col-span-5">
              <div className="h-full w-full rounded-[34px] bg-white/90 p-10 backdrop-blur">
                <div className="flex flex-col gap-8">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-primary">
                    <span>Flagship</span>
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span>12-week studio</span>
                  </div>
                  <div className="space-y-5">
                    <h3 className="text-[34px] font-semibold leading-snug text-foreground">
                      Portfolio Power-Up Challenge
                      <span className="block text-primary">Tell your story, show your skills, attract remote work.</span>
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      We help you write your story, design simple work samples, and practise how to talk to clients or employers.
                      Everything is broken into weekly tasks so you never feel confused.
                    </p>
                  </div>
                  <ul className="space-y-4 text-sm text-foreground/70">
                    {[
                      'Create a clear personal story that shows your value.',
                      'Learn how to offer services or apply for remote roles with confidence.',
                      'Build a simple online portfolio with mentor review each week.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-2 h-12 rounded-full bg-primary px-6 text-sm font-semibold tracking-wide text-primary-foreground hover:bg-primary-dark"
                    onClick={onJoinClick}
                    asChild
                  >
                    <Link href="/join">Join this class</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:col-span-7">
              {[
                {
                  icon: <Laptop className="h-5 w-5 text-primary" />,
                  label: '01',
                  title: 'Digital skill residencies',
                  description:
                    'Short trainings in telehealth support, writing, community management, and more, using real examples from partners.',
                  cta: 'See training list',
                },
                {
                  icon: <Users className="h-5 w-5 text-accent" />,
                  label: '02',
                  title: 'Mentor circle',
                  description:
                    'Nurses who have already made the switch give you honest feedback, mock interviews, and phone call practise.',
                  cta: 'Meet the mentors',
                },
                {
                  icon: <Target className="h-5 w-5 text-accent-2" />,
                  label: '03',
                  title: 'Opportunities lab',
                  description:
                    'We send remote job leads, contract gigs, and partnership openings that fit the skills you develop with us.',
                  cta: 'View openings',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[32px] border border-primary/12 bg-white p-8 shadow-[0_26px_60px_-40px_rgba(41,18,15,0.45)] transition hover:-translate-y-1 hover:shadow-[0_42px_80px_-48px_rgba(41,18,15,0.5)]"
                >
                  <div className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">
                    <span>{item.label}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/12 bg-primary/10">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.description}</p>
                  <Link
                    href="/programmes#partner-courses"
                    className="mt-6 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary-dark"
                  >
                    {item.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Impact */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-secondary/60 -z-10" />
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Results</p>
            <h2 className="text-4xl font-semibold text-foreground sm:text-[42px]">
              Real change our nurses can feel at home and at work.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/70">
              These numbers come from follow-up calls and surveys with nurses who completed our core programs.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-full border border-primary/12 bg-white/90 shadow-[0_40px_80px_-60px_rgba(41,18,15,0.45)] backdrop-blur">
            <div className="grid gap-6 px-8 py-8 sm:grid-cols-3 sm:px-12">
              {[
                {
                  heading: 'Stay with the program',
                  stat: '92%',
                  subtext: 'Nurses still active in the community nine months after joining.',
                },
                {
                  heading: 'Income growth',
                  stat: '2.4×',
                  subtext: 'Average increase in monthly earnings within six months.',
                },
                {
                  heading: 'Where they now work',
                  stat: '15 countries',
                  subtext: 'Members now serving clients and patients across Africa, Europe, and North America.',
                },
              ].map((item) => (
                <div key={item.heading} className="flex flex-col items-start gap-3 border-primary/10 sm:border-l first:sm:border-l-0 sm:pl-10">
                  <span className="text-xs uppercase tracking-[0.28em] text-foreground/50">{item.heading}</span>
                  <span className="font-heading text-[42px] font-semibold text-primary">{item.stat}</span>
                  <span className="text-sm leading-relaxed text-foreground/70">{item.subtext}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-accent-2/70">Deep dive</p>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-primary/25 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
            >
              See the full impact story
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section 5: Featured Program */}
      <section id="membership" className="bg-white py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary">
                <span>Signature sprint</span>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span>6 weeks online</span>
              </div>
              <h2 className="text-4xl font-semibold leading-tight text-foreground sm:text-[44px]">
                Portfolio Power-Up Challenge
              </h2>
              <p className="text-lg leading-relaxed text-foreground/75">
                A guided sprint that helps you craft your story, show your skills, and connect with remote clients or employers.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: 'Identity lab',
                    description: 'We craft your narrative, signature services, and audience hypothesis.',
                  },
                  {
                    title: 'Story craft',
                    description: 'Weekly critique circles to shape case studies and thought pieces that convert.',
                  },
                  {
                    title: 'Mentor mirror',
                    description: '1:1 feedback from nurses who now advise, design, and build from anywhere.',
                  },
                  {
                    title: 'Opportunity runway',
                    description: 'We map clients, roles, and collaborations that match your new positioning.',
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
                  onClick={onJoinClick}
                  asChild
                >
                  <Link href="/join">
                    Join the challenge
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-primary/25 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
                  asChild
                >
                  <Link href="/events">Course calendar</Link>
                </Button>
              </div>
            </div>

            <div className="relative order-first overflow-hidden rounded-[32px] border border-primary/12 bg-secondary/70 shadow-[0_40px_80px_-50px_rgba(41,18,15,0.55)] lg:order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/20" />
              <div className="relative h-[480px]">
                <ImageWithFallback
                  src="/assets/remote9.jpeg"
                  alt="Nurses in online workshop"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                />
                <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-primary/10 bg-white/85 p-6 backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/70">Cohort highlights</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                    38 nurses reimagined their careers last quarter. 82% shipped new portfolios; 67% secured remote roles
                    or clients within eight weeks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section id="community" className="bg-background py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 text-center sm:items-center">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-2/70">Voices from inside</p>
            <h2 className="max-w-3xl text-4xl font-semibold text-foreground sm:text-[44px]">
              Built for bedside experts who know they are more.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/70">
              Every nurse carries a before-and-after story. We honour the nuance behind each transformation.
            </p>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
            <div className="rounded-[36px] border border-primary/12 bg-white p-10 shadow-[0_40px_80px_-60px_rgba(41,18,15,0.45)]">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-primary/15">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1755189118414-14c8dacdb082?auto=format&fit=crop&w=240&q=80"
                      alt="Amaka O."
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-semibold text-foreground">Amaka O.</p>
                    <p className="text-sm text-foreground/60">Telehealth Nurse · Lagos</p>
                  </div>
                </div>
                <p className="text-lg italic text-foreground">
                  “Before CCN I worked day and night. Now I see fewer patients online, earn more, and still have time for my children. The lessons were simple and the mentors treated me like family.”
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {[
                {
                  quote:
                    '“The challenge helped me write my story in plain English. I used the template, sent it to a client, and got my first paid medical writing job within four weeks.”',
                  name: 'Chidi E.',
                  role: 'Medical Writer · Abuja',
                  image: 'https://images.unsplash.com/photo-1676552055618-22ec8cde399a?auto=format&fit=crop&w=200&q=80',
                },
                {
                  quote:
                    '“I thought online work was only for tech bros. CCN showed me simple tools and gave me courage. I now teach health classes on Zoom and earn in dollars.”',
                  name: 'Folake A.',
                  role: 'Health Educator · Ibadan',
                  image: 'https://images.unsplash.com/photo-1643246681510-b917ea41b893?auto=format&fit=crop&w=200&q=80',
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="rounded-[28px] border border-primary/12 bg-white/80 p-6 shadow-[0_28px_60px_-48px_rgba(41,18,15,0.45)]"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-primary/15">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-foreground/60">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/75">{item.quote}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-primary/25 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
              asChild
            >
              <Link href="/community">
                Meet the community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 7: Join the Movement */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/14 via-white to-secondary/30 -z-10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">Ready to take the next step?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-foreground/75">
            Join the waitlist to receive easy-to-follow resources and be first to know when a new class opens. Already in tech or running a program? Partner with us to support more nurses.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={onJoinClick}
              className="h-12 rounded-full bg-primary px-8 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark"
              asChild
            >
              <Link href="/join">
                Join the waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full border-primary/25 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-primary hover:border-primary hover:bg-primary/10"
              asChild
            >
              <Link href="/partnerships">
                Partner with us
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.26em] text-foreground/50">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary/60" />
              Remote-friendly skills
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary/60" />
              Supportive mentors
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary/60" />
              Clear money plan
            </span>
          </div>
        </div>
      </section>

      {/* Newsletter/Waitlist Section */}
      <NewsletterSection variant="feature" />
      <Footer />
    </div>
  );
}

