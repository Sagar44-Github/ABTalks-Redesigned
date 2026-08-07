import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, GitCommitHorizontal, Linkedin } from "lucide-react";
import { BrutalLink, Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { getProfile, type ProfileId } from "@/data/abtalks";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type HistorySearch = { student?: ProfileId };

export const Route = createFileRoute("/history")({
  validateSearch: (search: Record<string, unknown>): HistorySearch => {
    const s = search["student"];
    return s === "first-day" || s === "empty" || s === "mid" ? { student: s } : {};
  },
  head: () => ({
    meta: [
      { title: "Submission History — ABTalks" },
      {
        name: "description",
        content: "Your complete submission history across the 60-day challenge.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { student: profileId } = Route.useSearch();
  const profile = getProfile(profileId);
  const store = useStore();
  const search = profileId ? { student: profileId } : {};

  // Combine mock profile submissions with store submissions
  const profileSubmissions = profile.days
    .filter((d) => d.status === "completed" && d.submission)
    .map((d) => ({
      dayNumber: d.dayNumber,
      trackId: profile.student.selectedTrackId ?? "web-dev",
      taskTitle: d.title,
      submittedAt: d.submission!.submittedAt,
      githubUrl: d.submission!.githubUrl,
      linkedinUrl: d.submission!.linkedinUrl,
      status: d.status,
    }));

  // Merge, deduplicate by dayNumber, sort reverse-chronological
  const allSubmissions = [...store.submissions, ...profileSubmissions]
    .filter(
      (item, index, self) =>
        index === self.findIndex((s) => s.dayNumber === item.dayNumber),
    )
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  const frozenDays = profile.days.filter((d) => d.status === "frozen");
  const isEmpty = allSubmissions.length === 0 && frozenDays.length === 0;

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav student={profile.student} cta={false} />

      <main className="mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12">
        <MonoLabel>Submission history</MonoLabel>
        <h1 className="mt-3 font-display text-heading-2 uppercase md:text-heading-1">
          Your proof of work
        </h1>
        <p className="mt-3 max-w-xl text-body">
          Every commit and post you&apos;ve submitted, in reverse chronological order.
        </p>

        {isEmpty ? (
          /* Empty state */
          <Panel className="mt-8" tone="sidebar">
            <div className="py-6 text-center">
              <p className="font-display text-heading-3 uppercase">No submissions yet</p>
              <p className="mx-auto mt-3 max-w-md text-body">
                Your history starts the moment you submit your first proof. One commit link, one
                post link — that&apos;s all it takes. Today&apos;s task is waiting.
              </p>
              <BrutalLink to="/dashboard" search={search} className="mt-6">
                Go to today&apos;s task <ArrowRight size={18} strokeWidth={3} />
              </BrutalLink>
            </div>
          </Panel>
        ) : (
          <div className="mt-8 space-y-3">
            {allSubmissions.map((sub) => (
              <div
                key={sub.dayNumber}
                className="block cursor-pointer border-2 border-ink bg-card-surface p-4 shadow-brutal transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal-lg"
              >
                <Link
                  to="/day/$n"
                  params={{ n: String(sub.dayNumber) }}
                  search={search as never}
                  className="flex flex-wrap items-start justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-blue font-display text-label-bold text-on-blue">
                      {sub.dayNumber}
                    </span>
                    <div>
                      <p className="font-display text-label-bold uppercase">{sub.taskTitle}</p>
                      <MonoLabel>
                        {new Date(sub.submittedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </MonoLabel>
                    </div>
                  </div>
                  <Pill tone="blue">Completed</Pill>
                </Link>

                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={sub.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border-2 border-ink bg-sidebar-surface px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] hover:bg-card-surface"
                  >
                    <GitCommitHorizontal size={10} strokeWidth={3} /> GitHub{" "}
                    <ExternalLink size={8} strokeWidth={3} />
                  </a>
                  <a
                    href={sub.linkedinUrl}
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

            {/* Frozen days */}
            {frozenDays.map((d) => (
              <Link
                key={`frozen-${d.dayNumber}`}
                to="/day/$n"
                params={{ n: String(d.dayNumber) }}
                search={search as never}
                className="block border-2 border-dashed border-blue bg-card-surface p-4 transition-all duration-150 hover:shadow-brutal-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border-2 border-dashed border-blue bg-card-surface font-display text-label-bold text-blue">
                      {d.dayNumber}
                    </span>
                    <div>
                      <p className="font-display text-label-bold uppercase">{d.title}</p>
                      <MonoLabel>Protected by streak freeze</MonoLabel>
                    </div>
                  </div>
                  <Pill tone="blue">Frozen</Pill>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
