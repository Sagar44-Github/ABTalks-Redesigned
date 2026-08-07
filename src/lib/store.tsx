import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DayStatus, MockTimeOfDay, ProfileId, SubmissionRecord } from "@/data/abtalks";

/* ── Persisted state shape ── */

export type AppState = {
  activeProfileId: ProfileId;
  selectedTrackId: string | null;
  dayStatusOverrides: Record<string, DayStatus>; // key: "trackId:dayNumber"
  submissions: SubmissionRecord[];
  streakFreezesAvailable: number;
  streakFreezesUsed: number;
  seenMilestones: number[];
  mockCurrentTime: MockTimeOfDay;
  themePreference: "light" | "dark" | "system";
  notificationPrefs: { eveningReminder: boolean };
  isPublic: boolean;
  toastMessage: string | null;
  nudgeDismissed: boolean;
};

const STORAGE_KEY = "abtalks-store";

const defaultState: AppState = {
  activeProfileId: "mid",
  selectedTrackId: null,
  dayStatusOverrides: {},
  submissions: [],
  streakFreezesAvailable: 2,
  streakFreezesUsed: 0,
  seenMilestones: [],
  mockCurrentTime: "evening",
  themePreference: "system",
  notificationPrefs: { eveningReminder: true },
  isPublic: true,
  toastMessage: null,
  nudgeDismissed: false,
};

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed, toastMessage: null, nudgeDismissed: false };
  } catch {
    return defaultState;
  }
}

function saveState(state: AppState) {
  try {
    // Don't persist transient state
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
  dismissMilestone: (dayNumber: number) => void;
  setMockTime: (time: MockTimeOfDay) => void;
  setThemePreference: (pref: "light" | "dark" | "system") => void;
  setNotificationPrefs: (prefs: { eveningReminder: boolean }) => void;
  setIsPublic: (isPublic: boolean) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  dismissNudge: () => void;
  resetStore: () => void;
};

type StoreCtx = AppState & StoreActions;

const StoreContext = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  // Persist on change (skip initial hydration)
  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const switchProfile = useCallback((profileId: ProfileId) => {
    setState((s) => ({ ...s, activeProfileId: profileId }));
  }, []);

  const selectTrack = useCallback((trackId: string) => {
    setState((s) => ({ ...s, selectedTrackId: trackId }));
  }, []);

  const useStreakFreeze = useCallback((dayNumber: number) => {
    setState((s) => {
      if (s.streakFreezesAvailable <= 0) return s;
      const key = `${s.selectedTrackId}:${dayNumber}`;
      return {
        ...s,
        streakFreezesAvailable: s.streakFreezesAvailable - 1,
        streakFreezesUsed: s.streakFreezesUsed + 1,
        dayStatusOverrides: { ...s.dayStatusOverrides, [key]: "frozen" as DayStatus },
        toastMessage: `Streak Freeze used — Day ${dayNumber} protected`,
      };
    });
  }, []);

  const submitDay = useCallback((record: SubmissionRecord) => {
    setState((s) => {
      const key = `${record.trackId}:${record.dayNumber}`;
      return {
        ...s,
        dayStatusOverrides: { ...s.dayStatusOverrides, [key]: "completed" as DayStatus },
        submissions: [record, ...s.submissions],
        toastMessage: `Proof submitted. Streak continues.`,
      };
    });
  }, []);

  const dismissMilestone = useCallback((dayNumber: number) => {
    setState((s) => ({
      ...s,
      seenMilestones: [...s.seenMilestones, dayNumber],
    }));
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

  const ctx = useMemo<StoreCtx>(
    () => ({
      ...state,
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
    }),
    [
      state,
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
  overrides: Record<string, DayStatus>,
): DayStatus {
  const key = `${trackId}:${dayNumber}`;
  return overrides[key] ?? baseStatus;
}
