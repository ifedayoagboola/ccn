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
import { LogOut, Menu, Settings, User as UserIcon, ShieldCheck, X } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import { CommunityJoinPaymentModal } from './modals/CommunityJoinPaymentModal';

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
  { id: 'about', label: 'About', type: 'route', href: '/about' },
  { id: 'programmes', label: 'Programmes', type: 'route', href: '/programmes' },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCompactNav, setIsCompactNav] = useState<boolean>(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsCompactNav(window.innerWidth < 1280);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderPublicNav = (isMobile = false) => {
    const visibleCount = isCompactNav ? 4 : NAV_ITEMS.length;
    const primaryItems = NAV_ITEMS.slice(0, visibleCount);
    const overflowItems = isCompactNav ? NAV_ITEMS.slice(visibleCount) : [];

    const itemClass = (isActive: boolean) =>
      cn(
        'text-xs font-semibold transition-colors sm:text-sm',
        isActive ? 'text-primary' : 'text-foreground hover:text-primary'
      );

    const renderItem = (item: NavItem) => {
      if (item.type === 'anchor') {
        const sectionId = item.href.replace('#', '');
        const anchorHref = `/#${sectionId}`;
        const isActive = pathname === '/' && (activeSection === sectionId || currentPage === item.id);

        return (
          <Link
            key={item.id}
            href={anchorHref}
            className={itemClass(isActive)}
            onClick={(event) => {
              if (pathname === '/' && onNavigate) {
                event.preventDefault();
                setActiveSection(sectionId);
                onNavigate(sectionId);
                setMobileOpen(false);
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
          className={itemClass(isActive)}
          onClick={() => setMobileOpen(false)}
        >
          {item.label}
        </Link>
      );
    };

    if (isMobile) {
      return (
        <nav className="grid gap-6 text-left text-lg font-semibold">
          {NAV_ITEMS.map(renderItem)}
        </nav>
      );
    }

    return (
      <nav className="hidden items-center gap-x-3 md:flex md:flex-nowrap md:gap-x-4 lg:gap-x-6">
        {primaryItems.map(renderItem)}
        {overflowItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-xs font-semibold text-foreground transition-colors hover:text-primary sm:text-sm">
              More
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-2xl">
              {overflowItems.map((item) => (
                <DropdownMenuItem key={item.id} asChild className="cursor-pointer rounded-lg">
                  {renderItem(item)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Logo - Left */}
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="transition-opacity hover:opacity-80"
            onClick={(event) => {
              if (pathname === '/' && onNavigate) {
                event.preventDefault();
                setActiveSection(null);
                onNavigate('landing');
                setMobileOpen(false);
              }
            }}
          >
            <Logo height={40} className="sm:hidden" />
            <Logo height={56} className="hidden sm:block md:hidden" />
            <Logo height={72} className="hidden md:block" />
          </Link>
        </div>

        {/* Navigation - Center (hidden on mobile) */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          {user ? (
            <nav className="flex gap-2">
              {LOGGED_IN_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className={cn(
                    'rounded-xl px-3 py-1.5 text-xs font-semibold transition-all sm:px-4 sm:py-2 sm:text-sm',
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

        {/* Button/Actions - Right */}
        <div className="flex flex-shrink-0 items-center justify-end gap-2 sm:gap-3 md:gap-4">
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
            <>
              <Button 
                onClick={() => setPaymentModalOpen(true)}
                className="hidden rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground hover:bg-accent/90 sm:px-6 sm:py-2 sm:text-sm md:flex"
              >
                Join movement
              </Button>
              <button
                className="flex items-center justify-center rounded-full border border-border p-2 transition-colors hover:bg-muted md:hidden"
                aria-label="Toggle navigation"
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
      {!user && (
        <MobileMenu 
          open={mobileOpen} 
          onClose={() => setMobileOpen(false)} 
          renderNav={renderPublicNav}
          onPaymentClick={() => setPaymentModalOpen(true)}
        />
      )}
      <CommunityJoinPaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
    </header>
  );
}

function MobileMenu({
  open,
  onClose,
  renderNav,
  onPaymentClick,
}: {
  open: boolean;
  onClose: () => void;
  renderNav: (isMobile: boolean) => React.ReactNode;
  onPaymentClick: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-x-0 top-0 flex h-[85vh] flex-col rounded-b-3xl bg-white p-6 shadow-xl">
        <div className="mb-8 flex items-center justify-between">
          <Logo height={48} />
          <button aria-label="Close menu" onClick={onClose} className="rounded-full border border-border p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {renderNav(true)}
        </div>
        <div className="pt-6">
          <Button 
            onClick={() => {
              onPaymentClick();
              onClose();
            }}
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase text-accent-foreground hover:bg-accent/90"
          >
            Join movement
          </Button>
        </div>
      </div>
    </div>
  );
}

