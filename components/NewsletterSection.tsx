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
import { AFRICAN_COUNTRIES } from '@/utils/constants';
import { submitWaitlist } from '@/lib/api';
import type { NewsletterSectionProps, WaitlistFormData } from '@/types';

export function NewsletterSection({ variant = 'default', className = '' }: NewsletterSectionProps) {
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    country: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof WaitlistFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.country) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitWaitlist({
        ...formData,
        source: 'newsletter-section',
        timestamp: new Date().toISOString(),
      });
      
      setIsSuccess(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', country: '' });
        setIsSuccess(false);
      }, 5000);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again later.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { icon: Users, value: '1,000+', label: 'Community Members' },
    { icon: TrendingUp, value: '85%', label: 'Career Pivots' },
    { icon: Zap, value: 'Weekly', label: 'Opportunities' }
  ];

  if (variant === 'feature') {
    return (
      <section className={`py-20 lg:py-28 bg-gradient-to-br from-primary via-primary to-[#9D4E7F] text-white relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-2 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isSuccess ? (
            <>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <span className="text-white">Join the Movement</span>
                </div>
                <h2 className="mb-6 text-white text-4xl font-bold">
                  Join 1,000+ Nurses Building Their Digital Future
                </h2>
                <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Get exclusive early access to job opportunities, courses, community events, and career transformation resources.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-accent" />
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-white/80">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Card className="max-w-2xl mx-auto border-2 shadow-warm-lg">
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="feature-name" className="text-foreground">
                          Full Name *
                        </Label>
                        <Input
                          id="feature-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                          className="border-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="feature-email" className="text-foreground">
                          Email Address *
                        </Label>
                        <Input
                          id="feature-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className="border-2"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feature-country" className="text-foreground">
                        Country *
                      </Label>
                      <Select 
                        value={formData.country} 
                        onValueChange={(value) => handleChange('country', value)}
                      >
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {AFRICAN_COUNTRIES.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {error && (
                      <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                        {error}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 mt-6"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Joining...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-5 w-5" />
                          Join the Waitlist Now
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      We respect your privacy. Unsubscribe anytime. No spam, ever.
                    </p>
                  </form>
                </div>
              </Card>
            </>
          ) : (
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex p-6 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <CheckCircle2 className="h-16 w-16 text-accent" />
              </div>
              <h2 className="mb-4 text-white text-4xl font-bold">You're In! 🎉</h2>
              <p className="text-xl text-white/95 mb-8 leading-relaxed">
                Welcome to the Counter-Cultural Nurses community! Watch your inbox for next steps and exclusive opportunities.
              </p>
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
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-email">Email Address *</Label>
                <Input
                  id="default-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-country">Country *</Label>
                <Select 
                  value={formData.country} 
                  onValueChange={(value) => handleChange('country', value)}
                >
                  <SelectTrigger className="border-2">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {AFRICAN_COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isSubmitting ? (
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
            <h3 className="mb-3 text-foreground text-2xl font-bold">You're In! 🎉</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Welcome to the Counter-Cultural Nurses community! Watch your inbox for next steps and exclusive opportunities.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

