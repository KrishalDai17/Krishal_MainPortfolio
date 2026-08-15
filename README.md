# Krishal Shrestha — Portfolio

Next.js 14 + TypeScript + Tailwind CSS. Premium, cinematic personal
portfolio combining software engineering, QA, data, and photography/
videography identities under one signature visual system (the
"viewfinder HUD" corner-bracket motif — used in the hero, cards, and
photo lightbox).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> Note: `npm run build` fetches Space Grotesk / Inter / JetBrains Mono /
> DM Sans / Instrument Serif from Google Fonts at build time, so you'll
> need an internet connection the first time you build or deploy.

## CMS (admin panel)

There's now a `/admin` CMS on top of this site — Supabase (Postgres +
Auth) for content and Cloudinary for media. The public site keeps
working with its original static content until you set this up; see
**[CMS_SETUP.md](./CMS_SETUP.md)** for the full walkthrough (create a
Supabase project, run `supabase/schema.sql`, create an admin user, add
Cloudinary keys, run `npm run seed`).

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com → New Project.
3. Framework preset: Next.js (auto-detected). No env vars needed.
4. Deploy.

## Editing content

Everything text-based — name, roles, skills, projects, education,
social links, etc. — lives in one file:

```
lib/data.ts
```

Change values there and every section updates automatically. No need
to touch component files for routine content edits.

### Adding your LinkedIn URL
Set `profile.links.linkedin` in `lib/data.ts`. It's currently empty,
so the LinkedIn card/button appears dimmed with a placeholder label
until you add it.

### Adding real photography / videography

`photoItems` and `videoItems` now come from Supabase via `lib/cms/content.ts`
(admin: `/admin/photography`, `/admin/videos`), falling back to the
placeholders in `lib/data.ts` — labelled `[ADD IMAGE]` / `[ADD PROJECT]`
and rendered as camera/film-icon tiles — when nothing's been uploaded
yet. See CMS_SETUP.md.

### Adding real project screenshots
Projects are managed at `/admin/projects`, with cover images uploaded
through Cloudinary directly from the admin form.

## Structure

```
app/
  layout.tsx        Fonts, metadata, SEO, global providers
  page.tsx           Composes all sections in order
  globals.css        Design tokens (CSS vars), custom cursor, reveal
                      animations, HUD frame styles

components/
  Navbar, Hero, About, IdentityWords, SkillMatrix, Projects,
  QASection, DataSection, Photography, Videography,
  CreativeSection, Education, Learning, ProfessionalProfile,
  Philosophy, SocialLinks, Contact, Footer
  ThemeInit, CustomCursor, ScrollProgress, LoadingScreen,
  Reveal, HUDFrame   — small shared utilities

lib/
  data.ts            All site content in one place

public/
  images/            profile, projects, photography, videography
```

## Design system (v2 — colourful futuristic tech × creative studio)

- **Colours** — CSS variables in `globals.css` (`--accent-blue #4F7CFF`,
  `--accent-violet #8B5CF6`, `--accent-cyan #22D3EE`, `--accent-pink
  #EC4899`, `--accent-orange #FB923C`, `--accent-lime #A3E635`), also
  exposed as Tailwind colors (`signal`, `violet`, `cyan`, `pink`,
  `orange`, `lime`). Base background/text stay theme-aware via
  `--color-ink*` / `--color-paper*`, now with a subtle blue-violet
  undertone in both dark and light mode.
- **Layered background** (`components/AmbientBackground.tsx` +
  `.app-bg` in `globals.css`) — fixed, non-scrolling base layer with a
  technical grid, drifting multi-colour radial glow, and two thin
  shimmering lines. Pure CSS animation (`drift`, `shimmer` in
  `tailwind.config.ts`), respects `prefers-reduced-motion`.
- **Section colour identity** — each section carries a `.section-glow
  .glow-*` class pair (e.g. `glow-pink-orange` on Photography,
  `glow-lime-cyan` on QA) that paints a soft blurred radial glow
  behind that section only — never a solid colour fill.
- **Cards** — `.glass-panel` utility (translucent background, hairline
  border, backdrop blur, lift + glow on hover) now used across About,
  Data, Learning, Professional Profile, QA, and Social cards.
- **Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono
  (technical labels) as before, plus two new additions used
  purposefully: **DM Sans** (`font-editorial`) for the Photography/
  Videography section headings to visually contrast the creative
  sections from the engineering ones, and **Instrument Serif**
  (`font-serif`, used italic) for editorial quote lines (hero
  "CREATOR BY VISION.", photography/videography taglines, the
  Creative section's centre statement).
- **Cursor** — same dot + ring behaviour, now with a colour-reactive
  glow: blue for general links, pink for `data-cursor="VIEW"` targets.
- **Reveal animations** — same IntersectionObserver-based reveal,
  upgraded with a blur-to-sharp + subtle scale finish alongside the
  existing translate/opacity.

All of the above is additive to the original architecture — no
sections, content, or `lib/data.ts` values were changed.

## Authenticity

No fake stats, testimonials, employers, or proficiency percentages are
used anywhere — per the brief. Skill levels use plain labels
(PRACTICAL EXPERIENCE / WORKING KNOWLEDGE / FAMILIAR / CURRENTLY
LEARNING) instead of invented percentages, and missing assets are
marked `[ADD IMAGE]` / `[ADD PROJECT]` / `[ADD LINKEDIN URL]` rather
than filled with stock content.
