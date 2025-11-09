"use client";

import { useCallback } from 'react';
import { Header } from '@/components/Header';
import { LandingPage } from '@/components/LandingPage';

const SECTION_ANCHORS: Record<string, string> = {
  landing: 'home',
  about: 'about',
  programs: 'programs',
  membership: 'membership',
  'community-public': 'community',
  events: 'community',
  blog: 'contact',
  partnerships: 'contact',
  contact: 'contact',
};

export default function Home() {
  const handleNavigate = useCallback((page: string) => {
    const targetId = SECTION_ANCHORS[page];
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleJoinClick = useCallback(() => {
    alert('Join functionality coming soon!');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      <LandingPage onJoinClick={handleJoinClick} onNavigate={handleNavigate} />
    </div>
  );
}




