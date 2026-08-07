# ABTalks — Brutalist Command Center (3-page build)

## One stack note first

This project runs on TanStack Start (React 19 + Vite + Tailwind v4), not Next.js. Everything in the spec is buildable here with equivalent pieces:

- Routing: file routes `src/routes/index.tsx`, `dashboard.tsx`, `day.$n.tsx` — same URLs `/`, `/dashboard`, `/day/12`.
- Fonts: Space Grotesk / Inter / JetBrains Mono loaded via `<link>` in the root route head (equivalent to `next/font`).
- Theme: Tailwind v4 is CSS-first — tokens live in `src/styles.css` under `@theme`, not `tailwind.config.js`. Dark mode via a `.dark` class on `<html>` with a localStorage toggle defaulting to system preference (hand-rolled, no `next-themes`).
- Data: local typed mock data files, no database, no auth.
- Deploy: Publish button gives a live URL (no Vercel step needed).

## Answers to the three open questions

1. Edge-case states: `?student=first-day | missed-day | empty` on `/dashboard` and `/day/[n]`, defaulting to the mid-challenge profile. Query param keeps the route map submission exactly `/`, `/dashboard`, `/day/12`.
2. Yes — dynamic `/day/$n` handling any 1–60, with `/day/12` as the showcased day.
3. Confirmed: mock JSON only, no backend.

## 1. Design system

- `src/styles.css`: light palette (`#000`, `#1a1a1a`, `#FFCC00`, `#E63B2E`, `#0055FF`, `#F5F0E8`, `#EEE9E0`, `#FFFFFF`, `#171717`) and the specified dark palette as CSS variables swapped under `.dark`, mapped through `@theme inline`.
- Type scale as custom utilities: display-xl, hero-display, display-large, heading-1/2/3, subheading, label-bold, label-small, body, body-bold, mono-label — exact sizes, weight 900, line-heights, negative tracking. Hero uses `clamp()` so 88px desktop scales to ~40px at 390px while keeping tight negative tracking.
- Spacing scale 4→112px; radius none / card 12px / pill full.
- `@utility shadow-brutal` (and `-lg`) = hard offset, no blur; ink color flips to white in dark mode.
- Grid-line overlay on the page background via a low-opacity repeating gradient.
- Accent discipline: yellow only for the single primary CTA per screen, red for alerts/missed, blue for stats.
- Root head metadata rewritten to ABTalks title/description/og/twitter.

## 2. Mock data

`src/data/` with typed modules matching the spec schema: `student`, `challengeDays` (60 days of real Web Dev / AI-ML task copy with objectives and pre-drafted LinkedIn captions), `achievements`, `tracks`.

Three profiles:
- `mid` (default): days 1–5 completed, day 6 missed but freeze-protected, 7–11 completed, day 12 = today, 13–60 upcoming; 1 freeze used, 1 remaining.
- `first-day`: streak 0, day 1 = today, all others upcoming, badges in locked state.
- `empty`: zero submissions ever, every data section renders a designed empty state.

## 3. Shared components

Nav (sharp edges, ABTALKS wordmark, theme toggle, yellow CTA, optional avatar slot), Button (yellow / outline / disabled, zero radius, hard shadow), Panel (card radius + hard shadow), Badge pill (mono-label), DayGrid (60 squares, five distinct states: completed / missed / frozen / today / upcoming, legible at 390px), StreakFreeze counter.

## 4. Landing `/`

Nav → hero (clamped headline, plain-language subhead, yellow CTA, accent-blue live student count) → how it works with 01/02/03 mono markers → trust/proof section (sample finished 60-day profile, aggregate stats) → track picker card grid → full-width final CTA band → dark footer.

## 5. Dashboard `/dashboard`

Single-column at 390px: nav → streak hero with alive / at-risk / broken states and freeze token counter → today's task card with CTA to `/day/n` → 60-square DayGrid → completion % stat → achievements pill row (horizontal scroll, locked states) → optional "who's building today" strip (cut first). All three profile states render distinct, designed copy — non-punishing tone on missed days.

## 6. Day `/day/$n`

Back-to-dashboard control → "Day 12 of 60" header with track and difficulty → real task description → learning objectives list → submission block: GitHub URL field + LinkedIn URL field (both format-validated), auto-drafted editable LinkedIn caption textarea with copy button → yellow Submit disabled until both URLs valid → success state "Proof submitted. Streak continues." → read-only completed view when the day already has a submission.

## 7. Verification pass

Check all three routes at 390px, both themes, in a real browser; contrast-check every pair against AA; confirm zero radius on buttons/inputs/nav, no blurred shadows, correct font weights. Add `PROMPTS.md`. Then publish for the live URL.
