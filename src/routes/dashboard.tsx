import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Flame,
  Lock,
  Search,
  Snowflake,
  Users,
  X,
  Sparkles,
  Filter,
} from "lucide-react";
import {
  BrutalButton,
  BrutalLink,
  DayGrid,
  Footer,
  FreezeCounter,
  MonoLabel,
  Nav,
  Panel,
  Pill,
} from "@/components/ab/ui";
import { getProfile, getTrack, profileList, type ChallengeDay, type ProfileId } from "@/data/abtalks";
import { useStore, resolvedDayStatus } from "@/lib/store";
import { NudgeBanner } from "@/components/ab/nudge-banner";
import { cn } from "@/lib/utils";

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
    "at-risk": {
      tone: "text-yellow",
      label: "At risk — today not submitted",
      pill: "yellow" as const,
    },
    broken: {
      tone: "text-red",
      label: "Streak broken — restart today",
      pill: "red" as const,
    },
    "not-started": { tone: "text-ink", label: "Not started yet", pill: "ink" as const },
  }[state];

  return (
    <div>
      <div className="flex items-center gap-2">
        <Flame size={16} strokeWidth={3} className={config.tone} />
        <MonoLabel>Current streak</MonoLabel>
      </div>
      <p className={`mt-2 font-display text-streak-clamp tabular-nums ${config.tone}`}>
        {streak}
      </p>
      <div className="mt-3">
        <Pill tone={config.pill}>{config.label}</Pill>
      </div>
    </div>
  );
}

