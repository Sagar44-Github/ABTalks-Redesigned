<div align="center">

# ⬛ ABTALKS — BRUTALIST COMMAND CENTER

### A ground-up redesign of the ABTalks 60-day coding challenge platform

![Status](https://img.shields.io/badge/STATUS-LIVE-FFCC00?style=for-the-badge&labelColor=000000&color=FFCC00)
![Hackathon](https://img.shields.io/badge/ABTALKS-VIBE%20CODE%20HACKATHON-000000?style=for-the-badge&labelColor=000000&color=0055FF)
![Design](https://img.shields.io/badge/DESIGN-BRUTALIST-E63B2E?style=for-the-badge&labelColor=000000&color=E63B2E)

**[🔗 Live Demo](#-live-links)** · **[📖 Docs Page](#-live-links)** · **[🐛 AI Usage Log](./PROMPTS.md)**

</div>

---

## ▌ Overview

ABTalks runs a **60-day coding challenge** for Indian college students. Students pick a track, build something every day, and maintain a public streak by submitting a **GitHub commit** + a **LinkedIn post**. Most usage happens on a phone, late at night, after college.

The product worked. **It had never been designed.**

This is a full mobile-first redesign, built solo for the ABTalks Vibe Code Hackathon, cloning and extending a brutalist design language ("Brutalist Command Center") into a complete, personalized, AI-integrated, gamified product — while staying strictly within the brief's scope (mocked data, no real auth/database).

---

## ▌ Live Links

| | |
|---|---|
| 🌐 **Live App** | `[ADD YOUR FINAL LIVE URL HERE]` |
| 💻 **Repository** | `[ADD YOUR GITHUB REPO URL HERE]` |
| 📄 **AI Usage Log** | [`PROMPTS.md`](./PROMPTS.md) |
| 📚 **In-App Docs** | `[LIVE_URL]/docs` |

### Required Route Map
```
/
/dashboard
/day/12
```

---

## ▌ Design System — "Brutalist Command Center"

Cloned from an extracted reference design system, then **extended with an original dark mode** (the reference site has none). High-contrast, mechanical, zero-curve, hard-edged — the opposite of a soft default SaaS look.

<table>
<tr><td width="50%">

**Light Mode**
| Token | Hex |
|---|---|
| 🟨 Accent Yellow | `#FFCC00` |
| 🟥 Accent Red | `#E63B2E` |
| 🟦 Accent Blue | `#0055FF` |
| ⬛ Pure Black | `#000000` |
| Ink | `#1A1A1A` |
| Background | `#F5F0E8` |
| Card Surface | `#FFFFFF` |
| Footer Dark | `#171717` |

</td><td width="50%">

**Dark Mode** *(original — not in source)*
| Token | Hex |
|---|---|
| 🟨 Accent Yellow | `#FFD84D` |
| 🟥 Accent Red | `#FF5A46` |
| 🟦 Accent Blue | `#4D8AFF` |
| ⬜ Pure White | `#FFFFFF` |
| Ink | `#F0EDE6` |
| Background | `#121110` |
| Card Surface | `#201E1B` |
| Footer | `#000000` |

</td></tr>
</table>

**Signature traits**
- Ultra-heavy **Space Grotesk** (weight 900) headlines, tight negative letter-spacing
- **Zero border-radius** on every interactive element — buttons, inputs, nav
- **Hard offset shadows** (`4px 4px 0px`) — no blur, ever
- **JetBrains Mono** for micro-labels and status badges
- **Inter** for body copy
- Tricolor accent system used *semantically*, never decoratively — yellow = primary action, red = alerts, blue = stats

Every color pair meets **WCAG AA (4.5:1)** contrast in both modes.

---

## ▌ Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js / TanStack Router + Vite |
| Styling | Tailwind CSS, custom token-driven theme |
| Fonts | Space Grotesk · Inter · JetBrains Mono |
| Data | Mocked JSON — no database |
| Auth | None (explicitly out of scope) |
| AI | xAI **Grok API** (server-side only) |
| Hosting | Vercel |
| State | Single-source-of-truth store, demo-profile-scoped |

No environment variables are required to run the core app. **One** is required for the AI features:
```
GROK_API_KEY=your_key_here
```
Read server-side only — never exposed to the client. The app degrades gracefully with a clear fallback message if this key is missing.

---

## ▌ Required Routes

| Route | Purpose |
|---|---|
| `/` | Landing page — trust, clarity, and motivation for a first-time visitor |
| `/dashboard` | Streak, today's task, 60-day progress grid, completion %, achievements |
| `/day/12` | Full challenge-day experience — task, learning objectives, proof submission |

### The Three Required Edge Cases
- **First day, no streak** — genuine start state, not a broken "0"
- **Missed day** — five distinct day-grid states (completed / missed / frozen / today / upcoming), never punishing in tone
- **Empty profile** — every section gets a real designed empty state, never a blank "undefined"

---

## ▌ Full Feature Set

### 🟨 Core (MVP)
- Three required routes, mobile-first at 390px, full light + dark mode
- All three required edge cases, each demoable via a dedicated mock profile
- **Streak Freeze** — a limited token that protects a missed day, visually distinct on the day-grid
- **Auto-drafted LinkedIn caption** — pre-filled, editable, removes late-night posting friction

### 🟦 Phase 2 — Personalization & Navigation
- `/onboarding` — real track selection that drives **personalized 60-day content**, not decorative
- Day-to-day navigation (prev/next + jump from the progress grid)
- Interactive Streak Freeze — actually clickable, updates state live
- `/history` — full submission history with a real empty state
- Live toast micro-interactions on submit
- Milestone celebrations at Day 7 / 30 / 60
- Social proof strip

### 🟥 Phase 3 — Visibility & Sharing
- `/u/[username]` — **public, recruiter-facing profile page**
- Downloadable/shareable "Day Card" images
- Dashboard search/filter across all 60 days
- Time-aware nudge banner (day / evening / late-night tone)
- `/leaderboard`
- `/settings` — track switching, theme, notification prefs, profile visibility
- Basic PWA setup (manifest + service worker)

### ⚡ Phase 4 — Real AI Integration
- **AI-Powered Submission Feedback** — after submitting proof, a live **Grok API** call generates short, task-aware feedback. Cached per submission. Labeled transparently as AI-generated. Graceful fallback if the API is unavailable.
- **AI-Generated Recruiter Pitch** — on the public profile, Grok synthesizes a student's entire track record (days completed, streak, sample work) into a genuine recruiter-facing pitch — the most direct payoff of ABTalks' own stated purpose.

### 🎮 XP & Levels
- Every meaningful action earns XP (submissions, streak-length bonuses, milestones, freezes used, achievements unlocked)
- Level always **derived** from cumulative XP via a fixed 10-level curve — never stored independently, so it can never drift out of sync
- Visible on the dashboard, public profile, and leaderboard
- Distinct level-up celebration, reusing the milestone-celebration pattern, with specific non-generic copy

### 📚 `/docs`
An in-app documentation page covering the ABTalks product itself, this redesign's scope, a live design-system reference, the full feature list, and the specific design decisions behind the required edge cases.

---

## ▌ Mock Data & Demo Profiles

No real backend. A structured mock dataset drives the entire app, with **multiple distinct demo profiles** so every edge case and feature can be demonstrated on real, realistic state — first-day, mid-challenge (with a missed + frozen day), and empty-profile — switchable live from the nav/footer, with state correctly scoped per profile across every route.

---

## ▌ Architecture Notes

- **Single source of truth**: one shared store governs the active demo profile across Nav, Dashboard, History, Settings, and every route that depends on "who's logged in" — no route independently re-initializes or overrides this state.
- **Server-side AI calls only**: the Grok API key is never exposed client-side; both AI features route through server functions.
- **Graceful degradation**: every AI feature has an explicit, tested fallback state for a missing key, timeout, or rate limit — the app never crashes or shows a raw error.

---

## ▌ What's Explicitly Out of Scope

Per the challenge brief:
- Authentication / real user accounts
- Production database
- Recruiter dashboard / admin panel
- Matching ABTalks' existing tech stack

---

## ▌ Running Locally

```bash
git clone [YOUR_REPO_URL]
cd [PROJECT_FOLDER]
npm install
# Optional — enables AI features:
echo "GROK_API_KEY=your_key_here" > .env
npm run dev
```

---

## ▌ AI Usage

This project was built using AI-assisted "vibe coding" across two tools: **Claude** for planning, design-system extraction, and feature specification, and **Lovable + Antigravity** for implementation. The complete, honest prompt history is in [`PROMPTS.md`](./PROMPTS.md) at the repo root.

---

<div align="center">

**Built solo for the ABTalks Vibe Code Hackathon** · Aug 2026

![Made with Brutalist Design](https://img.shields.io/badge/DESIGN-ZERO%20RADIUS-000000?style=flat-square&labelColor=FFCC00&color=000000)

</div>
