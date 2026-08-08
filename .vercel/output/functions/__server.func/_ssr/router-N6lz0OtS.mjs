import { a as __toESM, r as __exportAll, t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { A as Check, s as Snowflake, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-N6lz0OtS.js
var router_N6lz0OtS_exports = /* @__PURE__ */ __exportAll({
	a: () => Route$7,
	c: () => useStore,
	getRouter: () => getRouter,
	i: () => Route$5,
	l: () => useTheme,
	n: () => Route,
	o: () => cn,
	r: () => Route$1,
	s: () => resolvedDayStatus,
	t: () => router_exports
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B59NM7Gg.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var STORAGE_KEY$1 = "abtalks-theme";
var themeInitScript = `(function(){try{var s=localStorage.getItem("${STORAGE_KEY$1}");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=s?s==="dark":m;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
function useTheme() {
	const [isDark, setIsDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsDark(document.documentElement.classList.contains("dark"));
	}, []);
	return {
		isDark,
		toggle: (0, import_react.useCallback)(() => {
			const next = !document.documentElement.classList.contains("dark");
			document.documentElement.classList.toggle("dark", next);
			try {
				localStorage.setItem(STORAGE_KEY$1, next ? "dark" : "light");
			} catch {}
			setIsDark(next);
		}, [])
	};
}
var emptyProfileState = {
	dayStatusOverrides: {},
	submissions: [],
	extraFreezesUsed: 0,
	seenMilestones: [],
	seenLevels: []
};
var STORAGE_KEY = "abtalks-store-v2";
var defaultState = {
	activeProfileId: "mid",
	selectedTrackId: null,
	byProfile: {
		mid: emptyProfileState,
		"first-day": emptyProfileState,
		empty: emptyProfileState
	},
	mockCurrentTime: "evening",
	themePreference: "system",
	notificationPrefs: { eveningReminder: true },
	isPublic: true,
	toastMessage: null,
	nudgeDismissed: false,
	aiPitches: {},
	lastCelebratedLevel: 0
};
function loadState() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return defaultState;
		const parsed = JSON.parse(raw);
		return {
			...defaultState,
			...parsed,
			byProfile: {
				mid: {
					...emptyProfileState,
					...parsed.byProfile?.mid ?? {}
				},
				"first-day": {
					...emptyProfileState,
					...parsed.byProfile?.["first-day"] ?? {}
				},
				empty: {
					...emptyProfileState,
					...parsed.byProfile?.empty ?? {}
				}
			},
			toastMessage: null,
			nudgeDismissed: false
		};
	} catch {
		return defaultState;
	}
}
function saveState(state) {
	try {
		const { toastMessage: _, nudgeDismissed: __, ...persistent } = state;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(persistent));
	} catch {}
}
var StoreContext = (0, import_react.createContext)(null);
function updateProfile(state, profileId, fn) {
	const current = state.byProfile[profileId] ?? emptyProfileState;
	return {
		...state,
		byProfile: {
			...state.byProfile,
			[profileId]: fn(current)
		}
	};
}
function StoreProvider({ children }) {
	const [state, setState] = (0, import_react.useState)(defaultState);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setState(loadState());
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated) saveState(state);
	}, [state, hydrated]);
	const switchProfile = (0, import_react.useCallback)((profileId) => {
		setState((s) => ({
			...s,
			activeProfileId: profileId,
			selectedTrackId: null
		}));
	}, []);
	const selectTrack = (0, import_react.useCallback)((trackId) => {
		setState((s) => ({
			...s,
			selectedTrackId: trackId
		}));
	}, []);
	const useStreakFreeze = (0, import_react.useCallback)((dayNumber) => {
		setState((s) => {
			const key = `${s.selectedTrackId ?? "web-dev"}:${dayNumber}`;
			return {
				...updateProfile(s, s.activeProfileId, (p) => ({
					...p,
					extraFreezesUsed: p.extraFreezesUsed + 1,
					dayStatusOverrides: {
						...p.dayStatusOverrides,
						[key]: "frozen"
					}
				})),
				toastMessage: `Streak Freeze used — Day ${dayNumber} protected`
			};
		});
	}, []);
	const submitDay = (0, import_react.useCallback)((record) => {
		setState((s) => {
			const key = `${record.trackId}:${record.dayNumber}`;
			return {
				...updateProfile(s, s.activeProfileId, (p) => ({
					...p,
					dayStatusOverrides: {
						...p.dayStatusOverrides,
						[key]: "completed"
					},
					submissions: [record, ...p.submissions.filter((x) => x.dayNumber !== record.dayNumber)]
				})),
				toastMessage: "Proof submitted. Streak continues."
			};
		});
	}, []);
	(0, import_react.useCallback)((dayNumber, feedback) => {
		setState((s) => updateProfile(s, s.activeProfileId, (p) => ({
			...p,
			submissions: p.submissions.map((sub) => sub.dayNumber === dayNumber ? {
				...sub,
				aiFeedback: feedback
			} : sub)
		})));
	}, []);
	const dismissMilestone = (0, import_react.useCallback)((dayNumber) => {
		setState((s) => updateProfile(s, s.activeProfileId, (p) => ({
			...p,
			seenMilestones: [...p.seenMilestones, dayNumber]
		})));
	}, []);
	(0, import_react.useCallback)((level) => {
		setState((s) => updateProfile(s, s.activeProfileId, (p) => ({
			...p,
			seenLevels: p.seenLevels.includes(level) ? p.seenLevels : [...p.seenLevels, level]
		})));
	}, []);
	const setMockTime = (0, import_react.useCallback)((time) => {
		setState((s) => ({
			...s,
			mockCurrentTime: time,
			nudgeDismissed: false
		}));
	}, []);
	const setThemePreference = (0, import_react.useCallback)((pref) => {
		setState((s) => ({
			...s,
			themePreference: pref
		}));
	}, []);
	const setNotificationPrefs = (0, import_react.useCallback)((prefs) => {
		setState((s) => ({
			...s,
			notificationPrefs: prefs
		}));
	}, []);
	const setIsPublic = (0, import_react.useCallback)((isPublic) => {
		setState((s) => ({
			...s,
			isPublic
		}));
	}, []);
	const showToast = (0, import_react.useCallback)((message) => {
		setState((s) => ({
			...s,
			toastMessage: message
		}));
	}, []);
	const clearToast = (0, import_react.useCallback)(() => {
		setState((s) => ({
			...s,
			toastMessage: null
		}));
	}, []);
	const dismissNudge = (0, import_react.useCallback)(() => {
		setState((s) => ({
			...s,
			nudgeDismissed: true
		}));
	}, []);
	const resetStore = (0, import_react.useCallback)(() => {
		setState(defaultState);
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}, []);
	const updateSubmissionFeedback = (0, import_react.useCallback)((dayNumber, feedback, status) => {
		setState((s) => ({
			...s,
			submissions: s.submissions.map((sub) => sub.dayNumber === dayNumber ? {
				...sub,
				aiFeedback: feedback,
				aiFeedbackStatus: status
			} : sub)
		}));
	}, []);
	const setAiPitch = (0, import_react.useCallback)((profileId, pitch) => {
		setState((s) => ({
			...s,
			aiPitches: {
				...s.aiPitches,
				[profileId]: {
					pitch,
					generatedAt: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}));
	}, []);
	const dismissLevelUp = (0, import_react.useCallback)((level) => {
		setState((s) => ({
			...s,
			lastCelebratedLevel: level
		}));
	}, []);
	const ctx = (0, import_react.useMemo)(() => ({
		...state,
		switchProfile,
		selectTrack,
		useStreakFreeze,
		submitDay,
		dismissMilestone,
		setMockTime,
		setThemePreference,
		setNotificationPrefs,
		setIsPublic,
		showToast,
		clearToast,
		dismissNudge,
		resetStore,
		updateSubmissionFeedback,
		setAiPitch,
		dismissLevelUp
	}), [
		state,
		switchProfile,
		selectTrack,
		useStreakFreeze,
		submitDay,
		dismissMilestone,
		setMockTime,
		setThemePreference,
		setNotificationPrefs,
		setIsPublic,
		showToast,
		clearToast,
		dismissNudge,
		resetStore,
		updateSubmissionFeedback,
		setAiPitch,
		dismissLevelUp
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreContext.Provider, {
		value: ctx,
		children
	});
}
function useStore() {
	const ctx = (0, import_react.useContext)(StoreContext);
	if (!ctx) throw new Error("useStore must be used within StoreProvider");
	return ctx;
}
function resolvedDayStatus(trackId, dayNumber, baseStatus, overrides) {
	return overrides[`${trackId}:${dayNumber}`] ?? baseStatus;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Toast({ message, onClose, duration = 4e3, icon }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const enterTimeout = requestAnimationFrame(() => setVisible(true));
		const dismissTimeout = setTimeout(() => {
			setVisible(false);
			setTimeout(onClose, 300);
		}, duration);
		return () => {
			cancelAnimationFrame(enterTimeout);
			clearTimeout(dismissTimeout);
		};
	}, [duration, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		"aria-live": "polite",
		className: cn("fixed bottom-6 left-4 right-4 z-[100] mx-auto max-w-md border-2 border-ink bg-card-surface px-4 py-3 shadow-brutal transition-all duration-300 sm:left-auto sm:right-6", visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-label-bold uppercase",
					children: message
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					setVisible(false);
					setTimeout(onClose, 300);
				},
				className: "flex h-7 w-7 shrink-0 items-center justify-center border-2 border-ink bg-sidebar-surface press",
				"aria-label": "Dismiss",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					size: 12,
					strokeWidth: 3
				})
			})]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center grid-bg bg-base px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono mono-label uppercase tracking-[0.18em] text-muted-ink",
					children: "Error 404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-display-large uppercase text-ink",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-body",
					children: "Nothing here. The URL might be wrong, or the page was moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink bg-yellow px-5 py-3 font-display text-label-bold uppercase text-on-yellow shadow-brutal press",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center grid-bg bg-base px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono mono-label uppercase tracking-[0.18em] text-muted-ink",
					children: "Something broke"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-heading-1 uppercase text-ink",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-body",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink bg-yellow px-5 py-3 font-display text-label-bold uppercase text-on-yellow shadow-brutal press",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink bg-card-surface px-5 py-3 font-display text-label-bold uppercase text-ink shadow-brutal press",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ABTalks — 60-Day Proof-of-Work Challenge" },
			{
				name: "description",
				content: "Pick a track. Build daily. Prove it with a commit and a LinkedIn post. A 60-day coding challenge for Indian college students."
			},
			{
				property: "og:site_name",
				content: "ABTalks"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@700&display=swap"
			},
			{
				rel: "icon",
				href: "/abtalks-logo-icon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			}
		],
		scripts: [{ children: themeInitScript }]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function ToastContainer() {
	const { toastMessage, clearToast } = useStore();
	if (!toastMessage) return null;
	const isFreezeMessage = toastMessage.toLowerCase().includes("freeze");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {
		message: toastMessage,
		onClose: clearToast,
		icon: isFreezeMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, {
			size: 16,
			strokeWidth: 3,
			className: "text-blue"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			size: 16,
			strokeWidth: 3,
			className: "text-blue"
		})
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StoreProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastContainer, {})] })
	});
}
var $$splitComponentImporter$8 = () => import("./routes-rBtVrZnU.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "ABTalks — 60 Days of Proof-of-Work for Student Developers" },
			{
				name: "description",
				content: "Pick a track. Build daily. Prove it with a commit and a LinkedIn post. A 60-day coding challenge that turns consistency into a recruiter-ready profile."
			},
			{
				property: "og:title",
				content: "ABTalks — 60 Days of Proof-of-Work"
			},
			{
				property: "og:description",
				content: "Pick a track. Build daily. Prove it with a commit and a LinkedIn post. 2,847 students are on a streak right now."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./dashboard-BF4WCF4P.mjs");
var Route$7 = createFileRoute("/dashboard")({
	validateSearch: (search) => {
		const s = search["student"];
		return s === "first-day" || s === "empty" || s === "mid" ? { student: s } : {};
	},
	head: () => ({
		meta: [
			{ title: "Your Dashboard — ABTalks 60-Day Challenge" },
			{
				name: "description",
				content: "Track your streak, freeze tokens, 60-day progress grid and today's task in one glance."
			},
			{
				property: "og:title",
				content: "Your Dashboard — ABTalks"
			},
			{
				property: "og:description",
				content: "Streak, freeze tokens, day grid and today's task — everything in one screen."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "/dashboard"
			}
		],
		links: [{
			rel: "canonical",
			href: "/dashboard"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./docs-BbQIhuM1.mjs");
var Route$6 = createFileRoute("/docs")({
	head: () => ({ meta: [{ title: "Documentation — ABTalks Redesign" }, {
		name: "description",
		content: "Design system reference, feature overview, edge cases, and project context for the ABTalks 60-day challenge redesign."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./history-CjuRFX0s.mjs");
var Route$5 = createFileRoute("/history")({
	validateSearch: (search) => {
		const s = search["student"];
		return s === "first-day" || s === "empty" || s === "mid" ? { student: s } : {};
	},
	head: () => ({ meta: [{ title: "Submission History — ABTalks" }, {
		name: "description",
		content: "Your complete submission history across the 60-day challenge."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./leaderboard-BNRFlvve.mjs");
var Route$4 = createFileRoute("/leaderboard")({
	head: () => ({ meta: [{ title: "Leaderboard — ABTalks" }, {
		name: "description",
		content: "See who's building the longest streaks in the ABTalks 60-day challenge."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./onboarding-srIfGn0T.mjs");
var Route$3 = createFileRoute("/onboarding")({
	head: () => ({ meta: [{ title: "Pick Your Track — ABTalks 60-Day Challenge" }, {
		name: "description",
		content: "Choose your 60-day coding track: Web Dev, AI/ML, DSA, Mobile, or Backend. Each track has sequenced daily tasks."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-CU2mpriY.mjs");
var Route$2 = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Settings — ABTalks" }, {
		name: "description",
		content: "Manage your track, theme, notifications, and profile settings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./day._n-BBkhsXv_.mjs");
var Route$1 = createFileRoute("/day/$n")({
	validateSearch: (search) => {
		const s = search["student"];
		return s === "first-day" || s === "empty" || s === "mid" ? { student: s } : {};
	},
	head: ({ params }) => {
		const day = Number(params.n);
		return {
			meta: [
				{ title: `Day ${day} of 60 — ABTalks Challenge` },
				{
					name: "description",
					content: `Today's ABTalks task for day ${day}: build it, push a commit, post the proof, keep the streak.`
				},
				{
					property: "og:title",
					content: `Day ${day} of 60 — ABTalks`
				},
				{
					property: "og:description",
					content: `The day ${day} task, learning objectives, and proof submission for the ABTalks 60-day challenge.`
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:url",
					content: `/day/${day}`
				}
			],
			links: [{
				rel: "canonical",
				href: `/day/${day}`
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./u._username-CnDmX1JM.mjs");
var Route = createFileRoute("/u/$username")({
	head: ({ params }) => ({ meta: [{ title: `${params.username} — ABTalks Profile` }, {
		name: "description",
		content: `See ${params.username}'s ABTalks 60-day challenge progress, streak, and proof-of-work history.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	DashboardRoute: Route$7.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$9
	}),
	DocsRoute: Route$6.update({
		id: "/docs",
		path: "/docs",
		getParentRoute: () => Route$9
	}),
	HistoryRoute: Route$5.update({
		id: "/history",
		path: "/history",
		getParentRoute: () => Route$9
	}),
	LeaderboardRoute: Route$4.update({
		id: "/leaderboard",
		path: "/leaderboard",
		getParentRoute: () => Route$9
	}),
	OnboardingRoute: Route$3.update({
		id: "/onboarding",
		path: "/onboarding",
		getParentRoute: () => Route$9
	}),
	SettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$9
	}),
	DayNRoute: Route$1.update({
		id: "/day/$n",
		path: "/day/$n",
		getParentRoute: () => Route$9
	}),
	UUsernameRoute: Route.update({
		id: "/u/$username",
		path: "/u/$username",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll$1({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { cn as a, useStore as c, Route$7 as i, useTheme as l, Route$1 as n, resolvedDayStatus as o, Route$5 as r, router_N6lz0OtS_exports as s, Route as t };
