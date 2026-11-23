# OneAtlas.dev — AI Model Discovery (Frontend demo)

A working demo of **OneAtlas.dev**, an AI model discovery and intelligence
platform, built for The AI Signal demo task (Frontend Engineer role).

> **Sample data only.** All models, prices, benchmark scores and popularity
> figures in this app are realistic, hand-written examples for the demo.
> They are **not** live provider pricing or real benchmark results. The UI
> footer repeats this disclaimer.

## What it does

| Page | What you can do |
| --- | --- |
| `/` Discover | Search models by name/provider; filter by provider, model type and capability; sort by popularity, price, context window or release date; select up to 3 models to compare |
| `/models/[id]` | Model detail: full specs, input/output pricing, capabilities, benchmark bars, provider info, similar models and "compare with" links |
| `/compare?ids=a,b` | Compare 2–3 models side by side: specs, pricing, benchmarks, capabilities |
| `/providers` | Provider directory: each provider's description, HQ, founded year, website, model count and cheapest price, with links to its models |
| `/rankings` | Three leaderboards: most popular, best performance (average benchmark), best value (benchmark score per dollar) |

The UI is responsive (1 column on mobile, 2–3 on desktop) and has
loading states (route loading skeletons, a brief loading state on
Discover), an empty state when no models match the filters, and error
states (invalid compare selection, unknown model → 404 page).

## Architecture

- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4.**
  A small read-only API layer (Next.js Route Handlers) serves the
  catalogue; no paid APIs and no database yet.
- **Data layer** — `src/lib/data.ts` is the single server-side seed store:
  TypeScript types (`Model`, `Provider`, `Benchmarks`) and 28 seed models
  across 10 providers (OpenAI, Anthropic, Google, Meta, Mistral AI,
  DeepSeek, Cohere, xAI, Alibaba/Qwen, Moonshot AI), plus helpers for
  averages, value scores and formatting. It is served through
  `GET /api/models`, `GET /api/models/[id]` and `GET /api/providers`;
  the Discover page fetches `/api/models` instead of importing the data
  file into the client, and the detail, providers and rankings pages read
  the same store on the server. Change the data here and every page and
  API response updates.
- **Pages** — `src/app/page.tsx` (Discover, client component: search,
  filters, sort, compare selection), `src/app/models/[id]/page.tsx`
  (server component, statically generated per model), `src/app/compare/`
  (server component reading `?ids=` from the URL, so the table renders
  on the server), `src/app/providers/page.tsx` and
  `src/app/rankings/page.tsx` (server components that compute the
  leaderboards from the seed data).
- **Components** — `src/components/ModelCard.tsx` (model card with
  compare toggle), `src/app/layout.tsx` (header nav + footer disclaimer),
  `src/app/loading.tsx` and `src/app/not-found.tsx`.
- **State** — compare selection lives in the Discover page's React state
  and travels to `/compare` as URL query params (`?ids=a,b,c`), so a
  comparison is shareable as a link. No database, no cookies, no accounts.

## Technical decisions

- **Local seed data instead of a live API** — the task allows realistic
  mock data; a live provider API would need keys and would make the demo
  fragile. All filtering/sorting/comparison runs on the real seed data,
  so every interaction genuinely works. The seed data is served through
  the app's own API routes rather than hardcoded into the frontend.
- **Server components where possible** — detail, providers and rankings
  pages are server components; only Discover and Compare need client
  interactivity. Detail pages are statically generated
  (`generateStaticParams`) at build time.
- **No extra dependencies** — only Next.js, React and Tailwind. Nothing
  to install beyond `npm install`.
- **No invented claims** — benchmark numbers are labelled "sample data"
  in the UI and README, and the footer states the data is not live.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build and start:

```bash
npm run build
npm start          # http://localhost:3000
```

## Deploy

Any Next.js host works (the task suggests Vercel for the frontend).
`npm run build` produces a standard production build; no environment
variables are needed.

## Known limitations

- Data is a fixed sample of 28 models — no live prices, no real
  benchmarks, no API integration with OpenRouter/LiteLLM (they were
  studied as reference products only).
- No accounts, favourites or saved comparisons; compare selection is
  kept in the URL, so refreshing Discover clears it.
- Read-only API layer only: the seed data still lives in a TypeScript
  file, not a database. Moving it to PostgreSQL with a Prisma seed is
  the full-database step and is not done — the API routes are shaped so
  that swap is possible without changing the pages.
- Benchmarks are shown as simple bars; there are no charts or historical
  trends.
