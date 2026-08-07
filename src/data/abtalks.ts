export type DayStatus = "completed" | "missed" | "frozen" | "today" | "upcoming";

export type Submission = {
  githubUrl: string;
  linkedinUrl: string;
  linkedinCaption: string;
  submittedAt: string;
};

export type ChallengeDay = {
  dayNumber: number;
  title: string;
  description: string;
  learningObjectives: string[];
  track: string;
  estimatedTime: string;
  difficulty: "Starter" | "Core" | "Stretch";
  status: DayStatus;
  submission: Submission | null;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  unlockedAt: string | null;
  badgeStyle: "blue" | "yellow" | "red" | "ink";
};

export type Student = {
  name: string;
  avatarUrl: string;
  initials: string;
  track: string;
  joinedDate: string;
  currentStreak: number;
  longestStreak: number;
  streakFreezesAvailable: number;
  streakFreezesUsed: number;
  totalDaysCompleted: number;
  completionPercentage: number;
  streakState: "alive" | "at-risk" | "broken" | "not-started";
};

export type Profile = {
  id: ProfileId;
  label: string;
  blurb: string;
  student: Student;
  days: ChallengeDay[];
  achievements: Achievement[];
};

export type ProfileId = "mid" | "first-day" | "empty";

export const tracks = [
  {
    id: "web-dev",
    name: "Web Dev",
    description: "Ship a real app: React, APIs, auth, deploys.",
    totalStudents: 1284,
  },
  {
    id: "ai-ml",
    name: "AI / ML",
    description: "From NumPy to a deployed model endpoint.",
    totalStudents: 742,
  },
  {
    id: "dsa",
    name: "DSA",
    description: "60 days of patterns, not 600 random problems.",
    totalStudents: 968,
  },
  {
    id: "mobile",
    name: "Mobile",
    description: "One React Native app, built screen by screen.",
    totalStudents: 411,
  },
  {
    id: "backend",
    name: "Backend",
    description: "APIs, databases, queues, and the ops around them.",
    totalStudents: 553,
  },
];

type DaySeed = { title: string; description: string; objectives: string[] };

