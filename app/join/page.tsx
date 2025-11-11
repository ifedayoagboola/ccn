"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Mail,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  Star,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewsletterSection } from "@/components/NewsletterSection";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";

const STEPS = [
  {
    title: "Step 1",
    label: "Pick your path",
    description: "Choose the flagship sprint or a discounted partner course. We guide you from there.",
  },
  {
    title: "Step 2",
    label: "Tell us about you",
    description: "Share your nursing background, goals, and how we can support you best.",
  },
  {
    title: "Step 3",
    label: "Get onboarded",
    description: "Receive a welcome pack, mentor match details, and your first checklist via email and WhatsApp.",
  },
];

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="join" />
      <main>
        <HeroSection />
        <StepsSection />
        <ApplicationForm />
        <SupportSection />
        <NewsletterSection variant="feature" />
        <Footer />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-[#eef4f2] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-start">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs uppercase tracking-[0.26em] text-primary">
              Join Counter Cultural Nurses
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-[54px]">
              Tell us who you are. We handle the rest of your onboarding.
            </h1>
            <p className="text-lg leading-relaxed text-foreground/70">
              One form covers both paths: the Portfolio Power-Up Challenge and discounted partner courses. Pick what fits, share your goals, and we respond within a day.
            </p>

            <div className="space-y-4 rounded-[28px] border border-primary/15 bg-white p-6 text-left text-sm text-foreground/70">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-primary" />
                <span>Portfolio sprint · Shape your story, build proof, and land remote work.</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-accent" />
                <span>Partner courses · Continue with specialist training at CCN-only rates.</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>Onboarding call + WhatsApp reminders so you never miss a step.</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-[36px] border border-primary/15 bg-white p-8 shadow-[0_40px_80px_-54px_rgba(41,18,15,0.45)]">
            <div className="absolute -top-4 right-10 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-1 text-xs uppercase tracking-[0.24em] text-primary/80">
              Intake preview
            </div>
            <div className="space-y-6">
              <div className="grid gap-1">
                <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">3 quick sections</p>
                <p className="text-xl font-semibold text-foreground">Pick your path · Share your context · Leave your contact</p>
              </div>
              <div className="grid gap-4 rounded-3xl border border-primary/10 bg-primary/5 p-6 text-sm text-foreground/70">
                <div className="font-semibold text-primary">You&apos;ll need</div>
                <ul className="space-y-2">
                  <li>• 5–7 minutes of quiet time</li>
                  <li>• A WhatsApp number for reminders</li>
                  <li>• A short note about your goals</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-primary/10 bg-white/90 p-6 text-center text-sm text-foreground/70 sm:text-left">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span>Prefer a call? Message us and a mentor will respond within 24 hours.</span>
                </div>
                <Button
                  asChild
                  variant="secondary"
                  className="mt-4 w-full rounded-full border border-primary/15 bg-primary/10 px-5 text-sm font-semibold text-primary sm:w-auto"
                >
                  <Link href="https://wa.me/2348000000000" target="_blank">
                    Message on WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">How it works</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
            Fill the form today. Start your remote nursing journey this week.
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            We keep the questions simple and the instructions clear. Most nurses finish in under seven minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.label}
              className="rounded-[28px] border border-primary/12 bg-background/90 p-6 text-sm text-foreground/70 shadow-[0_30px_60px_-50px_rgba(41,18,15,0.45)]"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-primary/70">{step.title}</p>
              <p className="mt-3 text-base font-semibold text-foreground">{step.label}</p>
              <p className="mt-2 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationForm() {
  const [interest, setInterest] = useState<"sprint" | "partner" | "both">("sprint");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    yearsExperience: "",
    currentRole: "",
    goals: "",
    availability: "",
    whatsapp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO connect to Supabase / CRM
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-secondary/40 -z-10" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary">
            <ShieldCheck className="h-4 w-4" />
            Application received
          </div>
          <h2 className="mt-6 text-4xl font-semibold text-foreground sm:text-[46px]">You&apos;re officially on the CCN path! 🎉</h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            Check your email and WhatsApp within the next 24 hours. We will send your welcome guide, mentor match details, and
            the first task tailored to the option you picked.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary-dark"
            >
              <Link href="/programmes">Explore programmes</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary/25 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:border-primary hover:bg-primary/10"
            >
              <Link href="/resources">Browse free resources</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Application form</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
            Tell us about you. We&apos;ll personalise your onboarding.
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            Please fill in honest details so we can match you with the right cohort, mentor, and partner opportunities. All
            responses stay private within the CCN team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 grid gap-10">
          <div className="grid gap-4 rounded-[32px] border border-primary/12 bg-background/80 p-8 shadow-[0_32px_72px_-52px_rgba(41,18,15,0.5)]">
            <p className="text-sm font-semibold text-primary">Which option interests you right now?</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "sprint", label: "Portfolio Power-Up Challenge" },
                { value: "partner", label: "Discounted partner course" },
                { value: "both", label: "I want both options" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setInterest(option.value as typeof interest)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                    interest === option.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-primary/10 bg-white hover:border-primary/40",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 rounded-[32px] border border-primary/12 bg-white/90 p-8 shadow-[0_32px_72px_-50px_rgba(41,18,15,0.5)]">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Full name"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
              />
              <Field
                label="Email address"
                type="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
              />
              <Field
                label="Phone number"
                required
                placeholder="Include country code"
                value={formData.phone}
                onChange={(value) => handleChange("phone", value)}
              />
              <Field
                label="Country"
                required
                placeholder="Where do you live?"
                value={formData.country}
                onChange={(value) => handleChange("country", value)}
              />
              <Field
                label="Years of experience"
                required
                placeholder="e.g. 3 years in paediatric nursing"
                value={formData.yearsExperience}
                onChange={(value) => handleChange("yearsExperience", value)}
              />
              <Field
                label="Current role"
                placeholder="Ward sister, community nurse, etc."
                value={formData.currentRole}
                onChange={(value) => handleChange("currentRole", value)}
              />
            </div>

            <TextareaField
              label="What do you hope to achieve in the next six months?"
              placeholder="Tell us about your career goals, income targets, or areas you'd like support with."
              value={formData.goals}
              onChange={(value) => handleChange("goals", value)}
            />
            <TextareaField
              label="How many hours can you invest each week?"
              placeholder="e.g. 4 hours during weekends, 1 hour each weekday"
              value={formData.availability}
              onChange={(value) => handleChange("availability", value)}
            />
            <Field
              label="Preferred WhatsApp number"
              placeholder="We'll send reminders here"
              value={formData.whatsapp}
              onChange={(value) => handleChange("whatsapp", value)}
            />
          </div>

          <div className="flex flex-col items-start gap-4 text-sm text-foreground/70">
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              By submitting, you agree to receive onboarding emails and WhatsApp updates from CCN.
            </p>
            <Button
              type="submit"
              className="w-full rounded-full bg-primary px-8 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Submit application
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm text-foreground/70">
      <span className="font-semibold text-foreground">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        required={required}
        className="rounded-2xl border border-primary/20 bg-white/90"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm text-foreground/70">
      <span className="font-semibold text-foreground">{label}</span>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[120px] rounded-2xl border border-primary/20 bg-white/90"
      />
    </label>
  );
}

function SupportSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-white to-secondary/30 -z-10" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-2/60">Support that feels human</p>
          <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
            “I felt seen, guided, and encouraged every step of the way.”
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            Once you submit the form, our onboarding team reviews it manually. We match you with the right mentor, share
            payment options, and add you to the correct WhatsApp pod.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 text-sm text-foreground/70">
          {[
            {
              title: "Scholarship support",
              copy: "Need help with payment? Tick the scholarship box in your form and we will reach out with options.",
            },
            {
              title: "Rolling admissions",
              copy: "We run micro-cohorts every month so you never have to wait long to start.",
            },
            {
              title: "Community check-ins",
              copy: "Weekly voice notes from mentors and accountability partners keep you motivated.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-primary/12 bg-white/90 p-6 shadow-[0_30px_60px_-48px_rgba(41,18,15,0.45)]"
            >
              <p className="text-base font-semibold text-primary">{item.title}</p>
              <p className="mt-2 leading-relaxed">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
