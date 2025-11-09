"use client";

import Link from 'next/link';
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

const SECTION_LINKS: Record<string, string> = {
  landing: '#home',
  about: '#about',
  programs: '#programs',
  membership: '#membership',
  'community-public': '#community',
  events: '#community',
  blog: '#contact',
  partnerships: '#contact',
  contact: '#contact',
};

export function Header({ user, currentPage, onNavigate, onLogout, isAdmin }: HeaderProps) {
  const loggedInNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'courses', label: 'Courses' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'community', label: 'Community' },
    { id: 'events', label: 'Events' },
  ];

  const publicNavItems = [
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'membership', label: 'Membership' },
    { id: 'community-public', label: 'Community' },
    { id: 'events', label: 'Events' },
    { id: 'partnerships', label: 'Partners' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="border-b-2 border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-12">
            <Link
              href="#home"
              className="hover:opacity-80 transition-opacity"
              onClick={() => onNavigate?.('landing')}
            >
              <Logo height={72} />
            </Link>

            {user ? (
              <nav className="hidden md:flex gap-2">
                {loggedInNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate?.(item.id)}
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                      currentPage === item.id
                        ? 'bg-primary text-primary-foreground shadow-warm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            ) : (
              <nav className="hidden md:flex items-center gap-8">
                {publicNavItems.map((item) => {
                  const href = SECTION_LINKS[item.id];
                  return href ? (
                    <a
                      key={item.id}
                      href={href}
                      className="text-foreground hover:text-primary transition-colors"
                      onClick={() => onNavigate?.(item.id)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => onNavigate?.(item.id)}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
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
                    className={currentPage === 'admin' ? 'bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl' : 'font-semibold rounded-xl'}
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                      <Avatar className="border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <div className="text-sm font-semibold">{user.name}</div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {user.role.replace('_', ' ')}
                        </div>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                    <DropdownMenuLabel>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer rounded-xl">
                      <UserIcon className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-xl">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-destructive cursor-pointer rounded-xl">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button 
                onClick={() => onNavigate?.('join')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl px-6"
              >
                Join the Waitlist
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

