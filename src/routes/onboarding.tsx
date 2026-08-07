import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Users } from "lucide-react";
import { BrutalButton, Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { tracks } from "@/data/abtalks";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Pick Your Track — ABTalks 60-Day Challenge" },
      {
        name: "description",
        content:
          "Choose your 60-day coding track: Web Dev, AI/ML, DSA, Mobile, or Backend. Each track has sequenced daily tasks.",
      },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const [selected, setSelected] = useState<string | null>(null);
  const { selectTrack } = useStore();
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!selected) return;
    selectTrack(selected);
    navigate({ to: "/dashboard", search: { student: "first-day" } });
  };

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav />

      <main className="mx-auto max-w-[1440px] px-4 py-10 md:px-10 md:py-16">
        <MonoLabel className="text-red">STEP 1 OF 1</MonoLabel>
        <h1 className="mt-4 max-w-3xl font-display text-heading-2 uppercase md:text-heading-1">
          Pick your track
        </h1>
        <p className="mt-4 max-w-xl text-body">
          Each track is 60 sequenced tasks built for one skill path. You can&apos;t pick wrong — you
          can only not start.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => {
            const isSelected = selected === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelected(track.id)}
                className={cn(
                  "min-w-0 rounded-card border-2 p-5 text-left transition-all duration-150",
                  isSelected
                    ? "border-yellow bg-yellow/10 shadow-brutal-yellow"
                    : "border-ink bg-card-surface shadow-brutal hover:shadow-brutal-lg",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-heading-3 uppercase">{track.name}</h3>
                  {isSelected ? (
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-ink bg-yellow">
                      <Check size={14} strokeWidth={3} className="text-on-yellow" />
                    </span>
                  ) : (
                    <Pill tone="ink">
                      <Users size={8} strokeWidth={3} /> {track.totalStudents.toLocaleString("en-IN")}
                    </Pill>
                  )}
                </div>
                <p className="mt-2 text-body">{track.description}</p>

                {/* Example tasks preview */}
                <div className="mt-4 space-y-1.5">
                  <MonoLabel>What you&apos;ll build</MonoLabel>
                  {track.exampleTasks.map((task) => (
                    <p key={task} className="flex items-start gap-2 text-body-bold">
                      <span className="mt-1.5 h-2 w-2 shrink-0 border border-ink bg-blue" />
                      {task}
                    </p>
                  ))}
                </div>

                {/* Student count when selected */}
                {isSelected && (
                  <div className="mt-4">
                    <Pill tone="yellow">
                      <Users size={8} strokeWidth={3} />{" "}
                      {track.totalStudents.toLocaleString("en-IN")} students on this track
                    </Pill>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 border-t-2 border-ink pt-8">
          <BrutalButton
            disabled={!selected}
            onClick={handleConfirm}
            className="w-full sm:w-auto"
          >
            Start this track <ArrowRight size={18} strokeWidth={3} />
          </BrutalButton>
          {!selected && (
            <MonoLabel>Select a track above to continue</MonoLabel>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
