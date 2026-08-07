import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Moon, Sun, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import type { ChallengeDay, DayStatus } from "@/data/abtalks";

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
        "font-mono text-mono-label uppercase tracking-[0.18em] text-muted-ink",
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
        "rounded-card border-2 border-ink p-5 shadow-brutal",
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
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 px-3 py-1.5 font-mono text-mono-label uppercase tracking-[0.16em]",
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

export function Nav({
  student,
  cta = true,
  searchState,
}: {
  student?: { name: string; initials: string };
  cta?: boolean;
  searchState?: Record<string, string | undefined>;
}) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-sidebar-surface">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 md:px-10">
        <Link to="/" className="font-display text-subheading uppercase tracking-[-0.04em]">
          ABTALKS
        </Link>
        <div className="flex items-center gap-2">
          {student ? (
            <div className="flex items-center gap-2 border-2 border-ink bg-card-surface px-2 py-1.5">
              <span className="flex h-7 w-7 items-center justify-center bg-blue font-display text-label-small text-on-blue">
                {student.initials}
              </span>
              <span className="hidden font-display text-label-small uppercase sm:inline">
                {student.name}
              </span>
            </div>
          ) : null}
          <ThemeToggle />
          {cta ? (
            <BrutalLink
              to="/dashboard"
              search={searchState}
              className="px-3 py-2 text-label-small sm:px-5 sm:py-3 sm:text-label-bold"
            >
              Start your streak
            </BrutalLink>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-footer-dark text-on-footer">
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-10">
        <p className="font-display text-heading-2 uppercase">ABTALKS</p>
        <p className="mt-3 max-w-md text-body opacity-80">
          60 days. One commit, one post, every day. Proof of work you can show a recruiter.
        </p>
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-display text-label-small uppercase">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/day/$n" params={{ n: "12" }}>
            Today&apos;s task
          </Link>
        </nav>
        <p className="mt-8 font-mono text-mono-label uppercase tracking-[0.2em] opacity-60">
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
  currentSearch,
}: {
  days: ChallengeDay[];
  currentSearch?: Record<string, string | undefined> | undefined;
}) {
  return (
    <div>
      <div className="grid grid-cols-10 gap-1.5">
        {days.map((d) => (
          <Link
            key={d.dayNumber}
            to="/day/$n"
            params={{ n: String(d.dayNumber) }}
            search={currentSearch as never}
            title={`Day ${d.dayNumber} — ${d.status}`}
            aria-label={`Day ${d.dayNumber}, ${d.status}`}
            className={cn(
              "flex aspect-square items-center justify-center border-2 font-mono text-mono-label",
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
