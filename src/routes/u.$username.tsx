import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Flame, GitCommitHorizontal, Linkedin } from "lucide-react";
import { BrutalLink, Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { getProfile, leaderboardData, type ChallengeDay, type DayStatus } from "@/data/abtalks";
import { useStore } from "@/lib/store";
import { getAiPitch } from "@/lib/ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/u/$username")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.username} — ABTalks Profile` },
      {
        name: "description",
        content: `See ${params.username}'s ABTalks 60-day challenge progress, streak, and proof-of-work history.`,
      },
    ],
  }),
  component: PublicProfile,
});

const statusStyles: Record<DayStatus, string> = {
  completed: "bg-blue border-ink",
  missed: "bg-red border-ink",
  frozen: "bg-card-surface border-blue border-dashed",
  today: "bg-yellow border-ink",
  upcoming: "bg-transparent border-muted-ink",
};

function PublicProfile() {
  const { username } = Route.useParams();

  // Find the matching profile or leaderboard entry
  const knownProfiles: Record<string, ReturnType<typeof getProfile>> = {
    "riya-nandan": getProfile("mid"),
    "arjun-mehta": getProfile("first-day"),
    "sana-qureshi": getProfile("empty"),
  };

  const profile = knownProfiles[username];
  const leaderboardEntry = leaderboardData.find((e) => e.username === username);

  if (!profile && !leaderboardEntry) {
    return (
      <div className="min-h-screen grid-bg bg-base">
        <Nav />
        <main className="mx-auto flex max-w-[900px] flex-col items-center px-4 py-16 text-center md:px-10">
          <h1 className="font-display text-heading-2 uppercase">Profile not found</h1>
          <p className="mt-3 max-w-md text-body">
            The username &ldquo;{username}&rdquo; doesn&apos;t match any student in our records.
          </p>
          <BrutalLink to="/" className="mt-6">
            Go home <ArrowRight size={18} strokeWidth={3} />
          </BrutalLink>
        </main>
        <Footer />
      </div>
    );
  }

  // Use real profile data if available, otherwise construct from leaderboard
  const student = profile?.student ?? {
    name: leaderboardEntry!.name,
    initials: leaderboardEntry!.initials,
    avatarUrl: "",
    track: leaderboardEntry!.trackId.replace("-", " "),
    joinedDate: "2026-06-15",
    currentStreak: leaderboardEntry!.currentStreak,
    longestStreak: leaderboardEntry!.currentStreak,
    totalDaysCompleted: Math.round((leaderboardEntry!.completionPercentage / 100) * 60),
    completionPercentage: leaderboardEntry!.completionPercentage,
    streakState: "alive" as const,
    username: leaderboardEntry!.username,
    isPublic: true,
  };

  const days: ChallengeDay[] = profile?.days ?? [];
  const achievements = profile?.achievements ?? [];
  const completedDays = days.filter((d) => d.status === "completed");
  const recentSubmissions = completedDays
    .filter((d) => d.submission)
    .sort((a, b) => b.dayNumber - a.dayNumber)
    .slice(0, 5);

  const store = useStore();
  const cachedPitch = store.aiPitches[username]?.pitch;
  const [pitch, setPitch] = useState<string | null>(cachedPitch ?? null);
  const [loadingPitch, setLoadingPitch] = useState(false);
  const [pitchError, setPitchError] = useState<string | null>(null);

  const handleGeneratePitch = async () => {
    setLoadingPitch(true);
    setPitchError(null);
    try {
      const res = await getAiPitch({
        data: {
          studentName: student.name,
          track: student.track,
          daysCompleted: student.totalDaysCompleted,
          currentStreak: student.currentStreak,
          longestStreak: student.longestStreak,
          sampleTasks: recentSubmissions.slice(0, 3).map((d) => d.title),
        },
      });
      if (res.success && res.pitch) {
        setPitch(res.pitch);
        store.setAiPitch(username, res.pitch);
      } else {
        setPitchError(res.error ?? "Could not generate pitch");
      }
    } catch {
      setPitchError("AI pitch generation is temporarily unavailable.");
    } finally {
      setLoadingPitch(false);
    }
  };

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav studentOverride={student} />

      <main className="mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-5">
          <span className="flex h-20 w-20 items-center justify-center border-2 border-ink bg-blue font-display text-heading-3 text-on-blue shadow-brutal">
            {student.initials}
          </span>
          <div className="flex-1">
            <h1 className="font-display text-heading-2 uppercase md:text-heading-1">
              {student.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Pill tone="blue">{student.track}</Pill>
              <MonoLabel>on ABTalks since {student.joinedDate}</MonoLabel>
            </div>
          </div>
        </div>

        {/* AI Recruiter Pitch */}
        <div className="mt-6">
          <Panel tone="yellow" className="border-2 border-ink shadow-brutal">
            <div className="flex items-center justify-between gap-3">
              <MonoLabel className="text-on-yellow/70">AI-Generated Recruiter Pitch</MonoLabel>
              <button
                type="button"
                onClick={handleGeneratePitch}
                disabled={loadingPitch}
                className="border-2 border-ink bg-card-surface px-2.5 py-1 font-mono mono-label uppercase tracking-[0.16em] text-ink shadow-brutal-sm press disabled:opacity-50"
              >
                {loadingPitch ? "Generating…" : pitch ? "Regenerate" : "Generate pitch"}
              </button>
            </div>
            {loadingPitch ? (
              <p className="mt-3 animate-pulse font-display text-heading-3 uppercase text-on-yellow/70">
                Crafting pitch for recruiters…
              </p>
            ) : pitch ? (
              <p className="mt-3 font-display text-heading-3 uppercase leading-snug text-on-yellow">
                &ldquo;{pitch}&rdquo;
              </p>
            ) : pitchError ? (
              <p className="mt-3 text-body text-on-yellow/80">{pitchError}</p>
            ) : (
              <p className="mt-3 text-body text-on-yellow/80">
                Generate an AI pitch highlighting {student.name}&apos;s proof-of-work, track consistency, and streak history for recruiters.
              </p>
            )}
          </Panel>
        </div>

        {/* Streak prominence */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Panel>
            <div className="flex items-center gap-2">
              <Flame size={16} strokeWidth={3} className="text-blue" />
              <MonoLabel>Current streak</MonoLabel>
            </div>
            <p className="mt-2 font-display text-display-large text-blue tabular-nums leading-none">
              {student.currentStreak}
            </p>
          </Panel>
          <Panel>
            <MonoLabel>Longest streak</MonoLabel>
            <p className="mt-2 font-display text-heading-1 tabular-nums">{student.longestStreak}</p>
          </Panel>
          <Panel>
            <MonoLabel>Days completed</MonoLabel>
            <p className="mt-2 font-display text-heading-1 text-blue tabular-nums">
              {student.totalDaysCompleted}
              <span className="ml-1 text-label-bold text-muted-ink">/60</span>
            </p>
          </Panel>
          <Panel>
            <MonoLabel>Completion</MonoLabel>
            <p className="mt-2 font-display text-heading-1 text-blue tabular-nums">
              {student.completionPercentage}%
            </p>
          </Panel>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-heading-3 uppercase">Badges</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {achievements
                .filter((a) => a.unlockedAt)
                .map((a) => (
                  <Pill key={a.id} tone={a.badgeStyle === "ink" ? "ink" : a.badgeStyle}>
                    {a.title}
                  </Pill>
                ))}
            </div>
          </div>
        )}

        {/* Day grid (read-only visual) */}
        {days.length > 0 && (
          <Panel className="mt-8">
            <h2 className="font-display text-heading-3 uppercase">60-day progress</h2>
            <div className="mt-4 grid grid-cols-10 gap-1.5">
              {days.map((d) => (
                <span
                  key={d.dayNumber}
                  title={`Day ${d.dayNumber} — ${d.status}`}
                  className={cn(
                    "flex aspect-square items-center justify-center border-2 font-mono mono-label",
                    statusStyles[d.status],
                    d.status === "upcoming" && "text-muted-ink",
                    (d.status === "completed" || d.status === "missed") && "text-transparent",
                  )}
                >
                  {d.dayNumber}
                </span>
              ))}
            </div>
          </Panel>
        )}

        {/* Recent proof-of-work feed */}
        {recentSubmissions.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-heading-3 uppercase">Recent proof of work</h2>
            <div className="mt-4 space-y-3">
              {recentSubmissions.map((d) => (
                <div
                  key={d.dayNumber}
                  className="border-2 border-ink bg-card-surface p-4 shadow-brutal-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <MonoLabel>Day {d.dayNumber}</MonoLabel>
                      <p className="mt-1 font-display text-label-bold uppercase">{d.title}</p>
                    </div>
                    <MonoLabel>
                      {new Date(d.submission!.submittedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </MonoLabel>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={d.submission!.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 border-2 border-ink bg-sidebar-surface px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] hover:bg-card-surface"
                    >
                      <GitCommitHorizontal size={10} strokeWidth={3} /> GitHub{" "}
                      <ExternalLink size={8} strokeWidth={3} />
                    </a>
                    <a
                      href={d.submission!.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 border-2 border-ink bg-sidebar-surface px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] hover:bg-card-surface"
                    >
                      <Linkedin size={10} strokeWidth={3} /> LinkedIn{" "}
                      <ExternalLink size={8} strokeWidth={3} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Start your own streak CTA */}
        <div className="mt-12 border-t-2 border-ink pt-8 text-center">
          <p className="font-display text-heading-3 uppercase">
            Start your own streak
          </p>
          <p className="mx-auto mt-2 max-w-md text-body">
            60 days. One commit, one post, every day. Proof of work you can show a recruiter.
          </p>
          <BrutalLink to="/" className="mt-5">
            Begin the challenge <ArrowRight size={18} strokeWidth={3} />
          </BrutalLink>
        </div>
      </main>

      <Footer />
    </div>
  );
}
