import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { N as ArrowRight, _ as GitCommitHorizontal, h as Linkedin, s as Snowflake } from "../_libs/lucide-react.mjs";
import { c as Nav, g as tracks, i as Footer, l as Panel, m as platformStats, n as BrutalLink, o as LogoFull, s as MonoLabel, u as Pill } from "./ui-Dkg9G4I4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-rBtVrZnU.js
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	{
		n: "01",
		title: "Pick a track",
		body: "Web Dev, AI/ML, DSA, Mobile or Backend. One track, 60 days of tasks written in order."
	},
	{
		n: "02",
		title: "Build daily",
		body: "A scoped task every day. 60–90 minutes, doable after college, finishable before you sleep."
	},
	{
		n: "03",
		title: "Submit proof",
		body: "Drop a GitHub commit link and a LinkedIn post link. That's the whole ritual. Streak continues."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-[1440px] px-4 pb-14 pt-12 md:px-10 md:pb-24 md:pt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoFull, { className: "h-14 md:h-18 w-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
								tone: "red",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), " Cohort live now"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 max-w-4xl font-display text-hero-clamp uppercase",
							children: [
								"60 days.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"One commit.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"One post."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-body",
							children: "Pick a track. Build daily. Prove it with a commit and a post. In two months you stop being a student with a resume and start being a developer with receipts."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalLink, {
								to: "/onboarding",
								className: "w-full sm:w-auto",
								children: ["Start your streak ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									size: 18,
									strokeWidth: 3
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
								to: "/day/$n",
								params: { n: "12" },
								variant: "outline",
								className: "w-full sm:w-auto",
								children: "See a day's task"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-end gap-x-10 gap-y-6 border-t-2 border-ink pt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-heading-2 text-blue tabular-nums",
									children: platformStats.studentsOnStreak.toLocaleString("en-IN")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Students on a streak right now" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-heading-2 text-blue tabular-nums",
									children: platformStats.proofsSubmitted.toLocaleString("en-IN")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Proofs submitted" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-heading-2 text-blue tabular-nums",
									children: platformStats.collegesRepresented
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Colleges represented" })] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-y-2 border-ink bg-sidebar-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-heading-2 uppercase md:text-heading-1",
							children: "How it works"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-5 md:grid-cols-3",
							children: steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
									className: "text-red",
									children: s.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-heading-3 uppercase",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-body",
									children: s.body
								})
							] }, s.n))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "max-w-2xl font-display text-heading-2 uppercase md:text-heading-1",
							children: "The proof is public. That's the point."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-body",
							children: "Every day you finish leaves two artefacts a recruiter can actually open: a commit in a public repo and a post on your feed. After 60 days, that's 120 pieces of evidence."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
								className: "overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Finished profile · Day 60" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-display-large leading-none text-blue tabular-nums",
											children: "60"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-heading-3 uppercase",
											children: "days, unbroken"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 grid grid-cols-10 gap-1",
										children: Array.from({ length: 60 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `aspect-square border-2 border-ink ${i === 5 || i === 31 ? "border-dashed border-blue bg-card-surface" : "bg-blue"}` }, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-body-bold",
										children: "58 submitted, 2 protected by freeze tokens, 0 broken."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex flex-wrap gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
												tone: "blue",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCommitHorizontal, {
													size: 10,
													strokeWidth: 3
												}), " 60 commits"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
												tone: "ink",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
													size: 10,
													strokeWidth: 3
												}), " 60 posts"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
												tone: "yellow",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, {
													size: 10,
													strokeWidth: 3
												}), " 2 freezes used"]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
										tone: "sidebar",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-body",
											children: "“I applied with the repo link instead of a resume bullet. The interviewer scrolled my commit history for ten minutes.”"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 font-display text-label-bold uppercase",
											children: "Neha S. · Web Dev cohort 4"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
										tone: "sidebar",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-body",
											children: "“The freeze token is why I'm still here. I missed one night and didn't quit the next day out of shame.”"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 font-display text-label-bold uppercase",
											children: "Karthik R. · DSA cohort 3"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
										tone: "blue",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display text-heading-2",
											children: [platformStats.finishRate, "%"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-body-bold",
											children: "of students who reach day 10 finish all 60. The first week is the hard part."
										})]
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t-2 border-ink bg-sidebar-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-heading-2 uppercase md:text-heading-1",
								children: "Pick a track"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xl text-body",
								children: "Each track is 60 sequenced tasks. You can't pick wrong — you can only not start."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
								children: tracks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-heading-3 uppercase",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
										tone: "ink",
										children: [t.totalStudents.toLocaleString("en-IN"), " in"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-body",
									children: t.description
								})] }, t.id))
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-y-2 border-ink bg-yellow text-on-yellow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[1440px] px-4 py-14 md:px-10 md:py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "max-w-3xl font-display text-heading-2 uppercase md:text-heading-1",
								children: "Your streak starts tonight or it doesn't start."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xl text-body",
								children: "Day 1 takes 60 minutes. Pick your track, build the thing, drop the two links."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalLink, {
								to: "/onboarding",
								variant: "ink",
								className: "mt-8",
								children: ["Start day 1 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									size: 18,
									strokeWidth: 3
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-t-2 border-ink bg-sidebar-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-[1440px] px-4 py-10 md:px-10 md:py-14",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
								className: "text-red",
								children: "EXPLORE THE PRODUCT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 max-w-3xl font-display text-heading-3 uppercase md:text-heading-2",
								children: "Every feature, one click away"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
										to: "/onboarding",
										variant: "yellow",
										className: "w-full justify-start",
										children: "Pick a Track"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
										to: "/dashboard",
										variant: "outline",
										className: "w-full justify-start",
										children: "Dashboard"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
										to: "/day/$n",
										params: { n: "12" },
										variant: "outline",
										className: "w-full justify-start",
										children: "Day 12 Task"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
										to: "/day/$n",
										params: { n: "1" },
										variant: "outline",
										className: "w-full justify-start",
										children: "Day 1 Task"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
										to: "/history",
										variant: "outline",
										className: "w-full justify-start",
										children: "Submission History"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
										to: "/leaderboard",
										variant: "outline",
										className: "w-full justify-start",
										children: "Leaderboard"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
										to: "/settings",
										variant: "outline",
										className: "w-full justify-start",
										children: "Settings"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
										to: "/docs",
										variant: "outline",
										className: "w-full justify-start",
										children: "Documentation"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Demo profiles" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
											to: "/u/$username",
											params: { username: "riya-nandan" },
											variant: "ink",
											className: "text-label-small",
											children: "Riya — mid-challenge"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
											to: "/u/$username",
											params: { username: "arjun-mehta" },
											variant: "ink",
											className: "text-label-small",
											children: "Arjun — day one"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
											to: "/u/$username",
											params: { username: "sana-qureshi" },
											variant: "ink",
											className: "text-label-small",
											children: "Sana — empty profile"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
											to: "/dashboard",
											search: { student: "first-day" },
											variant: "ink",
											className: "text-label-small",
											children: "Dashboard: first day"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
											to: "/dashboard",
											search: { student: "empty" },
											variant: "ink",
											className: "text-label-small",
											children: "Dashboard: empty"
										})
									]
								})]
							})
						]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Landing as component };
