import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as CircleCheckBig, N as ArrowRight, T as Clock, i as TriangleAlert, l as Search, m as Lock, n as Users, o as Sparkles, s as Snowflake, t as X, v as Funnel, y as Flame } from "../_libs/lucide-react.mjs";
import { a as cn, c as useStore, i as Route$7, o as resolvedDayStatus } from "./router-N6lz0OtS.mjs";
import { a as FreezeCounter, c as Nav, d as getProfile, f as getTrack, h as profileList, i as Footer, l as Panel, n as BrutalLink, r as DayGrid, s as MonoLabel, t as BrutalButton, u as Pill } from "./ui-Dkg9G4I4.mjs";
import { i as levelUpCopy, r as levelProgress, t as computeXp } from "./xp-D9f2BGzc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BF4WCF4P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nudgeConfig = {
	day: {
		bg: "bg-sidebar-surface",
		border: "border-ink",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
			size: 16,
			strokeWidth: 3,
			className: "text-blue"
		}),
		copy: "Today's task is ready when you are.",
		accent: "text-blue"
	},
	evening: {
		bg: "bg-yellow/10",
		border: "border-yellow",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
			size: 16,
			strokeWidth: 3,
			className: "text-yellow"
		}),
		copy: "Haven't submitted today yet — still time.",
		accent: "text-yellow"
	},
	"late-night": {
		bg: "bg-red/10",
		border: "border-red",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
			size: 16,
			strokeWidth: 3,
			className: "text-red"
		}),
		copy: "A few hours left today — quick proof beats a broken streak.",
		accent: "text-red"
	}
};
function NudgeBanner({ time, taskSubmitted, onDismiss, dismissed }) {
	if (dismissed) return null;
	if (taskSubmitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b-2 border-ink bg-blue/10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1440px] items-center gap-2 px-4 py-2.5 md:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
				size: 14,
				strokeWidth: 3,
				className: "text-blue"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
				className: "text-blue",
				children: "Today's task submitted — you're on track."
			})]
		})
	});
	const config = nudgeConfig[time];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border-b-2", config.border, config.bg),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2.5 md:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [config.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("font-display text-label-bold uppercase", config.accent),
					children: config.copy
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onDismiss,
				className: "flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-card-surface",
				"aria-label": "Dismiss nudge",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					size: 10,
					strokeWidth: 3
				})
			})]
		})
	});
}
function StreakBlock({ state, streak }) {
	const config = {
		alive: {
			tone: "text-blue",
			label: "Streak alive",
			pill: "blue"
		},
		"at-risk": {
			tone: "text-yellow",
			label: "At risk — today not submitted",
			pill: "yellow"
		},
		broken: {
			tone: "text-red",
			label: "Streak broken — restart today",
			pill: "red"
		},
		"not-started": {
			tone: "text-ink",
			label: "Not started yet",
			pill: "ink"
		}
	}[state];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
				size: 16,
				strokeWidth: 3,
				className: config.tone
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Current streak" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-2 font-display text-streak-clamp tabular-nums ${config.tone}`,
			children: streak
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
				tone: config.pill,
				children: config.label
			})
		})
	] });
}
function MilestoneBanner({ dayNumber, onDismiss }) {
	const msg = {
		7: {
			title: "7 days straight.",
			sub: "You're building a habit. Most people quit by now — you didn't."
		},
		30: {
			title: "Halfway there.",
			sub: "30 days of proof. You're not a student with a resume anymore — you're a builder with receipts."
		},
		60: {
			title: "60 days. Done.",
			sub: "You finished the entire challenge. 60 commits, 60 posts, zero excuses. This is the proof."
		}
	}[dayNumber];
	if (!msg) return null;
	const isDay60 = dayNumber === 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border-b-2 border-ink", isDay60 ? "bg-yellow text-on-yellow py-10 md:py-16" : "bg-yellow text-on-yellow py-5 md:py-8"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1440px] px-4 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							size: isDay60 ? 24 : 18,
							strokeWidth: 3
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, {
							className: "text-on-yellow/70",
							children: ["MILESTONE · DAY ", dayNumber]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: cn("mt-3 font-display uppercase", isDay60 ? "text-heading-1 md:text-display-large" : "text-heading-2 md:text-heading-1"),
						children: msg.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-3 max-w-xl", isDay60 ? "text-body text-heading-3 font-display uppercase" : "text-body"),
						children: msg.sub
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onDismiss,
					className: "mt-1 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink bg-card-surface",
					"aria-label": "Dismiss milestone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						size: 14,
						strokeWidth: 3,
						className: "text-ink"
					})
				})]
			})
		})
	});
}
function LevelUpBanner({ level, onDismiss }) {
	const { title, sub } = levelUpCopy(level);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b-2 border-ink bg-yellow text-on-yellow py-5 md:py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1440px] px-4 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							size: 18,
							strokeWidth: 3
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, {
							className: "text-on-yellow/70",
							children: ["LEVEL UP · LEVEL ", level]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-heading-2 md:text-heading-1 uppercase",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-body",
						children: sub
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onDismiss,
					className: "mt-1 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink bg-card-surface",
					"aria-label": "Dismiss level up",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						size: 14,
						strokeWidth: 3,
						className: "text-ink"
					})
				})]
			})
		})
	});
}
function DaySearch({ days }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)(null);
	const results = (0, import_react.useMemo)(() => {
		if (!query && !statusFilter) return [];
		return days.filter((d) => {
			const matchesQuery = !query || d.title.toLowerCase().includes(query.toLowerCase()) || d.description.toLowerCase().includes(query.toLowerCase());
			const matchesStatus = !statusFilter || d.status === statusFilter;
			return matchesQuery && matchesStatus;
		});
	}, [
		days,
		query,
		statusFilter
	]);
	const showResults = open && (query || statusFilter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen(!open),
			className: "inline-flex items-center gap-2 border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				size: 12,
				strokeWidth: 3
			}), open ? "Close search" : "Search days"]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 border-2 border-ink bg-card-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search day titles...",
					className: "w-full rounded-none border-2 border-ink bg-base px-3 py-2 text-body text-ink outline-none focus:shadow-brutal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
							size: 9,
							strokeWidth: 3
						}), " Filter"]
					}), [
						"completed",
						"missed",
						"frozen",
						"today",
						"upcoming"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStatusFilter(statusFilter === s ? null : s),
						className: cn("border-2 px-2 py-1 font-mono mono-label uppercase tracking-[0.16em]", statusFilter === s ? "border-ink bg-ink text-base" : "border-ink bg-card-surface text-ink"),
						children: s
					}, s))]
				}),
				showResults && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 max-h-48 space-y-1 overflow-y-auto",
					children: [results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-body text-muted-ink",
						children: "No matching days found."
					}) : results.slice(0, 10).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/day/$n",
						params: { n: String(d.dayNumber) },
						className: "flex items-center justify-between gap-2 border-b border-muted-ink/20 px-1 py-2 hover:bg-sidebar-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, { children: ["Day ", d.dayNumber] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-body-bold",
								children: d.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							tone: d.status === "completed" ? "blue" : d.status === "missed" ? "red" : d.status === "frozen" ? "blue" : d.status === "today" ? "yellow" : "ink",
							children: d.status
						})]
					}, d.dayNumber)), results.length > 10 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, { children: [results.length - 10, " more results…"] })]
				})
			]
		})]
	});
}
function Dashboard() {
	const { student: profileId } = Route$7.useSearch();
	const store = useStore();
	const didSyncRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!didSyncRef.current && profileId && profileId !== store.activeProfileId) store.switchProfile(profileId);
		didSyncRef.current = true;
	}, []);
	const profile = getProfile(store.activeProfileId);
	const trackId = store.selectedTrackId ?? profile.student.selectedTrackId ?? "web-dev";
	const track = getTrack(trackId);
	const { student, achievements } = profile;
	const days = (0, import_react.useMemo)(() => {
		return profile.days.map((d) => ({
			...d,
			title: track.challengeDays[d.dayNumber - 1]?.title ?? d.title,
			description: track.challengeDays[d.dayNumber - 1]?.description ?? d.description,
			learningObjectives: track.challengeDays[d.dayNumber - 1]?.learningObjectives ?? d.learningObjectives,
			track: track.name,
			status: resolvedDayStatus(trackId, d.dayNumber, d.status, store.dayStatusOverrides)
		}));
	}, [
		profile.days,
		track,
		trackId,
		store.dayStatusOverrides
	]);
	const today = days.find((d) => d.status === "today") ?? days[0];
	const unlocked = achievements.filter((a) => a.unlockedAt);
	const locked = achievements.filter((a) => !a.unlockedAt);
	const isEmpty = student.totalDaysCompleted === 0;
	const freezesUsed = student.streakFreezesUsed + store.extraFreezesUsed;
	const freezesAvailable = Math.max(0, student.streakFreezesAvailable - store.extraFreezesUsed);
	const firstMissedDay = days.find((d) => d.status === "missed");
	const completedCount = days.filter((d) => d.status === "completed").length;
	const activeMilestone = [
		60,
		30,
		7
	].find((m) => completedCount >= m && !store.seenMilestones.includes(m));
	const xp = computeXp(days, store.dayStatusOverrides, trackId);
	const { level, currentXp, nextLevelXp, progress } = levelProgress(xp);
	const showLevelUp = level > 1 && level > store.lastCelebratedLevel && !activeMilestone;
	const todaySubmitted = resolvedDayStatus(trackId, today.dayNumber, today.status, store.dayStatusOverrides) === "completed";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { cta: false }),
			activeMilestone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MilestoneBanner, {
				dayNumber: activeMilestone,
				onDismiss: () => store.dismissMilestone(activeMilestone)
			}),
			showLevelUp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelUpBanner, {
				level,
				onDismiss: () => store.dismissLevelUp(level)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NudgeBanner, {
				time: store.mockCurrentTime,
				taskSubmitted: todaySubmitted,
				onDismiss: store.dismissNudge,
				dismissed: store.nudgeDismissed
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b-2 border-ink bg-sidebar-surface py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-y-3 gap-x-6 px-4 md:px-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-ink",
							children: "Demo Profile:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex border-2 border-ink bg-card-surface p-0.5 shadow-brutal-sm",
							children: profileList.map((p) => {
								const active = p.id === store.activeProfileId;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => store.switchProfile(p.id),
									className: cn("px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-all", active ? "bg-ink text-base shadow-none" : "bg-transparent text-ink hover:bg-sidebar-surface"),
									children: p.label
								}, p.id);
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-ink",
							children: "Simulate Time:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex border-2 border-ink bg-card-surface p-0.5 shadow-brutal-sm",
							children: [
								"day",
								"evening",
								"late-night"
							].map((t) => {
								const active = store.mockCurrentTime === t;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => store.setMockTime(t),
									className: cn("px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-all", active ? "bg-ink text-base shadow-none" : "bg-transparent text-ink hover:bg-sidebar-surface"),
									children: t
								}, t);
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1440px] px-4 py-8 md:px-10 md:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink/10 pb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: "blue",
								children: track.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/onboarding",
								className: "font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-ink hover:text-ink underline",
								children: "Change track"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 border-2 border-ink bg-card-surface px-3 py-1.5 shadow-brutal-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex -space-x-1.5",
								children: [
									"PK",
									"SR",
									"AD",
									"KM"
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-5 w-5 items-center justify-center border border-ink bg-blue font-mono text-[8px] font-bold text-on-blue",
									children: i
								}, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[11px] font-bold uppercase tracking-wider text-ink",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display font-black text-blue tabular-nums",
										children: track.totalStudents
									}),
									" ",
									"students building right now"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 lg:grid-cols-[1fr_1.2fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "lg:row-span-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreakBlock, {
									state: student.streakState,
									streak: student.currentStreak
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-sm text-body",
									children: student.streakState === "not-started" ? "Your streak starts today. Finish day 1 and this number turns blue." : student.streakState === "broken" ? "You have zero submissions so far. No shame in it — today is open and a fresh streak starts with one commit." : student.streakState === "at-risk" ? "You haven't logged today yet. Submit before midnight to keep the chain." : "Chain intact. Keep it boring and keep it daily."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FreezeCounter, { available: freezesAvailable }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, { children: [freezesUsed, " used · earn more at milestones"] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 border-t-2 border-ink/20 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
												tone: "yellow",
												children: ["Level ", level]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, { children: [currentXp, " XP"] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, { children: [
											Math.max(0, nextLevelXp - currentXp),
											" XP to Level ",
											level + 1
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2.5 h-3 w-full border-2 border-ink bg-sidebar-surface p-0.5 shadow-brutal-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-blue transition-all duration-300",
											style: { width: `${Math.round(progress * 100)}%` }
										})
									})]
								}),
								firstMissedDay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: freezesAvailable > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalButton, {
										variant: "blue",
										onClick: () => store.useStreakFreeze(firstMissedDay.dayNumber),
										className: "w-full sm:w-auto",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, {
												size: 16,
												strokeWidth: 3
											}),
											"Use Streak Freeze to protect Day ",
											firstMissedDay.dayNumber
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 border-2 border-dashed border-muted-ink bg-sidebar-surface px-3 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, {
											size: 14,
											strokeWidth: 3,
											className: "text-muted-ink"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "No freezes available — earn one at Day 30" })]
									})
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							tone: "yellow",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, {
									className: "text-on-yellow/70",
									children: [
										"Today · Day ",
										today.dayNumber,
										" of 60 · ",
										today.estimatedTime
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-heading-3 uppercase md:text-heading-2",
									children: today.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-body",
									children: today.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalLink, {
									to: "/day/$n",
									params: { n: String(today.dayNumber) },
									variant: "ink",
									className: "mt-6 w-full sm:w-auto",
									children: [
										"Open day ",
										today.dayNumber,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											size: 18,
											strokeWidth: 3
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "60-day progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-heading-3 text-blue tabular-nums",
									children: [
										student.totalDaysCompleted,
										"/60",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-2 text-label-bold",
											children: [student.completionPercentage, "%"]
										})
									]
								})]
							}),
							isEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-lg text-body",
								children: student.streakState === "not-started" ? "All 60 days are still ahead of you — nothing is missed, nothing is late." : "No days completed yet. The red squares are behind you; today's yellow square is the only one that matters."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayGrid, { days })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySearch, { days })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-heading-3 uppercase",
								children: "Achievements"
							}),
							unlocked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-card border-2 border-dashed border-muted-ink p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
											size: 16,
											strokeWidth: 3,
											className: "text-muted-ink"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-label-bold uppercase",
											children: "Nothing unlocked yet"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 max-w-md text-body",
										children: [
											"Your first badge — ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "First Submission" }),
											" — unlocks the moment you drop a commit link and a post link on day ",
											today.dayNumber,
											"."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
										to: "/day/$n",
										params: { n: String(today.dayNumber) },
										className: "mt-4",
										children: "Unlock your first badge"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2",
								children: unlocked.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: a.badgeStyle === "ink" ? "ink" : a.badgeStyle,
									children: a.title
								}, a.id))
							}),
							locked.length > 0 && unlocked.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: locked.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
									tone: "locked",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
											size: 9,
											strokeWidth: 3
										}),
										" ",
										a.title
									]
								}, a.id))
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-5 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							tone: "sidebar",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, {
									size: 16,
									strokeWidth: 3,
									className: "text-blue"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "Streak freeze"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-body",
								children: [
									"Miss a night and a freeze token spends itself automatically — the day shows as",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "frozen" }),
									", not missed, and your streak keeps counting. You have",
									" ",
									freezesAvailable,
									" left."
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							tone: "sidebar",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
										size: 16,
										strokeWidth: 3,
										className: "text-blue"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-heading-3 uppercase",
										children: "Building tonight"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [
										"AK",
										"PR",
										"SM",
										"DV",
										"NJ",
										"TS"
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-9 w-9 items-center justify-center border-2 border-ink bg-card-surface font-display text-label-small",
										children: i
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-body-bold",
									children: "412 students have already logged today."
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Dashboard as component };
