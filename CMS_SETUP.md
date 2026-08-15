# CMS setup

The public portfolio is unchanged. This adds a `/admin` CMS on top of it,
backed by Supabase (Postgres + Auth) and Cloudinary (media).

## 1. Supabase project
1. Create a free project at supabase.com.
2. SQL Editor → run `supabase/schema.sql` once.
3. Project Settings → API → copy the URL, anon key, and service role key
   into `.env.local` (copy from `.env.example`).
4. Authentication → Users → **Add user** to create your own admin login
   (email + password). There is no signup form and no hardcoded password
   by design.

## 2. Cloudinary
1. Create a free account at cloudinary.com.
2. Dashboard → copy Cloud name, API Key, API Secret into `.env.local`.
   The API secret is only ever used server-side (signed uploads).

## 3. Migrate existing content
```bash
npm install
npm run seed
```
This copies everything currently in `lib/data.ts` into Supabase, so
`/admin` starts out matching the live site exactly. Safe to re-run.

## 4. Run it
```bash
npm run dev
```
Visit `/admin/login` and sign in with the user you created in step 1.

## 5. Deploy (Vercel Hobby)
Add the same env vars in Vercel → Project → Settings → Environment
Variables (all of them except keep `SUPABASE_SERVICE_ROLE_KEY` out of
any client-exposed context — it's only read by the local seed script,
not by the deployed app). Push to GitHub, import in Vercel, deploy.

## How it behaves without any of this set up
Every CMS read has a static fallback to the original `lib/data.ts`
content, so the site renders identically whether or not Supabase is
configured. `/admin` shows a "CMS not configured" message instead of
erroring until env vars are present.

## What's intentionally out of scope
- Resume upload/section and "Certifications/Experience/Services/
  Testimonials/Achievements" admin pages — these don't exist in the
  current portfolio content, so per the brief they weren't invented.
  The schema/pattern here (a `content_singletons` row or a new list
  table + `ListEditor` config) extends cleanly if you add them later.
