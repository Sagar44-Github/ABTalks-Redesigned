import { useState } from "react";
import { Brain, ChevronDown } from "lucide-react";
import { MonoLabel, Pill } from "@/components/ab/ui";
import type { InterviewCard as InterviewCardType } from "@/data/community";

/** Daily interview card — one short Q&A tied to the day's skill. */
export function InterviewCard({
  card,
  defaultOpen = false,
}: {
  card: InterviewCardType;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-2 border-ink bg-card-surface shadow-brutal-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left press"
        aria-expanded={open}
      >
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <Brain size={14} strokeWidth={3} className="text-blue" />
            <MonoLabel>Interview card · Day {card.dayNumber}</MonoLabel>
            <Pill tone="yellow">{card.topic}</Pill>
          </span>
          <span className="mt-2 block font-display text-heading-3 uppercase">{card.question}</span>
        </span>
        <ChevronDown
          size={18}
          strokeWidth={3}
          className={`mt-1 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div className="border-t-2 border-ink p-4">
          <MonoLabel>How to answer</MonoLabel>
          <p className="mt-2 text-body">{card.answer}</p>
          <p className="mt-3 font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
            {card.followUp}
          </p>
        </div>
      ) : null}
    </div>
  );
}
