import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Award, Lock } from "lucide-react";
import { Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { CertificateCard } from "@/components/ab/certificate-card";
import { getProfile, getTrack } from "@/data/abtalks";
import { useStore, resolvedDayStatus } from "@/lib/store";
import { computeXp, levelProgress } from "@/lib/xp";

export const Route = createFileRoute("/certificate")({
  head: () => ({
    meta: [
      { title: "Completion certificate — ABTalks 60-day challenge" },
      {
        name: "description",
        content:
          "Finish 60 days and claim a signed, verifiable certificate plus a shareable image proving every day was backed by a commit.",
      },
      { property: "og:title", content: "Completion certificate — ABTalks" },
      {
        property: "og:description",
        content: "A verifiable certificate for finishing the ABTalks 60-day coding challenge.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CertificatePage,
});

function CertificatePage() {
  const store = useStore();
  const profile = getProfile(store.activeProfileId);
  const trackId = store.selectedTrackId ?? profile.student.selectedTrackId ?? "web-dev";
  const track = getTrack(trackId);

  const daysCompleted = useMemo(
    () =>
      profile.days.filter(
        (d) => resolvedDayStatus(trackId, d.dayNumber, d.status, store.dayStatusOverrides) === "completed",
      ).length,
    [profile.days, trackId, store.dayStatusOverrides],
  );

  const xp = computeXp(profile.days, store.dayStatusOverrides, trackId);
  const { level } = levelProgress(xp);
  const eligible = daysCompleted >= 60;
  const certificateId = `AB-${profile.student.username.slice(0, 4).toUpperCase()}-${String(60 + daysCompleted).padStart(4, "0")}`;
  const issuedOn = new Date().toLocaleDateString("en-IN", { dateStyle: "medium" });

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav cta={false} />
      <main className="mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12">
        <MonoLabel>Day 60</MonoLabel>
        <h1 className="mt-2 font-display text-heading-1 uppercase">Completion certificate</h1>
        <p className="mt-3 max-w-2xl text-body">
          Sixty days, sixty commits, sixty posts. The certificate carries your stats and an ID
          anyone can check against your public profile.
        </p>

        {eligible ? (
          <div className="mt-6">
            <CertificateCard
              studentName={profile.student.name}
              trackName={track.name}
              daysCompleted={daysCompleted}
              longestStreak={profile.student.longestStreak}
              totalXp={xp}
              level={level}
              issuedOn={issuedOn}
              certificateId={certificateId}
            />
          </div>
        ) : (
          <>
            <Panel className="mt-6" tone="sidebar">
              <div className="flex items-center gap-2">
                <Lock size={18} strokeWidth={3} className="text-muted-ink" />
                <h2 className="font-display text-heading-3 uppercase">Not yet earned</h2>
              </div>
              <p className="mt-2 text-body">
                You&apos;re at {daysCompleted} of 60 days. {60 - daysCompleted} to go. The
                certificate unlocks the moment the last day is logged — no application, no review.
              </p>
              <div className="mt-4 h-4 w-full border-2 border-ink bg-card-surface">
                <div
                  className="h-full bg-blue"
                  style={{ width: `${Math.round((daysCompleted / 60) * 100)}%` }}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill tone="ink">{track.name}</Pill>
                <Pill tone="yellow">Level {level}</Pill>
                <Pill tone="blue">{xp} XP</Pill>
              </div>
              <Link
                to="/dashboard"
                className="mt-5 inline-flex border-2 border-ink bg-card-surface px-5 py-3 font-display text-label-bold uppercase shadow-brutal press"
              >
                Back to dashboard
              </Link>
            </Panel>

            <div className="mt-6 opacity-50" aria-hidden="true">
              <MonoLabel>Preview</MonoLabel>
              <div className="mt-2">
                <CertificateCard
                  studentName={profile.student.name}
                  trackName={track.name}
                  daysCompleted={60}
                  longestStreak={Math.max(profile.student.longestStreak, 60)}
                  totalXp={Math.max(xp, 780)}
                  level={Math.max(level, 6)}
                  issuedOn={issuedOn}
                  certificateId={certificateId}
                />
              </div>
            </div>
          </>
        )}

        <Panel className="mt-6">
          <h2 className="flex items-center gap-2 font-display text-heading-3 uppercase">
            <Award size={16} strokeWidth={3} /> What it proves
          </h2>
          <ul className="mt-3 space-y-2 text-body">
            <li>• 60 dated submissions, each with a public commit and a public post.</li>
            <li>• A verifiable ID that resolves to your public ABTalks profile.</li>
            <li>• Streak history including any freezes used — we don&apos;t hide those.</li>
          </ul>
        </Panel>
      </main>
      <Footer />
    </div>
  );
}
