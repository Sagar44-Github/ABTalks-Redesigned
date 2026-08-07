import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toast({
  message,
  onClose,
  duration = 4000,
  icon,
}: {
  message: string;
  onClose: () => void;
  duration?: number;
  icon?: ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enterTimeout = requestAnimationFrame(() => setVisible(true));
    const dismissTimeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => {
      cancelAnimationFrame(enterTimeout);
      clearTimeout(dismissTimeout);
    };
  }, [duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 left-4 right-4 z-[100] mx-auto max-w-md border-2 border-ink bg-card-surface px-4 py-3 shadow-brutal transition-all duration-300 sm:left-auto sm:right-6",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon}
          <p className="font-display text-label-bold uppercase">{message}</p>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-ink bg-sidebar-surface press"
          aria-label="Dismiss"
        >
          <X size={12} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