const curriculum: DaySeed[] = [
  {
    title: "Set up your build environment",
    description:
      "Install Node 20, set up a Vite + React project, initialise a public GitHub repo, and push your first commit. Your repo is the spine of the next 60 days.",
    objectives: ["Node + package manager setup", "Vite project scaffold", "First commit pushed"],
  },
  {
    title: "Semantic HTML profile card",
    description:
      "Build a profile card using only semantic HTML — header, article, figure, footer. No divs allowed except for layout wrappers.",
    objectives: ["Semantic element choice", "Accessible image alt text", "Document outline"],
  },
  {
    title: "CSS box model drills",
    description:
      "Recreate three layouts from screenshots using margin, padding, and border only. No flexbox yet — you need to feel the box model first.",
    objectives: ["Content vs border box", "Margin collapsing", "Pixel-accurate spacing"],
  },
  {
    title: "Flexbox layout gauntlet",
    description:
      "Build a nav bar, a card row, and a sticky footer layout with flexbox. Handle wrapping at 390px without media queries.",
    objectives: ["Main vs cross axis", "flex-grow / shrink / basis", "Wrapping behaviour"],
  },
  {
    title: "CSS Grid dashboard shell",
    description:
      "Lay out a dashboard shell with CSS Grid: sidebar, header, content, and a responsive card area using grid-template-areas.",
    objectives: ["grid-template-areas", "minmax and auto-fit", "Responsive reflow"],
  },
  {
    title: "JavaScript arrays and objects",
    description:
      "Write ten transform functions over a messy JSON dataset using map, filter, reduce, and destructuring. No for loops.",
    objectives: ["Array method fluency", "Destructuring", "Immutable transforms"],
  },
  {
    title: "DOM events and delegation",
    description:
      "Build a to-do list in vanilla JS using a single delegated click listener on the container instead of per-item handlers.",
    objectives: ["Event bubbling", "Event delegation", "Dataset attributes"],
  },
  {
    title: "Fetch and async/await",
    description:
      "Consume a public API, render the results, and handle loading and error states properly. Every request needs a failure path.",
    objectives: ["Promises and async/await", "Error handling", "Loading states"],
  },
  {
    title: "Your first React components",
    description:
      "Convert yesterday's vanilla page into React components with props. Split into at least four components with clear boundaries.",
    objectives: ["JSX", "Props and composition", "Component boundaries"],
  },
  {
    title: "State with useState",
    description:
      "Build a filterable product list with controlled inputs. State lives in exactly one place — find where it belongs.",
    objectives: ["useState", "Controlled inputs", "Lifting state up"],
  },
  {
    title: "Effects and data fetching",
    description:
      "Fetch data inside a component with proper cleanup and an abort controller so fast navigation never leaves a stale response behind.",
    objectives: ["useEffect dependencies", "Cleanup functions", "AbortController"],
  },
  {
    title: "Build a reusable component library",
    description:
      "Extract Button, Input, Card, and Badge into a small internal library with variants driven by props. Document each variant in a demo route so future-you can see everything at once.",
    objectives: [
      "Variant-driven component APIs",
      "Composition over configuration",
      "A living component demo page",
    ],
  },
  {
    title: "Client-side routing",
    description:
      "Add routing with nested layouts and a 404 page. Deep links must work on refresh, not just on client navigation.",
    objectives: ["Route configuration", "Nested layouts", "404 handling"],
  },
  {
    title: "Forms and validation",
    description:
      "Build a signup form with inline validation, error messages tied to inputs via aria-describedby, and a disabled submit until valid.",
    objectives: ["Form state", "Validation rules", "Accessible errors"],
  },
  {
    title: "Global state without a library",
    description:
      "Implement a theme and auth context using React context plus a reducer. Measure re-renders before and after.",
    objectives: ["Context API", "useReducer", "Render performance"],
  },
  {
    title: "Data fetching with TanStack Query",
    description:
      "Replace your manual fetch code with a query library. Add caching, refetch on focus, and optimistic updates on one mutation.",
    objectives: ["Query keys", "Cache invalidation", "Optimistic updates"],
  },
  {
    title: "Responsive design at 390px",
    description:
      "Take your app mobile-first. Every screen must be usable one-handed on a 390px viewport with no horizontal scroll.",
    objectives: ["Mobile-first breakpoints", "Touch targets", "Fluid type"],
  },
  {
    title: "Accessibility audit",
    description:
      "Run your app through keyboard-only navigation and a screen reader. Fix focus order, labels, and contrast failures.",
    objectives: ["Keyboard navigation", "ARIA labels", "Colour contrast"],
  },
  {
    title: "Design tokens and theming",
    description:
      "Move every hardcoded colour and size into CSS variables, then ship a dark mode toggle that persists across reloads.",
    objectives: ["CSS custom properties", "Theme switching", "Persistence"],
  },
  {
    title: "Animation with intent",
    description:
      "Add three animations that communicate state change — not decoration. Respect prefers-reduced-motion.",
    objectives: ["Transitions vs keyframes", "Motion purpose", "Reduced motion"],
  },
  {
    title: "Node and Express basics",
    description:
      "Stand up an Express server with three routes, JSON body parsing, and a health check endpoint.",
    objectives: ["HTTP verbs", "Middleware", "Route handlers"],
  },
  {
    title: "REST API design",
    description:
      "Design and implement a resource API with correct status codes, pagination, and consistent error shapes.",
    objectives: ["Resource modelling", "Status codes", "Pagination"],
  },
  {
    title: "Databases: schema design",
    description:
      "Model your app's data in Postgres. Write the migration by hand — tables, foreign keys, indexes, constraints.",
    objectives: ["Normalisation", "Foreign keys", "Indexes"],
  },
  {
    title: "CRUD end to end",
    description:
      "Wire your frontend to your API for full create, read, update, delete. Handle the error path for every operation.",
    objectives: ["End-to-end wiring", "Error surfaces", "Loading feedback"],
  },
  {
    title: "Authentication",
    description:
      "Add email/password auth with hashed passwords and session handling. Protect at least one route on both client and server.",
    objectives: ["Password hashing", "Sessions or JWTs", "Route protection"],
  },
  {
    title: "Authorisation and roles",
    description:
      "Add a role system so an admin sees more than a normal user. Enforce it server-side, never in the UI alone.",
    objectives: ["Role modelling", "Server-side checks", "Least privilege"],
  },
  {
    title: "File uploads",
    description:
      "Let users upload an avatar with client-side size/type validation and server-side verification before storage.",
    objectives: ["Multipart uploads", "Validation", "Storage URLs"],
  },
  {
    title: "Environment and secrets",
    description:
      "Move every key out of your code into environment variables. Document required vars in your README.",
    objectives: ["Env var handling", "Secret hygiene", "Config documentation"],
  },
  {
    title: "Testing fundamentals",
    description:
      "Write unit tests for your three most bug-prone functions. Aim for meaningful assertions, not coverage theatre.",
    objectives: ["Test structure", "Assertions", "Test naming"],
  },
  {
    title: "Component testing",
    description:
      "Test a form component the way a user uses it: type, submit, assert on visible output. No implementation details.",
    objectives: ["Testing Library queries", "User events", "Behaviour-first tests"],
  },
  {
    title: "Halfway checkpoint: refactor",
    description:
      "No new features today. Delete dead code, rename anything confusing, and split your biggest file into three.",
    objectives: ["Code smells", "Naming", "Module boundaries"],
  },
  {
    title: "Git workflow discipline",
    description:
      "Practice branching, rebasing, and writing commit messages that explain why. Open a PR against your own repo and review it.",
    objectives: ["Branching", "Interactive rebase", "PR review"],
  },
  {
    title: "CI pipeline",
    description:
      "Add GitHub Actions to run lint and tests on every push. A red build must block the merge.",
    objectives: ["Workflow YAML", "Caching", "Status checks"],
  },
  {
    title: "Deploy to production",
    description:
      "Ship your app to a live URL with environment variables configured. Share the link — it has to work on someone else's phone.",
    objectives: ["Build output", "Env config in prod", "Custom domain basics"],
  },
  {
    title: "Error monitoring",
    description:
      "Add an error boundary plus a logging hook so client crashes are recorded rather than silently swallowed.",
    objectives: ["Error boundaries", "Structured logging", "Alerting basics"],
  },
  {
    title: "Performance: measure first",
    description:
      "Run Lighthouse on mobile throttling and write down your three worst metrics before changing a single line.",
    objectives: ["Core Web Vitals", "Profiling", "Baseline measurement"],
  },
  {
    title: "Performance: bundle diet",
    description:
      "Code-split routes, lazy load heavy components, and remove at least one dependency you do not need.",
    objectives: ["Code splitting", "Lazy loading", "Dependency audit"],
  },
  {
    title: "Image and asset optimisation",
    description:
      "Serve responsive images with correct sizes, modern formats, and explicit dimensions to kill layout shift.",
    objectives: ["srcset and sizes", "Modern formats", "CLS prevention"],
  },
  {
    title: "Caching strategies",
    description:
      "Add HTTP caching headers and a client cache policy. Explain in your post which requests you made cheaper and why.",
    objectives: ["Cache-Control", "ETags", "Client cache tuning"],
  },
  {
    title: "SEO and metadata",
    description:
      "Give every route a unique title, description, and Open Graph tags. Validate one link preview in a debugger.",
    objectives: ["Per-page metadata", "Open Graph", "Structured data"],
  },
  {
    title: "Real-time features",
    description:
      "Add live updates with WebSockets or server-sent events. Handle reconnect after the connection drops.",
    objectives: ["WebSockets vs SSE", "Reconnect logic", "Live state merge"],
  },
  {
    title: "Background jobs",
    description:
      "Move one slow operation off the request path into a queued job with a visible status in the UI.",
    objectives: ["Queues", "Job status", "Idempotency"],
  },
  {
    title: "Emails and notifications",
    description:
      "Send a transactional email on signup with a templated body. Log delivery failures instead of ignoring them.",
    objectives: ["Transactional email", "Templating", "Failure handling"],
  },
  {
    title: "Payments walkthrough",
    description:
      "Integrate a test-mode checkout, handle the success and cancel routes, and verify the webhook signature.",
    objectives: ["Checkout flow", "Webhooks", "Signature verification"],
  },
  {
    title: "Security pass",
    description:
      "Review your app for XSS, injection, and broken access control. Fix at least one real issue you find.",
    objectives: ["OWASP top risks", "Input sanitisation", "Access control"],
  },
  {
    title: "Rate limiting and abuse",
    description:
      "Add per-IP rate limiting to your write endpoints and return a helpful 429 instead of falling over.",
    objectives: ["Rate limit algorithms", "429 responses", "Abuse patterns"],
  },
  {
    title: "Observability dashboard",
    description:
      "Instrument request timing and error counts, then render them on an internal admin page you can actually read.",
    objectives: ["Metrics", "Instrumentation", "Admin tooling"],
  },
  {
    title: "TypeScript strict mode",
    description:
      "Turn on strict mode and eliminate every any. Model your domain types properly instead of casting.",
    objectives: ["Strict flags", "Domain modelling", "Type narrowing"],
  },
  {
    title: "Generics and utility types",
    description:
      "Write one genuinely generic helper and use Pick, Omit, and Record to remove duplicated type declarations.",
    objectives: ["Generics", "Utility types", "Type reuse"],
  },
  {
    title: "API contract types",
    description:
      "Share types between client and server so a backend change breaks the frontend build instead of production.",
    objectives: ["Shared types", "Runtime validation", "Contract safety"],
  },
  {
    title: "Empty, loading, and error states",
    description:
      "Design real states for every data surface in your app. No blank screens, no raw undefined, no spinner-only screens.",
    objectives: ["State coverage", "Copy writing", "Progressive disclosure"],
  },
  {
    title: "Onboarding flow",
    description:
      "Build a three-step onboarding that gets a brand-new user to their first useful action in under a minute.",
    objectives: ["Progressive onboarding", "Step state", "Time to value"],
  },
  {
    title: "Search and filtering",
    description:
      "Add debounced search with URL-synced filters so a filtered view can be shared as a link.",
    objectives: ["Debouncing", "URL state", "Server-side filtering"],
  },
  {
    title: "Data visualisation",
    description:
      "Chart one meaningful metric from your own app data. Label the axes and make it readable at 390px.",
    objectives: ["Chart selection", "Axis labelling", "Mobile charts"],
  },
  {
    title: "Offline and flaky networks",
    description:
      "Handle offline gracefully: cache the last good response, show a clear banner, and retry when the connection returns.",
    objectives: ["Service workers", "Retry policy", "Offline UX"],
  },
  {
    title: "Documentation",
    description:
      "Write a README a stranger can follow: what it does, how to run it, architecture in five bullet points.",
    objectives: ["README structure", "Setup instructions", "Architecture notes"],
  },
  {
    title: "Portfolio page",
    description:
      "Build the page that shows this project off: problem, screenshots, stack, and the decisions you are proud of.",
    objectives: ["Case study writing", "Screenshots", "Decision narrative"],
  },
  {
    title: "Recruiter-ready GitHub",
    description:
      "Clean up your repo: pinned projects, clear descriptions, tidy commit history, and a profile README.",
    objectives: ["Repo hygiene", "Profile README", "Signal over noise"],
  },
  {
    title: "Mock interview walkthrough",
    description:
      "Record yourself explaining your project in five minutes: problem, architecture, hardest bug, what you would change.",
    objectives: ["Technical storytelling", "Architecture recall", "Self-critique"],
  },
  {
    title: "Ship and reflect",
    description:
      "Final deploy, final post. Write what changed in you over 60 days — the habit is the deliverable, the app is the proof.",
    objectives: ["Final deploy", "Retrospective", "Next 60 days plan"],
  },
];

