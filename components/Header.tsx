"use client";

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
import { LOGGED_IN_NAV_ITEMS, PUBLIC_NAV_ITEMS, ROUTES } from '@/utils/constants';
import { containerClass } from '@/lib/layout-utils';
import type { HeaderProps } from '@/types';

export function Header({ user, currentPage, onNavigate, onLogout, isAdmin }: HeaderProps) {

  return (
    <header className="border-b-2 border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className={containerClass}>
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-12">
            <button
              onClick={() => onNavigate?.(user ? ROUTES.DASHBOARD : ROUTES.LANDING)}
              className="hover:opacity-80 transition-opacity"
            >
              <Logo height={48} />
            </button>

            {user ? (
              <nav className="hidden md:flex gap-2">
                {LOGGED_IN_NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate?.(item.id as any)}
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
                {PUBLIC_NAV_ITEMS.map((item, index) => (
                  item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={index}
                      onClick={() => onNavigate?.(item.route as any)}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    variant={currentPage === ROUTES.ADMIN ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onNavigate?.(ROUTES.ADMIN)}
                    className={currentPage === ROUTES.ADMIN ? 'bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl' : 'font-semibold rounded-xl'}
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
                onClick={() => onNavigate?.(ROUTES.JOIN)}
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

