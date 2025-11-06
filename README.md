# CCN - Next.js Application

A modern Next.js application built with industry-standard tools and practices.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **React Query (TanStack Query)** - Server state management
- **Supabase** - Backend as a service (database, auth, storage)
- **Context API** - Client-side state management

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── providers/         # Context providers
├── contexts/              # React Context API
│   ├── app-context.tsx    # App-wide state
│   └── auth-context.tsx   # Authentication state
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── supabase/         # Supabase clients
│   ├── react-query/      # React Query config
│   └── utils.ts          # Utility functions
├── types/                 # TypeScript types
│   └── supabase.ts       # Supabase database types
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Authentication
- Supabase authentication with context API
- Server and client-side auth handling
- Protected routes via middleware

### Data Fetching
- React Query for server state management
- Supabase integration hooks
- Optimistic updates support

### Styling
- Tailwind CSS with custom configuration
- shadcn/ui components
- Dark mode support (via CSS variables)

### Type Safety
- Full TypeScript coverage
- Supabase type generation
- Strict mode enabled

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Adding shadcn/ui Components

To add shadcn/ui components, use the CLI:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# etc.
```

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Add them to `.env.local`
4. Generate types (optional):
```bash
npx supabase gen types typescript --project-id your_project_id > types/supabase.ts
```

## License

MIT




