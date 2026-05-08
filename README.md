# PlayWin Campaign Platform MVP

A starter MVP for a multi-client playable campaign platform.

## What is included

- Next.js dashboard starter
- Supabase database schema with Row Level Security
- Campaign CRUD UI scaffold
- Client-facing dashboard scaffold
- Leaderboard and leads table UI
- Demo HTML5 Spin & Win game
- Demo HTML5 Quiz game
- Cloudflare Worker API stub
- n8n webhook workflow sample
- Campaign configuration model
- CSV export example

## Suggested domains

```text
dashboard.playwin.africa  -> Next.js admin/client dashboard
games.playwin.africa      -> static HTML5 games
api.playwin.africa        -> Cloudflare Worker API
demos.playwin.africa      -> public demo portfolio
```

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Supabase setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy your project URL and anon key into `.env.local`.
5. Create a user in Supabase Auth.
6. Add that user to the `profiles` table.

## Deploy

### Dashboard

Deploy the Next.js app to Vercel or Cloudflare Pages.

### Games

Upload the contents of `/games` to Cloudflare Pages.

### API

Deploy `/workers/api-worker.js` as a Cloudflare Worker and bind environment variables for Supabase.

## MVP flow

```text
Admin creates campaign
↓
Campaign generates token
↓
Game loads with ?campaign=<token>
↓
Game fetches campaign config
↓
Game submits events, leads, scores
↓
Dashboard shows analytics, leads, leaderboard and vouchers
```

## Important production notes

- Use Supabase/PostgreSQL as the live database.
- Use Excel/CSV only for export/reporting.
- Generate voucher codes server-side, never in frontend JavaScript.
- Add Cloudflare Turnstile or equivalent anti-bot protection for voucher campaigns.
- Keep DSP/playable-ad builds self-contained where required.
