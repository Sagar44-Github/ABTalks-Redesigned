import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as ArrowUpDown, r as Trophy, y as Flame } from "../_libs/lucide-react.mjs";
import { a as cn, c as useStore } from "./router-N6lz0OtS.mjs";
import { c as Nav, d as getProfile, g as tracks, i as Footer, l as Panel, p as leaderboardData, s as MonoLabel, u as Pill } from "./ui-Dkg9G4I4.mjs";
import { n as levelFromXp } from "./xp-D9f2BGzc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-BNRFlvve.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LeaderboardPage() {
	const [sortBy, setSortBy] = (0, import_react.useState)("streak");
	const [trackFilter, setTrackFilter] = (0, import_react.useState)(null);
	const store = useStore();
	const currentUsername = getProfile(store.activeProfileId).student.username;
	const ranked = [...trackFilter ? leaderboardData.filter((e) => e.trackId === trackFilter) : leaderboardData].sort((a, b) => sortBy === "streak" ? b.currentStreak - a.currentStreak : b.completionPercentage - a.completionPercentage).map((entry, i) => ({
		...entry,
		rank: i + 1
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { cta: false }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
							size: 20,
							strokeWidth: 3,
							className: "text-yellow"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Leaderboard" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-heading-2 uppercase md:text-heading-1",
						children: "Who's building"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-body",
						children: "The longest streaks and highest completion rates in the challenge. Keep climbing — every day you submit moves you up."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, {
										size: 9,
										strokeWidth: 3
									}), " Sort by"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSortBy("streak"),
									className: cn("border-2 border-ink px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]", sortBy === "streak" ? "bg-ink text-base" : "bg-card-surface text-ink"),
									children: "Streak"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSortBy("completion"),
									className: cn("border-2 border-ink px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]", sortBy === "completion" ? "bg-ink text-base" : "bg-card-surface text-ink"),
									children: "Completion"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Track" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTrackFilter(null),
									className: cn("border-2 border-ink px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]", !trackFilter ? "bg-ink text-base" : "bg-card-surface text-ink"),
									children: "All"
								}),
								tracks.slice(0, 3).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTrackFilter(trackFilter === t.id ? null : t.id),
									className: cn("border-2 border-ink px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]", trackFilter === t.id ? "bg-ink text-base" : "bg-card-surface text-ink"),
									children: t.name
								}, t.id))
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-2",
						children: ranked.map((entry) => {
							const isCurrentUser = entry.username === currentUsername;
							const isTop3 = entry.rank <= 3;
							const entryXp = Math.floor(entry.currentStreak * 14 + entry.completionPercentage * 3.5);
							const entryLevel = levelFromXp(entryXp);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/u/$username",
								params: { username: entry.username },
								className: cn("flex items-center gap-4 border-2 p-4 transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px]", isCurrentUser ? "border-yellow bg-yellow/10 shadow-brutal-yellow" : "border-ink bg-card-surface shadow-brutal hover:shadow-brutal-lg"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink font-display text-label-bold", isTop3 ? "bg-yellow text-on-yellow" : "bg-sidebar-surface"),
										children: entry.rank
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink bg-blue font-display text-label-small text-on-blue",
										children: entry.initials
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-display text-label-bold uppercase",
												children: entry.name
											}), isCurrentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: "yellow",
												children: "You"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
												tone: "yellow",
												children: ["Lvl ", entryLevel]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: "ink",
												children: tracks.find((t) => t.id === entry.trackId)?.name ?? entry.trackId
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden shrink-0 text-right sm:block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
												size: 12,
												strokeWidth: 3,
												className: "text-blue"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-heading-3 text-blue tabular-nums",
												children: entry.currentStreak
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, { children: [entry.completionPercentage, "% done"] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "shrink-0 text-right sm:hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-label-bold text-blue tabular-nums",
											children: sortBy === "streak" ? entry.currentStreak : `${entry.completionPercentage}%`
										})
									})
								]
							}, entry.username);
						})
					}),
					ranked.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						className: "mt-6",
						tone: "sidebar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-body",
							children: "No students found for this filter."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { LeaderboardPage as component };
