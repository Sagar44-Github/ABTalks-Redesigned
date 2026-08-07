import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Lock, Snowflake, Users } from "lucide-react";
import {
  BrutalLink,
  DayGrid,
  Footer,
  FreezeCounter,
  MonoLabel,
  Nav,
  Panel,
  Pill,
} from "@/components/ab/ui";
import { getProfile, profileList, type ProfileId } from "@/data/abtalks";

type DashSearch = { student?: ProfileId };

export const Route = createFileRoute("/dashboard")({
  validateSearch: (search: Record<string, unknown>): DashSearch => {
    const s = search["student"];
    return s === "first-day" || s === "empty" || s === "mid" ? { student: s } : {};
  },
  head: () => ({
    meta: [
      { title: "Your Dashboard — ABTalks 60-Day Challenge" },
      {
        name: "description",
        content:
          "Track your streak, freeze tokens, 60-day progress grid and today's task in one glance.",
      },
      { property: "og:title", content: "Your Dashboard — ABTalks" },
      {
        property: "og:description",
        content: "Streak, freeze tokens, day grid and today's task — everything in one screen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/dashboard" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
  component: Dashboard,
});

function StreakBlock({
  state,
  streak,
}: {
  state: "alive" | "at-risk" | "broken" | "not-started";
  streak: number;
}) {
  const config = {
    alive: { tone: "text-blue", label: "Streak alive", pill: "blue" as const },
    "at-risk": { tone: "text-yellow", label: "At risk — today not submitted", pill: "yellow" as const },
    broken: { tone: "text-red", label: "Streak broken — restart today", pill: "red" as const },
    "not-started": { tone: "text-ink", label: "Not started yet", pill: "ink" as const },
  }[state];

  return (
    <div>
      <div className="flex items-center gap-2">
        <Flame size={16} strokeWidth={3} className={config.tone} />
        <MonoLabel>Current streak</MonoLabel>
      </div>
      <p className={`mt-2 font-display text-streak-clamp tabular-nums ${config.tone}`}>{streak}</p>
      <div className="mt-3">
        <Pill tone={config.pill}>{config.label}</Pill>
      </div>
    </div>
  );
}

function Dashboard() {
  const { student: profileId } = Route.useSearch();
  const profile = getProfile(profileId);
  const { student, days, achievements } = profile;
  const search = profileId ? { student: profileId } : undefined;
  const today = days.find((d) => d.status === "today") ?? days[0]!;
  const unlocked = achievements.filter((a) => a.unlockedAt);
  const locked = achievements.filter((a) => !a.unlockedAt);
  const isEmpty = student.totalDaysCompleted === 0;

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav student={student} cta={false} />

      {/* Demo state switcher */}
      <div className="border-b-2 border-ink bg-sidebar-surface">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 py-2 md:px-10">
          <MonoLabel>Demo state</MonoLabel>
          {profileList.map((p) => {
            const active = p.id === profile.id;
            return (
              <Link
                key={p.id}
                to="/dashboard"
                search={p.id === "mid" ? {} : { student: p.id }}
                className={`border-2 border-ink px-2 py-1 font-mono text-mono-label uppercase tracking-[0.16em] ${
                  active ? "bg-ink text-base" : "bg-card-surface text-ink"
                }`}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-10 md:py-12">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          {/* Streak */}
          <Panel className="lg:row-span-1">
            <StreakBlock state={student.streakState} streak={student.currentStreak} />
            <p className="mt-4 max-w-sm text-body">
              {student.streakState === "not-started"
                ? "Your streak starts today. Finish day 1 and this number turns blue."
                : student.streakState === "broken"
                  ? "You have zero submissions so far. No shame in it — day 12 is open and a fresh streak starts with one commit."
                  : student.streakState === "at-risk"
                    ? "You haven't logged today yet. Submit before midnight to keep the chain."
                    : "Chain intact. Keep it boring and keep it daily."}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <FreezeCounter available={student.streakFreezesAvailable} />
              <MonoLabel>
                {student.streakFreezesUsed} used · earn more at milestones (coming soon)
              </MonoLabel>
            </div>
          </Panel>

          {/* Today's task */}
          <Panel tone="yellow">
            <MonoLabel className="text-on-yellow/70">
              Today · Day {today.dayNumber} of 60 · {today.estimatedTime}
            </MonoLabel>
            <h2 className="mt-3 font-display text-heading-3 uppercase md:text-heading-2">
              {today.title}
            </h2>
            <p className="mt-3 text-body">{today.description}</p>
            <BrutalLink
              to="/day/$n"
              params={{ n: String(today.dayNumber) }}
              search={search}
              variant="ink"
              className="mt-6 w-full sm:w-auto"
            >
              Open day {today.dayNumber} <ArrowRight size={18} strokeWidth={3} />
            </BrutalLink>
          </Panel>
        </div>

        {/* Progress */}
        <Panel className="mt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-heading-3 uppercase">60-day progress</h2>
            <p className="font-display text-heading-3 text-blue tabular-nums">
              {student.totalDaysCompleted}/60
              <span className="ml-2 text-label-bold">{student.completionPercentage}%</span>
            </p>
          </div>
          {isEmpty ? (
            <p className="mt-2 max-w-lg text-body">
              {student.streakState === "not-started"
                ? "All 60 days are still ahead of you — nothing is missed, nothing is late."
                : "No days completed yet. The red squares are behind you; today's yellow square is the only one that matters."}
            </p>
          ) : null}
          <div className="mt-5">
            <DayGrid days={days} currentSearch={search} />
          </div>
        </Panel>

        {/* Achievements */}
        <Panel className="mt-5">
          <h2 className="font-display text-heading-3 uppercase">Achievements</h2>
          {unlocked.length === 0 ? (
            <div className="mt-3 rounded-card border-2 border-dashed border-muted-ink p-5">
              <div className="flex items-center gap-2">
                <Lock size={16} strokeWidth={3} className="text-muted-ink" />
                <p className="font-display text-label-bold uppercase">Nothing unlocked yet</p>
              </div>
              <p className="mt-2 max-w-md text-body">
                Your first badge — <strong>First Submission</strong> — unlocks the moment you drop a
                commit link and a post link on day {today.dayNumber}.
              </p>
              <BrutalLink
                to="/day/$n"
                params={{ n: String(today.dayNumber) }}
                search={search}
                className="mt-4"
              >
                Unlock your first badge
              </BrutalLink>
            </div>
          ) : (
            <div className="mt-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
              {unlocked.map((a) => (
                <Pill key={a.id} tone={a.badgeStyle === "ink" ? "ink" : a.badgeStyle}>
                  {a.title}
                </Pill>
              ))}
            </div>
          )}
          {locked.length > 0 && unlocked.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {locked.map((a) => (
                <Pill key={a.id} tone="locked">
                  <Lock size={9} strokeWidth={3} /> {a.title}
                </Pill>
              ))}
            </div>
          ) : null}
        </Panel>

        {/* Freeze explainer + social proof */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Panel tone="sidebar">
            <div className="flex items-center gap-2">
              <Snowflake size={16} strokeWidth={3} className="text-blue" />
              <h2 className="font-display text-heading-3 uppercase">Streak freeze</h2>
            </div>
            <p className="mt-3 text-body">
              Miss a night and a freeze token spends itself automatically — the day shows as{" "}
              <strong>frozen</strong>, not missed, and your streak keeps counting. You have{" "}
              {student.streakFreezesAvailable} left.
            </p>
          </Panel>
          <Panel tone="sidebar">
            <div className="flex items-center gap-2">
              <Users size={16} strokeWidth={3} className="text-blue" />
              <h2 className="font-display text-heading-3 uppercase">Building tonight</h2>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["AK", "PR", "SM", "DV", "NJ", "TS"].map((i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center border-2 border-ink bg-card-surface font-display text-label-small"
                >
                  {i}
                </span>
              ))}
            </div>
            <p className="mt-3 text-body-bold">412 students have already logged today.</p>
          </Panel>
        </div>
      </main>

      <Footer />
    </div>
  );
}