export function captionFor(day: number, title: string, objectives: string[]) {
  return `Day ${day} of my #ABTalks60DayChallenge 🚀

Today I built: ${title}.

What I learned:
• ${objectives[0] ?? "Shipped something small and finished it"}
• ${objectives[1] ?? "Kept the streak alive"}

Commit pushed, day logged. ${60 - day} to go.

#100DaysOfCode #BuildInPublic #ABTalks`;
}

const TRACK = "Web Dev";

function baseDay(index: number): Omit<ChallengeDay, "status" | "submission"> {
  const seed = curriculum[index]!;
  const dayNumber = index + 1;
  return {
    dayNumber,
    title: seed.title,
    description: seed.description,
    learningObjectives: seed.objectives,
    track: TRACK,
    estimatedTime: dayNumber % 7 === 0 ? "2–3 hrs" : "60–90 min",
    difficulty: dayNumber <= 10 ? "Starter" : dayNumber <= 45 ? "Core" : "Stretch",
  };
}

function submissionFor(day: Omit<ChallengeDay, "status" | "submission">): Submission {
  const iso = new Date(Date.UTC(2026, 5, 1 + day.dayNumber, 21, 40)).toISOString();
  return {
    githubUrl: `https://github.com/riya-nandan/abtalks-60/commit/${(day.dayNumber * 918273).toString(16)}`,
    linkedinUrl: `https://www.linkedin.com/posts/riya-nandan_abtalks60daychallenge-day${day.dayNumber}`,
    linkedinCaption: captionFor(day.dayNumber, day.title, day.learningObjectives),
    submittedAt: iso,
  };
}

