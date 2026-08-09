import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Bell, Flame, Check, AlertTriangle } from "lucide-react";
import { BrutalButton, Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { getProfile } from "@/data/abtalks";
import { squadFor, squadNudge } from "@/data/community";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/squad")({
  head: () => ({
    meta: [
      { title: "Your squad — ABTalks accountability groups" },
      {
        name: "description",
        content:
          "Four or five students, one shared streak. See who shipped today, who's behind, and send a nudge that actually lands.",
      },
      { property: "og:title", content: "Your squad — ABTalks" },
      {
        property: "og:description",
        content: "Small accountability squads for the ABTalks 60-day challenge. Miss a day and your squad hears about it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SquadPage,
});

function SquadPage() {
  const store = useStore();
  const profile = getProfile(store.activeProfileId);
  const squad = squadFor(store.activeProfileId);
  const nudge = squadNudge(squad);

  const shipped = squad.members.filter((m) => m.state === "shipped-today").length;
  const groupStreak = Math.min(...squad.members.map((m) => m.currentStreak));

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav cta={false} />
      <main className="mx-auto max-w-[1100px] px-4 py-8 md:px-10 md:py-12">
        <MonoLabel>Accountability</MonoLabel>
        <h1 className="mt-2 font-display text-heading-1 uppercase">{squad.name}</h1>
        <p className="mt-3 max-w-2xl text-body">{squad.motto}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Panel className="min-w-0">
            <MonoLabel>Shipped today</MonoLabel>
            <p className="mt-1 font-display text-heading-1">
              {shipped}/{squad.members.length}
            </p>
          </Panel>
          <Panel className="min-w-0">
            <MonoLabel>Group streak</MonoLabel>
            <p className="mt-1 flex items-center gap-2 font-display text-heading-1">
              <Flame size={22} strokeWidth={3} className="text-red" />
              {Number.isFinite(groupStreak) ? groupStreak : 0}
            </p>
            <p className="mt-1 font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
              As weak as your weakest member
            </p>
          </Panel>
          <Panel className="min-w-0">
            <MonoLabel>Formed</MonoLabel>
            <p className="mt-1 font-display text-heading-2">{squad.formedOn}</p>
          </Panel>
        </div>

        {nudge ? (
          <Panel className="mt-4" tone="yellow">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} strokeWidth={3} className="mt-1 shrink-0" />
              <p className="text-body-bold">{nudge}</p>
            </div>
          </Panel>
        ) : null}

        <Panel className="mt-5">
          <h2 className="flex items-center gap-2 font-display text-heading-3 uppercase">
            <Users size={16} strokeWidth={3} /> Members
          </h2>
          <ul className="mt-4 divide-y-2 divide-ink/10">
            {squad.members.map((m) => (
              <li key={m.username} className="flex flex-wrap items-center gap-3 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink bg-blue font-display text-label-bold text-on-blue">
                  {m.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <Link
                      to="/u/$username"
                      params={{ username: m.username }}
                      className="font-display text-label-bold uppercase underline"
                    >
                      {m.name}
                    </Link>
                    {m.isYou ? <Pill tone="ink">You</Pill> : null}
                  </span>
                  <span className="mt-0.5 block font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
                    {m.currentStreak} day streak · last logged day {m.lastSubmittedDay || "—"}
                  </span>
                </span>
                {m.state === "shipped-today" ? (
                  <Pill tone="blue">
                    <Check size={9} strokeWidth={3} /> Shipped
                  </Pill>
                ) : m.state === "missed" ? (
                  <Pill tone="locked">Missed a day</Pill>
                ) : (
                  <Pill tone="yellow">Pending</Pill>
                )}
                {!m.isYou && m.state !== "shipped-today" ? (
                  <button
                    type="button"
                    onClick={() => store.showToast(`Nudge sent to ${m.name.split(" ")[0]}`)}
                    className="inline-flex items-center gap-1 border-2 border-ink bg-card-surface px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] shadow-brutal-sm press"
                  >
                    <Bell size={10} strokeWidth={3} /> Nudge
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="mt-5" tone="sidebar">
          <h2 className="font-display text-heading-3 uppercase">How squads work</h2>
          <ul className="mt-3 space-y-2 text-body">
            <li>• Four to five students on the same track, matched when you start.</li>
            <li>• The group streak is the lowest individual streak in the squad.</li>
            <li>• Miss a day and your squadmates get a notification, not a shrug.</li>
            <li>• A freeze protects you but the group still sees it.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <BrutalButton onClick={() => store.showToast("Squad invite link copied")}>
              Invite a friend
            </BrutalButton>
            <Link
              to="/dashboard"
              className="inline-flex items-center border-2 border-ink bg-card-surface px-5 py-3 font-display text-label-bold uppercase shadow-brutal press"
            >
              Back to {profile.student.name.split(" ")[0]}&apos;s dashboard
            </Link>
          </div>
        </Panel>
      </main>
      <Footer />
    </div>
  );
}
