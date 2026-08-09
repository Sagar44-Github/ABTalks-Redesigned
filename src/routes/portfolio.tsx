import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, Check, ExternalLink, Layers } from "lucide-react";
import { BrutalButton, Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { getProfile, getTrack } from "@/data/abtalks";
import { useStore, resolvedDayStatus } from "@/lib/store";
import { computeXp, levelProgress } from "@/lib/xp";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio builder — turn 60 days into a shareable page" },
      {
        name: "description",
        content:
          "Auto-generate a recruiter-ready portfolio page from your strongest ABTalks submissions. Pick your best work, copy the link, send it.",
      },
      { property: "og:title", content: "Portfolio builder — ABTalks" },
      {
        property: "og:description",
        content: "Your best 8-10 challenge submissions, assembled into one shareable project page.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const store = useStore();
  const profile = getProfile(store.activeProfileId);
  const trackId = store.selectedTrackId ?? profile.student.selectedTrackId ?? "web-dev";
  const track = getTrack(trackId);

  const completed = useMemo(() => {
    return profile.days
      .map((d) => {
        const trackDay = track.challengeDays[d.dayNumber - 1];
        const status = resolvedDayStatus(trackId, d.dayNumber, d.status, store.dayStatusOverrides);
        const submitted = store.submissions.find((s) => s.dayNumber === d.dayNumber);
        return {
          dayNumber: d.dayNumber,
          title: trackDay?.title ?? d.title,
          description: trackDay?.description ?? d.description,
          objectives: trackDay?.learningObjectives ?? d.learningObjectives,
          difficulty: trackDay?.difficulty ?? d.difficulty,
          status,
          githubUrl: submitted?.githubUrl ?? d.submission?.githubUrl ?? null,
        };
      })
      .filter((d) => d.status === "completed");
  }, [profile.days, track.challengeDays, trackId, store.dayStatusOverrides, store.submissions]);

  // Default pick: hardest work first, capped at 10.
  const rank = { Stretch: 0, Core: 1, Starter: 2 } as const;
  const suggested = useMemo(
    () =>
      [...completed]
        .sort((a, b) => (rank[a.difficulty] - rank[b.difficulty]) || b.dayNumber - a.dayNumber)
        .slice(0, 10)
        .map((d) => d.dayNumber),
    [completed],
  );

  const [selected, setSelected] = useState<number[]>(suggested);
  const [copied, setCopied] = useState(false);

  const xp = computeXp(profile.days, store.dayStatusOverrides, trackId);
  const { level } = levelProgress(xp);
  const picked = completed.filter((d) => selected.includes(d.dayNumber));
  const shareUrl = `abtalks.app/u/${profile.student.username}/portfolio`;

  const toggle = (n: number) =>
    setSelected((s) => (s.includes(n) ? s.filter((x) => x !== n) : s.length >= 10 ? s : [...s, n]));

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${shareUrl}`);
      setCopied(true);
      store.showToast("Portfolio link copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav cta={false} />
      <main className="mx-auto max-w-[1100px] px-4 py-8 md:px-10 md:py-12">
        <MonoLabel>Portfolio builder</MonoLabel>
        <h1 className="mt-2 font-display text-heading-1 uppercase">
          Sixty days is a portfolio, not a streak
        </h1>
        <p className="mt-3 max-w-2xl text-body">
          Pick up to ten submissions. We assemble them into one page a recruiter can read in
          ninety seconds — task, what it proved, and the commit behind it.
        </p>

        {completed.length === 0 ? (
          <Panel className="mt-6" tone="sidebar">
            <h2 className="font-display text-heading-3 uppercase">Nothing to assemble yet</h2>
            <p className="mt-2 text-body">
              Complete a few days first. The builder needs real submissions to work with.
            </p>
            <Link
              to="/dashboard"
              className="mt-4 inline-flex border-2 border-ink bg-card-surface px-5 py-3 font-display text-label-bold uppercase shadow-brutal press"
            >
              Go to dashboard
            </Link>
          </Panel>
        ) : (
          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* Preview */}
            <div className="min-w-0">
              <Panel>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center border-2 border-ink bg-blue font-display text-heading-3 text-on-blue">
                    {profile.student.initials}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-heading-2 uppercase">{profile.student.name}</h2>
                    <p className="font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
                      {track.name} · Level {level} · {completed.length} days shipped
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {picked.map((d) => (
                    <article key={d.dayNumber} className="min-w-0 border-2 border-ink bg-card-surface p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <MonoLabel>Day {d.dayNumber}</MonoLabel>
                        <Pill tone="yellow">{d.difficulty}</Pill>
                      </div>
                      <h3 className="mt-2 font-display text-heading-3 uppercase">{d.title}</h3>
                      <p className="mt-2 text-body">{d.description}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {d.objectives.slice(0, 3).map((o) => (
                          <li key={o}>
                            <Pill tone="ink">{o}</Pill>
                          </li>
                        ))}
                      </ul>
                      {d.githubUrl ? (
                        <a
                          href={d.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-1 break-all text-body-bold underline"
                        >
                          <ExternalLink size={13} strokeWidth={3} /> {d.githubUrl}
                        </a>
                      ) : null}
                    </article>
                  ))}
                  {picked.length === 0 ? (
                    <p className="text-body text-muted-ink">
                      Nothing selected. Pick some days on the right.
                    </p>
                  ) : null}
                </div>
              </Panel>
            </div>

            {/* Picker */}
            <aside className="min-w-0">
              <Panel tone="sidebar">
                <h2 className="flex items-center gap-2 font-display text-heading-3 uppercase">
                  <Layers size={16} strokeWidth={3} /> Pick your best
                </h2>
                <p className="mt-1 font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
                  {selected.length}/10 selected
                </p>
                <ul className="mt-3 max-h-[420px] space-y-1 overflow-y-auto pr-1">
                  {completed.map((d) => {
                    const on = selected.includes(d.dayNumber);
                    return (
                      <li key={d.dayNumber}>
                        <button
                          type="button"
                          onClick={() => toggle(d.dayNumber)}
                          className={`flex w-full items-start gap-2 border-2 border-ink p-2 text-left press ${
                            on ? "bg-blue text-on-blue" : "bg-card-surface"
                          }`}
                        >
                          <span className="mt-0.5 shrink-0 font-mono mono-label uppercase tracking-[0.16em]">
                            D{d.dayNumber}
                          </span>
                          <span className="min-w-0 font-display text-label-small uppercase">
                            {d.title}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 border-t-2 border-ink pt-4">
                  <MonoLabel>Share link</MonoLabel>
                  <p className="mt-1 break-all text-body-bold">{shareUrl}</p>
                  <BrutalButton onClick={copyLink} className="mt-3 w-full">
                    {copied ? <Check size={16} strokeWidth={3} /> : <Copy size={16} strokeWidth={3} />}
                    {copied ? "Copied" : "Copy portfolio link"}
                  </BrutalButton>
                </div>
              </Panel>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
