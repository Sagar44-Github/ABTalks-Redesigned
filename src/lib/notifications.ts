/* ── Browser push / reminder notifications ──
   Time-aware nudges before midnight plus freeze-expiry alerts. Uses the
   Notification API directly — no service worker push subscription needed
   for local, in-session reminders. */

export type NotifPermission = "default" | "granted" | "denied" | "unsupported";

export function notificationSupport(): NotifPermission {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission as NotifPermission;
}

export async function requestNotificationPermission(): Promise<NotifPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  try {
    const result = await Notification.requestPermission();
    return result as NotifPermission;
  } catch {
    return "denied";
  }
}

export function sendNotification(title: string, body: string) {
  if (notificationSupport() !== "granted") return false;
  try {
    new Notification(title, { body, icon: "/favicon.ico", tag: "abtalks" });
    return true;
  } catch {
    return false;
  }
}

/** Copy for the nudge that fires as the day runs out. */
export function reminderCopy(hoursLeft: number, dayNumber: number, streak: number) {
  if (hoursLeft <= 1) {
    return {
      title: `${Math.round(hoursLeft * 60)} minutes left`,
      body: `Day ${dayNumber} is still unlogged. A ${streak}-day streak dies at midnight.`,
    };
  }
  if (hoursLeft <= 3) {
    return {
      title: `${Math.round(hoursLeft)} hours to midnight`,
      body: `Day ${dayNumber} isn't submitted yet. Push the commit, post the proof.`,
    };
  }
  return {
    title: `Day ${dayNumber} is open`,
    body: `Today's task is waiting. Keep the ${streak}-day streak alive.`,
  };
}

export function freezeExpiryCopy(freezesLeft: number) {
  return {
    title: "Streak Freeze expiring",
    body:
      freezesLeft > 0
        ? `You have ${freezesLeft} freeze${freezesLeft === 1 ? "" : "s"} left. Use one tonight or lose today.`
        : "No freezes left. Tonight has to be a real submission.",
  };
}

/** Schedules an in-session reminder. Returns a cancel function. */
export function scheduleReminder(delayMs: number, title: string, body: string) {
  if (typeof window === "undefined") return () => {};
  const id = window.setTimeout(() => sendNotification(title, body), Math.max(0, delayMs));
  return () => window.clearTimeout(id);
}
