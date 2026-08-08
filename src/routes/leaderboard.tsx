import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpDown, Flame, Trophy } from "lucide-react";
import { Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { getProfile, leaderboardData, tracks, type LeaderboardEntry } from "@/data/abtalks";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — ABTalks" },
      {
        name: "description",
        content: "See who's building the longest streaks in the ABTalks 60-day challenge.",
      },
    ],
  }),
  component: LeaderboardPage,
});

type SortBy = "streak" | "completion";

function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<SortBy>("streak");
  const [trackFilter, setTrackFilter] = useState<string | null>(null);
  const store = useStore();
  const currentProfile = getProfile(store.activeProfileId);
  const currentUsername = currentProfile.student.username;

  const filtered = trackFilter
    ? leaderboardData.filter((e) => e.trackId === trackFilter)
    : leaderboardData;

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "streak"
      ? b.currentStreak - a.currentStreak
      : b.completionPercentage - a.completionPercentage,
  );

  // Re-rank after filter/sort
  const ranked = sorted.map((entry, i) => ({ ...entry, rank: i + 1 }));

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav cta={false} />

      <main className="mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12">
        <div className="flex items-center gap-3">
          <Trophy size={20} strokeWidth={3} className="text-yellow" />
          <MonoLabel>Leaderboard</MonoLabel>
        </div>
        <h1 className="mt-3 font-display text-heading-2 uppercase md:text-heading-1">
          Who&apos;s building
        </h1>
        <p className="mt-3 max-w-xl text-body">
          The longest streaks and highest completion rates in the challenge. Keep climbing — every
          day you submit moves you up.
        </p>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap gap-3">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <MonoLabel className="flex items-center gap-1">
              <ArrowUpDown size={9} strokeWidth={3} /> Sort by
            </MonoLabel>
            <button
              type="button"
              onClick={() => setSortBy("streak")}
              className={cn(
                "border-2 border-ink px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]",
                sortBy === "streak" ? "bg-ink text-base" : "bg-card-surface text-ink",
              )}
            >
              Streak
            </button>
            <button
              type="button"
              onClick={() => setSortBy("completion")}
              className={cn(
                "border-2 border-ink px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]",
                sortBy === "completion" ? "bg-ink text-base" : "bg-card-surface text-ink",
              )}
            >
              Completion
            </button>
          </div>

          {/* Track filter */}
          <div className="flex items-center gap-2">
            <MonoLabel>Track</MonoLabel>
            <button
              type="button"
              onClick={() => setTrackFilter(null)}
              className={cn(
                "border-2 border-ink px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]",
                !trackFilter ? "bg-ink text-base" : "bg-card-surface text-ink",
              )}
            >
              All
            </button>
            {tracks.slice(0, 3).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTrackFilter(trackFilter === t.id ? null : t.id)}
                className={cn(
                  "border-2 border-ink px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]",
                  trackFilter === t.id ? "bg-ink text-base" : "bg-card-surface text-ink",
                )}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard list */}
        <div className="mt-6 space-y-2">
          {ranked.map((entry) => {
            const isCurrentUser = entry.username === currentUsername;
            const isTop3 = entry.rank <= 3;
            return (
              <Link
                key={entry.username}
                to="/u/$username"
                params={{ username: entry.username }}
                className={cn(
                  "flex items-center gap-4 border-2 p-4 transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px]",
                  isCurrentUser
                    ? "border-yellow bg-yellow/10 shadow-brutal-yellow"
                    : "border-ink bg-card-surface shadow-brutal hover:shadow-brutal-lg",
                )}
              >
                {/* Rank */}
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink font-display text-label-bold",
                    isTop3 ? "bg-yellow text-on-yellow" : "bg-sidebar-surface",
                  )}
                >
                  {entry.rank}
                </span>

                {/* Avatar */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink bg-blue font-display text-label-small text-on-blue">
                  {entry.initials}
                </span>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-display text-label-bold uppercase">
                      {entry.name}
                    </p>
                    {isCurrentUser && <Pill tone="yellow">You</Pill>}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Pill tone="ink">{tracks.find((t) => t.id === entry.trackId)?.name ?? entry.trackId}</Pill>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden shrink-0 text-right sm:block">
                  <div className="flex items-center gap-1.5">
                    <Flame size={12} strokeWidth={3} className="text-blue" />
                    <span className="font-display text-heading-3 text-blue tabular-nums">
                      {entry.currentStreak}
                    </span>
                  </div>
                  <MonoLabel>{entry.completionPercentage}% done</MonoLabel>
                </div>

                {/* Mobile stats */}
                <div className="shrink-0 text-right sm:hidden">
                  <span className="font-display text-label-bold text-blue tabular-nums">
                    {sortBy === "streak" ? entry.currentStreak : `${entry.completionPercentage}%`}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {ranked.length === 0 && (
          <Panel className="mt-6" tone="sidebar">
            <p className="text-center text-body">No students found for this filter.</p>
          </Panel>
        )}
      </main>

      <Footer />
    </div>
  );
}
