import { useRef, useCallback } from "react";
import { Download, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrutalButton, MonoLabel } from "@/components/ab/ui";

type ShareCardProps = {
  studentName: string;
  studentInitials: string;
  dayNumber: number;
  taskTitle: string;
  currentStreak: number;
  trackName: string;
  isMilestone?: boolean | undefined;
  milestoneMessage?: string | undefined;
};

export function ShareCard({
  studentName,
  studentInitials,
  dayNumber,
  taskTitle,
  currentStreak,
  trackName,
  isMilestone = false,
  milestoneMessage,
}: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      // Use canvas to render the card
      const canvas = document.createElement("canvas");
      const rect = cardRef.current.getBoundingClientRect();
      const scale = 2; // Retina
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(scale, scale);

      // Background
      if (isMilestone) {
        ctx.fillStyle = "#ffcc00";
      } else {
        ctx.fillStyle = "#1a1a1a";
      }
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Shadow card
      const cardX = 20;
      const cardY = 20;
      const cardW = rect.width - 40;
      const cardH = rect.height - 40;

      // Shadow
      ctx.fillStyle = isMilestone ? "#1a1a1a" : "#ffffff";
      ctx.fillRect(cardX + 4, cardY + 4, cardW, cardH);

      // Card
      ctx.fillStyle = isMilestone ? "#ffcc00" : "#ffffff";
      ctx.fillRect(cardX, cardY, cardW, cardH);

      // Border
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2;
      ctx.strokeRect(cardX, cardY, cardW, cardH);

      const textColor = "#1a1a1a";
      ctx.fillStyle = textColor;

      // ABTalks branding
      ctx.font = "900 14px 'Space Grotesk', sans-serif";
      ctx.fillText("ABTALKS", cardX + 20, cardY + 35);

      // Day label
      ctx.font = "700 9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#55524d";
      ctx.fillText(`#ABTALKS60DAYCHALLENGE · ${trackName.toUpperCase()}`, cardX + 20, cardY + 60);

      // Day number - big
      ctx.fillStyle = textColor;
      ctx.font = "900 48px 'Space Grotesk', sans-serif";
      ctx.fillText(`DAY ${dayNumber}`, cardX + 20, cardY + 115);

      // Task title
      ctx.font = "700 16px 'Space Grotesk', sans-serif";
      ctx.fillStyle = textColor;
      const maxWidth = cardW - 40;
      const words = taskTitle.split(" ");
      let line = "";
      let y = cardY + 145;
      for (const word of words) {
        const testLine = line + (line ? " " : "") + word;
        if (ctx.measureText(testLine).width > maxWidth && line) {
          ctx.fillText(line, cardX + 20, y);
          line = word;
          y += 22;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, cardX + 20, y);

      // Streak
      ctx.font = "900 36px 'Space Grotesk', sans-serif";
      ctx.fillStyle = "#0055ff";
      ctx.fillText(`${currentStreak}`, cardX + 20, y + 55);

      ctx.font = "700 9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#55524d";
      ctx.fillText("DAY STREAK", cardX + 20 + ctx.measureText(`${currentStreak}  `).width, y + 55);

      // Student name
      ctx.font = "900 12px 'Space Grotesk', sans-serif";
      ctx.fillStyle = textColor;
      ctx.fillText(studentName.toUpperCase(), cardX + 20, cardH + cardY - 15);

      // Milestone message
      if (isMilestone && milestoneMessage) {
        ctx.font = "900 14px 'Space Grotesk', sans-serif";
        ctx.fillStyle = "#d3291c";
        ctx.fillText(milestoneMessage, cardX + 20, y + 85);
      }

      // Download
      const link = document.createElement("a");
      link.download = `abtalks-day-${dayNumber}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Fallback: alert user to screenshot
      alert("Screenshot this card to share!");
    }
  }, [dayNumber, taskTitle, currentStreak, studentName, trackName, isMilestone, milestoneMessage]);

  return (
    <div className="space-y-3">
      {/* Visual card preview */}
      <div
        ref={cardRef}
        className={cn(
          "overflow-hidden border-2 border-ink p-5",
          isMilestone ? "bg-yellow text-on-yellow" : "bg-ink text-base",
        )}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <div className={cn("border-2 p-5 shadow-brutal", isMilestone ? "border-ink bg-yellow" : "border-base bg-card-surface text-ink")}>
          <MonoLabel className={isMilestone ? "text-on-yellow/70" : undefined}>ABTALKS</MonoLabel>
          <p className={cn("mt-1 font-mono mono-label uppercase tracking-[0.16em]", isMilestone ? "text-on-yellow/60" : "text-muted-ink")}>
            #ABTalks60DayChallenge · {trackName}
          </p>
          <p className="mt-4 font-display text-heading-1 uppercase">DAY {dayNumber}</p>
          <p className="mt-2 font-display text-label-bold uppercase">{taskTitle}</p>

          <div className="mt-5 flex items-baseline gap-2">
            <Flame size={16} strokeWidth={3} className="text-blue" />
            <span className="font-display text-heading-2 text-blue tabular-nums">
              {currentStreak}
            </span>
            <MonoLabel>day streak</MonoLabel>
          </div>

          {isMilestone && milestoneMessage ? (
            <p className="mt-4 font-display text-label-bold uppercase text-red">
              {milestoneMessage}
            </p>
          ) : null}

          <div className="mt-5 flex items-center gap-2 border-t-2 border-ink pt-3">
            <span className={cn(
              "flex h-7 w-7 items-center justify-center font-display text-label-small",
              isMilestone ? "bg-ink text-yellow" : "bg-blue text-on-blue",
            )}>
              {studentInitials}
            </span>
            <span className="font-display text-label-small uppercase">{studentName}</span>
          </div>
        </div>
      </div>

      <BrutalButton onClick={handleDownload} variant="outline" className="w-full sm:w-auto">
        <Download size={16} strokeWidth={3} /> Download Share Card
      </BrutalButton>
    </div>
  );
}