function buildDays(statusFor: (dayNumber: number) => DayStatus): ChallengeDay[] {
  return curriculum.map((_, i) => {
    const base = baseDay(i);
    const status = statusFor(base.dayNumber);
    return {
      ...base,
      status,
      submission: status === "completed" ? submissionFor(base) : null,
    };
  });
}

/* Profile A — mid-challenge, one freeze-protected miss on day 6, today is day 12 */
const midDays = buildDays((n) => {
  if (n === 6) return "frozen";
  if (n < 12) return "completed";
  if (n === 12) return "today";
  return "upcoming";
});

const midProfile: Profile = {
  id: "mid",
  label: "Mid-challenge",
  blurb: "Day 12, one missed day saved by a freeze.",
  student: {
    name: "Riya Nandan",
    avatarUrl: "",
    initials: "RN",
    track: TRACK,
    joinedDate: "2026-06-01",
    currentStreak: 11,
    longestStreak: 11,
    streakFreezesAvailable: 1,
    streakFreezesUsed: 1,
    totalDaysCompleted: 11,
    completionPercentage: 18,
    streakState: "at-risk",
  },
  days: midDays,
  achievements: [
    {
      id: "first-submission",
      title: "First Submission",
      description: "You shipped proof on day one.",
      unlockedAt: "2026-06-02",
      badgeStyle: "blue",
    },
    {
      id: "streak-7",
      title: "7-Day Streak",
      description: "One full week without breaking the chain.",
      unlockedAt: "2026-06-08",
      badgeStyle: "yellow",
    },
    {
      id: "freeze-saved",
      title: "Saved by a Freeze",
      description: "You used a freeze token to protect day 6.",
      unlockedAt: "2026-06-07",
      badgeStyle: "blue",
    },
    {
      id: "halfway",
      title: "Halfway There",
      description: "Reach day 30 to unlock.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "finisher",
      title: "60-Day Finisher",
      description: "Complete all 60 days.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
  ],
};

/* Profile B — first day, nothing submitted yet, streak 0 */
const firstDayProfile: Profile = {
  id: "first-day",
  label: "Day one",
  blurb: "Brand new. Streak starts today.",
  student: {
    name: "Arjun Mehta",
    avatarUrl: "",
    initials: "AM",
    track: TRACK,
    joinedDate: "2026-08-07",
    currentStreak: 0,
    longestStreak: 0,
    streakFreezesAvailable: 1,
    streakFreezesUsed: 0,
    totalDaysCompleted: 0,
    completionPercentage: 0,
    streakState: "not-started",
  },
  days: buildDays((n) => (n === 1 ? "today" : "upcoming")),
  achievements: [
    {
      id: "first-submission",
      title: "First Submission",
      description: "Submit day 1 proof to unlock.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "streak-7",
      title: "7-Day Streak",
      description: "Seven days in a row.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "halfway",
      title: "Halfway There",
      description: "Reach day 30.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
  ],
};

/* Profile C — enrolled a while ago, never submitted anything: broken streak, real gaps */
const emptyProfile: Profile = {
  id: "empty",
  label: "Empty profile",
  blurb: "Enrolled, never submitted. Every section empty.",
  student: {
    name: "Sana Qureshi",
    avatarUrl: "",
    initials: "SQ",
    track: TRACK,
    joinedDate: "2026-07-20",
    currentStreak: 0,
    longestStreak: 0,
    streakFreezesAvailable: 1,
    streakFreezesUsed: 0,
    totalDaysCompleted: 0,
    completionPercentage: 0,
    streakState: "broken",
  },
  days: buildDays((n) => {
    if (n < 12) return "missed";
    if (n === 12) return "today";
    return "upcoming";
  }),
  achievements: [
    {
      id: "first-submission",
      title: "First Submission",
      description: "Nothing submitted yet — this unlocks first.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "streak-7",
      title: "7-Day Streak",
      description: "Seven days in a row.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "halfway",
      title: "Halfway There",
      description: "Reach day 30.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
  ],
};

export const profiles: Record<ProfileId, Profile> = {
  mid: midProfile,
  "first-day": firstDayProfile,
  empty: emptyProfile,
};

export const profileList = [midProfile, firstDayProfile, emptyProfile];

export function getProfile(id?: string): Profile {
  if (id === "first-day" || id === "empty" || id === "mid") return profiles[id];
  return profiles.mid;
}

export const platformStats = {
  studentsOnStreak: 2847,
  proofsSubmitted: 148_920,
  collegesRepresented: 312,
  finishRate: 41,
};
