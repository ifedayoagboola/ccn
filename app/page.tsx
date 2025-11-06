"use client";

import { Header } from '@/components/Header';
import { LandingPage } from '@/components/LandingPage';
import { useState } from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleJoinClick = () => {
    // TODO: Navigate to join/signup page
    alert('Join functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      <LandingPage 
        onJoinClick={handleJoinClick}
        onNavigate={handleNavigate}
      />
    </div>
  );
}




