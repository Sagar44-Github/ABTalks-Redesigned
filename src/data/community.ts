import type { ChallengeDay, ProfileId } from "@/data/abtalks";

/* ── Buddy squads ──
   Small accountability groups. Each demo profile sits in a different squad
   so switching profiles shows a different social context. */

export type SquadMember = {
  name: string;
  username: string;
  initials: string;
  currentStreak: number;
  lastSubmittedDay: number;
  state: "shipped-today" | "pending" | "missed";
  isYou?: boolean;
};

export type Squad = {
  name: string;
  motto: string;
  formedOn: string;
  members: SquadMember[];
};

export const squads: Record<ProfileId, Squad> = {
  mid: {
    name: "Night Shift",
    motto: "Commit before midnight or answer to the group.",
    formedOn: "12 Jun 2026",
    members: [
      { name: "Riya Nandan", username: "riya-nandan", initials: "RN", currentStreak: 11, lastSubmittedDay: 11, state: "pending", isYou: true },
      { name: "Devansh Rao", username: "devansh-rao", initials: "DR", currentStreak: 18, lastSubmittedDay: 12, state: "shipped-today" },
      { name: "Meera Iqbal", username: "meera-iqbal", initials: "MI", currentStreak: 12, lastSubmittedDay: 12, state: "shipped-today" },
      { name: "Kabir Sethi", username: "kabir-sethi", initials: "KS", currentStreak: 0, lastSubmittedDay: 9, state: "missed" },
      { name: "Anaya Fernando", username: "anaya-fernando", initials: "AF", currentStreak: 7, lastSubmittedDay: 11, state: "pending" },
    ],
  },
  "first-day": {
    name: "Cold Start",
    motto: "Everyone here is on day one. Nobody gets to quit alone.",
    formedOn: "Today",
    members: [
      { name: "Arjun Mehta", username: "arjun-mehta", initials: "AM", currentStreak: 0, lastSubmittedDay: 0, state: "pending", isYou: true },
      { name: "Tanvi Bose", username: "tanvi-bose", initials: "TB", currentStreak: 1, lastSubmittedDay: 1, state: "shipped-today" },
      { name: "Hari Prasad", username: "hari-prasad", initials: "HP", currentStreak: 0, lastSubmittedDay: 0, state: "pending" },
      { name: "Zoya Khan", username: "zoya-khan", initials: "ZK", currentStreak: 1, lastSubmittedDay: 1, state: "shipped-today" },
    ],
  },
  empty: {
    name: "Unassigned",
    motto: "Pick a track and we'll drop you into a squad of four.",
    formedOn: "—",
    members: [
      { name: "Sana Qureshi", username: "sana-qureshi", initials: "SQ", currentStreak: 0, lastSubmittedDay: 0, state: "pending", isYou: true },
    ],
  },
};

export function squadFor(profileId: ProfileId): Squad {
  return squads[profileId] ?? squads.empty;
}

export function squadNudge(squad: Squad): string | null {
  const behind = squad.members.filter((m) => m.state === "missed" && !m.isYou);
  const you = squad.members.find((m) => m.isYou);
  if (you && you.state !== "shipped-today" && squad.members.length > 1) {
    const shipped = squad.members.filter((m) => m.state === "shipped-today").length;
    if (shipped > 0) {
      return `${shipped} of your squad already shipped today. You're the one holding the group streak.`;
    }
  }
  if (behind.length > 0) {
    return `${behind.map((m) => m.name.split(" ")[0]).join(", ")} missed a day. A nudge from you lands harder than a notification.`;
  }
  return null;
}

/* ── Daily interview card ──
   One short Q&A tied to the skill the day was meant to build. Deterministic
   so the same day always yields the same card. */

export type InterviewCard = {
  dayNumber: number;
  topic: string;
  question: string;
  answer: string;
  followUp: string;
};

const QUESTION_TEMPLATES = [
  (t: string) => `Walk me through how you'd explain ${t.toLowerCase()} to a teammate who's never touched it.`,
  (t: string) => `Where does ${t.toLowerCase()} typically break in production, and how would you catch it?`,
  (t: string) => `What tradeoff did you make around ${t.toLowerCase()}, and what was the alternative?`,
  (t: string) => `How would you test ${t.toLowerCase()} without spinning up the whole app?`,
];

const ANSWER_TEMPLATES = [
  (t: string, task: string) =>
    `Anchor it in something you built. In "${task}" you used ${t.toLowerCase()} directly — describe the concrete problem it solved, then generalise. Naming a real repo beats reciting a definition.`,
  (t: string, task: string) =>
    `Name the failure mode first, then the guardrail. Working through "${task}" you'd have hit the edge cases around ${t.toLowerCase()}; say what surprised you and what you changed.`,
  (t: string, task: string) =>
    `Frame it as a decision, not a fact. Say what you picked for ${t.toLowerCase()} in "${task}", what you rejected, and the constraint that decided it.`,
  (t: string, task: string) =>
    `Isolate the unit. Explain how you'd stub the boundary around ${t.toLowerCase()} the way you scoped it in "${task}", then assert on behaviour rather than internals.`,
];

const FOLLOW_UPS = [
  "Expect a follow-up asking for a counter-example. Have one ready.",
  "The interviewer will probably ask what you'd do differently now. Answer honestly.",
  "Be ready to whiteboard this in under three minutes.",
  "They may ask how it scales to ten times the load. Think about that before the call.",
];

export function interviewCardFor(day: ChallengeDay): InterviewCard {
  const topic = day.learningObjectives[0] ?? day.title;
  const i = (day.dayNumber - 1) % QUESTION_TEMPLATES.length;
  const j = (day.dayNumber * 3 - 1) % FOLLOW_UPS.length;
  return {
    dayNumber: day.dayNumber,
    topic,
    question: QUESTION_TEMPLATES[i]!(topic),
    answer: ANSWER_TEMPLATES[i]!(topic, day.title),
    followUp: FOLLOW_UPS[j]!,
  };
}
