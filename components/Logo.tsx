"use client";

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
  variant?: 'default' | 'white' | 'dark';
}

export function Logo({ className = '', height = 64, width, variant = 'default' }: LogoProps) {
  const [useSvgFallback, setUseSvgFallback] = useState(false);
  const logoPath = '/assets/logo.png';
  const aspectRatio = 1; // square logo asset
  const resolvedWidth = width ?? Math.round(height * aspectRatio);

  if (useSvgFallback) {
    return (
      <div className={`flex items-center ${className}`}>
        <LogoSVG height={height} className={variant === 'white' ? 'brightness-0 invert' : ''} />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={logoPath}
        alt="Counter-Cultural Nurses"
        height={height}
        width={resolvedWidth}
        className={`h-auto w-auto ${variant === 'white' ? 'brightness-0 invert' : ''}`}
        priority
        onError={() => setUseSvgFallback(true)}
      />
    </div>
  );
}

// SVG-based logo component based on the description
// This is a fallback when the logo image file is not available
export function LogoSVG({ className = '', height = 48 }: { className?: string; height?: number }) {
  const scale = height / 60;
  const width = 200 * scale;
  
  return (
    <svg
      viewBox="0 0 200 60"
      height={height}
      width={width}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Large Red C - thick rounded letter */}
      <path
        d="M 8 30 Q 8 8 32 8 L 32 12 Q 12 12 12 30 Q 12 48 32 48 L 32 52 Q 8 52 8 30 Z"
        fill="#8B2635"
      />
      
      {/* Inner Circle */}
      <circle cx="20" cy="30" r="10" fill="none" stroke="#8B2635" strokeWidth="0.8" />
      
      {/* Left Red Hand (simplified) */}
      <path
        d="M 12 28 L 13 26 L 15 27 L 14 29 Z"
        fill="#8B2635"
      />
      
      {/* Right Brown Hand (simplified) */}
      <path
        d="M 28 28 L 27 26 L 25 27 L 26 29 Z"
        fill="#6B4423"
      />
      
      {/* Brown Gear icon (simplified) */}
      <circle cx="20" cy="25" r="1.5" fill="#6B4423" />
      <path
        d="M 20 23.5 L 20 26.5 M 18.5 25 L 21.5 25"
        stroke="#6B4423"
        strokeWidth="0.5"
      />
      
      {/* Text: "ounter" */}
      <text x="36" y="24" fontSize="16" fontFamily="Inter, sans-serif" fontWeight="700" fill="#8B2635">
        ounter
      </text>
      
      {/* ECG Line - heartbeat pattern */}
      <path
        d="M 36 32 L 50 32 L 52 28 L 54 32 L 70 32"
        stroke="#6B4423"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Text: "Nurses" */}
      <text x="36" y="40" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="700" fill="#8B2635">
        Nurses
      </text>
      
      {/* Text: "Ultural" */}
      <text x="36" y="52" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="700" fill="#8B2635">
        Ultural
      </text>
    </svg>
  );
}

