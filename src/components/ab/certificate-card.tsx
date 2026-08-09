import { useCallback, useRef } from "react";
import { Download } from "lucide-react";
import { MonoLabel } from "@/components/ab/ui";

/** Day-60 completion certificate. Rendered as DOM for print/share, and
 *  redrawn onto a canvas for a downloadable PNG. */
export function CertificateCard({
  studentName,
  trackName,
  daysCompleted,
  longestStreak,
  totalXp,
  level,
  issuedOn,
  certificateId,
}: {
  studentName: string;
  trackName: string;
  daysCompleted: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  issuedOn: string;
  certificateId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const download = useCallback(() => {
    const W = 1200;
    const H = 850;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffcc00";
    ctx.fillRect(0, 0, W, H);

    // Card
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(64, 64, W - 112, H - 112);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(56, 56, W - 112, H - 112);
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 4;
    ctx.strokeRect(56, 56, W - 112, H - 112);

    ctx.fillStyle = "#1a1a1a";
    ctx.font = "900 34px 'Space Grotesk', sans-serif";
    ctx.fillText("ABTALKS", 104, 140);

    ctx.fillStyle = "#55524d";
    ctx.font = "700 16px 'JetBrains Mono', monospace";
    ctx.fillText("CERTIFICATE OF COMPLETION · 60 DAY CHALLENGE", 104, 176);

    ctx.fillStyle = "#1a1a1a";
    ctx.font = "900 76px 'Space Grotesk', sans-serif";
    ctx.fillText(studentName.toUpperCase().slice(0, 22), 104, 300);

    ctx.font = "400 24px Inter, sans-serif";
    ctx.fillText(`completed ${daysCompleted} of 60 days on the ${trackName} track,`, 104, 356);
    ctx.fillText(`with a longest streak of ${longestStreak} days.`, 104, 396);

    const stats: [string, string][] = [
      ["DAYS", String(daysCompleted)],
      ["LONGEST STREAK", String(longestStreak)],
      ["TOTAL XP", String(totalXp)],
      ["LEVEL", String(level)],
    ];
    stats.forEach(([label, value], i) => {
      const x = 104 + i * 254;
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, 470, 230, 130);
      ctx.fillStyle = "#55524d";
      ctx.font = "700 14px 'JetBrains Mono', monospace";
      ctx.fillText(label, x + 18, 506);
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "900 56px 'Space Grotesk', sans-serif";
      ctx.fillText(value, x + 18, 570);
    });

    ctx.fillStyle = "#55524d";
    ctx.font = "700 14px 'JetBrains Mono', monospace";
    ctx.fillText(`ISSUED ${issuedOn.toUpperCase()}`, 104, 700);
    ctx.fillText(`CERTIFICATE ID ${certificateId}`, 104, 726);
    ctx.fillText("VERIFY AT ABTALKS.APP/U/" + studentName.toLowerCase().replace(/\s+/g, "-").toUpperCase(), 104, 752);

    const link = document.createElement("a");
    link.download = `abtalks-certificate-${certificateId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [studentName, trackName, daysCompleted, longestStreak, totalXp, level, issuedOn, certificateId]);

  return (
    <div>
      <div ref={ref} className="border-2 border-ink bg-yellow p-4 shadow-brutal sm:p-6">
        <div className="border-2 border-ink bg-card-surface p-5 sm:p-8">
          <p className="font-display text-heading-3 uppercase">ABTalks</p>
          <MonoLabel>Certificate of completion · 60 day challenge</MonoLabel>

          <h2 className="mt-6 break-words font-display text-heading-1 uppercase">{studentName}</h2>
          <p className="mt-3 max-w-xl text-body">
            completed {daysCompleted} of 60 days on the {trackName} track, with a longest streak of{" "}
            {longestStreak} days. Every day was backed by a public commit and a public post.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Days", daysCompleted],
              ["Longest streak", longestStreak],
              ["Total XP", totalXp],
              ["Level", level],
            ].map(([label, value]) => (
              <div key={String(label)} className="min-w-0 border-2 border-ink p-3">
                <MonoLabel>{String(label)}</MonoLabel>
                <p className="mt-1 font-display text-heading-2">{String(value)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t-2 border-ink pt-3">
            <p className="font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
              Issued {issuedOn} · Certificate ID {certificateId}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={download}
        className="mt-4 inline-flex items-center gap-2 border-2 border-ink bg-blue px-4 py-3 font-display text-label-bold uppercase text-on-blue shadow-brutal press"
      >
        <Download size={16} strokeWidth={3} /> Download certificate
      </button>
    </div>
  );
}
