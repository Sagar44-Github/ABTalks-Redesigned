import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertTriangle, Bell, Eye, Moon, Sun, Monitor, RefreshCw } from "lucide-react";
import { BrutalButton, Footer, MonoLabel, Nav, Panel, Pill } from "@/components/ab/ui";
import { tracks, getProfile } from "@/data/abtalks";
import {
  freezeExpiryCopy,
  notificationSupport,
  reminderCopy,
  requestNotificationPermission,
  scheduleReminder,
  sendNotification,
  type NotifPermission,
} from "@/lib/notifications";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ABTalks" },
      { name: "description", content: "Manage your track, theme, notifications, and profile settings." },
    ],
  }),
  component: SettingsPage,
});

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 py-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "mt-0.5 flex h-7 w-12 shrink-0 items-center rounded-none border-2 border-ink p-0.5 transition-colors",
          checked ? "bg-blue" : "bg-sidebar-surface",
        )}
      >
        <span
          className={cn(
            "block h-5 w-5 border-2 border-ink bg-card-surface transition-transform",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
      <div>
        <span className="font-display text-label-bold uppercase">{label}</span>
        {description && <p className="mt-0.5 text-body text-muted-ink">{description}</p>}
      </div>
    </label>
  );
}

function SettingsPage() {
  const store = useStore();
  const { isDark, toggle: toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showTrackWarning, setShowTrackWarning] = useState(false);
  const [pendingTrack, setPendingTrack] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotifPermission>("default");
  const profile = getProfile(store.activeProfileId);

  useEffect(() => {
    setPermission(notificationSupport());
  }, []);

  const enablePush = async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
    if (result === "granted") {
      sendNotification("Push notifications on", "We'll nudge you before midnight if today is still unlogged.");
      store.showToast("Push notifications enabled");
    } else if (result === "denied") {
      store.showToast("Your browser blocked notifications");
    } else if (result === "unsupported") {
      store.showToast("This browser doesn't support notifications");
    }
  };

  const currentTrack = tracks.find((t) => t.id === store.selectedTrackId) ?? tracks[0]!;

  const handleTrackSelect = (trackId: string) => {
    if (trackId === store.selectedTrackId) return;
    setPendingTrack(trackId);
    setShowTrackWarning(true);
  };

  const confirmTrackSwitch = () => {
    if (pendingTrack) {
      store.selectTrack(pendingTrack);
      setShowTrackWarning(false);
      setPendingTrack(null);
    }
  };

  const setTheme = (pref: "light" | "dark" | "system") => {
    store.setThemePreference(pref);
    if (pref === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", systemDark);
    } else {
      document.documentElement.classList.toggle("dark", pref === "dark");
    }
    try {
      localStorage.setItem("abtalks-theme", pref === "system" ? "" : pref);
    } catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen grid-bg bg-base">
      <Nav cta={false} />

      <main className="mx-auto max-w-[700px] px-4 py-8 md:px-10 md:py-12">
        <MonoLabel>Settings</MonoLabel>
        <h1 className="mt-3 font-display text-heading-2 uppercase md:text-heading-1">
          Preferences
        </h1>

        {/* Track selection */}
        <Panel className="mt-8">
          <div className="flex items-center gap-2">
            <RefreshCw size={16} strokeWidth={3} className="text-blue" />
            <h2 className="font-display text-heading-3 uppercase">Track</h2>
          </div>
          <p className="mt-2 text-body">
            Currently on <strong>{currentTrack.name}</strong>. Switching tracks will change your
            daily content.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {tracks.map((t) => {
              const isActive = t.id === store.selectedTrackId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTrackSelect(t.id)}
                  className={cn(
                    "border-2 p-3 text-left transition-all duration-150",
                    isActive
                      ? "border-yellow bg-yellow/10 shadow-brutal-yellow"
                      : "border-ink bg-card-surface shadow-brutal-sm hover:shadow-brutal",
                  )}
                >
                  <p className="font-display text-label-bold uppercase">{t.name}</p>
                  <p className="mt-1 text-body-bold text-muted-ink">{t.description}</p>
                  {isActive && <Pill tone="yellow" className="mt-2">Current</Pill>}
                </button>
              );
            })}
          </div>

          {/* Track switch warning */}
          {showTrackWarning && (
            <div className="mt-4 border-2 border-red bg-red/10 p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} strokeWidth={3} className="text-red" />
                <p className="font-display text-label-bold uppercase text-red">
                  Switch to {tracks.find((t) => t.id === pendingTrack)?.name}?
                </p>
              </div>
              <p className="mt-2 text-body">
                Switching tracks will change your daily content. Your progress data persists but
                day tasks will reflect the new track&apos;s curriculum.
              </p>
              <div className="mt-3 flex gap-2">
                <BrutalButton variant="ink" onClick={confirmTrackSwitch}>
                  Confirm switch
                </BrutalButton>
                <BrutalButton
                  variant="outline"
                  onClick={() => {
                    setShowTrackWarning(false);
                    setPendingTrack(null);
                  }}
                >
                  Cancel
                </BrutalButton>
              </div>
            </div>
          )}
        </Panel>

        {/* Theme */}
        <Panel className="mt-5">
          <div className="flex items-center gap-2">
            <Moon size={16} strokeWidth={3} className="text-blue" />
            <h2 className="font-display text-heading-3 uppercase">Theme</h2>
          </div>
          <div className="mt-4 flex gap-2">
            {(
              [
                { value: "light", icon: <Sun size={14} strokeWidth={3} />, label: "Light" },
                { value: "dark", icon: <Moon size={14} strokeWidth={3} />, label: "Dark" },
                { value: "system", icon: <Monitor size={14} strokeWidth={3} />, label: "System" },
              ] as const
            ).map(({ value, icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={cn(
                  "inline-flex items-center gap-2 border-2 border-ink px-4 py-3 font-display text-label-bold uppercase",
                  store.themePreference === value
                    ? "bg-ink text-base shadow-none"
                    : "bg-card-surface shadow-brutal-sm press",
                )}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </Panel>

        {/* Notifications */}
        <Panel className="mt-5">
          <div className="flex items-center gap-2">
            <Bell size={16} strokeWidth={3} className="text-blue" />
            <h2 className="font-display text-heading-3 uppercase">Notifications</h2>
          </div>
          <MonoLabel className="mt-1 block">
            Browser push · status: {permission}
          </MonoLabel>

          <div className="mt-3 divide-y divide-muted-ink/20">
            <Toggle
              checked={store.notificationPrefs.eveningReminder}
              onChange={(v) => store.setNotificationPrefs({ eveningReminder: v })}
              label="Evening reminder"
              description="A nudge as the day runs out if today is still unlogged"
            />
          </div>

          {permission !== "granted" ? (
            <BrutalButton className="mt-4" onClick={enablePush}>
              <Bell size={16} strokeWidth={3} /> Enable push notifications
            </BrutalButton>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2">
              <BrutalButton
                variant="outline"
                onClick={() => {
                  const day = profile.student.totalDaysCompleted + 1;
                  const copy = reminderCopy(1, day, profile.student.currentStreak);
                  sendNotification(copy.title, copy.body);
                }}
              >
                Send midnight reminder
              </BrutalButton>
              <BrutalButton
                variant="outline"
                onClick={() => {
                  const copy = freezeExpiryCopy(profile.student.streakFreezesAvailable);
                  sendNotification(copy.title, copy.body);
                }}
              >
                Send freeze alert
              </BrutalButton>
              <BrutalButton
                variant="outline"
                onClick={() => {
                  scheduleReminder(10_000, "Still unlogged", "Ten seconds was the demo. Midnight is the real deadline.");
                  store.showToast("Reminder scheduled in 10 seconds");
                }}
              >
                Test scheduled nudge
              </BrutalButton>
            </div>
          )}
        </Panel>

        {/* Public profile */}
        <Panel className="mt-5">
          <div className="flex items-center gap-2">
            <Eye size={16} strokeWidth={3} className="text-blue" />
            <h2 className="font-display text-heading-3 uppercase">Public profile</h2>
          </div>

          <Toggle
            checked={store.isPublic}
            onChange={(v) => store.setIsPublic(v)}
            label="Profile visible to others"
            description="When enabled, your /u/username page is accessible to anyone with the link"
          />
        </Panel>

        {/* Reset */}
        <Panel className="mt-5" tone="sidebar">
          <h2 className="font-display text-heading-3 uppercase">Reset all data</h2>
          <p className="mt-2 text-body">
            Clear all localStorage data and return to a fresh state. This is useful during demos.
          </p>
          <BrutalButton
            variant="outline"
            className="mt-3"
            onClick={() => {
              store.resetStore();
              navigate({ to: "/onboarding" });
            }}
          >
            Reset everything
          </BrutalButton>
        </Panel>
      </main>

      <Footer />
    </div>
  );
}