/* ── Milestone Banner ── */
function MilestoneBanner({
  dayNumber,
  onDismiss,
}: {
  dayNumber: number;
  onDismiss: () => void;
}) {
  const messages: Record<number, { title: string; sub: string }> = {
    7: {
      title: "7 days straight.",
      sub: "You're building a habit. Most people quit by now — you didn't.",
    },
    30: {
      title: "Halfway there.",
      sub: "30 days of proof. You're not a student with a resume anymore — you're a builder with receipts.",
    },
    60: {
      title: "60 days. Done.",
      sub: "You finished the entire challenge. 60 commits, 60 posts, zero excuses. This is the proof.",
    },
  };
  const msg = messages[dayNumber];
  if (!msg) return null;

  const isDay60 = dayNumber === 60;

  return (
    <div
      className={cn(
        "border-b-2 border-ink",
        isDay60
          ? "bg-yellow text-on-yellow py-10 md:py-16"
          : "bg-yellow text-on-yellow py-5 md:py-8",
      )}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles
                size={isDay60 ? 24 : 18}
                strokeWidth={3}
              />
              <MonoLabel className="text-on-yellow/70">
                MILESTONE · DAY {dayNumber}
              </MonoLabel>
            </div>
            <h2
              className={cn(
                "mt-3 font-display uppercase",
                isDay60 ? "text-heading-1 md:text-display-large" : "text-heading-2 md:text-heading-1",
              )}
            >
              {msg.title}
            </h2>
            <p
              className={cn(
                "mt-3 max-w-xl",
                isDay60 ? "text-body text-heading-3 font-display uppercase" : "text-body",
              )}
            >
              {msg.sub}
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink bg-card-surface"
            aria-label="Dismiss milestone"
          >
            <X size={14} strokeWidth={3} className="text-ink" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Search/Filter Panel ── */
function DaySearch({
  days,
  searchState,
}: {
  days: ChallengeDay[];
  searchState?: Record<string, string | undefined>;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!query && !statusFilter) return [];
    return days.filter((d) => {
      const matchesQuery =
        !query ||
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.description.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = !statusFilter || d.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [days, query, statusFilter]);

  const showResults = open && (query || statusFilter);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press"
      >
        <Search size={12} strokeWidth={3} />
        {open ? "Close search" : "Search days"}
      </button>

      {open && (
        <div className="mt-3 border-2 border-ink bg-card-surface p-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search day titles..."
            className="w-full rounded-none border-2 border-ink bg-base px-3 py-2 text-body text-ink outline-none focus:shadow-brutal"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <MonoLabel className="flex items-center gap-1">
              <Filter size={9} strokeWidth={3} /> Filter
            </MonoLabel>
            {(["completed", "missed", "frozen", "today", "upcoming"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(statusFilter === s ? null : s)}
                className={cn(
                  "border-2 px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]",
                  statusFilter === s
                    ? "border-ink bg-ink text-base"
                    : "border-ink bg-card-surface text-ink",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {showResults && (
            <div className="mt-3 max-h-48 space-y-1 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-body text-muted-ink">No matching days found.</p>
              ) : (
                results.slice(0, 10).map((d) => (
                  <Link
                    key={d.dayNumber}
                    to="/day/$n"
                    params={{ n: String(d.dayNumber) }}
                    search={searchState as never}
                    className="flex items-center justify-between gap-2 border-b border-muted-ink/20 px-1 py-2 hover:bg-sidebar-surface"
                  >
                    <div className="flex items-center gap-2">
                      <MonoLabel>Day {d.dayNumber}</MonoLabel>
                      <span className="text-body-bold">{d.title}</span>
                    </div>
                    <Pill
                      tone={
                        d.status === "completed"
                          ? "blue"
                          : d.status === "missed"
                            ? "red"
                            : d.status === "frozen"
                              ? "blue"
                              : d.status === "today"
                                ? "yellow"
                                : "ink"
                      }
                    >
                      {d.status}
                    </Pill>
                  </Link>
                ))
              )}
              {results.length > 10 && (
                <MonoLabel>{results.length - 10} more results…</MonoLabel>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Dashboard ── */

function Dashboard() {
  const { student: profileId } = Route.useSearch();
  const store = useStore();

  // Sync URL search param to store if explicitly provided
  useEffect(() => {
    if (profileId && profileId !== store.activeProfileId) {
      store.switchProfile(profileId);
    }
  }, [profileId, store.activeProfileId, store.switchProfile]);

  const profile = getProfile(store.activeProfileId);

  // No redirect — default to web-dev if no track selected (better for demos/evaluators)
  const trackId = store.selectedTrackId ?? profile.student.selectedTrackId ?? "web-dev";
  const track = getTrack(trackId);

  // Build days with store overrides
  const { student, achievements } = profile;
  const days: ChallengeDay[] = useMemo(() => {
    return profile.days.map((d) => ({
      ...d,
      // Override track info from selected track
      title: track.challengeDays[d.dayNumber - 1]?.title ?? d.title,
      description: track.challengeDays[d.dayNumber - 1]?.description ?? d.description,
      learningObjectives:
        track.challengeDays[d.dayNumber - 1]?.learningObjectives ?? d.learningObjectives,
      track: track.name,
      // Apply store status overrides
      status: resolvedDayStatus(trackId, d.dayNumber, d.status, store.dayStatusOverrides),
    }));
  }, [profile.days, track, trackId, store.dayStatusOverrides]);

  const today = days.find((d) => d.status === "today") ?? days[0]!;
  const unlocked = achievements.filter((a) => a.unlockedAt);
  const locked = achievements.filter((a) => !a.unlockedAt);
  const isEmpty = student.totalDaysCompleted === 0;
  const freezesUsed = student.streakFreezesUsed + store.extraFreezesUsed;
  const freezesAvailable = Math.max(0, student.streakFreezesAvailable - store.extraFreezesUsed);

  // Find first missed day for freeze feature
  const firstMissedDay = days.find((d) => d.status === "missed");

  // Milestone check
  const completedCount = days.filter((d) => d.status === "completed").length;
  const activeMilestone = [60, 30, 7].find(
    (m) => completedCount >= m && !store.seenMilestones.includes(m),
  );

  // Check if today's task is submitted (via store overrides)
  const todaySubmitted =
    resolvedDayStatus(trackId, today.dayNumber, today.status, store.dayStatusOverrides) ===
    "completed";

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav cta={false} />

      {/* Milestone celebration */}
      {activeMilestone && (
        <MilestoneBanner
          dayNumber={activeMilestone}
          onDismiss={() => store.dismissMilestone(activeMilestone)}
        />
      )}

      {/* Nudge banner */}
      <NudgeBanner
        time={store.mockCurrentTime}
        taskSubmitted={todaySubmitted}
        onDismiss={store.dismissNudge}
        dismissed={store.nudgeDismissed}
      />

      {/* Demo Controls Bar */}
      <div className="border-b-2 border-ink bg-sidebar-surface py-3">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-y-3 gap-x-6 px-4 md:px-10">
          {/* Demo Profile Control */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-ink">
              Demo Profile:
            </span>
            <div className="inline-flex border-2 border-ink bg-card-surface p-0.5 shadow-brutal-sm">
              {profileList.map((p) => {
                const active = p.id === store.activeProfileId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => store.switchProfile(p.id)}
                    className={cn(
                      "px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-all",
                      active
                        ? "bg-ink text-base shadow-none"
                        : "bg-transparent text-ink hover:bg-sidebar-surface",
                    )}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Simulation Control */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-ink">
              Simulate Time:
            </span>
            <div className="inline-flex border-2 border-ink bg-card-surface p-0.5 shadow-brutal-sm">
              {(["day", "evening", "late-night"] as const).map((t) => {
                const active = store.mockCurrentTime === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => store.setMockTime(t)}
                    className={cn(
                      "px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-all",
                      active
                        ? "bg-ink text-base shadow-none"
                        : "bg-transparent text-ink hover:bg-sidebar-surface",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-10 md:py-12">
        {/* Track Header & Social Proof */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink/10 pb-5">
          <div className="flex items-center gap-3">
            <Pill tone="blue">{track.name}</Pill>
            <Link
              to="/onboarding"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-ink hover:text-ink underline"
            >
              Change track
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 border-2 border-ink bg-card-surface px-3 py-1.5 shadow-brutal-sm">
            <div className="flex -space-x-1.5">
              {["PK", "SR", "AD", "KM"].map((i) => (
                <span
                  key={i}
                  className="flex h-5 w-5 items-center justify-center border border-ink bg-blue font-mono text-[8px] font-bold text-on-blue"
                >
                  {i}
                </span>
              ))}
            </div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
              <span className="font-display font-black text-blue tabular-nums">
                {track.totalStudents}
              </span>{" "}
              students building right now
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          {/* Streak */}
          <Panel className="lg:row-span-1">
            <StreakBlock state={student.streakState} streak={student.currentStreak} />
            <p className="mt-4 max-w-sm text-body">
              {student.streakState === "not-started"
                ? "Your streak starts today. Finish day 1 and this number turns blue."
                : student.streakState === "broken"
                  ? "You have zero submissions so far. No shame in it — today is open and a fresh streak starts with one commit."
                  : student.streakState === "at-risk"
                    ? "You haven't logged today yet. Submit before midnight to keep the chain."
                    : "Chain intact. Keep it boring and keep it daily."}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <FreezeCounter available={freezesAvailable} />
              <MonoLabel>
                {freezesUsed} used · earn more at milestones
              </MonoLabel>
            </div>

            {/* Streak Freeze action */}
            {firstMissedDay ? (
              <div className="mt-4">
                {freezesAvailable > 0 ? (
                  <BrutalButton
                    variant="blue"
                    onClick={() => store.useStreakFreeze(firstMissedDay.dayNumber)}
                    className="w-full sm:w-auto"
                  >
                    <Snowflake size={16} strokeWidth={3} />
                    Use Streak Freeze to protect Day {firstMissedDay.dayNumber}
                  </BrutalButton>
                ) : (
                  <div className="flex items-center gap-2 border-2 border-dashed border-muted-ink bg-sidebar-surface px-3 py-2">
                    <Snowflake size={14} strokeWidth={3} className="text-muted-ink" />
                    <MonoLabel>
                      No freezes available — earn one at Day 30
                    </MonoLabel>
                  </div>
                )}
              </div>
            ) : null}
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
            <DayGrid days={days} />
          </div>

          {/* Search/filter */}
          <DaySearch days={days} />
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
              {freezesAvailable} left.
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
