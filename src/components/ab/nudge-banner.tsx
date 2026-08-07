import { X, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "@/components/ab/ui";
import type { MockTimeOfDay } from "@/data/abtalks";

const nudgeConfig: Record<
  MockTimeOfDay,
  { bg: string; border: string; icon: React.ReactNode; copy: string; accent: string }
> = {
  day: {
    bg: "bg-sidebar-surface",
    border: "border-ink",
    icon: <Clock size={16} strokeWidth={3} className="text-blue" />,
    copy: "Today's task is ready when you are.",
    accent: "text-blue",
  },
  evening: {
    bg: "bg-yellow/10",
    border: "border-yellow",
    icon: <AlertTriangle size={16} strokeWidth={3} className="text-yellow" />,
    copy: "Haven't submitted today yet — still time.",
    accent: "text-yellow",
  },
  "late-night": {
    bg: "bg-red/10",
    border: "border-red",
    icon: <AlertTriangle size={16} strokeWidth={3} className="text-red" />,
    copy: "A few hours left today — quick proof beats a broken streak.",
    accent: "text-red",
  },
};

export function NudgeBanner({
  time,
  taskSubmitted,
  onDismiss,
  dismissed,
}: {
  time: MockTimeOfDay;
  taskSubmitted: boolean;
  onDismiss: () => void;
  dismissed: boolean;
}) {
  if (dismissed) return null;

  if (taskSubmitted) {
    return (
      <div className="border-b-2 border-ink bg-blue/10">
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 px-4 py-2.5 md:px-10">
          <CheckCircle size={14} strokeWidth={3} className="text-blue" />
          <MonoLabel className="text-blue">Today's task submitted — you're on track.</MonoLabel>
        </div>
      </div>
    );
  }

  const config = nudgeConfig[time];

  return (
    <div className={cn("border-b-2", config.border, config.bg)}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2.5 md:px-10">
        <div className="flex items-center gap-2">
          {config.icon}
          <p className={cn("font-display text-label-bold uppercase", config.accent)}>
            {config.copy}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-card-surface"
          aria-label="Dismiss nudge"
        >
          <X size={10} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
