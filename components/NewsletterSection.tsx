"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Mail, Sparkles, CheckCircle2, Users, TrendingUp, Zap } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

interface NewsletterSectionProps {
  variant?: 'default' | 'compact' | 'feature';
  className?: string;
}

const newsletterSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email'),
  country: z.string().min(2, 'Select your country'),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export function NewsletterSection({ variant = 'default', className = '' }: NewsletterSectionProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      name: '',
      email: '',
      country: '',
    },
  });

  const mutation = useMutation<NewsletterFormValues, Error, NewsletterFormValues>({
    mutationFn: async (values) => {
      // TODO integrate with backend API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return values;
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
    setIsSuccess(true);
    form.reset();
    setTimeout(() => setIsSuccess(false), 5000);
  });

  const africanCountries = [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 
    'Tanzania', 'Uganda', 'Rwanda', 'Ethiopia', 'Zimbabwe',
    'Zambia', 'Cameroon', 'Senegal', 'Côte d\'Ivoire', 'Morocco',
    'Tunisia', 'Algeria', 'Botswana', 'Namibia', 'Mozambique',
    'Other Africa', 'Outside Africa'
  ];

  const stats = [
    { icon: Users, value: '1,000+ nurses', label: 'Learning with CCN today' },
    { icon: TrendingUp, value: '85% happy', label: 'Members say the lessons changed their work' },
    { icon: Zap, value: 'Weekly updates', label: 'Fresh job leads and practice tasks every week' }
  ];

  if (variant === 'feature') {
    return (
      <section className={`relative overflow-hidden py-24 sm:py-28 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/14 via-white to-secondary/35 -z-10" />
        <div className="absolute -top-28 right-12 h-72 w-72 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent-2/12 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {!isSuccess ? (
            <>
              <div className="space-y-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.26em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Waitlist</span>
                </div>
                <h2 className="text-4xl font-semibold text-foreground sm:text-[44px]">
                  Get simple guides, job alerts, and invites to live sessions.
                </h2>
                <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
                  Join free and receive meaningful updates only when we have something useful to share: new classes, job leads,
                  or mentor chats.
                </p>
              </div>

              <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
                <Card className="border border-primary/15 shadow-[0_34px_68px_-48px_rgba(41,18,15,0.45)]">
                  <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="feature-name">Full Name *</Label>
                          <Input
                            id="feature-name"
                            type="text"
                            placeholder="Enter your full name"
                            className={cnInput(form.formState.errors.name)}
                            {...form.register('name')}
                          />
                          {form.formState.errors.name ? (
                            <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
                          ) : null}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="feature-email">Email Address *</Label>
                          <Input
                            id="feature-email"
                            type="email"
                            placeholder="your.email@example.com"
                            className={cnInput(form.formState.errors.email)}
                            {...form.register('email')}
                          />
                          {form.formState.errors.email ? (
                            <span className="text-xs text-destructive">{form.formState.errors.email.message}</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="feature-country">Country *</Label>
                        <Controller
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className={cnInput(form.formState.errors.country)}>
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                              <SelectContent>
                                {africanCountries.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {form.formState.errors.country ? (
                          <span className="text-xs text-destructive">{form.formState.errors.country.message}</span>
                        ) : null}
                      </div>

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="mt-4 h-12 w-full rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary-dark"
                      >
                        {mutation.isPending ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Joining...
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            Join the waitlist
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs text-foreground/50">
                        No spam. You can unsubscribe anytime.
                      </p>
                    </form>
                  </div>
                </Card>

                <div className="rounded-[32px] border border-primary/12 bg-white/85 p-8 shadow-[0_30px_60px_-50px_rgba(41,18,15,0.45)] backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.28em] text-primary/65">What you&apos;ll receive</p>
                  <div className="mt-6 space-y-6 text-sm text-foreground/70">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-4 border-t border-dashed border-primary/15 pt-5 first:border-t-0 first:pt-0"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-base font-semibold text-foreground">{stat.value}</p>
                            <p className="text-sm text-foreground/70">{stat.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary">
                <CheckCircle2 className="h-4 w-4" />
                <span>Welcome aboard</span>
              </div>
              <h2 className="mt-6 text-4xl font-semibold text-foreground sm:text-[44px]">You&apos;re in! 🎉</h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/70">
                Look out for a welcome email, a short starter guide, and your invite to the next community call.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {['Welcome email delivered', "Starter pack sent to your inbox"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-3xl border border-primary/15 bg-white/85 p-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <Card className={`border-4 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 ${className}`}>
      <div className="p-8">
        {!isSuccess ? (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-3 text-foreground text-2xl font-bold">
                Join 1,000+ Nurses Building Their Digital Future
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Get exclusive early access to opportunities, courses, and community events. No spam, just valuable content.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-name">Full Name *</Label>
                <Input
                  id="default-name"
                  type="text"
                  placeholder="Enter your full name"
                  className={cn("border-2", form.formState.errors.name && "border-destructive")}
                  {...form.register('name')}
                />
                {form.formState.errors.name ? (
                  <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-email">Email Address *</Label>
                <Input
                  id="default-email"
                  type="email"
                  placeholder="your.email@example.com"
                  className={cn("border-2", form.formState.errors.email && "border-destructive")}
                  {...form.register('email')}
                />
                {form.formState.errors.email ? (
                  <span className="text-xs text-destructive">{form.formState.errors.email.message}</span>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-country">Country *</Label>
                <Controller
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={cn("border-2", form.formState.errors.country && "border-destructive")}> 
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {africanCountries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.country ? (
                  <span className="text-xs text-destructive">{form.formState.errors.country.message}</span>
                ) : null}
              </div>

              <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {mutation.isPending ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" />
                    Join the Waitlist
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="inline-flex p-4 rounded-full bg-accent/10 mb-4">
              <CheckCircle2 className="h-12 w-12 text-accent" />
            </div>
            <h3 className="mb-3 text-foreground text-2xl font-bold">You&apos;re In! 🎉</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Welcome to the Counter-Cultural Nurses community! Watch your inbox for next steps and exclusive opportunities.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

function cnInput(error?: { message?: string }) {
  return cn(
    "rounded-2xl border-primary/25 bg-white/90",
    error && "border-destructive"
  );
}

