# PlayWin V1 Build Plan

## V1 must-haves

- Campaign CRUD
- Live lead/score table per campaign
- Analytics charts
- Client login
- Voucher management and redemption tracking
- Leaderboard management
- CSV export

## Build phases

### Phase 1: Foundation
- Next.js project
- Supabase project
- Auth
- Clients table
- Profiles table
- Campaigns table
- Admin and client roles

### Phase 2: Campaign data
- Campaign config JSON
- Lead capture
- Score submission
- Events table
- CSV export

### Phase 3: Game demos
- Spin & Win
- Quiz
- Scratch Card
- Maze
- Catch Game
- Runner / Road Safety game

### Phase 4: Analytics dashboard
- Impressions
- Game starts
- Completions
- Leads
- Conversion rate
- Voucher issued/redeemed
- Leaderboard

### Phase 5: Automation
- n8n workflow
- WhatsApp/SMS confirmation
- Google Sheets sync
- Client email notifications

## Production hardening

- Use Cloudflare Worker for public API calls.
- Use service role only inside Worker, never in browser.
- Add rate limiting per IP and phone number.
- Generate voucher codes server-side.
- Add audit logs.
- Add campaign-specific terms and conditions.
- Add POPIA/GDPR consent wording.
