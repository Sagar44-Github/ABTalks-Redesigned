# ABTalks Streak Hub

ABTalks Redesign — Full Build Spec --> PRIORITY 1

Hand this entire document to your builder AI as the single source of truth. It contains the problem statement, exact design system, page-by-page layout specs, copy, data schema, edge cases, and acceptance criteria. Nothing here should require guessing.

0. Context (read first)

ABTalks runs a 60-day coding challenge for Indian college students. Students pick a track, build something every day, and maintain a public "streak" by submitting two things daily:

A GitHub commit

A LinkedIn post

This proof-of-work builds consistency and recruiter visibility. Most usage is mobile, late at night, after college. The product currently works functionally but has never been designed — this challenge is to design and build it properly.

This is a solo hackathon entry. Judging rewards design judgment, execution polish, and one genuinely useful original idea — not feature count.

1. Tech Stack Instructions

Framework: Next.js 14+ (App Router). Reason: fastest path to clean routing (/, /dashboard, /day/12), trivial Vercel deploy, server components for fast mobile loads.

Styling: Tailwind CSS, with a custom theme config that encodes every token below (don't hardcode hex values inline — define them as Tailwind theme extensions so light/dark mode is a single class toggle).

Fonts: Space Grotesk (headlines), Inter (body), JetBrains Mono (micro-labels/badges) — load via next/font/google.

Data: a single mocked data.json (schema in Section 6) imported at build/request time. No database, no auth, no real accounts.

Deploy target: Vercel (or Netlify) — must produce a live, working URL.

Dark mode: implement via a dark class on <html>, toggled by a persistent control in the nav (localStorage-based, defaulting to system preference). Every screen must be fully usable in both modes — this is a required deliverable, not a stretch goal, since the source site (hackathonfeed.com) has no dark mode and cloning + extending it is part of the brief.

2. Design System — "Brutalist Command Center"

This is cloned from hackathonfeed.com's extracted design tokens. Follow it exactly — do not substitute a generic SaaS look (no soft rounded cards, no pastel gradients, no default shadcn defaults). The whole point is the raw, mechanical, high-contrast brutalist feel.

2.1 Signature traits

Ultra-heavy Space Grotesk headlines (weight 900), tight negative letter-spacing

Zero border-radius on interactive elements (buttons, inputs, nav) — sharp mechanical edges

Hard offset box-shadows instead of soft elevation (e.g. box-shadow: 4px 4px 0px #000 — a solid black offset block, not a blur)

Visible grid-line overlay on the page background

JetBrains Mono for tiny badges/status chips — gives a "developer tool" credibility layer

Tricolor accent system used sparingly and semantically (yellow = primary CTA, red = alerts/live/prize, blue = stats/counts) — never decorative

2.2 Light mode palette (cloned exactly)

--pure-black:        #000000   /* borders, shadows, primary button text on yellow */
--ink:                #1a1a1a   /* primary text, borders, grid lines */
--accent-yellow:      #FFCC00   /* primary CTA fill, highlighted cards, brand accent */
--accent-red:         #E63B2E   /* alerts, live badges, "missed day" states, prize/urgency */
--accent-blue:        #0055FF   /* stat numbers, counters, informational badges */
--background-base:    #F5F0E8   /* page background, has grid-line overlay */
--background-sidebar: #EEE9E0   /* nav/sidebar surface */
--card-surface:       #FFFFFF   /* cards, input fields */
--footer-dark:        #171717   /* dark footer band, two-zone page split */


2.3 Dark mode palette (new — derive from the above, preserve identical roles/contrast relationships)

The source site has no dark mode. Build one that keeps the exact same semantic structure (same roles, same brutalist hard-shadow language) with inverted luminance:

--pure-black:         #FFFFFF   /* inverted: now "pure white" as the border/shadow ink */
--ink:                #F0EDE6   /* primary text (near-white, slightly warm to match light mode's warm off-white) */
--accent-yellow:      #FFD84D   /* brightened slightly for AA contrast on dark surfaces */
--accent-red:         #FF5A46   /* brightened for contrast, same semantic role */
--accent-blue:        #4D8AFF   /* brightened for contrast, same semantic role */
--background-base:    #121110   /* warm-black, mirrors the warm off-white base — NOT pure #000 */
--background-sidebar: #1C1A17   /* slightly lifted from background-base, same relationship as light mode */
--card-surface:       #201E1B   /* card surface, one step lighter than sidebar */
--footer-dark:        #000000   /* pure black footer band — darkest point in the UI, mirrors light mode's dark footer role */


Hard offset shadows in dark mode should render in --pure-black (white) or a saturated accent color — never a soft black blur (that would break the brutalist language). E.g. a card offset shadow becomes 4px 4px 0px #FFFFFF in dark mode.

Every color pair (background/text, accent/background) must meet WCAG AA (4.5:1) in both modes — check this explicitly, especially yellow text/fills on light backgrounds and the brightened accent colors on dark surfaces.

2.4 Typography scale (exact — use as Tailwind custom font-size utilities)

Token Font Size Weight Line-height Letter-spacing Use display-xl Space Grotesk 100px 900 90px -5px Rare, max-impact hero moments only hero-display Space Grotesk 88px 900 75.68px -4.4px Landing page hero headline display-large Space Grotesk 72px 900 63.36px -3.6px Secondary hero / big stat heading-1 Space Grotesk 48px 900 48px -2.4px Section headings heading-2 Space Grotesk 36px 900 40px -1.8px Sub-section headings heading-3 Space Grotesk 30px 900 36px -1.5px Card/panel headings subheading Space Grotesk 20px 900 28px -0.5px Emphasized labels label-bold Space Grotesk 16px 900 24px -0.4px Buttons, nav items label-small Space Grotesk 11px 900 16.5px normal Small caps tags/categories body Inter 16px 400 24px normal Body copy body-bold Inter 14px 700 19.25px normal Emphasized inline text mono-label JetBrains Mono 9px 700 13.5px normal Micro badges, status chips

Mobile scaling note: at 390px viewport, do NOT use hero-display (88px) or display-xl (100px) at full size — they will overflow. Scale hero headline down to roughly heading-1/heading-2 range (48–36px) on mobile via a responsive clamp, while keeping the weight-900 tightness and negative tracking proportionally. This is a judgment call your builder should make explicitly, not skip.

2.5 Spacing scale (4px base grid — use as Tailwind spacing extension)

4, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 80, 96, 112 (px)


2.6 Radius scale

none: 0px   → all interactive elements (buttons, inputs, nav bar)
card: 12px  → cards/panels only
full: 9999px → pills/badges only (e.g. streak badge, status chip)


Never mix sharp and rounded corners within the same component — a card is either fully card radius or fully none, not mixed per-corner.

2.7 Layout

Max-width container: 1440px, 40px horizontal padding on desktop

On mobile (390px target): container padding drops to 16–20px, single-column stacking throughout

Grid-line overlay on background-base: a subtle repeating linear-gradient or SVG pattern at low opacity — decorative texture, must not reduce text contrast

2.8 Do / Don't

Do Don't Use hard offset shadows (no blur) consistently Use soft box-shadow blur (breaks the brutalist language) Keep yellow reserved for the single most important CTA per screen Use yellow decoratively on multiple elements at once Maintain 4.5:1 contrast in both light and dark mode Ship dark mode text/accent combos you haven't contrast-checked Use JetBrains Mono only for micro-labels/badges Use JetBrains Mono for body copy or headings Keep zero border-radius on all buttons/inputs/nav Round some buttons and not others

3. Page-by-Page Spec

All three pages must be designed mobile-first at 390px as the primary target (this is what gets screenshotted for judging), with desktop as secondary. Every page needs a working dark mode toggle accessible from the nav.

3.1 / — Landing Page

Job: convince a student who has never heard of ABTalks to commit to 60 days, in under 15 seconds of attention.

Required sections, in order:

Nav bar — logo/wordmark "ABTALKS" (Space Grotesk, weight 900), dark-mode toggle, single primary CTA button ("Start Your Streak" or similar, yellow fill, black border, hard shadow)

Hero — headline using hero-display scale (clamped down on mobile per 2.4), one-sentence subhead in body copy explaining the format in plain terms ("Pick a track. Build daily. Prove it with a commit and a post."), primary CTA button. Consider a live/animated stat here (e.g. "2,847 students currently on a streak") using accent-blue for the number — but only if you can make it feel earned, not decorative.

How it works — 3-step explainer (Pick a track → Build daily → Submit proof). Since this genuinely is a sequence, numbered markers (01/02/03) are appropriate here per the brutalist mono-label style.

Trust/proof section — social proof that this is real and worth committing to: could be example streak stats, sample of tracks available (e.g. Web Dev, AI/ML, DSA, Mobile), or example of what a finished 60-day profile looks like. This is the section doing the heaviest lifting for "trust" — don't skip or under-build it.

Track picker preview — a card grid (using card radius, hard shadow) showing 3–5 available tracks with a one-line description each

Final CTA band — full-width, high contrast (could use footer-dark or yellow), restating the commitment ask

Footer — dark band (--footer-dark), minimal links, mono-label micro text

Copy tone: Direct, plain, addressed to the student ("you"), no filler, no corporate voice. Avoid generic hackathon-speak like "revolutionize your journey."

3.2 /dashboard — Student Dashboard

Job: the home screen after login — a student should understand their status in one glance and know exactly what to do next.

Required elements (all must be present per the brief):

Nav bar — consistent with landing page, plus a student avatar/name in the corner

Current streak — the single most prominent number on the page. Use display-large or heading-1 scale. Must visually communicate: is it alive (accent-blue or a "flame" motif), at risk (accent-yellow warning state — e.g. today not yet submitted and it's late in the day), or broken (accent-red, see edge case 5.2)

Today's task — a prominent card (highest visual priority after streak) showing today's day number, task title, one-line summary, and a direct CTA to go to /day/[n]

Progress through the challenge — a progress bar or day-grid (e.g. 60 small squares, filled/empty/missed states) showing where the student is in the 60 days. A day-grid is preferable to a simple bar because it lets you visually encode the missed-day edge case (5.2) per square, not just as an aggregate.

Overall completion % — a clear stat, accent-blue, e.g. "20/60 days complete — 33%"

Student standing/achievements — badges or milestone markers (e.g. "7-Day Streak," "Halfway There," "First Submission"). Use full radius pill badges with mono-label text, consistent with the brutalist badge language.

Your thoughtful feature (see Section 4) surfaces here prominently — this is the dashboard's job to make it visible, not buried.

Layout on mobile (390px): strict single-column stack. Suggested order: nav → streak (hero position) → today's task card → progress day-grid → completion stat → achievements row (horizontal scroll if needed) → thoughtful feature.

3.3 /day/12 — Challenge Day

Job: everything needed to understand and complete one day's work, then prove it.

Required elements:

Nav bar + breadcrumb/back-to-dashboard control

Day header — "Day 12 of 60," track name, estimated time/difficulty if you want to add it

Task description — what needs to be built today. Write real, specific mock content (not lorem ipsum) — e.g. if the track is "Web Dev," Day 12's task should read like an actual daily coding prompt.

What you'll need / learning objective — a short scoped list of what this task covers

Submission section — two distinct inputs:

GitHub repository/commit URL field (with basic format validation — must look like a GitHub URL)

LinkedIn post URL field (with basic format validation)

This is also where your "auto-drafted LinkedIn caption" feature (Section 4) should live — a pre-filled, editable caption textarea the student can copy before they post

Submit button — yellow CTA, disabled/inactive style until both fields are filled, clear success state on submit (even though this is mocked — show a believable confirmation state, e.g. "Proof submitted. Streak continues.")

Already-submitted state — if mock data shows day 12 already has a submission, show it as completed/read-only with a way to view what was submitted, not just re-show the empty form

4. Required Original Idea(s)

The brief requires at least one thoughtful idea. Build these two — they're scoped, meaningfully different from pure visual polish, and directly address the brief's own pain points (mobile, late-night, motivation-to-submit):

4.1 Streak Freeze

Every student has a limited number of "streak freeze" tokens (mock data: start with 1, could show "earn more at milestones" as a stated but non-functional future idea in copy)

If a day is missed, a freeze token — if available — auto-protects the streak instead of breaking it

This must be visible in the UI, not just a backend rule: show the token count on the dashboard (e.g. a small icon/counter near the streak), and when a missed day is protected by a freeze, the day-grid square should show a distinct "frozen" visual state (e.g. blue/frosted styling) rather than looking identical to a completed day or a truly missed day

This directly turns the brief's required "missed day" edge case into a designed feature rather than just a failure state

4.2 Auto-drafted LinkedIn caption

On /day/12, pre-fill the LinkedIn submission textarea with a caption drafted from that day's task content (e.g. "Day 12 of my #ABTalks60DayChallenge 🚀 Today I built [task title]. Here's what I learned...")

Editable, not locked — the point is removing the blank-page friction at the exact moment (late at night, tired) a student is most likely to skip the post

This is a real, demonstrable UI feature — build the actual pre-fill, don't just describe it in copy

If time allows, a third: a small "who's building today" social-proof strip on the dashboard — optional, lowest priority, cut first if time is short.

5. Edge Cases (all three are explicitly required by the brief — none can be skipped)

5.1 First day, no streak yet

Mock a student state where streak = 0, daysCompleted = 0

Dashboard must not show a broken/empty-looking "0" as if something went wrong — design this as a genuine start state: encouraging copy ("Your streak starts today"), today's task (Day 1) prominent, progress grid showing all 60 days as untouched/upcoming (not "missed")

Do not show achievements/badges section as broken or empty-looking — either hide it gracefully or show a "locked, unlock your first badge" state

5.2 A missed day

Mock a student state with at least one gap in their submission history (e.g. submitted days 1–5, missed day 6, resumed day 7–12)

The day-grid on the dashboard must visually distinguish: completed / missed / frozen (via streak freeze, 4.1) / today / upcoming — five distinct states, five distinct visual treatments

The current streak number must correctly reflect the reset (or freeze-protection) logic — don't just show a stat that contradicts the visual history

Tone: the missed-day state should not feel punishing in copy — brief explicitly frames the product as supporting students building consistency, not shaming lapses

5.3 An empty profile

Mock a student state with zero submissions ever (distinct from "first day" — this is closer to a genuinely new/unused account)

Every section that would normally show data (achievements, progress grid, completion %) needs an explicit empty state with actual designed content — a call to action, not a blank space or a broken-looking "undefined"/"0%" with no explanation

6. Mock Data Schema

Structure data.json (or split into multiple files) to cover:

student: {
  name, avatarUrl, track, joinedDate,
  currentStreak, longestStreak,
  streakFreezesAvailable, streakFreezesUsed,
  totalDaysCompleted, completionPercentage
}

challengeDays: [
  {
    dayNumber (1–60),
    title,
    description,          // real, specific, not lorem ipsum
    learningObjectives: [],
    track,
    status: "completed" | "missed" | "frozen" | "today" | "upcoming",
    submission: {
      githubUrl,
      linkedinUrl,
      linkedinCaption,     // pre-drafted caption text
      submittedAt
    } | null
  }
]

achievements: [
  { id, title, description, unlockedAt | null, iconOrBadgeStyle }
]

tracks: [
  { id, name, description, totalStudents }   // for landing page track picker
]


Provide at least three full mock student profiles (or three data variants) so each edge case (5.1, 5.2, 5.3) can be demoed on a real, distinct state — don't force one profile to awkwardly represent all three cases.

7. Acceptance Checklist (verify before submitting)

[ ] All three routes work: /, /dashboard, /day/12

[ ] Fully usable and legible at 390px width (this is what gets screenshotted)

[ ] Dark mode toggle works on all three pages, contrast-checked

[ ] Zero border-radius maintained on all buttons/inputs/nav; only cards and pills are rounded

[ ] Hard offset shadows used throughout, no soft blurred shadows

[ ] Space Grotesk / Inter / JetBrains Mono all loading correctly, weights match spec

[ ] Landing page is understandable with zero prior context about ABTalks

[ ] First-day-no-streak state is built and viewable

[ ] Missed-day state is built and viewable, including streak-freeze distinction

[ ] Empty-profile state is built and viewable

[ ] Streak Freeze feature is visibly represented in the UI, not just copy

[ ] Auto-drafted LinkedIn caption is actually pre-filled and editable on /day/12

[ ] Mock data covers at least 3 distinct student states for the edge cases above

[ ] Deployed to a live URL (Vercel/Netlify) and confirmed working

[ ] Public GitHub repo created after kickoff (not reused/pre-existing)

[ ] PROMPTS.md (or exported chat log) included, genuinely reflecting the build process

[ ] Route map ready to submit in exact order:

/
/dashboard
/day/12


8. Submission Rules Reminder

Repo must be public and created during the hackathon window — a pre-existing or largely-imported codebase risks disqualification in the authenticity review stage.

Live demo URL must be functional, not just a README.

AI usage log must reasonably correspond to what was actually built — don't submit a generic or incomplete prompt history.

Plan: ABTalks — Brutalist Command Center (3-page redesign) --> PRIORITY 2 (planned by bolt.new)

1. Design System Foundation

Replace the default font setup in the root layout with the three required fonts loaded via next/font/google: Space Grotesk (headlines), Inter (body), JetBrains Mono (micro-labels), and wire each to CSS variables.

Rewrite the global stylesheet to define the full light-mode palette (pure-black, ink, accent-yellow, accent-red, accent-blue, background-base, background-sidebar, card-surface, footer-dark) and the derived dark-mode palette as CSS variables that swap under a .dark class.

Add the visible grid-line overlay to the page background (subtle repeating linear-gradient at low opacity) that works in both modes without hurting text contrast.

Extend the Tailwind config with: the custom color tokens mapped to the CSS variables, the exact typography scale (display-xl through mono-label with weight/size/line-height/letter-spacing), the 4px-base spacing scale, and the three-tier radius scale (none / card 12px / full pill).

Add a hard-offset shadow utility (e.g. shadow-brutal = 4px 4px 0px in the current mode's ink color, no blur) and verify it flips to white ink in dark mode.

Add next-themes (already in dependencies) as the persistent dark-mode controller, defaulting to system preference, with the toggle living in the nav.

Update page metadata (title, description, OG image) to ABTalks branding.

2. Mock Data Layer

Create a single data.json (or a small set of typed data files) covering the schema from Section 6: student, challengeDays (1–60 with real, specific task copy — not lorem ipsum), achievements, and tracks.

Build three distinct student profiles so each edge case is demoable on a real state: (a) first-day / streak = 0, (b) mid-challenge with a missed day that is freeze-protected and a missed day that is truly broken, (c) empty profile / zero submissions ever.

Give each challenge day a status of completed / missed / frozen / today / upcoming, a pre-drafted linkedinCaption, and a populated submission object only where the day is completed.

Add a lightweight way to switch between the three profiles for demo/judging (e.g. a ?student= query param on /dashboard and /day/12, defaulting to the mid-challenge profile).

Note: the spec explicitly says no database / no auth, so I will use the mock JSON file as the single source of truth rather than the available Bolt Database project.

3. Shared Components

Build a brutalist Nav bar (sharp edges, hard shadow, wordmark "ABTALKS" in Space Grotesk 900, dark-mode toggle, primary CTA button) reused across all three pages, with an optional student avatar/name slot for the dashboard and day pages.

Build reusable primitives that match the system: a sharp-edge Button (yellow CTA / outline / disabled variants, all zero radius, hard shadow), a card-radius Panel with hard offset shadow, and a full-radius mono-label Badge/Pill for status chips and achievements.

Build the DayGrid component (60 small squares) with five distinct visual states: completed, missed, frozen (frosted/blue), today (highlighted), upcoming (empty) — designed to be legible at 390px.

Build a StreakFreezeToken display (icon + count) for use on the dashboard and day page.

4. Landing Page (/)

Hero with clamped headline (hero-display on desktop, scaling down to ~48–36px on mobile via responsive clamp), one-sentence subhead, primary CTA, and an accent-blue live stat ("2,847 students currently on a streak").

"How it works" 3-step explainer with 01/02/03 mono-label numbered markers (Pick a track → Build daily → Submit proof).

Trust/proof section with example streak stats, a sample finished 60-day profile preview, and the available tracks list.

Track picker preview — a card-radius grid of 3–5 tracks with one-line descriptions and student counts.

Full-width final CTA band (high contrast, footer-dark or yellow) restating the commitment ask.

Dark footer band with minimal links and mono-label micro text.

5. Dashboard Page (/dashboard)

Streak as the hero element (display-large/heading-1), with alive / at-risk / broken visual states (accent-blue flame, accent-yellow warning when today is unsubmitted late, accent-red when broken).

Streak Freeze token counter visibly shown next to the streak.

Today's task card (highest priority after streak) with day number, title, one-line summary, and a CTA linking to /day/[n].

Progress DayGrid (60 squares) with all five states rendered, plus overall completion % stat in accent-blue.

Achievements row as mono-label pill badges (7-Day Streak, Halfway There, First Submission) with horizontal scroll on mobile; locked/unlock states shown gracefully.

Three edge-case variants driven by the selected student profile: first-day (encouraging "Your streak starts today" copy, all 60 squares upcoming, achievements in locked state), missed-day (grid shows the gap + freeze distinction, streak number reflects the reset/freeze logic, non-punishing copy), empty-profile (designed empty states with CTAs in every data section, no broken "0%" / "undefined").

Optional low-priority "who's building today" social-proof strip — cut first if time runs short.

6. Challenge Day Page (/day/[n])

Nav bar plus breadcrumb / back-to-dashboard control.

Day header ("Day 12 of 60"), track name, optional estimated time/difficulty.

Task description with real, specific mock content for the day, plus a scoped "What you'll need / learning objectives" list.

Submission section with two validated URL inputs (GitHub URL format check, LinkedIn URL format check), and the auto-drafted LinkedIn caption textarea pre-filled from the day's task content — editable, not locked, with a copy button.

Yellow CTA Submit button that is disabled/inactive until both URL fields are valid, with a believable success confirmation state ("Proof submitted. Streak continues.").

Already-submitted state: when the mock day has a submission, render it read-only with a way to view what was submitted instead of the empty form.

7. Polish, Accessibility, and Deployment

Verify all three routes render and are fully legible at 390px width (mobile-first screenshot target).

Contrast-check every color pair in both light and dark mode against WCAG AA 4.5:1, especially yellow fills/text and the brightened dark-mode accents.

Confirm zero border-radius on all buttons/inputs/nav, hard offset shadows only (no blur), and correct font weights per the type scale.

Confirm the dark-mode toggle works and persists across all three pages.

Add a PROMPTS.md capturing the build process / prompt history as required by the submission rules.

Build and confirm a working production build, then deploy to the live URL.

A few clarifying questions before I build:

For demoing the three edge-case student states, I'm planning a ?student=first-day | missed-day | empty query param on /dashboard (defaulting to the mid-challenge profile). Is that the right approach, or would you rather have three separate routes like /dashboard/first-day?

The spec says /day/12 specifically, but should the day page be a dynamic /day/[n] route that works for any day number, with /day/12 as the showcased default?

The spec explicitly says no database and mocked data only, so I'll skip the available Bolt Database and use a local JSON file. Confirm that's what you want?

Summary: The plan rebuilds this fresh Next.js scaffold into a three-page brutalist "Command Center" — landing, dashboard, and day pages — with a custom token-driven theme (light + dark), three demoable student states, a visible Streak Freeze feature, an auto-drafted LinkedIn caption, and a 60-square day grid that distinguishes all five day states. Everything is mobile-first at 390px and deploys to a live URL. Once you confirm the three questions above, switch back to build mode and I'll implement it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0e817a88-0a71-4f13-a9ed-268a9bf875fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
