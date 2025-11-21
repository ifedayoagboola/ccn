"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { LandingPage } from '@/components/LandingPage';

const SECTION_ANCHORS: Record<string, string> = {
  landing: 'home',
  about: 'about',
  contact: 'contact',
};

export default function Home() {
  const router = useRouter();

  const handleNavigate = useCallback((page: string) => {
    const targetId = SECTION_ANCHORS[page];
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleJoinClick = useCallback(() => {
    router.push('/join');
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      <LandingPage onJoinClick={handleJoinClick} onNavigate={handleNavigate} />
      </div>
  );
}




