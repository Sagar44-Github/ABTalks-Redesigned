import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  GitCommitHorizontal,
  Linkedin,
  Lock,
  Snowflake,
} from "lucide-react";
import { BrutalButton, Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { getProfile, getTrack, type ProfileId, type SubmissionRecord } from "@/data/abtalks";
import { useStore, resolvedDayStatus } from "@/lib/store";
import { ShareCard } from "@/components/ab/share-card";
import { getAiFeedback } from "@/lib/ai";
import { cn } from "@/lib/utils";

type DaySearch = { student?: ProfileId };

export const Route = createFileRoute("/day/$n")({
  validateSearch: (search: Record<string, unknown>): DaySearch => {
    const s = search["student"];
    return s === "first-day" || s === "empty" || s === "mid" ? { student: s } : {};
  },
  head: ({ params }) => {
    const day = Number(params.n);
    return {
      meta: [
        { title: `Day ${day} of 60 — ABTalks Challenge` },
        {
          name: "description",
          content: `Today's ABTalks task for day ${day}: build it, push a commit, post the proof, keep the streak.`,
        },
        { property: "og:title", content: `Day ${day} of 60 — ABTalks` },
        {
          property: "og:description",
          content: `The day ${day} task, learning objectives, and proof submission for the ABTalks 60-day challenge.`,
        },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/day/${day}` },
      ],
      links: [{ rel: "canonical", href: `/day/${day}` }],
    };
  },
  component: DayPage,
});

const githubRe = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/.*)?$/i;
const linkedinRe = /^https?:\/\/(www\.)?linkedin\.com\/.+$/i;

function Field({
  label,
  icon,
  value,
  onChange,
  placeholder,
  valid,
  hint,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  valid: boolean;
  hint: string;
}) {
  const showError = value.length > 0 && !valid;
  return (
    <div>
      <label className="flex items-center gap-2 font-display text-label-bold uppercase">
        {icon}
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode="url"
        aria-invalid={showError}
        aria-describedby={`${label}-hint`}
        className={`mt-2 w-full rounded-none border-2 bg-card-surface px-3 py-3 text-body text-ink outline-none focus:shadow-brutal ${
          showError ? "border-red" : "border-ink"
        }`}
      />
      <p
        id={`${label}-hint`}
        className={`mt-1.5 font-mono mono-label uppercase tracking-[0.16em] ${
          showError ? "text-red" : "text-muted-ink"
        }`}
      >
        {showError ? `Doesn't look like a ${label} URL` : hint}
      </p>
    </div>
  );
}

function DayPage() {
  const { n } = Route.useParams();
  const { student: profileId } = Route.useSearch();
  const store = useStore();

  // Sync URL search param to store ONCE on mount only
  const didSyncRef = useRef(false);
  useEffect(() => {
    if (!didSyncRef.current && profileId && profileId !== store.activeProfileId) {
      store.switchProfile(profileId);
    }
    didSyncRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profile = getProfile(store.activeProfileId);
  const dayNumber = Number(n);

  // Resolve track
  const trackId = store.selectedTrackId ?? profile.student.selectedTrackId ?? "web-dev";
  const track = getTrack(trackId);
  const trackDay = track.challengeDays[dayNumber - 1];
  if (!trackDay) throw notFound();

  const baseDay = profile.days.find((d) => d.dayNumber === dayNumber);
  if (!baseDay) throw notFound();

  // Apply overrides
  const dayStatus = resolvedDayStatus(
    trackId,
    dayNumber,
    baseDay.status,
    store.dayStatusOverrides,
  );
  const day = {
    ...baseDay,
    ...trackDay,
    status: dayStatus,
    submission: dayStatus === "completed" ? baseDay.submission : null,
  };

  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const draft = useMemo(
    () =>
      `Day ${day.dayNumber} of my #ABTalks60DayChallenge 🚀\n\nToday I built: ${day.title}.\n\nWhat I learned:\n${day.learningObjectives
        .map((o) => `• ${o}`)
        .join("\n")}\n\nCommit pushed, day logged. ${60 - day.dayNumber} to go.\n\n#100DaysOfCode #BuildInPublic #ABTalks`,
    [day],
  );
  const [caption, setCaption] = useState(draft);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [aiFeedbackLoading, setAiFeedbackLoading] = useState(false);
  const [aiFeedbackError, setAiFeedbackError] = useState<string | null>(null);

  const githubValid = githubRe.test(github.trim());
  const linkedinValid = linkedinRe.test(linkedin.trim());
  const canSubmit = githubValid && linkedinValid;
  const alreadyDone = day.status === "completed" && day.submission !== null;
  const isFuture = day.status === "upcoming";

  // Milestone check
  const isMilestone = [7, 30, 60].includes(dayNumber);
  const milestoneMessages: Record<number, string> = {
    7: "7 days straight. You're building a habit.",
    30: "Halfway there. 30 days of proof.",
    60: "60 days. Done. You finished.",
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const record: SubmissionRecord = {
      dayNumber: day.dayNumber,
      trackId,
      taskTitle: day.title,
      submittedAt: new Date().toISOString(),
      githubUrl: github.trim(),
      linkedinUrl: linkedin.trim(),
      status: "completed",
      aiFeedbackStatus: "pending",
    };
    store.submitDay(record);
    store.showToast("Proof submitted. +15 XP earned — streak continues!");
    setSubmitted(true);

    // Fire AI feedback in background
    setAiFeedbackLoading(true);
    try {
      const result = await getAiFeedback({
        data: {
          taskTitle: day.title,
          taskDescription: day.description,
          learningObjectives: day.learningObjectives,
          githubUrl: github.trim(),
        },
      });
      if (result.success && result.feedback) {
        setAiFeedback(result.feedback);
        store.updateSubmissionFeedback(day.dayNumber, result.feedback, "success");
      } else {
        setAiFeedbackError(result.error ?? "AI feedback unavailable");
        store.updateSubmissionFeedback(day.dayNumber, null, "failed");
      }
    } catch {
      setAiFeedbackError("AI feedback is temporarily unavailable. Your submission was saved successfully.");
      store.updateSubmissionFeedback(day.dayNumber, null, "failed");
    } finally {
      setAiFeedbackLoading(false);
    }
  };

  // Prev/next days
  const hasPrev = dayNumber > 1;
  const hasNext = dayNumber < 60;

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav cta={false} />

      <main className="mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12">
        {/* Nav controls */}
        <div className="flex items-center justify-between gap-2">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press"
          >
            <ArrowLeft size={14} strokeWidth={3} /> Dashboard
          </Link>

          {/* Prev / Next day */}
          <div className="flex items-center gap-1">
            {hasPrev ? (
              <Link
                to="/day/$n"
                params={{ n: String(dayNumber - 1) }}
                className="inline-flex items-center gap-1 border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press"
              >
                <ChevronLeft size={14} strokeWidth={3} /> Day {dayNumber - 1}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 border-2 border-dashed border-muted-ink px-3 py-2 font-display text-label-small uppercase text-muted-ink">
                <ChevronLeft size={14} strokeWidth={3} /> Day 0
              </span>
            )}
            {hasNext ? (
              <Link
                to="/day/$n"
                params={{ n: String(dayNumber + 1) }}
                className="inline-flex items-center gap-1 border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press"
              >
                Day {dayNumber + 1} <ChevronRight size={14} strokeWidth={3} />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 border-2 border-dashed border-muted-ink px-3 py-2 font-display text-label-small uppercase text-muted-ink">
                Day 61 <ChevronRight size={14} strokeWidth={3} />
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <MonoLabel>Day {day.dayNumber} of 60</MonoLabel>
          <Pill tone="ink">{day.track}</Pill>
          <Pill tone="blue">{day.difficulty}</Pill>
          <Pill tone="yellow">{day.estimatedTime}</Pill>
          {day.status === "frozen" ? (
            <Pill tone="blue">
              <Snowflake size={9} strokeWidth={3} /> Frozen
            </Pill>
          ) : null}
          {isFuture ? (
            <Pill tone="locked">
              <Lock size={9} strokeWidth={3} /> Preview
            </Pill>
          ) : null}
        </div>

        <h1 className="mt-4 font-display text-heading-2 uppercase md:text-heading-1">
          {day.title}
        </h1>
        <p className="mt-4 max-w-2xl text-body">{day.description}</p>

        <Panel className="mt-6">
          <h2 className="font-display text-heading-3 uppercase">What this covers</h2>
          <ul className="mt-3 space-y-2">
            {day.learningObjectives.map((o) => (
              <li key={o} className="flex gap-3 text-body">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 border-2 border-ink bg-blue" />
                {o}
              </li>
            ))}
          </ul>
        </Panel>

        {/* Submission section */}
        {isFuture ? (
          /* Future/locked day */
          <Panel className="mt-5" tone="sidebar">
            <div className="flex items-center gap-2">
              <Lock size={18} strokeWidth={3} className="text-muted-ink" />
              <h2 className="font-display text-heading-3 uppercase">Not yet unlocked</h2>
            </div>
            <p className="mt-2 text-body">
              This day is still ahead of you. The task content is visible so you can preview
              what&apos;s coming, but submissions open when you reach Day {day.dayNumber}.
            </p>
            <p className="mt-2 font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
              Unlocks when you complete Day {day.dayNumber - 1}
            </p>
          </Panel>
        ) : alreadyDone ? (
          <Panel className="mt-5" tone="sidebar">
            <div className="flex items-center gap-2">
              <Check size={18} strokeWidth={3} className="text-blue" />
              <h2 className="font-display text-heading-3 uppercase">Proof submitted</h2>
            </div>
            <p className="mt-2 text-body">
              Logged on{" "}
              {new Date(day.submission!.submittedAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
              . This day is locked — nothing left to do.
            </p>
            <div className="mt-4 grid gap-3">
              <a
                href={day.submission!.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="break-all border-2 border-ink bg-card-surface p-3 text-body-bold underline"
              >
                {day.submission!.githubUrl}
              </a>
              <a
                href={day.submission!.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="break-all border-2 border-ink bg-card-surface p-3 text-body-bold underline"
              >
                {day.submission!.linkedinUrl}
              </a>
              <div className="border-2 border-ink bg-card-surface p-3">
                <MonoLabel>Caption you posted</MonoLabel>
                <p className="mt-2 whitespace-pre-wrap text-body">
                  {day.submission!.linkedinCaption}
                </p>
              </div>
              {store.submissions.find((s) => s.dayNumber === day.dayNumber)?.aiFeedback && (
                <div className="border-2 border-ink bg-card-surface p-3">
                  <MonoLabel>AI Feedback</MonoLabel>
                  <p className="mt-2 text-body">
                    {store.submissions.find((s) => s.dayNumber === day.dayNumber)?.aiFeedback}
                  </p>
                </div>
              )}
            </div>

            {/* Share card for completed days */}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowShareCard(!showShareCard)}
                className="border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press"
              >
                {showShareCard ? "Hide" : "Generate"} Share Card
              </button>
              {showShareCard && (
                <div className="mt-4">
                  <ShareCard
                    studentName={profile.student.name}
                    studentInitials={profile.student.initials}
                    dayNumber={dayNumber}
                    taskTitle={day.title}
                    currentStreak={profile.student.currentStreak}
                    trackName={track.name}
                    isMilestone={isMilestone}
                    milestoneMessage={milestoneMessages[dayNumber]}
                  />
                </div>
              )}
            </div>
          </Panel>
        ) : submitted ? (
          <Panel className="mt-5" tone="blue">
            <h2 className="font-display text-heading-2 uppercase">Proof submitted.</h2>
            <p className="mt-2 text-body">
              Streak continues. Day {day.dayNumber} is locked in.
            </p>

            {/* AI Feedback */}
            {aiFeedbackLoading && (
              <div className="mt-5 border-2 border-ink bg-card-surface p-4 shadow-brutal-sm">
                <MonoLabel>AI Feedback</MonoLabel>
                <p className="mt-2 animate-pulse font-display text-label-bold uppercase text-muted-ink">
                  Reading your submission…
                </p>
              </div>
            )}
            {aiFeedback && (
              <div className="mt-5 border-2 border-ink bg-card-surface p-4 shadow-brutal-sm">
                <MonoLabel>AI Feedback</MonoLabel>
                <p className="mt-2 text-body">{aiFeedback}</p>
              </div>
            )}
            {aiFeedbackError && !aiFeedback && !aiFeedbackLoading && (
              <div className="mt-5 border-2 border-dashed border-muted-ink bg-sidebar-surface p-4">
                <MonoLabel>AI Feedback</MonoLabel>
                <p className="mt-2 text-body text-muted-ink">{aiFeedbackError}</p>
              </div>
            )}

            <Link
              to="/dashboard"
              className="mt-5 inline-flex rounded-none border-2 border-ink bg-card-surface px-5 py-3 font-display text-label-bold uppercase text-ink shadow-brutal press"
            >
              Back to dashboard
            </Link>

            {/* Share card after submission */}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowShareCard(!showShareCard)}
                className="border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase text-ink shadow-brutal-sm press"
              >
                {showShareCard ? "Hide" : "Generate"} Share Card
              </button>
              {showShareCard && (
                <div className="mt-4">
                  <ShareCard
                    studentName={profile.student.name}
                    studentInitials={profile.student.initials}
                    dayNumber={dayNumber}
                    taskTitle={day.title}
                    currentStreak={profile.student.currentStreak}
                    trackName={track.name}
                    isMilestone={isMilestone}
                    milestoneMessage={milestoneMessages[dayNumber]}
                  />
                </div>
              )}
            </div>
          </Panel>
        ) : (
          <Panel className="mt-5">
            <h2 className="font-display text-heading-3 uppercase">Submit your proof</h2>
            <p className="mt-2 text-body">Two links. That&apos;s the whole ritual.</p>

            <div className="mt-5 grid gap-5">
              <Field
                label="GitHub"
                icon={<GitCommitHorizontal size={16} strokeWidth={3} />}
                value={github}
                onChange={setGithub}
                placeholder="https://github.com/you/repo/commit/abc123"
                valid={githubValid}
                hint="Repo or commit URL on github.com"
              />
              <Field
                label="LinkedIn"
                icon={<Linkedin size={16} strokeWidth={3} />}
                value={linkedin}
                onChange={setLinkedin}
                placeholder="https://www.linkedin.com/posts/your-post"
                valid={linkedinValid}
                hint="Public post URL on linkedin.com"
              />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor="caption"
                    className="font-display text-label-bold uppercase"
                  >
                    Auto-drafted caption
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCaption(draft)}
                      className="border-2 border-ink bg-card-surface px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] shadow-brutal-sm press"
                    >
                      Reset draft
                    </button>
                    <button
                      type="button"
                      onClick={copy}
                      className="inline-flex items-center gap-1 border-2 border-ink bg-blue px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] text-on-blue shadow-brutal-sm press"
                    >
                      {copied ? (
                        <Check size={10} strokeWidth={3} />
                      ) : (
                        <Copy size={10} strokeWidth={3} />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                <textarea
                  id="caption"
                  rows={10}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="mt-2 w-full rounded-none border-2 border-ink bg-card-surface p-3 text-body text-ink outline-none focus:shadow-brutal"
                />
                <p className="mt-1.5 font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
                  Pre-written from today&apos;s task. Edit it, copy it, post it.
                </p>
              </div>

              <BrutalButton
                disabled={!canSubmit}
                onClick={handleSubmit}
                className="w-full sm:w-auto"
              >
                Submit proof <ArrowRight size={16} strokeWidth={3} />
              </BrutalButton>
              {!canSubmit ? (
                <MonoLabel>Both links must be valid before you can submit</MonoLabel>
              ) : null}
            </div>
          </Panel>
        )}
      </main>

      <Footer />
    </div>
  );
}
