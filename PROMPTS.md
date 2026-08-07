# PROMPTS.md — how this was built

ABTalks redesign, built in one session with an AI pair-builder from a single spec document.

## 1. Spec handoff

The full "ABTalks Redesign — Full Build Spec" was handed over as the single source of truth:
problem statement, brutalist design tokens (light + derived dark), typography/spacing/radius
scales, page-by-page requirements, the two original features (Streak Freeze, auto-drafted
LinkedIn caption), three required edge cases, and the mock data schema.

## 2. Stack reconciliation

The spec targeted Next.js. This project runs TanStack Start (React 19 + Vite + Tailwind v4),
so each requirement was mapped to its equivalent:

- `app/` routes -> `src/routes/index.tsx`, `dashboard.tsx`, `day.$n.tsx` (same URLs)
- `next/font/google` -> font `<link>` tags in the root route `head()`
- `tailwind.config.js` theme -> Tailwind v4 `@theme inline` tokens in `src/styles.css`
- `next-themes` -> a small inline head script + `useTheme()` hook, localStorage + system default

## 3. Build order

1. Design system: full light/dark palettes as CSS variables, exact type scale
   (display-xl -> mono-label) as Tailwind text tokens, 4px spacing scale, radius scale
   (0 / 12px / pill), `shadow-brutal*` hard-offset utilities, `grid-bg` overlay,
   `text-hero-clamp` for the 88px -> 40px mobile headline.
2. Mock data (`src/data/abtalks.ts`): 60 real Web Dev tasks with objectives, three student
   profiles (mid-challenge with a freeze-protected miss, day-one, empty), achievements, tracks.
3. Shared components (`src/components/ab/ui.tsx`): Nav, BrutalButton/BrutalLink, Panel, Pill,
   DayGrid with five states, FreezeCounter, ThemeToggle, Footer.
4. Pages: landing, dashboard (with a demo state switcher via `?student=`), day page with
   validated GitHub/LinkedIn inputs and the pre-filled editable caption.
5. Verification: Playwright screenshots of all six URLs at 390px in both themes.

## 4. Bugs found and fixed during verification

- `tailwind-merge` was collapsing `text-mono-label` against text-color classes, silently
  dropping the 9px badge size. Fixed by defining a dedicated `mono-label` utility.
- The theme init script rendered inside `shellComponent` was stripped from SSR output.
  Moved into the root route's `head().scripts` array, which restored no-flash dark mode.
- A `whitespace-nowrap` badge forced 452px of horizontal overflow at 390px. Removed the
  nowrap and added `min-w-0` to panels.

## 5. Demo routes

- `/`
- `/dashboard` (also `?student=first-day`, `?student=empty`)
- `/day/12` (any day 1-60 works)
