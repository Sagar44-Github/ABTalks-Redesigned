import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, GitCommitHorizontal, Linkedin, Snowflake } from "lucide-react";
import { BrutalLink, Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { platformStats, tracks } from "@/data/abtalks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABTalks — 60 Days of Proof-of-Work for Student Developers" },
      {
        name: "description",
        content:
          "Pick a track. Build daily. Prove it with a commit and a LinkedIn post. A 60-day coding challenge that turns consistency into a recruiter-ready profile.",
      },
      { property: "og:title", content: "ABTalks — 60 Days of Proof-of-Work" },
      {
        property: "og:description",
        content:
          "Pick a track. Build daily. Prove it with a commit and a LinkedIn post. 2,847 students are on a streak right now.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

const steps = [
  {
    n: "01",
    title: "Pick a track",
    body: "Web Dev, AI/ML, DSA, Mobile or Backend. One track, 60 days of tasks written in order.",
  },
  {
    n: "02",
    title: "Build daily",
    body: "A scoped task every day. 60–90 minutes, doable after college, finishable before you sleep.",
  },
  {
    n: "03",
    title: "Submit proof",
    body: "Drop a GitHub commit link and a LinkedIn post link. That's the whole ritual. Streak continues.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-12 md:px-10 md:pb-24 md:pt-20">
          <Pill tone="red">
            <span className="h-1.5 w-1.5 rounded-full bg-current" /> Cohort live now
          </Pill>
          <h1 className="mt-5 max-w-4xl font-display text-hero-clamp uppercase">
            60 days.
            <br />
            One commit.
            <br />
            One post.
          </h1>
          <p className="mt-6 max-w-xl text-body">
            Pick a track. Build daily. Prove it with a commit and a post. In two months you stop
            being a student with a resume and start being a developer with receipts.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BrutalLink to="/dashboard" className="w-full sm:w-auto">
              Start your streak <ArrowRight size={18} strokeWidth={3} />
            </BrutalLink>
            <BrutalLink to="/day/$n" params={{ n: "12" }} variant="outline" className="w-full sm:w-auto">
              See a day&apos;s task
            </BrutalLink>
          </div>

          <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6 border-t-2 border-ink pt-6">
            <div>
              <p className="font-display text-heading-2 text-blue tabular-nums">
                {platformStats.studentsOnStreak.toLocaleString("en-IN")}
              </p>
              <MonoLabel>Students on a streak right now</MonoLabel>
            </div>
            <div>
              <p className="font-display text-heading-2 text-blue tabular-nums">
                {platformStats.proofsSubmitted.toLocaleString("en-IN")}
              </p>
              <MonoLabel>Proofs submitted</MonoLabel>
            </div>
            <div>
              <p className="font-display text-heading-2 text-blue tabular-nums">
                {platformStats.collegesRepresented}
              </p>
              <MonoLabel>Colleges represented</MonoLabel>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y-2 border-ink bg-sidebar-surface">
          <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20">
            <h2 className="font-display text-heading-2 uppercase md:text-heading-1">How it works</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {steps.map((s) => (
                <Panel key={s.n}>
                  <MonoLabel className="text-red">{s.n}</MonoLabel>
                  <h3 className="mt-3 font-display text-heading-3 uppercase">{s.title}</h3>
                  <p className="mt-2 text-body">{s.body}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / proof */}
        <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20">
          <h2 className="max-w-2xl font-display text-heading-2 uppercase md:text-heading-1">
            The proof is public. That&apos;s the point.
          </h2>
          <p className="mt-4 max-w-xl text-body">
            Every day you finish leaves two artefacts a recruiter can actually open: a commit in a
            public repo and a post on your feed. After 60 days, that&apos;s 120 pieces of evidence.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <Panel className="overflow-hidden">
              <MonoLabel>Finished profile · Day 60</MonoLabel>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-display-large leading-none text-blue tabular-nums">
                  60
                </span>
                <span className="font-display text-heading-3 uppercase">days, unbroken</span>
              </div>
              <div className="mt-5 grid grid-cols-10 gap-1">
                {Array.from({ length: 60 }).map((_, i) => (
                  <span
                    key={i}
                    className={`aspect-square border-2 border-ink ${
                      i === 5 || i === 31 ? "border-dashed border-blue bg-card-surface" : "bg-blue"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-4 text-body-bold">
                58 submitted, 2 protected by freeze tokens, 0 broken.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill tone="blue">
                  <GitCommitHorizontal size={10} strokeWidth={3} /> 60 commits
                </Pill>
                <Pill tone="ink">
                  <Linkedin size={10} strokeWidth={3} /> 60 posts
                </Pill>
                <Pill tone="yellow">
                  <Snowflake size={10} strokeWidth={3} /> 2 freezes used
                </Pill>
              </div>
            </Panel>

            <div className="grid gap-5">
              <Panel tone="sidebar">
                <p className="text-body">
                  &ldquo;I applied with the repo link instead of a resume bullet. The interviewer
                  scrolled my commit history for ten minutes.&rdquo;
                </p>
                <p className="mt-3 font-display text-label-bold uppercase">
                  Neha S. · Web Dev cohort 4
                </p>
              </Panel>
              <Panel tone="sidebar">
                <p className="text-body">
                  &ldquo;The freeze token is why I&apos;m still here. I missed one night and
                  didn&apos;t quit the next day out of shame.&rdquo;
                </p>
                <p className="mt-3 font-display text-label-bold uppercase">
                  Karthik R. · DSA cohort 3
                </p>
              </Panel>
              <Panel tone="blue">
                <p className="font-display text-heading-2">{platformStats.finishRate}%</p>
                <p className="mt-1 text-body-bold">
                  of students who reach day 10 finish all 60. The first week is the hard part.
                </p>
              </Panel>
            </div>
          </div>
        </section>

        {/* Track picker */}
        <section className="border-t-2 border-ink bg-sidebar-surface">
          <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20">
            <h2 className="font-display text-heading-2 uppercase md:text-heading-1">Pick a track</h2>
            <p className="mt-3 max-w-xl text-body">
              Each track is 60 sequenced tasks. You can&apos;t pick wrong — you can only not start.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tracks.map((t) => (
                <Panel key={t.id}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-heading-3 uppercase">{t.name}</h3>
                    <Pill tone="ink">{t.totalStudents.toLocaleString("en-IN")} in</Pill>
                  </div>
                  <p className="mt-2 text-body">{t.description}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-y-2 border-ink bg-yellow text-on-yellow">
          <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20">
            <h2 className="max-w-3xl font-display text-heading-2 uppercase md:text-heading-1">
              Your streak starts tonight or it doesn&apos;t start.
            </h2>
            <p className="mt-4 max-w-xl text-body">
              Day 1 takes 60 minutes. Pick your track, build the thing, drop the two links.
            </p>
            <BrutalLink to="/dashboard" variant="ink" className="mt-8">
              Start day 1 <ArrowRight size={18} strokeWidth={3} />
            </BrutalLink>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
