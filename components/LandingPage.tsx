"use client";

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
  Linkedin, 
  Instagram, 
  Youtube,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { sectionContainerClass, sectionWrapperClass } from '@/lib/layout-utils';
import { ROUTES } from '@/utils/constants';
import { cn } from '@/lib/utils';
import type { LandingPageProps } from '@/types';

export function LandingPage({ onJoinClick, onNavigate }: LandingPageProps) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Newsletter signup
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1643246681510-b917ea41b893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbnVyc2UlMjBzbWlsaW5nJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzYyMzY0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="African nurses smiling"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>

        {/* Content */}
        <div className={cn("relative z-10", sectionContainerClass(), "py-32 sm:py-40 lg:py-48")}>
          <div className="max-w-3xl">
            <h1 className="mb-6 text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Helping African Nurses Soar Beyond the Bedside.
            </h1>
            <p className="mb-10 text-white/95 text-xl max-w-2xl">
              Empowering nurses with digital skills, remote opportunities, and financial freedom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onJoinClick}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white shadow-lg"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Problem & Our Why */}
      <section id="about" className={cn(sectionWrapperClass(), "bg-background")}>
        <div className={sectionContainerClass()}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="order-2 lg:order-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1592393532405-fb1f165c4a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwd29ya2VyJTIwcmVmbGVjdGl2ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjM2NDAwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Thoughtful nurse"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Right: Story */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-foreground text-4xl font-bold">Why We Exist</h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Across Africa, nurses are the backbone of healthcare — compassionate, skilled, and deeply committed. Yet too often, they find themselves underpaid, overworked, and limited by systems that don't recognize their full potential.
                </p>
                
                <p>
                  We've heard the stories: nurses working multiple shifts just to make ends meet, professionals with incredible skills but no pathway to use them beyond the hospital walls, dreams deferred because opportunities feel out of reach.
                </p>
                
                <p>
                  But it doesn't have to be this way.
                </p>
              </div>

              {/* Highlighted Quote */}
              <div className="bg-secondary border-l-4 border-accent p-6 rounded-lg">
                <p className="text-xl text-foreground italic">
                  "We believe nurses deserve more — more freedom, more opportunity, and more joy in their work."
                </p>
              </div>

              <p className="text-lg text-muted-foreground">
                That's why we created Counter-Cultural Nurses: a movement dedicated to helping nurses break free from traditional constraints and build careers that honor their passion while providing financial stability and personal fulfillment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What We Do */}
      <section id="programs" className={cn(sectionWrapperClass(), "bg-white")}>
        <div className={sectionContainerClass()}>
          <div className="text-center mb-16">
            <h2 className="mb-4 text-foreground text-4xl font-bold">What We Do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the tools, community, and opportunities nurses need to thrive in the digital economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Digital Empowerment */}
            <Card className="p-8 border-2 hover:border-accent transition-all hover:shadow-xl group">
              <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10">
                <Laptop className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-4 text-foreground text-2xl font-bold">Digital Empowerment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Learn in-demand digital skills through structured programs and hands-on workshops. From telehealth to healthcare content creation, we equip you to earn remotely and on your terms.
              </p>
              <Button 
                variant="ghost" 
                className="mt-6 text-accent hover:text-accent/80 p-0 h-auto"
              >
                Explore Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Card 2: Community & Mentorship */}
            <Card className="p-8 border-2 hover:border-accent transition-all hover:shadow-xl group">
              <div className="mb-6 inline-flex p-4 rounded-xl bg-accent/10">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <h3 className="mb-4 text-foreground text-2xl font-bold">Community & Mentorship</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with ambitious nurses across Africa who understand your journey. Get mentorship from those who've successfully transitioned to remote and digital careers.
              </p>
              <Button 
                variant="ghost" 
                className="mt-6 text-accent hover:text-accent/80 p-0 h-auto"
                onClick={() => onNavigate?.(ROUTES.COMMUNITY_PUBLIC)}
              >
                Join the Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Card 3: Opportunities & Growth */}
            <Card className="p-8 border-2 hover:border-accent transition-all hover:shadow-xl group">
              <div className="mb-6 inline-flex p-4 rounded-xl bg-accent-2/10">
                <Target className="h-10 w-10 text-accent-2" />
              </div>
              <h3 className="mb-4 text-foreground text-2xl font-bold">Opportunities & Growth</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access verified remote job listings, exclusive scholarships, and professional development workshops designed specifically for healthcare professionals.
              </p>
              <Button 
                variant="ghost" 
                className="mt-6 text-accent hover:text-accent/80 p-0 h-auto"
              >
                See Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button onClick={onJoinClick} size="lg" className="bg-primary hover:bg-primary/90">
              Discover Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Section 4: Our Impact */}
      <section className={cn(sectionWrapperClass(), "bg-gradient-to-br from-primary/5 to-accent/5")}>
        <div className={sectionContainerClass()}>
          <div className="text-center mb-16">
            <h2 className="mb-4 text-foreground text-4xl font-bold">Our Impact</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building a movement, one nurse at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="text-center p-8">
              <div className="mb-4">
                <div className="inline-flex items-baseline">
                  <span className="text-6xl font-bold text-primary">500</span>
                  <span className="text-4xl font-bold text-primary">+</span>
                </div>
              </div>
              <p className="text-xl text-foreground font-semibold">Nurses Reached</p>
              <p className="text-muted-foreground mt-2">
                And growing every day
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center p-8">
              <div className="mb-4">
                <div className="inline-flex items-baseline">
                  <span className="text-6xl font-bold text-accent">20</span>
                  <span className="text-4xl font-bold text-accent">+</span>
                </div>
              </div>
              <p className="text-xl text-foreground font-semibold">Partnerships Initiated</p>
              <p className="text-muted-foreground mt-2">
                With leading organizations
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center p-8">
              <div className="mb-4">
                <div className="inline-flex items-baseline">
                  <span className="text-6xl font-bold text-accent-2">10,000</span>
                  <span className="text-4xl font-bold text-accent-2">+</span>
                </div>
              </div>
              <p className="text-xl text-foreground font-semibold">Nurses to Empower</p>
              <p className="text-muted-foreground mt-2">
                Our ambitious goal
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-2">
              Read Our Vision
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section 5: Featured Program */}
      <section id="membership" className={cn(sectionWrapperClass(), "bg-white")}>
        <div className={sectionContainerClass()}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <div className="inline-flex px-4 py-2 bg-accent/10 text-accent rounded-full font-semibold">
                Featured Program
              </div>
              
              <h2 className="text-foreground text-4xl font-bold">Portfolio Power-Up Challenge</h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Start building your personal brand, create a digital portfolio, and open doors to global jobs.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Build Your Online Presence</p>
                    <p className="text-muted-foreground">Create a professional portfolio that showcases your skills and experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Learn from Experts</p>
                    <p className="text-muted-foreground">Live workshops with nurses who've successfully made the transition.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Get Feedback & Support</p>
                    <p className="text-muted-foreground">Community review sessions and one-on-one mentorship opportunities.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => onNavigate?.(ROUTES.EVENTS)} size="lg" className="bg-accent hover:bg-accent/90">
                  Join the Challenge
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2"
                  onClick={() => onNavigate?.(ROUTES.EVENTS)}
                >
                  View All Events
                </Button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="order-first lg:order-last">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1708461860854-e3a0604f65ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZXMlMjB6b29tJTIwd29ya3Nob3AlMjBtZWV0aW5nfGVufDF8fHx8MTc2MjM2NDAwMXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Nurses in online workshop"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section id="community" className={cn(sectionWrapperClass(), "bg-background")}>
        <div className={sectionContainerClass()}>
          <div className="text-center mb-16">
            <h2 className="mb-4 text-foreground text-4xl font-bold">Faces of Change</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real nurses. Real transformations. Real possibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-8 border-2 hover:border-accent transition-all">
              <div className="mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1755189118414-14c8dacdb082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBudXJzZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjM2NDAwNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Amaka O."
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <div className="text-4xl text-accent mb-4">"</div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  CCN gave me the confidence to pursue telehealth. I went from exhausting 12-hour shifts to working remotely with international clients. My income doubled, and I finally have time for my family.
                </p>
                <div>
                  <p className="font-semibold text-foreground">Amaka O.</p>
                  <p className="text-sm text-muted-foreground">Telehealth Nurse, Lagos</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-8 border-2 hover:border-accent transition-all">
              <div className="mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1676552055618-22ec8cde399a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMGxhcHRvcCUyMGRpZ2l0YWwlMjB3b3JrfGVufDF8fHx8MTc2MjM2NDAwMHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Chidi E."
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <div className="text-4xl text-accent mb-4">"</div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Portfolio Challenge was a game-changer. I built my first professional website, connected with mentors, and landed a remote medical writing gig — all within three months.
                </p>
                <div>
                  <p className="font-semibold text-foreground">Chidi E.</p>
                  <p className="text-sm text-muted-foreground">Medical Writer, Abuja</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-8 border-2 hover:border-accent transition-all">
              <div className="mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1643246681510-b917ea41b893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbnVyc2UlMjBzbWlsaW5nJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzYyMzY0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Folake A."
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <div className="text-4xl text-accent mb-4">"</div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I thought digital skills were only for tech people. CCN showed me how my nursing expertise translates beautifully to online healthcare education. Now I teach and earn on my own schedule.
                </p>
                <div>
                  <p className="font-semibold text-foreground">Folake A.</p>
                  <p className="text-sm text-muted-foreground">Healthcare Educator, Ibadan</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-2">
              Meet the Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section 7: Join the Movement */}
      <section className={cn(sectionWrapperClass(), "bg-gradient-to-br from-primary via-primary to-[#9D4E7F] text-white relative overflow-hidden")}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-2/20 rounded-full blur-3xl" />
        
        <div className={cn("relative max-w-4xl mx-auto text-center", sectionContainerClass())}>
          <h2 className="mb-6 text-white text-4xl font-bold">Join the Movement</h2>
          <p className="mb-12 text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            You've cared for others — now it's time to care for your future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={onJoinClick}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white shadow-xl"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Partner with Us
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-white/90">
            <CheckCircle className="h-5 w-5" />
            <span className="text-lg">Join 500+ nurses building their digital futures</span>
          </div>
        </div>
      </section>

      {/* Newsletter/Waitlist Section */}
      <NewsletterSection variant="feature" />

      {/* Footer */}
      <footer id="contact" className="bg-foreground text-white py-16">
        <div className={sectionContainerClass()}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <Logo height={48} variant="white" />
              </div>
              <p className="text-white/70 leading-relaxed">
                Empowering African nurses to soar beyond the bedside.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="mb-4 text-white font-semibold">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#programs" className="text-white/70 hover:text-white transition-colors">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#membership" className="text-white/70 hover:text-white transition-colors">
                    Membership
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.(ROUTES.BLOG)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.(ROUTES.PARTNERSHIPS)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Partnerships
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.(ROUTES.CONTACT)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Newsletter */}
            <div className="md:col-span-2">
              <h4 className="mb-4 text-white font-semibold">Stay Connected</h4>
              <p className="text-white/70 mb-4">
                Get weekly opportunities straight to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button type="submit" className="bg-accent hover:bg-accent/90 flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <p className="text-white/60 text-sm">
                © 2024 Counter-Cultural Nurses. All rights reserved.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

