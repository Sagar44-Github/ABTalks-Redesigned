import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DayStatus, MockTimeOfDay, ProfileId, SubmissionRecord } from "@/data/abtalks";

/* ── Per-profile state ──
   Everything a student "does" is scoped by profile id so switching demo
   profiles never leaks progress, freezes or XP from one student to another. */

export type ProfileState = {
  dayStatusOverrides: Record<string, DayStatus>; // key: "trackId:dayNumber"
  submissions: SubmissionRecord[];
  extraFreezesUsed: number;
  seenMilestones: number[];
  seenLevels: number[];
};

const emptyProfileState: ProfileState = {
  dayStatusOverrides: {},
  submissions: [],
  extraFreezesUsed: 0,
  seenMilestones: [],
  seenLevels: [],
};

export type AppState = {
  activeProfileId: ProfileId;
  selectedTrackId: string | null;
  byProfile: Record<ProfileId, ProfileState>;
  mockCurrentTime: MockTimeOfDay;
  themePreference: "light" | "dark" | "system";
  notificationPrefs: { eveningReminder: boolean };
  isPublic: boolean;
  toastMessage: string | null;
  nudgeDismissed: boolean;
  // AI features
  aiPitches: Record<string, { pitch: string; generatedAt: string }>; // key: profileId
  // XP/Levels
  lastCelebratedLevel: number;
};

const STORAGE_KEY = "abtalks-store-v2";

const defaultState: AppState = {
  activeProfileId: "mid",
  selectedTrackId: null,
  byProfile: {
    mid: emptyProfileState,
    "first-day": emptyProfileState,
    empty: emptyProfileState,
  },
  mockCurrentTime: "evening",
  themePreference: "system",
  notificationPrefs: { eveningReminder: true },
  isPublic: true,
  toastMessage: null,
  nudgeDismissed: false,
  aiPitches: {},
  lastCelebratedLevel: 0,
};

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...defaultState,
      ...parsed,
      byProfile: {
        mid: { ...emptyProfileState, ...(parsed.byProfile?.mid ?? {}) },
        "first-day": { ...emptyProfileState, ...(parsed.byProfile?.["first-day"] ?? {}) },
        empty: { ...emptyProfileState, ...(parsed.byProfile?.empty ?? {}) },
      },
      toastMessage: null,
      nudgeDismissed: false,
    };
  } catch {
    return defaultState;
  }
}

function saveState(state: AppState) {
  try {
    const { toastMessage: _, nudgeDismissed: __, ...persistent } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistent));
  } catch {
    /* ignore */
  }
}

/* ── Context ── */

type StoreActions = {
  switchProfile: (profileId: ProfileId) => void;
  selectTrack: (trackId: string) => void;
  useStreakFreeze: (dayNumber: number) => void;
  submitDay: (record: SubmissionRecord) => void;
  setSubmissionFeedback: (dayNumber: number, feedback: string) => void;
  dismissMilestone: (dayNumber: number) => void;
  markLevelSeen: (level: number) => void;
  setMockTime: (time: MockTimeOfDay) => void;
  setThemePreference: (pref: "light" | "dark" | "system") => void;
  setNotificationPrefs: (prefs: { eveningReminder: boolean }) => void;
  setIsPublic: (isPublic: boolean) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  dismissNudge: () => void;
  resetStore: () => void;
  // AI features
  updateSubmissionFeedback: (dayNumber: number, feedback: string | null, status: "success" | "failed") => void;
  setAiPitch: (profileId: string, pitch: string) => void;
  // XP/Levels
  dismissLevelUp: (level: number) => void;
};

/* Convenience view of the ACTIVE profile's slice. */
type ActiveView = {
  dayStatusOverrides: Record<string, DayStatus>;
  submissions: SubmissionRecord[];
  extraFreezesUsed: number;
  seenMilestones: number[];
  seenLevels: number[];
};

type StoreCtx = AppState & StoreActions & ActiveView;

const StoreContext = createContext<StoreCtx | null>(null);

