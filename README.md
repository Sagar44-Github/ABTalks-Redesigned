<div align="center">

# ⬛ ABTALKS — BRUTALIST COMMAND CENTER

### A ground-up mobile-first redesign & gamified proof-of-work platform for the ABTalks 60-Day Challenge

![Status](https://img.shields.io/badge/STATUS-LIVE-FFCC00?style=for-the-badge&labelColor=000000&color=FFCC00)
![Hackathon](https://img.shields.io/badge/ABTALKS-VIBE%20CODE%20HACKATHON-000000?style=for-the-badge&labelColor=000000&color=0055FF)
![Design](https://img.shields.io/badge/DESIGN-BRUTALIST%20COMMAND%20CENTER-E63B2E?style=for-the-badge&labelColor=000000&color=E63B2E)
![Stack](https://img.shields.io/badge/STACK-TANSTACK%20START%20%7C%20VITE-0055FF?style=for-the-badge&labelColor=000000&color=0055FF)

**[🔗 Live Demo](https://commit-streak-forge.vercel.app/)** · **[📖 In-App Docs](https://commit-streak-forge.vercel.app/docs)** · **[🐛 AI Usage Log](./PROMPTS.md)**

</div>

---

## ▌ Overview

ABTalks runs a **60-day coding challenge** for Indian college students. Students pick a track, build something daily, and maintain a public streak by submitting a **GitHub commit** link and a **LinkedIn post** link. Most usage happens on mobile devices, late at night, after college.

This product is a complete mobile-first redesign built for the **ABTalks Vibe Code Hackathon**. It establishes a high-contrast **"Brutalist Command Center"** design language, introducing multi-profile state management, AI-powered proof feedback, AI recruiter pitch synthesis, and a complete XP/Levels gamification system — while staying strictly within the hackathon's scope.

---

## ▌ Live Links & Repository Map

| Resource | Link / Path |
|---|---|
| 🌐 **Live Web Application** | [commit-streak-forge.vercel.app](https://commit-streak-forge.vercel.app/) |
| 💻 **GitHub Repository** | [Sagar44-Github/ABTalks-Redesigned](https://github.com/Sagar44-Github/ABTalks-Redesigned) |
| 📄 **AI Usage Log** | [`PROMPTS.md`](./PROMPTS.md) |
| 📚 **In-App Documentation** | [/docs](https://commit-streak-forge.vercel.app/docs) |

### Complete Route Map
```
/                      → Landing Page (Trust, track overview, social proof)
/dashboard             → Command Center (Streak, XP bar, Level, today's task, 60-day grid)
/onboarding            → Track Selector (Personalizes 60-day curriculum)
/history               → Submissions History (Timeline, links, cached AI feedback)
/leaderboard           → Student Leaderboards (Streaks, completion %, Level badges, filter/sort)
/settings              → Preferences (Track, theme mode, evening notifications, profile visibility)
/docs                  → In-App Architecture & Design System Documentation
/day/$n                → Daily Task Page (Curriculum, auto-drafted caption, proof submission)
/u/$username           → Public Recruiter Profile (Streaks, AI Recruiter Pitch, badges, recent proof)
```

---

## ▌ Key Architectural Innovations

### 1. State Synchronization & Scoping
- **Single Source of Truth Store**: All active profile data is managed via a unified React Context store (`src/lib/store.tsx`). Profile switching updates Nav, Dashboard, History, Settings, and Public Profiles synchronously without route state desync.
- **One-Shot URL Sync**: Prevents URL search parameters (`?student=`) from overwriting user-initiated profile switches via a ref-guarded mount effect.
- **Defensive State Loading**: `loadState()` safely validates persisted `localStorage` payloads against schema changes, preventing nullish dereference crashes.

### 2. Dual AI Provider Support (Groq + xAI Grok)
- **Server Functions (`src/lib/ai.ts`)**: Server-side AI calls built using `@tanstack/react-start`'s `createServerFn` to ensure API keys are never exposed to the client.
- **Auto-Provider Detection**:
  - Keys starting with `gsk_` route to **Groq** (`api.groq.com/openai/v1/chat/completions` using `llama-3.3-70b-versatile`).
  - Keys starting with `xai-` route to **xAI Grok** (`api.x.ai/v1/chat/completions` using `grok-3-mini`).
- **Graceful Fallback**: Transparent error banners and fallback text if API keys are unconfigured, rate-limited, or timing out.

### 3. XP Economy & Level Curve (`src/lib/xp.ts`)
- **Deterministic Math**: Level is derived dynamically from cumulative XP — never stored independently:
  - Base Day Completion: **+10 XP**
  - Task Difficulty Bonus: Starter (+0), Core (+3), Stretch (+5)
  - Streak Threshold Bonuses: Day 7 (+20 XP), Day 30 (+50 XP), Day 60 (+100 XP)
  - Streak Freeze Protection: **+5 XP**
- **UI Integration**:
  - **Dashboard**: Live Level badge, XP counter, and smooth progress bar toward the next level threshold.
  - **Public Profile**: `Level X` header pill next to track metadata.
  - **Leaderboard**: `Lvl X` row pill for every student.
  - **Level-Up Celebrations**: Custom dismissible celebration banner when crossing level thresholds.
  - **XP Toast**: Instant feedback toast (`+15 XP earned`) on proof submission.

---

## ▌ Design System — "Brutalist Command Center"

Cloned from a reference design system and extended with an **original dark mode** (not present in the reference). Industrial, high-contrast, zero-curve, hard-edged aesthetic designed to maximize visual urgency.

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
| Sidebar Surface | `#EFECE6` |

</td><td width="50%">

**Dark Mode** *(Custom Extension)*
| Token | Hex |
|---|---|
| 🟨 Accent Yellow | `#FFD84D` |
| 🟥 Accent Red | `#FF5A46` |
| 🟦 Accent Blue | `#4D8AFF` |
| ⬜ Pure White | `#FFFFFF` |
| Ink | `#F0EDE6` |
| Background | `#121110` |
| Card Surface | `#201E1B` |
| Sidebar Surface | `#181715` |

</td></tr>
</table>

### Signature Design Rules
- **Zero Border-Radius**: All buttons, panels, inputs, and badges maintain sharp `0px` corners.
- **Hard Offset Shadows**: Hard pixel drop-shadows (`4px 4px 0px #000000`) without blur effects.
- **Typography Hierarchy**:
  - **Space Grotesk** (Weight 900) for heavy headlines.
  - **JetBrains Mono** for technical labels, status indicators, and numbers.
  - **Inter** for crisp body text.
- **Semantic Accents**: Yellow for primary actions/milestones, Red for alerts/missed states, Blue for streak counts and achievements.

---

## ▌ Full Feature Matrix

### 🟨 Core & Edge Cases
- **3 Demo Profiles**: Switch live between **Riya Nandan** (Mid-challenge, 11-day streak with frozen day), **Arjun Mehta** (First day, day 1 open), and **Sana Qureshi** (Empty profile, broken streak).
- **Streak Freeze Token**: Limited protection token that turns missed days into `frozen` without breaking current streak.
- **Auto-Drafted LinkedIn Caption**: Generates pre-written, editable post text from daily task objectives.

### 🟦 Visibility & Recruiter Features
- **AI Recruiter Pitch**: Synthesizes student progress, track, completed days, and sample proof into a 2-3 sentence recruiter pitch on `/u/$username`.
- **AI Submission Feedback**: Analyzes GitHub submissions against task learning objectives to provide immediate encouragement on `/day/$n`.
- **Dynamic Share Card**: In-browser shareable proof card for milestones and completions.

### 🟥 Platform Infrastructure
- **PWA Ready**: Manifest, service worker support, and mobile viewport optimization (390px default).
- **Time-Aware Nudges**: Morning/Evening/Late-Night context banners encouraging students to log proof before midnight.
- **Custom 404 & Error Boundaries**: Fully styled error components matching the brutalist design system.

---

## ▌ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | TanStack Start / TanStack Router + React 19 |
| **Build System** | Vite + Nitro (Vercel Preset output `.vercel/output`) |
| **Styling** | Vanilla CSS + Tailwind CSS v4, custom CSS variables |
| **Icons & Fonts** | Lucide React · Space Grotesk · Inter · JetBrains Mono |
| **AI Integration** | Groq API (`llama-3.3-70b-versatile`) / xAI Grok API (`grok-3-mini`) |
| **Deployment** | Vercel |

---

## ▌ Local Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sagar44-Github/ABTalks-Redesigned.git
   cd ABTalks-Redesigned
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   Create a `.env` file in the project root to enable live AI features:
   ```env
   GROQ_API_KEY=gsk_your_groq_key_here
   # OR
   GROK_API_KEY=xai-your_xai_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for Production (Vercel)**:
   ```bash
   npm run build
   ```

---

## ▌ Out of Scope (By Challenge Design)

As specified in the hackathon prompt:
- Real backend authentication / database persistence
- Employer recruiter login dashboard
- Live GitHub API webhooks

---

<div align="center">

**Built for the ABTalks Vibe Code Hackathon** · Aug 2026

![Zero Curves](https://img.shields.io/badge/DESIGN-ZERO%20CURVES-000000?style=flat-square&labelColor=FFCC00&color=000000)

</div>
