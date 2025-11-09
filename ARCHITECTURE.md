# Architecture Overview

This document outlines the architecture and structure of the CCN Next.js application.

## Tech Stack

### Core Framework
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **React 18** with Server Components

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **CSS Variables** - For theming and dark mode support

### State Management
- **React Query (TanStack Query)** - Server state management
- **Context API** - Client-side global state
- **Supabase** - Backend state (database, auth)

### Backend
- **Supabase** - Database, Authentication, Storage, Real-time

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles and CSS variables
│
├── components/                   # React components
│   ├── providers/               # Context providers
│   │   ├── app-providers.tsx    # Main provider wrapper
│   │   └── query-provider.tsx   # React Query provider
│   ├── ui/                      # shadcn/ui components
│   │   └── button.tsx          # Example UI component
│   └── examples/               # Example components
│       ├── example-auth.tsx     # Auth context usage
│       └── example-query.tsx    # React Query + Supabase usage
│
├── contexts/                     # React Context API
│   ├── app-context.tsx         # Application-wide state
│   └── auth-context.tsx        # Authentication state
│
├── hooks/                        # Custom React hooks
│   ├── use-supabase-query.ts   # Supabase + React Query hook
│   └── index.ts                # Barrel export
│
├── lib/                          # Utility libraries
│   ├── supabase/                # Supabase clients
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client (RSC)
│   │   └── middleware.ts       # Middleware client
│   ├── react-query/            # React Query config
│   │   └── query-client.ts    # Query client setup
│   ├── utils.ts                # Utility functions (cn, etc.)
│   └── errors.ts               # Error handling utilities
│
├── types/                        # TypeScript types
│   └── supabase.ts             # Generated Supabase types
│
├── utils/                        # Utility functions
│   └── constants.ts            # App constants
│
├── public/                       # Static assets
│
├── middleware.ts                # Next.js middleware (auth)
├── components.json              # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── next.config.js              # Next.js configuration
```

## Architecture Patterns

### 1. Provider Pattern
All global providers are wrapped in `AppProviders` component:
- React Query for server state
- Auth Context for authentication

### 2. Supabase Integration
Three client instances for different contexts:
- **Client** (`lib/supabase/client.ts`) - Browser/client-side
- **Server** (`lib/supabase/server.ts`) - Server Components
- **Middleware** (`lib/supabase/middleware.ts`) - Next.js middleware

### 3. React Query Integration
- Centralized query client configuration
- Custom hooks for Supabase queries
- DevTools enabled in development

### 4. Context API Usage
- `AuthContext` - Handles authentication state

### 5. Type Safety
- Full TypeScript coverage
- Supabase types for database schema
- Strict mode enabled

## Data Flow

### Authentication Flow
1. User authenticates via Supabase
2. `AuthContext` listens to auth state changes
3. Middleware refreshes session on each request
4. Components access auth state via `useAuth()` hook

### Data Fetching Flow
1. Component uses `useSupabaseQuery()` hook
2. Hook wraps Supabase query with React Query
3. React Query handles caching, refetching, etc.
4. Component receives typed data and loading states

### Server Components
1. Use `createClient()` from `lib/supabase/server.ts`
2. Fetch data directly in Server Components
3. No React Query needed (no client-side state)

## Best Practices

### Adding New Components
1. Use shadcn/ui CLI: `npx shadcn-ui@latest add [component]`
2. Components go in `components/ui/`
3. Follow shadcn/ui patterns and conventions

### Adding New Context
1. Create file in `contexts/` directory
2. Export provider and hook
3. Add it to `AppProviders` if necessary

### Adding New Hooks
1. Create file in `hooks/` directory
2. Export from `hooks/index.ts`
3. Follow React hooks naming conventions

### Database Queries
- Use `useSupabaseQuery()` for client-side queries
- Use `createClient()` from server.ts for Server Components
- Generate types: `npx supabase gen types typescript --project-id [id] > types/supabase.ts`

### Styling
- Use Tailwind utility classes
- Use `cn()` utility for conditional classes
- Follow shadcn/ui component patterns
- Use CSS variables for theming

## Environment Variables

Required environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development Workflow

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run dev server: `npm run dev`
4. Add shadcn/ui components as needed
5. Generate Supabase types when schema changes
6. Build and test: `npm run build`

## Next Steps

- [ ] Add authentication pages (login, signup)
- [ ] Set up protected route patterns
- [ ] Add more shadcn/ui components
- [ ] Configure Supabase database schema
- [ ] Generate Supabase types
- [ ] Add error boundaries
- [ ] Set up testing framework
- [ ] Configure CI/CD