function updateProfile(
  state: AppState,
  profileId: ProfileId,
  fn: (p: ProfileState) => ProfileState,
): AppState {
  const current = state.byProfile[profileId] ?? emptyProfileState;
  return { ...state, byProfile: { ...state.byProfile, [profileId]: fn(current) } };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const switchProfile = useCallback((profileId: ProfileId) => {
    setState((s) => ({ ...s, activeProfileId: profileId, selectedTrackId: null }));
  }, []);

  const selectTrack = useCallback((trackId: string) => {
    setState((s) => ({ ...s, selectedTrackId: trackId }));
  }, []);

  const useStreakFreeze = useCallback((dayNumber: number) => {
    setState((s) => {
      const trackId = s.selectedTrackId ?? "web-dev";
      const key = `${trackId}:${dayNumber}`;
      const next = updateProfile(s, s.activeProfileId, (p) => ({
        ...p,
        extraFreezesUsed: p.extraFreezesUsed + 1,
        dayStatusOverrides: { ...p.dayStatusOverrides, [key]: "frozen" as DayStatus },
      }));
      return { ...next, toastMessage: `Streak Freeze used — Day ${dayNumber} protected` };
    });
  }, []);

  const submitDay = useCallback((record: SubmissionRecord) => {
    setState((s) => {
      const key = `${record.trackId}:${record.dayNumber}`;
      const next = updateProfile(s, s.activeProfileId, (p) => ({
        ...p,
        dayStatusOverrides: { ...p.dayStatusOverrides, [key]: "completed" as DayStatus },
        submissions: [record, ...p.submissions.filter((x) => x.dayNumber !== record.dayNumber)],
      }));
      return { ...next, toastMessage: "Proof submitted. Streak continues." };
    });
  }, []);

  const setSubmissionFeedback = useCallback((dayNumber: number, feedback: string) => {
    setState((s) =>
      updateProfile(s, s.activeProfileId, (p) => ({
        ...p,
        submissions: p.submissions.map((sub) =>
          sub.dayNumber === dayNumber ? { ...sub, aiFeedback: feedback } : sub,
        ),
      })),
    );
  }, []);

  const dismissMilestone = useCallback((dayNumber: number) => {
    setState((s) =>
      updateProfile(s, s.activeProfileId, (p) => ({
        ...p,
        seenMilestones: [...p.seenMilestones, dayNumber],
      })),
    );
  }, []);

  const markLevelSeen = useCallback((level: number) => {
    setState((s) =>
      updateProfile(s, s.activeProfileId, (p) => ({
        ...p,
        seenLevels: p.seenLevels.includes(level) ? p.seenLevels : [...p.seenLevels, level],
      })),
    );
  }, []);

  const setMockTime = useCallback((time: MockTimeOfDay) => {
    setState((s) => ({ ...s, mockCurrentTime: time, nudgeDismissed: false }));
  }, []);

  const setThemePreference = useCallback((pref: "light" | "dark" | "system") => {
    setState((s) => ({ ...s, themePreference: pref }));
  }, []);

  const setNotificationPrefs = useCallback((prefs: { eveningReminder: boolean }) => {
    setState((s) => ({ ...s, notificationPrefs: prefs }));
  }, []);

  const setIsPublic = useCallback((isPublic: boolean) => {
    setState((s) => ({ ...s, isPublic }));
  }, []);

  const showToast = useCallback((message: string) => {
    setState((s) => ({ ...s, toastMessage: message }));
  }, []);

  const clearToast = useCallback(() => {
    setState((s) => ({ ...s, toastMessage: null }));
  }, []);

  const dismissNudge = useCallback(() => {
    setState((s) => ({ ...s, nudgeDismissed: true }));
  }, []);

  const resetStore = useCallback(() => {
    setState(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const updateSubmissionFeedback = useCallback(
    (dayNumber: number, feedback: string | null, status: "success" | "failed") => {
      setState((s) => ({
        ...s,
        submissions: s.submissions.map((sub) =>
          sub.dayNumber === dayNumber
            ? { ...sub, aiFeedback: feedback, aiFeedbackStatus: status }
            : sub,
        ),
      }));
    },
    [],
  );

  const setAiPitch = useCallback((profileId: string, pitch: string) => {
    setState((s) => ({
      ...s,
      aiPitches: {
        ...s.aiPitches,
        [profileId]: { pitch, generatedAt: new Date().toISOString() },
      },
    }));
  }, []);

  const dismissLevelUp = useCallback((level: number) => {
    setState((s) => ({ ...s, lastCelebratedLevel: level }));
  }, []);

  const active = state.byProfile?.[state.activeProfileId] ?? emptyProfileState;

  const ctx = useMemo<StoreCtx>(
    () => ({
      ...state,
      dayStatusOverrides: active.dayStatusOverrides ?? {},
      submissions: active.submissions ?? [],
      extraFreezesUsed: active.extraFreezesUsed ?? 0,
      seenMilestones: active.seenMilestones ?? [],
      seenLevels: active.seenLevels ?? [],
      switchProfile,
      selectTrack,
      useStreakFreeze,
      submitDay,
      dismissMilestone,
      setMockTime,
      setThemePreference,
      setNotificationPrefs,
      setIsPublic,
      showToast,
      clearToast,
      dismissNudge,
      resetStore,
      updateSubmissionFeedback,
      setAiPitch,
      dismissLevelUp,
    }),
    [
      state,
      active,
      switchProfile,
      selectTrack,
      useStreakFreeze,
      submitDay,
      dismissMilestone,
      setMockTime,
      setThemePreference,
      setNotificationPrefs,
      setIsPublic,
      showToast,
      clearToast,
      dismissNudge,
      resetStore,
      updateSubmissionFeedback,
      setAiPitch,
      dismissLevelUp,
    ],
  );

  return <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreCtx {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

/* ── Helper: resolve day statuses with overrides ── */

export function resolvedDayStatus(
  trackId: string,
  dayNumber: number,
  baseStatus: DayStatus,
  overrides?: Record<string, DayStatus>,
): DayStatus {
  if (!overrides) return baseStatus;
  const key = `${trackId}:${dayNumber}`;
  return overrides[key] ?? baseStatus;
}
