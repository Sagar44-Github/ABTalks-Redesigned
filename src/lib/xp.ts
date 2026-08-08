/* ── XP Economy & Level Curve ── */

import type { ChallengeDay, DayStatus } from "@/data/abtalks";

/* ── XP Sources ── */
const BASE_DAY_XP = 10;
const DIFFICULTY_BONUS: Record<string, number> = {
  Starter: 0,
  Core: 3,
  Stretch: 5,
};

// Streak-length bonuses (awarded when crossing thresholds)
const STREAK_BONUSES: [number, number][] = [
  [60, 100],
  [30, 50],
  [7, 20],
];

const FREEZE_XP = 5;

/* ── Level Curve ── */
// Each level requires more XP than the last. Level 1 starts at 0 XP.
// Formula: XP needed to reach level N = 50 * (N-1)^1.5  (cumulative thresholds)
function xpThresholdForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(50 * Math.pow(level - 1, 1.5));
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (xpThresholdForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

export function levelProgress(xp: number): {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  progress: number; // 0-1
} {
  const level = levelFromXp(xp);
  const currentThreshold = xpThresholdForLevel(level);
  const nextThreshold = xpThresholdForLevel(level + 1);
  const range = nextThreshold - currentThreshold;
  const progress = range > 0 ? (xp - currentThreshold) / range : 1;
  return {
    level,
    currentXp: xp,
    nextLevelXp: nextThreshold,
    progress: Math.min(1, Math.max(0, progress)),
  };
}

/* ── XP Computation ── */
export function computeXp(
  days: ChallengeDay[],
  dayStatusOverrides: Record<string, DayStatus>,
  trackId: string,
): number {
  let xp = 0;
  let currentStreak = 0;
  const crossedStreakBonuses = new Set<number>();

  for (const day of days) {
    const key = `${trackId}:${day.dayNumber}`;
    const status = dayStatusOverrides[key] ?? day.status;

    if (status === "completed") {
      xp += BASE_DAY_XP;
      xp += DIFFICULTY_BONUS[day.difficulty] ?? 0;
      currentStreak++;

      // Check streak bonuses
      for (const [threshold, bonus] of STREAK_BONUSES) {
        if (currentStreak >= threshold && !crossedStreakBonuses.has(threshold)) {
          xp += bonus;
          crossedStreakBonuses.add(threshold);
        }
      }
    } else if (status === "frozen") {
      xp += FREEZE_XP;
      // Streak continues through freeze
    } else if (status === "missed") {
      currentStreak = 0; // Streak broken
    }
    // "today" and "upcoming" don't contribute XP
  }

  return xp;
}

/* ── Level-Up Copy ── */
export function levelUpCopy(level: number): { title: string; sub: string } {
  if (level >= 10) {
    return {
      title: `Level ${level}. Veteran.`,
      sub: "Most students never get here. You built your way in with proof, not promises.",
    };
  }
  if (level >= 7) {
    return {
      title: `Level ${level}. Serious builder.`,
      sub: "Your consistency is visible now. Recruiters notice patterns like this.",
    };
  }
  if (level >= 5) {
    return {
      title: `Level ${level}. Gaining momentum.`,
      sub: "You're past the phase where most people stop. Every level from here gets harder — and more valuable.",
    };
  }
  if (level >= 3) {
    return {
      title: `Level ${level}. Building the habit.`,
      sub: "Three levels in. The streak isn't luck anymore — it's discipline turning into skill.",
    };
  }
  return {
    title: `Level ${level}. Getting started.`,
    sub: "First level up. The XP bar is moving. Keep submitting proof and it keeps climbing.",
  };
}
