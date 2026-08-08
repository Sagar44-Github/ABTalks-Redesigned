import type { Achievement, ChallengeDay, DayStatus } from "@/data/abtalks";

/* ── XP economy ──
   10 XP per submission
   +5 / +10 / +20 streak bonus for a submission extending a 7+ / 14+ / 30+ day streak
   +25 XP for a milestone day (7 / 30 / 60)
   +5 XP for a streak freeze spent
   +15 XP for an unlocked achievement
   Level is ALWAYS derived from XP — never stored or incremented separately. */

export const XP_PER_SUBMISSION = 10;
export const XP_PER_MILESTONE = 25;
export const XP_PER_FREEZE = 5;
export const XP_PER_ACHIEVEMENT = 15;

export const MILESTONE_DAYS = [7, 30, 60];

/** Cumulative XP required to reach each level (index 0 = level 1). */
export const LEVEL_THRESHOLDS = [0, 60, 150, 280, 450, 660, 910, 1180, 1450, 1700];

export const LEVEL_TITLES = [
  "Day one",
  "Getting started",
  "Warmed up",
  "Consistent",
  "Habit forming",
  "In rhythm",
  "Hard to stop",
  "Relentless",
  "Veteran builder",
  "Finisher",
];

export function streakBonus(streakAfterDay: number): number {
  if (streakAfterDay >= 30) return 20;
  if (streakAfterDay >= 14) return 10;
  if (streakAfterDay >= 7) return 5;
  return 0;
}

/** Pure: total XP from a resolved day list + unlocked achievements. */
export function computeXp(
  days: { dayNumber: number; status: DayStatus }[],
  achievements: Achievement[] = [],
): number {
  let xp = 0;
  let streak = 0;
  const ordered = [...days].sort((a, b) => a.dayNumber - b.dayNumber);

  for (const day of ordered) {
    if (day.status === "completed") {
      streak += 1;
      xp += XP_PER_SUBMISSION + streakBonus(streak);
      if (MILESTONE_DAYS.includes(day.dayNumber)) xp += XP_PER_MILESTONE;
    } else if (day.status === "frozen") {
      xp += XP_PER_FREEZE;
      // A freeze protects the chain, so the streak keeps counting.
      streak += 1;
    } else if (day.status === "missed") {
      streak = 0;
    }
  }

  xp += achievements.filter((a) => a.unlockedAt).length * XP_PER_ACHIEVEMENT;
  return xp;
}

/** Pure: level (1-10) derived from cumulative XP. */
export function levelFromXp(xp: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i += 1) {
    if (xp >= LEVEL_THRESHOLDS[i]!) level = i + 1;
  }
  return level;
}

export type LevelProgress = {
  xp: number;
  level: number;
  title: string;
  levelFloor: number;
  nextLevelAt: number | null;
  xpIntoLevel: number;
  xpForLevel: number;
  percent: number;
  isMax: boolean;
};

export function levelProgress(xp: number): LevelProgress {
  const level = levelFromXp(xp);
  const levelFloor = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextLevelAt = level >= LEVEL_THRESHOLDS.length ? null : (LEVEL_THRESHOLDS[level] ?? null);
  const xpIntoLevel = xp - levelFloor;
  const xpForLevel = nextLevelAt === null ? 0 : nextLevelAt - levelFloor;
  const percent =
    nextLevelAt === null ? 100 : Math.min(100, Math.round((xpIntoLevel / xpForLevel) * 100));
  return {
    xp,
    level,
    title: LEVEL_TITLES[level - 1] ?? "Builder",
    levelFloor,
    nextLevelAt,
    xpIntoLevel,
    xpForLevel,
    percent,
    isMax: nextLevelAt === null,
  };
}

/** Plain, non-hype copy for a level-up moment. */
export function levelUpCopy(level: number): { title: string; sub: string } {
  const title = `Level ${level} — ${LEVEL_TITLES[level - 1] ?? "Builder"}`;
  const subs: Record<number, string> = {
    2: "Your first XP is banked. Nothing dramatic — just evidence you started.",
    3: "A week of small deposits adds up. Keep the deposits boring.",
    4: "You've earned more XP than most people who sign up ever will.",
    5: "Halfway up the ladder. The streak is doing the work now.",
    6: "This is the stretch where people quit. You're still logging days.",
    7: "Your XP curve says habit, not motivation.",
    8: "Consistency at this length is rare. Recruiters can see it in the grid.",
    9: "One level from the top. Finish the way you started.",
    10: "Top level. Sixty days of receipts, earned one submission at a time.",
  };
  return { title, sub: subs[level] ?? "Another level of proof, earned one submission at a time." };
}

/** Convenience for full profile day arrays. */
export function xpForDays(days: ChallengeDay[], achievements: Achievement[] = []): number {
  return computeXp(days, achievements);
}
