import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { D as ChevronRight, S as ExternalLink, k as ChevronDown, s as Snowflake } from "../_libs/lucide-react.mjs";
import { a as cn } from "./router-N6lz0OtS.mjs";
import { c as Nav, i as Footer, l as Panel, n as BrutalLink, s as MonoLabel, t as BrutalButton, u as Pill } from "./ui-Dkg9G4I4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/docs-BbQIhuM1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sections = [
	{
		id: "about-abtalks",
		label: "About ABTalks"
	},
	{
		id: "about-redesign",
		label: "About This Redesign"
	},
	{
		id: "design-system",
		label: "Design System"
	},
	{
		id: "features",
		label: "Feature Overview"
	},
	{
		id: "edge-cases",
		label: "Edge Cases & Decisions"
	},
	{
		id: "tech-stack",
		label: "Tech Stack"
	},
	{
		id: "links",
		label: "Links"
	}
];
function DocsPage() {
	const [tocOpen, setTocOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b-2 border-ink bg-sidebar-surface md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setTocOpen(!tocOpen),
					className: "flex w-full items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "DOCS · TABLE OF CONTENTS" }), tocOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						size: 14,
						strokeWidth: 3
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						size: 14,
						strokeWidth: 3
					})]
				}), tocOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "border-t border-muted-ink/20 px-4 pb-3",
					children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${s.id}`,
						onClick: () => setTocOpen(false),
						className: "block py-1.5 font-display text-label-bold uppercase hover:text-blue",
						children: s.label
					}, s.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-[1440px] px-4 py-8 md:px-10 md:py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden w-48 shrink-0 md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-24",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "DOCS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "mt-4 space-y-2",
								children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `#${s.id}`,
									className: "block font-display text-label-bold uppercase hover:text-blue",
									children: s.label
								}, s.id))
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
								className: "text-red",
								children: "DOCUMENTATION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-display text-heading-2 uppercase md:text-heading-1",
								children: "ABTalks Redesign"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xl text-body",
								children: "Reference documentation for the ABTalks 60-day challenge redesign. Design system, features, decisions, and project context."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "about-abtalks",
								className: "mt-12 scroll-mt-24",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "About ABTalks"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 max-w-2xl space-y-3 text-body",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"ABTalks is a ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "60-day coding challenge" }),
											" for Indian college students. The premise is simple: pick a track (Web Dev, AI/ML, DSA, Mobile, or Backend), then build something every day for 60 days."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"Each day you complete two actions: push a commit to a public GitHub repo and publish a LinkedIn post about what you built. Those two artifacts — the commit and the post — are your ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "proof of work" }),
											". After 60 days, you have 120 pieces of public evidence that you can actually build."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Why it exists:" }), " building consistency and making students visible to recruiters. A resume says “I know React.” A 60-day commit history proves it."] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Who it's for:" }), " primarily mobile users, late at night, after college. The platform needs to work well on a phone at 11 PM."] })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "about-redesign",
								className: "mt-12 scroll-mt-24",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "About This Redesign"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 max-w-2xl space-y-3 text-body",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"The original ABTalks product worked but had never been designed — it was functional with default styling. This is a ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ground-up mobile-first redesign" }),
											" built as a hackathon submission."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This was built as part of a hackathon challenge. The goal was to reimagine the ABTalks experience with a strong design system, attention to edge cases, and features that reinforce the product's core purpose of making daily proof visible to recruiters." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Important:" }), " all data throughout this application is mocked. There is no real authentication or backend, per the challenge's stated scope. Student profiles, submissions, and statistics are all mock data designed to demonstrate the UI and features."] })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "design-system",
								className: "mt-12 scroll-mt-24",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-heading-3 uppercase",
										children: "Design System — Brutalist Command Center"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 max-w-2xl text-body",
										children: "High-contrast, mechanical, developer-tool credibility layer. Every element is designed to feel deliberate and information-dense rather than decorative. Zero border radius on all interactive elements. Hard offset shadows that never blur."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-8 font-display text-label-bold uppercase",
										children: "Color Palette"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4",
										children: [
											{
												name: "Base",
												bg: "bg-base",
												border: true
											},
											{
												name: "Card Surface",
												bg: "bg-card-surface",
												border: true
											},
											{
												name: "Sidebar",
												bg: "bg-sidebar-surface",
												border: true
											},
											{
												name: "Ink",
												bg: "bg-ink",
												border: false
											},
											{
												name: "Accent Yellow",
												bg: "bg-yellow",
												border: true
											},
											{
												name: "Accent Red",
												bg: "bg-red",
												border: false
											},
											{
												name: "Accent Blue",
												bg: "bg-blue",
												border: false
											},
											{
												name: "Footer Dark",
												bg: "bg-footer-dark",
												border: false
											}
										].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-12 w-full border-2", c.bg, c.border ? "border-ink" : "border-transparent") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: c.name })]
										}, c.name))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-8 font-display text-label-bold uppercase",
										children: "Type Scale"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 space-y-3 border-2 border-ink bg-card-surface p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "HEADING-1 · 48px" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-heading-1 uppercase",
												children: "Heading one"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "HEADING-2 · 36px" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-heading-2 uppercase",
												children: "Heading two"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "HEADING-3 · 30px" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-heading-3 uppercase",
												children: "Heading three"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "SUBHEADING · 20px" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-subheading uppercase",
												children: "Subheading"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "LABEL-BOLD · 16px" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-label-bold uppercase",
												children: "Label bold"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "BODY · 16px" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-body",
												children: "Body text for paragraphs and descriptions."
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "MONO-LABEL · 9px" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "MONO LABEL UTILITY TEXT" })] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-8 font-display text-label-bold uppercase",
										children: "Buttons — Zero Border Radius"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalButton, {
												variant: "yellow",
												children: "Yellow Primary"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalButton, {
												variant: "blue",
												children: "Blue Action"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalButton, {
												variant: "ink",
												children: "Ink Dark"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalButton, {
												variant: "outline",
												children: "Outline Ghost"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalButton, {
												disabled: true,
												children: "Disabled"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-8 font-display text-label-bold uppercase",
										children: "Card — Hard Offset Shadow"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid gap-3 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "DEFAULT CARD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-body",
												children: "4px hard shadow, 12px radius, 2px ink border."
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
												tone: "yellow",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
													className: "text-on-yellow/70",
													children: "YELLOW CARD"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-body",
													children: "For high-priority content like today's task."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
												tone: "sidebar",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "SIDEBAR CARD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-body",
													children: "For secondary/supporting content."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
												tone: "blue",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
													className: "text-on-blue/70",
													children: "BLUE CARD"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-body",
													children: "For success/confirmation states."
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-8 font-display text-label-bold uppercase",
										children: "Pills & Badges"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: "ink",
												children: "Ink"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: "blue",
												children: "Blue"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: "yellow",
												children: "Yellow"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: "red",
												children: "Red"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
												tone: "locked",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, {
													size: 9,
													strokeWidth: 3
												}), " Locked"]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "features",
								className: "mt-12 scroll-mt-24",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "Feature Overview"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-label-bold uppercase text-blue",
											children: "Core (MVP)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "mt-2 space-y-1 text-body",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Landing page" }),
													" — explains the challenge, shows platform stats, track picker preview"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dashboard" }),
													" — your streak, today's task, 60-day progress grid, achievements"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Day page" }),
													" — task details, learning objectives, proof submission form with auto-drafted LinkedIn caption"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Three edge cases" }),
													" — mid-challenge, first-day, empty profile, all fully designed"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dark mode" }),
													" — full light/dark support across every route"
												] })
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-label-bold uppercase text-blue",
											children: "Track Personalisation"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "mt-2 space-y-1 text-body",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Track selection" }),
													" — choose from 5 tracks, each with distinct 60-day curricula"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Personalised content" }),
													" — dashboard and day pages reflect your chosen track's tasks"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Day navigation" }),
													" — prev/next controls, all 60 days browsable with preview states for future days"
												] })
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-label-bold uppercase text-blue",
											children: "Streak Mechanics"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "mt-2 space-y-1 text-body",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Interactive streak freeze" }),
													" — actually usable, not just a badge. Click to protect a missed day."
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Milestone celebrations" }),
													" — Day 7, 30, and 60 trigger distinct celebration states"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Live micro-interactions" }),
													" — toast notifications on submit and freeze use"
												] })
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-label-bold uppercase text-blue",
											children: "Visibility & Sharing"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "mt-2 space-y-1 text-body",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Public profile" }),
													" — recruiter-readable /u/username page with outbound proof links"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Share cards" }),
													" — downloadable branded image cards for each day's submission"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Leaderboard" }),
													" — ranked by streak or completion, with profile links"
												] })
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-label-bold uppercase text-blue",
											children: "Other"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "mt-2 space-y-1 text-body",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Submission history" }),
													" — reverse-chronological record of all proof submitted"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Search/filter" }),
													" — find specific days across the 60-day curriculum"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Time-aware nudges" }),
													" — different tone banners for day/evening/late-night"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Settings" }),
													" — track switching, theme control, notification prefs, privacy toggle"
												] })
											]
										})] })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "edge-cases",
								className: "mt-12 scroll-mt-24",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "Edge Cases & Design Decisions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 max-w-2xl space-y-5 text-body",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-label-bold uppercase",
											children: "Missed days feel supportive, not punishing"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1",
											children: "Red squares communicate what happened — they never include copy that shames or scolds. “The red squares are behind you; today's yellow square is the only one that matters.”"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-label-bold uppercase",
											children: "Streak freeze turns failure into a feature"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1",
											children: "Rather than letting one missed night destroy momentum, the freeze mechanic acknowledges that life happens and gives students a recovery path that feels earned, not handed out."
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-label-bold uppercase",
											children: "Public profiles exist because the brief says so"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1",
											children: "The original brief explicitly says the daily proof mechanic exists to make students “visible to recruiters.” The /u/username page is the only artifact in the product that actually fulfils that goal — it creates something a recruiter can open and evaluate."
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-label-bold uppercase",
											children: "Empty states are invitations, not apologies"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1",
											children: "Every empty state — no submissions, no achievements, no track selected — points the user toward the single next action they should take, rather than showing a blank screen or a generic “nothing here yet” message."
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-label-bold uppercase",
											children: "Time-aware nudges respond to the stated usage pattern"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1",
											children: "The brief says students use the platform “on their phones, late at night after college.” The nudge banner changes tone based on time of day — gentle during the day, more urgent (but never shaming) late at night."
										})] })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "tech-stack",
								className: "mt-12 scroll-mt-24",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "Tech Stack"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 border-2 border-ink bg-card-surface p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "space-y-1 text-body",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Framework:" }), " React 19 + TanStack Start (file-based routing, SSR)"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Styling:" }), " Tailwind CSS v4 with custom design tokens"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fonts:" }), " Space Grotesk (display), Inter (body), JetBrains Mono (labels)"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "State:" }), " React Context + localStorage (no backend)"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Data:" }), " Mocked JSON — 2 full 60-day track curricula, 3 demo profiles, 20 leaderboard entries"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Deployment:" }), " Cloudflare (via Vite + Nitro)"] })
										]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								id: "links",
								className: "mt-12 scroll-mt-24",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "Links"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "https://github.com/Sagar44-Github/commit-streak-forge",
											target: "_blank",
											rel: "noreferrer",
											className: "flex items-center gap-2 border-2 border-ink bg-card-surface p-3 font-display text-label-bold uppercase shadow-brutal-sm press",
											children: ["GitHub Repository ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
												size: 14,
												strokeWidth: 3
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "https://github.com/Sagar44-Github/commit-streak-forge/blob/main/PROMPTS.md",
											target: "_blank",
											rel: "noreferrer",
											className: "flex items-center gap-2 border-2 border-ink bg-card-surface p-3 font-display text-label-bold uppercase shadow-brutal-sm press",
											children: ["PROMPTS.md ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
												size: 14,
												strokeWidth: 3
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalLink, {
											to: "/",
											children: "Back to the product"
										})
									]
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { DocsPage as component };
