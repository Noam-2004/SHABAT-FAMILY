# SHABAT FAMILY — real app

This is the real, persistent version of the app: Next.js + Supabase (Postgres +
Storage + private buckets). Photos, favorites, covers, the daily shake, and
awards all live in a real database and sync across every device. Takes about
10–15 minutes to get a live link, all on free tiers.

## 1. Create the Supabase project (5 min)
1. Go to https://supabase.com → sign up (free) → **New project**.
2. Pick any name/region, set a database password (save it somewhere).
3. Wait ~2 minutes for it to finish provisioning.
4. Open **SQL Editor** → **New query** → paste the entire contents of
   `supabase/schema.sql` → **Run**. This creates every table and the private
   `photos` storage bucket.
5. Open **Settings → API**. You'll need three values from this page:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY` (click "reveal")

## 2. Configure locally
1. Copy `.env.example` to `.env.local`.
2. Fill in the three Supabase values from above.
3. Set `SESSION_SECRET` to any long random string (e.g. run
   `openssl rand -hex 32` in a terminal, or just mash your keyboard for 40
   characters).
4. Set `FAMILY_PASSCODE` (what everyone types in) and `ADMIN_PASSCODE`
   (what unlocks photo upload / cover picking / editing) to whatever you like.

## 3. Install, seed, run locally to test
```bash
npm install
npm run seed        # loads the 21-day itinerary into Supabase (safe to re-run)
npm run dev          # open http://localhost:3000
```
Log in with your name + the family passcode, click around, try uploading a
photo. If that works locally, you're ready to deploy.

## 4. Deploy to Vercel (free) — this gives you the real link
1. Push this folder to a new GitHub repo (private repo is fine):
   ```bash
   git init && git add -A && git commit -m "shabat family app"
   # create a repo on github.com, then:
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to https://vercel.com → sign up with GitHub → **Add New Project** →
   import the repo you just pushed.
3. Before clicking Deploy, open **Environment Variables** and add all six
   values from your `.env.local` (same names, same values).
4. Click **Deploy**. In about a minute you'll get a real link like
   `https://shabat-family.vercel.app`.
5. Send that link to your family. Each person opens it, types their name and
   the family passcode once, and stays logged in for 90 days.

## What's real vs. simplified in this first version
**Real and working:** persistent Postgres database, private photo storage
with signed URLs, photo upload/favorite/day-cover that syncs across every
device instantly on refresh, the daily shake feature with per-person saved
preferences, award voting, trip stats, passcode-gated access, PWA manifest
(installable to the home screen on iPhone via Safari's Share → "Add to Home
Screen").

**Simplified / left as a next step**, to keep this first version honest and
working rather than half-built everywhere:
- **Attraction/destination photography**: seeded with text only — no photos
  baked into the code. The Admin uploads real photos through the app itself
  (exactly like the family photos), which is what actually makes "day cover"
  and the photo carousel come alive. A future version could add a real
  Unsplash/Pexels API integration for the "coming up" placeholder photos
  before you've visited.
- **Realtime push updates**: right now a page shows the latest data on load/
  refresh (which covers "another device sees the photo after refreshing").
  True realtime (someone's photo appearing without refreshing) would use
  Supabase Realtime subscriptions — straightforward to add if you want it.
- **Offline caching**: the manifest makes the app installable, but there's no
  service worker yet caching the itinerary for offline viewing.
- Quotes, postcards, AI recap, and ZIP download weren't carried over from the
  prototype in this first pass — the priority was making photos, favorites,
  covers, and the shake feature actually real and persistent first.

None of this is hard to add — it's scoped this way so what exists today is
fully real rather than partially fake.
