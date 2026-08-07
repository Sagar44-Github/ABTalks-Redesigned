import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Snowflake,
} from "lucide-react";
import { BrutalButton, BrutalLink, Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — ABTalks Redesign" },
      {
        name: "description",
        content:
          "Design system reference, feature overview, edge cases, and project context for the ABTalks 60-day challenge redesign.",
      },
    ],
  }),
  component: DocsPage,
});

const sections = [
  { id: "about-abtalks", label: "About ABTalks" },
  { id: "about-redesign", label: "About This Redesign" },
  { id: "design-system", label: "Design System" },
  { id: "features", label: "Feature Overview" },
  { id: "edge-cases", label: "Edge Cases & Decisions" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "links", label: "Links" },
];

function DocsPage() {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav />

      {/* Mobile TOC */}
      <div className="border-b-2 border-ink bg-sidebar-surface md:hidden">
        <button
          type="button"
          onClick={() => setTocOpen(!tocOpen)}
          className="flex w-full items-center justify-between px-4 py-3"
        >
          <MonoLabel>DOCS · TABLE OF CONTENTS</MonoLabel>
          {tocOpen ? (
            <ChevronDown size={14} strokeWidth={3} />
          ) : (
            <ChevronRight size={14} strokeWidth={3} />
          )}
        </button>
        {tocOpen && (
          <nav className="border-t border-muted-ink/20 px-4 pb-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setTocOpen(false)}
                className="block py-1.5 font-display text-label-bold uppercase hover:text-blue"
              >
                {s.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-10 md:py-12">
        <div className="flex gap-10">
          {/* Desktop sticky TOC */}
          <aside className="hidden w-48 shrink-0 md:block">
            <div className="sticky top-24">
              <MonoLabel>DOCS</MonoLabel>
              <nav className="mt-4 space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block font-display text-label-bold uppercase hover:text-blue"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0 flex-1">
            <MonoLabel className="text-red">DOCUMENTATION</MonoLabel>
            <h1 className="mt-3 font-display text-heading-2 uppercase md:text-heading-1">
              ABTalks Redesign
            </h1>
            <p className="mt-3 max-w-xl text-body">
              Reference documentation for the ABTalks 60-day challenge redesign. Design system,
              features, decisions, and project context.
            </p>

            {/* Section 1 */}
            <section id="about-abtalks" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-heading-3 uppercase">About ABTalks</h2>
              <div className="mt-4 max-w-2xl space-y-3 text-body">
                <p>
                  ABTalks is a <strong>60-day coding challenge</strong> for Indian college students.
                  The premise is simple: pick a track (Web Dev, AI/ML, DSA, Mobile, or Backend),
                  then build something every day for 60 days.
                </p>
                <p>
                  Each day you complete two actions: push a commit to a public GitHub repo and
                  publish a LinkedIn post about what you built. Those two artifacts — the commit and
                  the post — are your <strong>proof of work</strong>. After 60 days, you have 120
                  pieces of public evidence that you can actually build.
                </p>
                <p>
                  <strong>Why it exists:</strong> building consistency and making students visible to
                  recruiters. A resume says &ldquo;I know React.&rdquo; A 60-day commit history
                  proves it.
                </p>
                <p>
                  <strong>Who it&apos;s for:</strong> primarily mobile users, late at night, after
                  college. The platform needs to work well on a phone at 11 PM.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="about-redesign" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-heading-3 uppercase">About This Redesign</h2>
              <div className="mt-4 max-w-2xl space-y-3 text-body">
                <p>
                  The original ABTalks product worked but had never been designed — it was
                  functional with default styling. This is a <strong>ground-up mobile-first
                  redesign</strong> built as a hackathon submission.
                </p>
                <p>
                  This was built as part of a hackathon challenge. The goal was to reimagine the
                  ABTalks experience with a strong design system, attention to edge cases, and
                  features that reinforce the product&apos;s core purpose of making daily proof
                  visible to recruiters.
                </p>
                <p>
                  <strong>Important:</strong> all data throughout this application is mocked. There
                  is no real authentication or backend, per the challenge&apos;s stated scope.
                  Student profiles, submissions, and statistics are all mock data designed to
                  demonstrate the UI and features.
                </p>
              </div>
            </section>

            {/* Section 3 — Design System (live examples) */}
            <section id="design-system" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-heading-3 uppercase">
                Design System — Brutalist Command Center
              </h2>
              <p className="mt-3 max-w-2xl text-body">
                High-contrast, mechanical, developer-tool credibility layer. Every element is
                designed to feel deliberate and information-dense rather than decorative. Zero border
                radius on all interactive elements. Hard offset shadows that never blur.
              </p>

              {/* Color palette */}
              <h3 className="mt-8 font-display text-label-bold uppercase">Color Palette</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { name: "Base", bg: "bg-base", border: true },
                  { name: "Card Surface", bg: "bg-card-surface", border: true },
                  { name: "Sidebar", bg: "bg-sidebar-surface", border: true },
                  { name: "Ink", bg: "bg-ink", border: false },
                  { name: "Accent Yellow", bg: "bg-yellow", border: true },
                  { name: "Accent Red", bg: "bg-red", border: false },
                  { name: "Accent Blue", bg: "bg-blue", border: false },
                  { name: "Footer Dark", bg: "bg-footer-dark", border: false },
                ].map((c) => (
                  <div key={c.name} className="text-center">
                    <div
                      className={cn(
                        "h-12 w-full border-2",
                        c.bg,
                        c.border ? "border-ink" : "border-transparent",
                      )}
                    />
                    <MonoLabel>{c.name}</MonoLabel>
                  </div>
                ))}
              </div>

              {/* Type scale */}
              <h3 className="mt-8 font-display text-label-bold uppercase">Type Scale</h3>
              <div className="mt-3 space-y-3 border-2 border-ink bg-card-surface p-4">
                <div>
                  <MonoLabel>HEADING-1 · 48px</MonoLabel>
                  <p className="font-display text-heading-1 uppercase">Heading one</p>
                </div>
                <div>
                  <MonoLabel>HEADING-2 · 36px</MonoLabel>
                  <p className="font-display text-heading-2 uppercase">Heading two</p>
                </div>
                <div>
                  <MonoLabel>HEADING-3 · 30px</MonoLabel>
                  <p className="font-display text-heading-3 uppercase">Heading three</p>
                </div>
                <div>
                  <MonoLabel>SUBHEADING · 20px</MonoLabel>
                  <p className="font-display text-subheading uppercase">Subheading</p>
                </div>
                <div>
                  <MonoLabel>LABEL-BOLD · 16px</MonoLabel>
                  <p className="font-display text-label-bold uppercase">Label bold</p>
                </div>
                <div>
                  <MonoLabel>BODY · 16px</MonoLabel>
                  <p className="text-body">
                    Body text for paragraphs and descriptions.
                  </p>
                </div>
                <div>
                  <MonoLabel>MONO-LABEL · 9px</MonoLabel>
                  <MonoLabel>MONO LABEL UTILITY TEXT</MonoLabel>
                </div>
              </div>

              {/* Button examples */}
              <h3 className="mt-8 font-display text-label-bold uppercase">
                Buttons — Zero Border Radius
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <BrutalButton variant="yellow">Yellow Primary</BrutalButton>
                <BrutalButton variant="blue">Blue Action</BrutalButton>
                <BrutalButton variant="ink">Ink Dark</BrutalButton>
                <BrutalButton variant="outline">Outline Ghost</BrutalButton>
                <BrutalButton disabled>Disabled</BrutalButton>
              </div>

              {/* Card / Panel */}
              <h3 className="mt-8 font-display text-label-bold uppercase">
                Card — Hard Offset Shadow
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Panel>
                  <MonoLabel>DEFAULT CARD</MonoLabel>
                  <p className="mt-2 text-body">4px hard shadow, 12px radius, 2px ink border.</p>
                </Panel>
                <Panel tone="yellow">
                  <MonoLabel className="text-on-yellow/70">YELLOW CARD</MonoLabel>
                  <p className="mt-2 text-body">For high-priority content like today&apos;s task.</p>
                </Panel>
                <Panel tone="sidebar">
                  <MonoLabel>SIDEBAR CARD</MonoLabel>
                  <p className="mt-2 text-body">For secondary/supporting content.</p>
                </Panel>
                <Panel tone="blue">
                  <MonoLabel className="text-on-blue/70">BLUE CARD</MonoLabel>
                  <p className="mt-2 text-body">For success/confirmation states.</p>
                </Panel>
              </div>

              {/* Pills */}
              <h3 className="mt-8 font-display text-label-bold uppercase">Pills & Badges</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="ink">Ink</Pill>
                <Pill tone="blue">Blue</Pill>
                <Pill tone="yellow">Yellow</Pill>
                <Pill tone="red">Red</Pill>
                <Pill tone="locked">
                  <Snowflake size={9} strokeWidth={3} /> Locked
                </Pill>
              </div>
            </section>

            {/* Section 4 — Feature overview */}
            <section id="features" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-heading-3 uppercase">Feature Overview</h2>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-display text-label-bold uppercase text-blue">
                    Core (MVP)
                  </h3>
                  <ul className="mt-2 space-y-1 text-body">
                    <li>• <strong>Landing page</strong> — explains the challenge, shows platform stats, track picker preview</li>
                    <li>• <strong>Dashboard</strong> — your streak, today&apos;s task, 60-day progress grid, achievements</li>
                    <li>• <strong>Day page</strong> — task details, learning objectives, proof submission form with auto-drafted LinkedIn caption</li>
                    <li>• <strong>Three edge cases</strong> — mid-challenge, first-day, empty profile, all fully designed</li>
                    <li>• <strong>Dark mode</strong> — full light/dark support across every route</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-label-bold uppercase text-blue">
                    Track Personalisation
                  </h3>
                  <ul className="mt-2 space-y-1 text-body">
                    <li>• <strong>Track selection</strong> — choose from 5 tracks, each with distinct 60-day curricula</li>
                    <li>• <strong>Personalised content</strong> — dashboard and day pages reflect your chosen track&apos;s tasks</li>
                    <li>• <strong>Day navigation</strong> — prev/next controls, all 60 days browsable with preview states for future days</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-label-bold uppercase text-blue">
                    Streak Mechanics
                  </h3>
                  <ul className="mt-2 space-y-1 text-body">
                    <li>• <strong>Interactive streak freeze</strong> — actually usable, not just a badge. Click to protect a missed day.</li>
                    <li>• <strong>Milestone celebrations</strong> — Day 7, 30, and 60 trigger distinct celebration states</li>
                    <li>• <strong>Live micro-interactions</strong> — toast notifications on submit and freeze use</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-label-bold uppercase text-blue">
                    Visibility & Sharing
                  </h3>
                  <ul className="mt-2 space-y-1 text-body">
                    <li>• <strong>Public profile</strong> — recruiter-readable /u/username page with outbound proof links</li>
                    <li>• <strong>Share cards</strong> — downloadable branded image cards for each day&apos;s submission</li>
                    <li>• <strong>Leaderboard</strong> — ranked by streak or completion, with profile links</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-label-bold uppercase text-blue">Other</h3>
                  <ul className="mt-2 space-y-1 text-body">
                    <li>• <strong>Submission history</strong> — reverse-chronological record of all proof submitted</li>
                    <li>• <strong>Search/filter</strong> — find specific days across the 60-day curriculum</li>
                    <li>• <strong>Time-aware nudges</strong> — different tone banners for day/evening/late-night</li>
                    <li>• <strong>Settings</strong> — track switching, theme control, notification prefs, privacy toggle</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 — Edge cases */}
            <section id="edge-cases" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-heading-3 uppercase">
                Edge Cases & Design Decisions
              </h2>

              <div className="mt-4 max-w-2xl space-y-5 text-body">
                <div>
                  <p className="font-display text-label-bold uppercase">
                    Missed days feel supportive, not punishing
                  </p>
                  <p className="mt-1">
                    Red squares communicate what happened — they never include copy that shames or
                    scolds. &ldquo;The red squares are behind you; today&apos;s yellow square is the
                    only one that matters.&rdquo;
                  </p>
                </div>

                <div>
                  <p className="font-display text-label-bold uppercase">
                    Streak freeze turns failure into a feature
                  </p>
                  <p className="mt-1">
                    Rather than letting one missed night destroy momentum, the freeze mechanic
                    acknowledges that life happens and gives students a recovery path that feels
                    earned, not handed out.
                  </p>
                </div>

                <div>
                  <p className="font-display text-label-bold uppercase">
                    Public profiles exist because the brief says so
                  </p>
                  <p className="mt-1">
                    The original brief explicitly says the daily proof mechanic exists to make
                    students &ldquo;visible to recruiters.&rdquo; The /u/username page is the only
                    artifact in the product that actually fulfils that goal — it creates something a
                    recruiter can open and evaluate.
                  </p>
                </div>

                <div>
                  <p className="font-display text-label-bold uppercase">
                    Empty states are invitations, not apologies
                  </p>
                  <p className="mt-1">
                    Every empty state — no submissions, no achievements, no track selected — points
                    the user toward the single next action they should take, rather than showing a
                    blank screen or a generic &ldquo;nothing here yet&rdquo; message.
                  </p>
                </div>

                <div>
                  <p className="font-display text-label-bold uppercase">
                    Time-aware nudges respond to the stated usage pattern
                  </p>
                  <p className="mt-1">
                    The brief says students use the platform &ldquo;on their phones, late at night
                    after college.&rdquo; The nudge banner changes tone based on time of day —
                    gentle during the day, more urgent (but never shaming) late at night.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 — Tech stack */}
            <section id="tech-stack" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-heading-3 uppercase">Tech Stack</h2>
              <div className="mt-4 border-2 border-ink bg-card-surface p-4">
                <ul className="space-y-1 text-body">
                  <li>
                    <strong>Framework:</strong> React 19 + TanStack Start (file-based routing, SSR)
                  </li>
                  <li>
                    <strong>Styling:</strong> Tailwind CSS v4 with custom design tokens
                  </li>
                  <li>
                    <strong>Fonts:</strong> Space Grotesk (display), Inter (body), JetBrains Mono
                    (labels)
                  </li>
                  <li>
                    <strong>State:</strong> React Context + localStorage (no backend)
                  </li>
                  <li>
                    <strong>Data:</strong> Mocked JSON — 2 full 60-day track curricula, 3 demo
                    profiles, 20 leaderboard entries
                  </li>
                  <li>
                    <strong>Deployment:</strong> Cloudflare (via Vite + Nitro)
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 7 — Links */}
            <section id="links" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-heading-3 uppercase">Links</h2>
              <div className="mt-4 space-y-3">
                <a
                  href="https://github.com/Sagar44-Github/commit-streak-forge"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border-2 border-ink bg-card-surface p-3 font-display text-label-bold uppercase shadow-brutal-sm press"
                >
                  GitHub Repository <ExternalLink size={14} strokeWidth={3} />
                </a>
                <a
                  href="https://github.com/Sagar44-Github/commit-streak-forge/blob/main/PROMPTS.md"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border-2 border-ink bg-card-surface p-3 font-display text-label-bold uppercase shadow-brutal-sm press"
                >
                  PROMPTS.md <ExternalLink size={14} strokeWidth={3} />
                </a>
                <BrutalLink to="/">
                  Back to the product
                </BrutalLink>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
