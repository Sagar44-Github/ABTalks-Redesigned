<div align="center">

<img src="./assets/readme-banner.svg" alt="ABTalks — Brutalist Command Center" width="100%"/>

![Doc](https://img.shields.io/badge/DOC-FEATURE%20REFERENCE-121110?style=for-the-badge&labelColor=121110&color=FFD84D)
![Routes](https://img.shields.io/badge/ROUTES-13-121110?style=for-the-badge&labelColor=121110&color=4D8AFF)
![AI Powered](https://img.shields.io/badge/AI-GROQ%20%2F%20GROK-121110?style=for-the-badge&labelColor=121110&color=FF5A46)

**[← Back to README](./README.md)** · **[🐛 AI Usage Log](./PROMPTS.md)** · **[📜 Full Transcript](./transcript.md)**

</div>

<img src="./assets/readme-divider.svg" alt="" width="100%"/>

# ▌ Complete Feature Reference

This document goes deep on every feature in the ABTalks redesign — what it does, why it exists, where it lives, and how it's actually built. The [`README.md`](./README.md) covers the project at a glance; this is the full detail behind each line in its feature matrix.

Features are organized into four groups, in the order they were built: **Core & Required Ideas** (the MVP), **Personalization & Navigation**, **Visibility & Recruiter Tools**, and **AI Integration & Gamification**.

<img src="./assets/readme-divider.svg" alt="" width="100%"/>

## 🟨 GROUP 1 — Core & Required Original Ideas

### Streak Freeze
**Where**: Dashboard, day-grid, `/day/$n`
**What it does**: Every student holds a limited number of "streak freeze" tokens. If a day is missed and a token is available, it automatically protects the streak instead of breaking it — the missed day flips to a distinct `frozen` state rather than a broken one.
**Why it exists**: The brief requires a missed-day edge case to be handled without feeling punishing. Rather than just softening the copy around a failure state, this turns the failure into an actual designed feature — the token count is visible on the dashboard, and a frozen day is visually distinct from both a completed day and a truly missed one on the 60-square grid.
**Built as**: A token counter derived from the active profile's real data (available minus used), with the freeze action updating the day's status live and persisting across the session.

### Auto-Drafted LinkedIn Caption
**Where**: `/day/$n`, submission section
**What it does**: Pre-fills the LinkedIn post textarea with a caption generated from that day's actual task content — fully editable, not locked.
**Why it exists**: The brief explicitly notes real usage happens late at night, tired, after college. That's exactly the moment a student is most likely to skip the LinkedIn half of their proof-of-work because writing a caption from scratch feels like one task too many. Removing that blank-page friction directly targets the brief's own stated failure mode.

### Five-State Day Grid
**Where**: Dashboard (primary), read-only on Public Profile
**What it does**: A 60-square grid representing the full challenge, with five visually distinct states: completed, missed, frozen, today, and upcoming.
**Why it exists**: A simple progress bar can't represent the missed/frozen distinction the brief's edge cases require. The grid makes 60 days of history scannable in one glance and makes the Streak Freeze feature visible, not just implied.

<img src="./assets/readme-divider.svg" alt="" width="100%"/>

## 🟦 GROUP 2 — Personalization & Navigation

### Real Track Selection (`/onboarding`)
**What it does**: A selectable card grid of tracks (e.g. Web Dev, AI/ML), each with a one-line description and a preview of a few real task titles. Selecting one **actually changes** the content rendered on `/dashboard` and every `/day/$n` — different task descriptions, different learning objectives, different auto-drafted captions, per track.
**Why it exists**: The original MVP brief's "pick a track" was decorative — it didn't affect anything downstream. This was identified early as the single biggest gap between "looks personalized" and "is personalized," and became the first feature built past the minimum requirement.
**Built as**: Track selection is stored in the active profile's state; `/dashboard` and `/day/$n` both read the selected track ID to resolve which day-content dataset to render, with a clean redirect to `/onboarding` if no track has been chosen yet.

### Day-to-Day Navigation
**What it does**: Prev/next controls on `/day/$n` (correctly disabled at day 1 and day 60), plus every square on the dashboard's day-grid links directly to that specific day.
**Why it exists**: Proves the day-grid is functional information architecture, not a decorative visualization — a judge (or a real student) can move through the full 60-day arc, not just view a single showcased day.

### Submission History (`/history`)
**What it does**: A full reverse-chronological list of every submission, with real outbound links to what was actually submitted (GitHub + LinkedIn URLs), status badges matching the day-grid's visual language, and a link back to each day's detail page.
**Why it exists**: Strengthens the brief's "student standing" requirement and gives the empty-profile edge case a second, clearer place to demonstrate — an empty history view reads very differently from an empty dashboard.

### Live Micro-Interactions
**What it does**: Toast confirmations on submit and on streak-freeze use, with the streak number and the relevant day-grid square updating immediately, no page reload.
**Why it exists**: Cheap relative to its effect on a live demo — a product that visibly responds to actions in real time reads as considerably more "real" than one that only updates after a full page refresh.

### Milestone Celebrations
**What it does**: A distinct, high-contrast full-width celebratory moment at Day 7, Day 30, and Day 60, using the brutalist system's own visual language (yellow fill, hard shadow, heading-scale type) rather than a generic confetti overlay. Dismissible, doesn't re-trigger.
**Why it exists**: Gives the 60-day arc real emotional pacing instead of being a flat daily loop with no sense of progress markers.

<img src="./assets/readme-divider.svg" alt="" width="100%"/>

## 🟥 GROUP 3 — Visibility & Recruiter Tools

### Public Recruiter Profile (`/u/$username`)
**What it does**: A public, no-login page showing a student's streak, Level, badges, and a real proof-of-work feed with outbound links to their actual submitted GitHub/LinkedIn URLs — plus the AI Recruiter Pitch (below).
**Why it exists**: This is the single most direct fulfillment of ABTalks' own stated purpose — the brief explicitly says the daily proof-of-work mechanic exists to make students "visible to recruiters." Nothing else in the product actually produces a recruiter-facing artifact until this page. It's deliberately styled more restrained than the internal dashboard, since a stranger clicking a shared link doesn't need dashboard chrome like "today's task."

### AI-Generated Recruiter Pitch
**What it does**: A Grok/Groq call synthesizes a student's track, days completed, current and longest streak, and a few sample completed task titles into a genuine 2-3 sentence recruiter-facing pitch — not generic praise, specific to their actual track record.
**Why it exists**: Turns the public profile's raw stats into something a recruiter would actually want to read in the first five seconds. Clearly labeled as AI-generated for transparency. Cached aggressively (or gated behind a manual "Generate" action) specifically so a judge clicking through multiple demo profiles repeatedly during evaluation doesn't burn API quota or cause the feature to start failing mid-review.

### AI-Powered Submission Feedback
**What it does**: After a student submits proof on `/day/$n`, a live AI call generates short, task-specific encouragement and framing — shown with an on-brand loading state, cached per submission so it doesn't re-call on revisit, and re-displayed on `/history`.
**Why it exists**: Every other feature in this project operates on pre-built logic over mock data. This is the first place an AI model is actually invoked live, in response to a real user action — the difference between "well-designed app" and "AI-native app" for a hackathon specifically about AI-assisted building.
**Honesty note**: the feedback is generated from the task description and learning objectives, not from actually reading the submitted repository's code — the copy is written to reflect that accurately rather than overclaiming a code review.

### Proof-of-Work Portfolio (`/portfolio`)
**What it does**: A dedicated recruiter showcase distinct from the public profile — verified GitHub commit badges and highlighted projects pulled from completed work.
**Why it exists**: Gives a second, more curated recruiter-facing surface focused specifically on *work samples* rather than streak/gamification stats — different audience need than `/u/$username`.

### Completion Certificate (`/certificate`)
**What it does**: A verifiable completion credential card with a QR code and track details.
**Why it exists**: Gives the 60-day challenge a tangible, shareable endpoint — something a student can point to as proof of completion beyond just a profile page.

### AI Interview Prep (`/prep`)
**What it does**: AI-generated mock technical interview questions and prep cards, tailored to the specific skills a student has actually completed based on their curriculum progress.
**Why it exists**: Extends the "prove your knowledge to a recruiter" thread from a passive artifact (the profile page) into active practice — directly useful for the actual moment a student needs to defend their work in an interview.

### Peer Building Squads (`/squad`)
**What it does**: Small-group peer accountability — daily check-ins and a squad-level leaderboard, distinct from the individual, competitive `/leaderboard`.
**Why it exists**: The individual leaderboard is aggregate and competitive; this is a smaller, more supportive social layer that more directly answers the brief's own "late at night, motivation to submit" problem — a small group checking in on each other is a different (and often stronger) motivator than a ranked list of strangers.

### Time-Aware Nudge Banner
**What it does**: A dashboard banner whose tone shifts across day / evening / late-night, encouraging submission before the day ends — mock-time-driven for reliable demoing.
**Why it exists**: Directly responds to the brief's explicit detail that real usage is concentrated late at night — no other feature in the product actually reacts to *when* it's being used.

<img src="./assets/readme-divider.svg" alt="" width="100%"/>

## ⚡ GROUP 4 — AI Integration & Gamification

### XP & Levels System
**What it does**: Every meaningful action earns XP — a base amount per submission, bonus XP for extending long streaks, milestone bonuses at Day 7/30/60, XP for using a streak freeze, and XP for unlocking achievements. Level is always **derived** from cumulative XP through a fixed 10-level lookup curve, never stored or incremented independently.
**Why it exists**: Reframes a 60-day binary checklist into a visible growth curve — reused across the dashboard, public profile, and leaderboard rather than existing as an isolated feature on one page.
**Built as**: A pure, isolated module (`src/lib/xp.ts`) computing XP totals and level lookups — deriving Level from XP on every read guarantees the two values can never drift out of sync, a common bug class in gamification systems that store both independently.

### Level-Up Celebration
**What it does**: Crossing a level threshold triggers a distinct celebratory moment, reusing the milestone-celebration visual pattern, with specific, non-generic copy ("Level 6 — you've turned up 23 times and counting," not "Level Up!"). Guarded against double-firing alongside a day-milestone celebration landing on the same submission.
**Why it exists**: The actual "fun" payoff of the XP system — without a real moment marking a level-up, the number would just be another background stat.

### Live GitHub Verification
**What it does**: Automated commit/repository checks against the GitHub REST API when a student submits a GitHub URL.
**Why it exists**: Adds a layer of real, live external verification on top of what would otherwise be an entirely mocked submission flow.

### Notifications & Reminders
**What it does**: A push-notification engine and configurable evening streak reminders.
**Why it exists**: Extends the time-aware nudge concept from a passive in-app banner into an active reminder system.

### PWA Support
**What it does**: Web app manifest, service worker, and mobile-first viewport configuration.
**Why it exists**: The brief states usage is overwhelmingly mobile — an installable, app-like experience is a more complete answer to that than mobile-first CSS alone.

### Custom 404 & Error Boundaries
**What it does**: Fully restyled error states matching the brutalist design system, replacing default component-library styling.
**Why it exists**: A mistyped URL is a realistic thing to hit during evaluation — this was specifically flagged during a codebase audit as the one screen most likely to be encountered by accident and most likely to show design-system drift if left unstyled.

<img src="./assets/readme-divider.svg" alt="" width="100%"/>

## ▌ Deliberately Not Built

In the interest of finishing and hardening a smaller, fully-working feature set rather than shipping something half-finished, a few specced ideas were considered and deliberately left out:

- A real GitHub contribution heatmap (pulling a student's actual live commit graph) — carried real external-dependency and rate-limit risk during judging, for value the Public Profile page already substantially covers
- A weekly recap card — a recurring 7-day check-in, distinct from the one-time milestone celebrations
- An AI-powered "comeback message" after a missed day, dynamically personalized beyond the existing supportive copy

This list is intentionally included here rather than omitted — an honest account of scope decisions is part of what this feature reference is for.

<div align="center">
<br/>

<img src="./assets/readme-divider.svg" alt="" width="100%"/>

**[← Back to README](./README.md)**

</div>