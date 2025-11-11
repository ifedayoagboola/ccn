"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOut, Settings, User as UserIcon, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

interface User {
  name: string;
  email: string;
  role: string;
  isAdmin?: boolean;
}

interface HeaderProps {
  user?: User | null;
  currentPage?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
  isAdmin?: boolean;
}

type NavItem = {
  id: string;
  label: string;
  type: 'anchor' | 'route';
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', type: 'anchor', href: '#about' },
  { id: 'programmes', label: 'Programmes', type: 'route', href: '/programmes' },
  { id: 'membership', label: 'Membership', type: 'anchor', href: '#membership' },
  { id: 'community', label: 'Community', type: 'route', href: '/community' },
  { id: 'events', label: 'Events', type: 'route', href: '/events' },
  { id: 'resources', label: 'Resources', type: 'route', href: '/resources' },
  { id: 'stories', label: 'Stories', type: 'route', href: '/stories' },
  { id: 'partnerships', label: 'Partnerships', type: 'route', href: '/partnerships' },
];

const LOGGED_IN_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'courses', label: 'Courses' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'community', label: 'Community' },
  { id: 'events', label: 'Events' },
];

export function Header({ user, currentPage, onNavigate, onLogout, isAdmin }: HeaderProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null);
      return;
    }

    const sectionIds = NAV_ITEMS.filter((item) => item.type === 'anchor').map((item) => item.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sectionIds.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => {
      sectionIds.forEach((id) => {
        const node = document.getElementById(id);
        if (node) observer.unobserve(node);
      });
      observer.disconnect();
    };
  }, [pathname]);

  const renderPublicNav = () => (
    <nav className="hidden md:flex items-center gap-8">
      {NAV_ITEMS.map((item) => {
        if (item.type === 'anchor') {
          const sectionId = item.href.replace('#', '');
          const anchorHref = `/#${sectionId}`;
          const isActive = pathname === '/' && (activeSection === sectionId || currentPage === item.id);

          return (
            <Link
              key={item.id}
              href={anchorHref}
              className={cn(
                'text-sm font-semibold transition-colors',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary'
              )}
              onClick={(event) => {
                if (pathname === '/' && onNavigate) {
                  event.preventDefault();
                  setActiveSection(sectionId);
                  onNavigate(sectionId);
                }
              }}
            >
              {item.label}
            </Link>
          );
        }

        const isActive =
          currentPage === item.id || (pathname !== '/' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'text-sm font-semibold transition-colors',
              isActive ? 'text-primary' : 'text-foreground hover:text-primary'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="transition-opacity hover:opacity-80"
            onClick={(event) => {
              if (pathname === '/' && onNavigate) {
                event.preventDefault();
                setActiveSection(null);
                onNavigate('landing');
              }
            }}
          >
            <Logo height={72} />
          </Link>

          {user ? (
            <nav className="hidden md:flex gap-2">
              {LOGGED_IN_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className={cn(
                    'rounded-xl px-5 py-2.5 text-sm font-semibold transition-all',
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground shadow-warm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          ) : (
            renderPublicNav()
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {isAdmin && (
                <Button
                  variant={currentPage === 'admin' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onNavigate?.('admin')}
                  className={cn(
                    'rounded-xl font-semibold',
                    currentPage === 'admin' ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''
                  )}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 transition-opacity hover:opacity-70">
                    <Avatar className="border-2 border-primary">
                      <AvatarFallback className="bg-primary font-bold text-primary-foreground">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left md:block">
                      <div className="text-sm font-semibold">{user.name}</div>
                      <div className="text-xs font-medium text-muted-foreground">
                        {user.role.replace('_', ' ')}
                      </div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{user.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer rounded-xl">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-xl">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer rounded-xl text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild className="rounded-xl bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90">
              <Link href="/join">Join the Waitlist</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

