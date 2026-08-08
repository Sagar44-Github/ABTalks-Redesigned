import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { N as ArrowRight, S as ExternalLink, _ as GitCommitHorizontal, h as Linkedin, y as Flame } from "../_libs/lucide-react.mjs";
import { a as cn, c as useStore, t as Route } from "./router-N6lz0OtS.mjs";
import { c as Nav, d as getProfile, i as Footer, l as Panel, n as BrutalLink, p as leaderboardData, s as MonoLabel, u as Pill } from "./ui-Dkg9G4I4.mjs";
import { r as levelProgress, t as computeXp } from "./xp-D9f2BGzc.mjs";
import { n as getAiPitch } from "./ai-CkUNhRfY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/u._username-CnDmX1JM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusStyles = {
	completed: "bg-blue border-ink",
	missed: "bg-red border-ink",
	frozen: "bg-card-surface border-blue border-dashed",
	today: "bg-yellow border-ink",
	upcoming: "bg-transparent border-muted-ink"
};
function PublicProfile() {
	const { username } = Route.useParams();
	const profile = {
		"riya-nandan": getProfile("mid"),
		"arjun-mehta": getProfile("first-day"),
		"sana-qureshi": getProfile("empty")
	}[username];
	const leaderboardEntry = leaderboardData.find((e) => e.username === username);
	if (!profile && !leaderboardEntry) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto flex max-w-[900px] flex-col items-center px-4 py-16 text-center md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-heading-2 uppercase",
						children: "Profile not found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-md text-body",
						children: [
							"The username “",
							username,
							"” doesn't match any student in our records."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalLink, {
						to: "/",
						className: "mt-6",
						children: ["Go home ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							size: 18,
							strokeWidth: 3
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	const student = profile?.student ?? {
		name: leaderboardEntry.name,
		initials: leaderboardEntry.initials,
		avatarUrl: "",
		track: leaderboardEntry.trackId.replace("-", " "),
		joinedDate: "2026-06-15",
		currentStreak: leaderboardEntry.currentStreak,
		longestStreak: leaderboardEntry.currentStreak,
		totalDaysCompleted: Math.round(leaderboardEntry.completionPercentage / 100 * 60),
		completionPercentage: leaderboardEntry.completionPercentage,
		streakState: "alive",
		username: leaderboardEntry.username,
		isPublic: true
	};
	const days = profile?.days ?? [];
	const achievements = profile?.achievements ?? [];
	const recentSubmissions = days.filter((d) => d.status === "completed").filter((d) => d.submission).sort((a, b) => b.dayNumber - a.dayNumber).slice(0, 5);
	const store = useStore();
	const cachedPitch = store.aiPitches[username]?.pitch;
	const [pitch, setPitch] = (0, import_react.useState)(cachedPitch ?? null);
	const [loadingPitch, setLoadingPitch] = (0, import_react.useState)(false);
	const [pitchError, setPitchError] = (0, import_react.useState)(null);
	const handleGeneratePitch = async () => {
		setLoadingPitch(true);
		setPitchError(null);
		try {
			const res = await getAiPitch({ data: {
				studentName: student.name,
				track: student.track,
				daysCompleted: student.totalDaysCompleted,
				currentStreak: student.currentStreak,
				longestStreak: student.longestStreak,
				sampleTasks: recentSubmissions.slice(0, 3).map((d) => d.title)
			} });
			if (res.success && res.pitch) {
				setPitch(res.pitch);
				store.setAiPitch(username, res.pitch);
			} else setPitchError(res.error ?? "Could not generate pitch");
		} catch {
			setPitchError("AI pitch generation is temporarily unavailable.");
		} finally {
			setLoadingPitch(false);
		}
	};
	const xp = computeXp(days, profile ? store.dayStatusOverrides : {}, student.selectedTrackId ?? "web-dev");
	const { level } = levelProgress(xp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { studentOverride: student }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-20 w-20 items-center justify-center border-2 border-ink bg-blue font-display text-heading-3 text-on-blue shadow-brutal",
							children: student.initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-heading-2 uppercase md:text-heading-1",
								children: student.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
										tone: "yellow",
										children: ["Level ", level]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										tone: "blue",
										children: student.track
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, { children: ["on ABTalks since ", student.joinedDate] })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							tone: "yellow",
							className: "border-2 border-ink shadow-brutal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
									className: "text-on-yellow/70",
									children: "AI-Generated Recruiter Pitch"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleGeneratePitch,
									disabled: loadingPitch,
									className: "border-2 border-ink bg-card-surface px-2.5 py-1 font-mono mono-label uppercase tracking-[0.16em] text-ink shadow-brutal-sm press disabled:opacity-50",
									children: loadingPitch ? "Generating…" : pitch ? "Regenerate" : "Generate pitch"
								})]
							}), loadingPitch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 animate-pulse font-display text-heading-3 uppercase text-on-yellow/70",
								children: "Crafting pitch for recruiters…"
							}) : pitch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-display text-heading-3 uppercase leading-snug text-on-yellow",
								children: [
									"“",
									pitch,
									"”"
								]
							}) : pitchError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-body text-on-yellow/80",
								children: pitchError
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-body text-on-yellow/80",
								children: [
									"Generate an AI pitch highlighting ",
									student.name,
									"'s proof-of-work, track consistency, and streak history for recruiters."
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
									size: 16,
									strokeWidth: 3,
									className: "text-blue"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Current streak" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-display-large text-blue tabular-nums leading-none",
								children: student.currentStreak
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Longest streak" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-heading-1 tabular-nums",
								children: student.longestStreak
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Days completed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-display text-heading-1 text-blue tabular-nums",
								children: [student.totalDaysCompleted, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-label-bold text-muted-ink",
									children: "/60"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Completion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-display text-heading-1 text-blue tabular-nums",
								children: [student.completionPercentage, "%"]
							})] })
						]
					}),
					achievements.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-heading-3 uppercase",
							children: "Badges"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: achievements.filter((a) => a.unlockedAt).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: a.badgeStyle === "ink" ? "ink" : a.badgeStyle,
								children: a.title
							}, a.id))
						})]
					}),
					days.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-heading-3 uppercase",
							children: "60-day progress"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-10 gap-1.5",
							children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								title: `Day ${d.dayNumber} — ${d.status}`,
								className: cn("flex aspect-square items-center justify-center border-2 font-mono mono-label", statusStyles[d.status], d.status === "upcoming" && "text-muted-ink", (d.status === "completed" || d.status === "missed") && "text-transparent"),
								children: d.dayNumber
							}, d.dayNumber))
						})]
					}),
					recentSubmissions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-heading-3 uppercase",
							children: "Recent proof of work"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: recentSubmissions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-2 border-ink bg-card-surface p-4 shadow-brutal-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, { children: ["Day ", d.dayNumber] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-label-bold uppercase",
										children: d.title
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: new Date(d.submission.submittedAt).toLocaleDateString("en-IN", {
										day: "numeric",
										month: "short"
									}) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: d.submission.githubUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-1.5 border-2 border-ink bg-sidebar-surface px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] hover:bg-card-surface",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCommitHorizontal, {
												size: 10,
												strokeWidth: 3
											}),
											" GitHub",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
												size: 8,
												strokeWidth: 3
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: d.submission.linkedinUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-1.5 border-2 border-ink bg-sidebar-surface px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] hover:bg-card-surface",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
												size: 10,
												strokeWidth: 3
											}),
											" LinkedIn",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
												size: 8,
												strokeWidth: 3
											})
										]
									})]
								})]
							}, d.dayNumber))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 border-t-2 border-ink pt-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-heading-3 uppercase",
								children: "Start your own streak"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-2 max-w-md text-body",
								children: "60 days. One commit, one post, every day. Proof of work you can show a recruiter."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalLink, {
								to: "/",
								className: "mt-5",
								children: ["Begin the challenge ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									size: 18,
									strokeWidth: 3
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { PublicProfile as component };
