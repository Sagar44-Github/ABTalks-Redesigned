import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Moon, Sun, Snowflake, History, Trophy, FileText, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import { useStore } from "@/lib/store";
import { getProfile, type ChallengeDay, type DayStatus } from "@/data/abtalks";
import { useState } from "react";

export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono mono-label uppercase tracking-[0.18em] text-muted-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

type ButtonVariant = "yellow" | "outline" | "ink" | "blue";

const variantClasses: Record<ButtonVariant, string> = {
  yellow: "bg-yellow text-on-yellow",
  outline: "bg-card-surface text-ink",
  ink: "bg-ink text-base",
  blue: "bg-blue text-on-blue",
};

export function BrutalButton({
  variant = "yellow",
  className,
  children,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink px-5 py-3 font-display text-label-bold uppercase",
        disabled
          ? "cursor-not-allowed border-muted-ink bg-sidebar-surface text-muted-ink shadow-none"
          : cn("shadow-brutal press", variantClasses[variant]),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function BrutalLink({
  to,
  params,
  search,
  variant = "yellow",
  className,
  children,
}: {
  to: string;
  params?: Record<string, string> | undefined;
  search?: Record<string, string | undefined> | undefined;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      params={params as never}
      search={search as never}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink px-5 py-3 font-display text-label-bold uppercase shadow-brutal press",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Panel({
  children,
  className,
  tone = "card",
}: {
  children: ReactNode;
  className?: string;
  tone?: "card" | "yellow" | "sidebar" | "blue";
}) {
  const tones = {
    card: "bg-card-surface text-ink",
    yellow: "bg-yellow text-on-yellow",
    sidebar: "bg-sidebar-surface text-ink",
    blue: "bg-blue text-on-blue",
  } as const;
  return (
    <section
      className={cn(
        "min-w-0 rounded-card border-2 border-ink p-5 shadow-brutal",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Pill({
  children,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "blue" | "yellow" | "red" | "locked";
  className?: string;
}) {
  const tones = {
    ink: "bg-ink text-base border-ink",
    blue: "bg-blue text-on-blue border-ink",
    yellow: "bg-yellow text-on-yellow border-ink",
    red: "bg-red text-on-red border-ink",
    locked: "bg-transparent text-muted-ink border-muted-ink border-dashed",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-center font-mono mono-label uppercase tracking-[0.16em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-none border-2 border-ink bg-card-surface text-ink shadow-brutal-sm press"
    >
      {isDark ? <Sun size={18} strokeWidth={3} /> : <Moon size={18} strokeWidth={3} />}
    </button>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <svg
      viewBox="8 8 238 68"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ABTalks"
      className={cn("h-12 md:h-16 w-auto shrink-0", className)}
    >
      <title>ABTalks</title>
      <rect x="14" y="14" width="60" height="60" fill="#000000" />
      <rect x="10" y="10" width="60" height="60" fill="#FFCC00" stroke="#000000" strokeWidth="4" />
      <path d="M22 54 L30 20 L34 20 L28 54 Z" fill="#000000" />
      <rect x="23" y="40" width="12" height="4" fill="#000000" />
      <rect x="40" y="20" width="5" height="34" fill="#000000" />
      <path d="M45 20 L54 20 Q59 20 59 27 Q59 34 54 34 L45 34 Z" fill="#000000" />
      <path d="M45 34 L55 34 Q60 34 60 41 Q60 54 55 54 L45 54 Z" fill="#000000" />
      <text
        x="88"
        y="52"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="34"
        fontWeight="900"
        letterSpacing="-1.5"
        className="fill-ink"
      >
        ABTALKS
      </text>
      <text
        x="88"
        y="70"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1"
        className="fill-muted-ink"
      >
        60-DAY CHALLENGE
      </text>
    </svg>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 68 68"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ABTalks Icon"
      className={cn("h-10 w-10 shrink-0", className)}
    >
      <title>ABTalks Icon</title>
      <rect x="6" y="6" width="60" height="60" fill="#000000" />
      <rect x="2" y="2" width="60" height="60" fill="#FFCC00" stroke="#000000" strokeWidth="4" />
      <path d="M14 46 L22 12 L26 12 L20 46 Z" fill="#000000" />
      <rect x="15" y="32" width="12" height="4" fill="#000000" />
      <rect x="32" y="12" width="5" height="34" fill="#000000" />
      <path d="M37 12 L46 12 Q51 12 51 19 Q51 26 46 26 L37 26 Z" fill="#000000" />
      <path d="M37 26 L47 26 Q52 26 52 33 Q52 46 47 46 L37 46 Z" fill="#000000" />
    </svg>
  );
}

export function Nav({
  cta = true,
  studentOverride,
}: {
  cta?: boolean;
  studentOverride?: { name: string; initials: string };
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const store = useStore();
  const profile = getProfile(store.activeProfileId);
  const student = studentOverride ?? profile.student;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-sidebar-surface">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3.5 md:px-10">
        <Link to="/" className="flex items-center gap-2 press">
          <LogoFull className="h-12 md:h-16 w-auto" />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-2 lg:flex">
          <Link
            to="/dashboard"
            className="px-3 py-1.5 font-display text-label-bold uppercase tracking-wide hover:text-blue"
          >
            Dashboard
          </Link>
          <Link
            to="/history"
            className="px-3 py-1.5 font-display text-label-bold uppercase tracking-wide hover:text-blue"
          >
            History
          </Link>
          <Link
            to="/leaderboard"
            className="px-3 py-1.5 font-display text-label-bold uppercase tracking-wide hover:text-blue"
          >
            Leaderboard
          </Link>
          <Link
            to="/settings"
            className="px-3 py-1.5 font-display text-label-bold uppercase tracking-wide hover:text-blue"
          >
            Settings
          </Link>
          <Link
            to="/docs"
            className="px-3 py-1.5 font-display text-label-bold uppercase tracking-wide hover:text-blue"
          >
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/u/$username"
            params={{ username: student.name.toLowerCase().replace(/\s+/g, "-") }}
            className="flex items-center gap-2 border-2 border-ink bg-card-surface px-2 py-1.5 press"
          >
            <span className="flex h-7 w-7 items-center justify-center bg-blue font-display text-label-small text-on-blue">
              {student.initials}
            </span>
            <span className="hidden font-display text-label-small uppercase sm:inline">
              {student.name}
            </span>
          </Link>
          <ThemeToggle />
          {cta ? (
            <BrutalLink
              to="/onboarding"
              className="hidden px-3 py-2 text-label-small sm:inline-flex sm:px-5 sm:py-3 sm:text-label-bold"
            >
              Start your streak
            </BrutalLink>
          ) : null}
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-none border-2 border-ink bg-card-surface text-ink shadow-brutal-sm press lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} strokeWidth={3} /> : <Menu size={18} strokeWidth={3} />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t-2 border-ink bg-sidebar-surface px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-2 py-2 font-display text-label-bold uppercase"
            >
              Dashboard
            </Link>
            <Link
              to="/history"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-2 py-2 font-display text-label-bold uppercase"
            >
              <History size={14} strokeWidth={3} /> History
            </Link>
            <Link
              to="/leaderboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-2 py-2 font-display text-label-bold uppercase"
            >
              <Trophy size={14} strokeWidth={3} /> Leaderboard
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-2 py-2 font-display text-label-bold uppercase"
            >
              <Settings size={14} strokeWidth={3} /> Settings
            </Link>
            <Link
              to="/docs"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-2 py-2 font-display text-label-bold uppercase"
            >
              <FileText size={14} strokeWidth={3} /> Docs
            </Link>
            <div className="mt-2 border-t border-muted-ink/20 pt-2">
              <MonoLabel>Demo profiles</MonoLabel>
              <button
                type="button"
                onClick={() => {
                  store.switchProfile("mid");
                  setMobileOpen(false);
                }}
                className="flex w-full items-center gap-2 px-2 py-2 text-left font-display text-label-bold uppercase hover:text-blue"
              >
                Riya (mid-challenge)
              </button>
              <button
                type="button"
                onClick={() => {
                  store.switchProfile("first-day");
                  setMobileOpen(false);
                }}
                className="flex w-full items-center gap-2 px-2 py-2 text-left font-display text-label-bold uppercase hover:text-blue"
              >
                Arjun (day one)
              </button>
              <button
                type="button"
                onClick={() => {
                  store.switchProfile("empty");
                  setMobileOpen(false);
                }}
                className="flex w-full items-center gap-2 px-2 py-2 text-left font-display text-label-bold uppercase hover:text-blue"
              >
                Sana (empty profile)
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const store = useStore();
  return (
    <footer className="border-t-2 border-ink bg-footer-dark text-on-footer">
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-10">
        <Link to="/" className="inline-block press">
          <svg
            viewBox="8 8 238 68"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="ABTalks"
            className="h-16 md:h-20 w-auto"
          >
            <rect x="14" y="14" width="60" height="60" fill="#000000" />
            <rect x="10" y="10" width="60" height="60" fill="#FFCC00" stroke="#000000" strokeWidth="4" />
            <path d="M22 54 L30 20 L34 20 L28 54 Z" fill="#000000" />
            <rect x="23" y="40" width="12" height="4" fill="#000000" />
            <rect x="40" y="20" width="5" height="34" fill="#000000" />
            <path d="M45 20 L54 20 Q59 20 59 27 Q59 34 54 34 L45 34 Z" fill="#000000" />
            <path d="M45 34 L55 34 Q60 34 60 41 Q60 54 55 54 L45 54 Z" fill="#000000" />
            <text x="88" y="52" fontFamily="'Space Grotesk', sans-serif" fontSize="34" fontWeight="900" letterSpacing="-1.5" fill="#f5f0e8">ABTALKS</text>
            <text x="88" y="70" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="700" letterSpacing="1" fill="#ffcc00">60-DAY CHALLENGE</text>
          </svg>
        </Link>
        <p className="mt-3 max-w-md text-body opacity-80">
          60 days. One commit, one post, every day. Proof of work you can show a recruiter.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-mono mono-label uppercase tracking-[0.2em] opacity-60">Product</p>
            <nav className="mt-3 flex flex-col gap-2 font-display text-label-small uppercase">
              <Link to="/" className="hover:text-yellow">Home</Link>
              <Link to="/onboarding" className="hover:text-yellow">Pick a track</Link>
              <Link to="/dashboard" className="hover:text-yellow">Dashboard</Link>
              <Link to="/day/$n" params={{ n: "12" }} className="hover:text-yellow">Today&apos;s task</Link>
            </nav>
          </div>
          <div>
            <p className="font-mono mono-label uppercase tracking-[0.2em] opacity-60">Features</p>
            <nav className="mt-3 flex flex-col gap-2 font-display text-label-small uppercase">
              <Link to="/history" className="hover:text-yellow">History</Link>
              <Link to="/leaderboard" className="hover:text-yellow">Leaderboard</Link>
              <Link to="/settings" className="hover:text-yellow">Settings</Link>
              <Link to="/docs" className="hover:text-yellow">Documentation</Link>
            </nav>
          </div>
          <div>
            <p className="font-mono mono-label uppercase tracking-[0.2em] opacity-60">Demo profiles</p>
            <nav className="mt-3 flex flex-col gap-2 font-display text-label-small uppercase">
              <button
                type="button"
                onClick={() => store.switchProfile("mid")}
                className="text-left font-display text-label-small uppercase hover:text-yellow"
              >
                Riya Nandan (mid-challenge)
              </button>
              <button
                type="button"
                onClick={() => store.switchProfile("first-day")}
                className="text-left font-display text-label-small uppercase hover:text-yellow"
              >
                Arjun Mehta (day one)
              </button>
              <button
                type="button"
                onClick={() => store.switchProfile("empty")}
                className="text-left font-display text-label-small uppercase hover:text-yellow"
              >
                Sana Qureshi (empty)
              </button>
            </nav>
          </div>
        </div>
        <p className="mt-8 font-mono mono-label uppercase tracking-[0.2em] opacity-60">
          Built for students in India · Mocked data · No accounts required
        </p>
      </div>
    </footer>
  );
}

const statusStyles: Record<DayStatus, string> = {
  completed: "bg-blue border-ink",
  missed: "bg-red border-ink",
  frozen: "bg-card-surface border-blue border-dashed",
  today: "bg-yellow border-ink ring-2 ring-ink ring-offset-2 ring-offset-base",
  upcoming: "bg-transparent border-muted-ink",
};

export function DayGrid({
  days,
}: {
  days: ChallengeDay[];
}) {
  return (
    <div>
      <div className="grid grid-cols-10 gap-1.5">
        {days.map((d) => (
          <Link
            key={d.dayNumber}
            to="/day/$n"
            params={{ n: String(d.dayNumber) }}
            title={`Day ${d.dayNumber} — ${d.status}`}
            aria-label={`Day ${d.dayNumber}, ${d.status}`}
            className={cn(
              "flex aspect-square items-center justify-center border-2 font-mono mono-label transition-all duration-150 hover:scale-110 hover:shadow-brutal-sm focus:scale-110 focus:shadow-brutal-sm",
              statusStyles[d.status],
              d.status === "frozen" && "text-blue",
              d.status === "upcoming" && "text-muted-ink",
              (d.status === "completed" || d.status === "missed") && "text-transparent",
            )}
          >
            {d.status === "frozen" ? <Snowflake size={9} strokeWidth={3} /> : d.dayNumber}
          </Link>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {(
          [
            ["completed", "Completed"],
            ["today", "Today"],
            ["frozen", "Frozen"],
            ["missed", "Missed"],
            ["upcoming", "Upcoming"],
          ] as const
        ).map(([key, label]) => (
          <li key={key} className="flex items-center gap-1.5">
            <span className={cn("h-3 w-3 border-2", statusStyles[key], "ring-0 ring-offset-0")} />
            <MonoLabel>{label}</MonoLabel>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FreezeCounter({ available }: { available: number }) {
  return (
    <div className="inline-flex items-center gap-2 border-2 border-ink bg-card-surface px-3 py-2 shadow-brutal-sm">
      <Snowflake size={16} strokeWidth={3} className="text-blue" />
      <span className="font-display text-label-bold">{available}</span>
      <MonoLabel>Freeze {available === 1 ? "token" : "tokens"}</MonoLabel>
    </div>
  );
}

/* ── Status styles export for reuse ── */
export { statusStyles };
