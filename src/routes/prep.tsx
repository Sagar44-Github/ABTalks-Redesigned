import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Brain, Filter } from "lucide-react";
import { Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { InterviewCard } from "@/components/ab/interview-card";
import { getProfile, getTrack } from "@/data/abtalks";
import { interviewCardFor } from "@/data/community";
import { useStore, resolvedDayStatus } from "@/lib/store";

export const Route = createFileRoute("/prep")({
  head: () => ({
    meta: [
      { title: "Interview prep deck — built from your own 60 days" },
      {
        name: "description",
        content:
          "Every ABTalks day comes with one interview question tied to the skill it built. They stack into a prep deck you actually have answers for.",
      },
      { property: "og:title", content: "Interview prep deck — ABTalks" },
      {
        property: "og:description",
        content: "A growing deck of interview questions and answer frames, one per challenge day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrepPage,
});

function PrepPage() {
  const store = useStore();
  const profile = getProfile(store.activeProfileId);
  const trackId = store.selectedTrackId ?? profile.student.selectedTrackId ?? "web-dev";
  const track = getTrack(trackId);
  const [onlyUnlocked, setOnlyUnlocked] = useState(true);

  const cards = useMemo(() => {
    return profile.days.map((d) => {
      const trackDay = track.challengeDays[d.dayNumber - 1];
      const status = resolvedDayStatus(trackId, d.dayNumber, d.status, store.dayStatusOverrides);
      const merged = { ...d, ...(trackDay ?? {}), status };
      return { status, card: interviewCardFor(merged), dayNumber: d.dayNumber };
    });
  }, [profile.days, track.challengeDays, trackId, store.dayStatusOverrides]);

  const unlocked = cards.filter((c) => c.status === "completed" || c.status === "today" || c.status === "frozen");
  const visible = onlyUnlocked ? unlocked : cards;

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav cta={false} />
      <main className="mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12">
        <MonoLabel>Interview prep</MonoLabel>
        <h1 className="mt-2 font-display text-heading-1 uppercase">Your prep deck</h1>
        <p className="mt-3 max-w-2xl text-body">
          One question per day, tied to the skill that day built. You already did the work — this
          is the part where you learn to talk about it.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Panel className="min-w-0">
            <MonoLabel>Cards unlocked</MonoLabel>
            <p className="mt-1 font-display text-heading-1">{unlocked.length}</p>
          </Panel>
          <Panel className="min-w-0">
            <MonoLabel>Total in track</MonoLabel>
            <p className="mt-1 font-display text-heading-1">{cards.length}</p>
          </Panel>
          <Panel className="min-w-0">
            <MonoLabel>Track</MonoLabel>
            <p className="mt-1 font-display text-heading-3 uppercase">{track.name}</p>
          </Panel>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOnlyUnlocked(!onlyUnlocked)}
            className="inline-flex items-center gap-2 border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press"
          >
            <Filter size={13} strokeWidth={3} />
            {onlyUnlocked ? "Showing unlocked" : "Showing all 60"}
          </button>
          <Pill tone="yellow">Cards unlock as you complete days</Pill>
        </div>

        {visible.length === 0 ? (
          <Panel className="mt-5" tone="sidebar">
            <h2 className="flex items-center gap-2 font-display text-heading-3 uppercase">
              <Brain size={16} strokeWidth={3} /> No cards yet
            </h2>
            <p className="mt-2 text-body">
              Complete your first day and the matching interview card unlocks here.
            </p>
            <Link
              to="/dashboard"
              className="mt-4 inline-flex border-2 border-ink bg-card-surface px-5 py-3 font-display text-label-bold uppercase shadow-brutal press"
            >
              Go to dashboard
            </Link>
          </Panel>
        ) : (
          <div className="mt-5 space-y-3">
            {visible.map(({ card, status, dayNumber }) => (
              <div key={dayNumber} className={status === "upcoming" ? "opacity-60" : undefined}>
                <InterviewCard card={card} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
