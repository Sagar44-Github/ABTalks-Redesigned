import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as ArrowRight, S as ExternalLink, _ as GitCommitHorizontal, h as Linkedin } from "../_libs/lucide-react.mjs";
import { c as useStore, r as Route$5 } from "./router-N6lz0OtS.mjs";
import { c as Nav, d as getProfile, i as Footer, l as Panel, n as BrutalLink, s as MonoLabel, u as Pill } from "./ui-Dkg9G4I4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-CjuRFX0s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const { student: profileId } = Route$5.useSearch();
	const store = useStore();
	const didSyncRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!didSyncRef.current && profileId && profileId !== store.activeProfileId) store.switchProfile(profileId);
		didSyncRef.current = true;
	}, []);
	const profile = getProfile(store.activeProfileId);
	const profileSubmissions = profile.days.filter((d) => d.status === "completed" && d.submission).map((d) => ({
		dayNumber: d.dayNumber,
		trackId: profile.student.selectedTrackId ?? "web-dev",
		taskTitle: d.title,
		submittedAt: d.submission.submittedAt,
		githubUrl: d.submission.githubUrl,
		linkedinUrl: d.submission.linkedinUrl,
		status: d.status
	}));
	const allSubmissions = [...store.submissions, ...profileSubmissions].filter((item, index, self) => index === self.findIndex((s) => s.dayNumber === item.dayNumber)).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
	const frozenDays = profile.days.filter((d) => d.status === "frozen");
	const isEmpty = allSubmissions.length === 0 && frozenDays.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { cta: false }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Submission history" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-heading-2 uppercase md:text-heading-1",
						children: "Your proof of work"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-xl text-body",
						children: [
							"Every commit and post submitted for",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-label-bold text-blue",
								children: profile.student.name
							}),
							"."
						]
					}),
					isEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						className: "mt-8",
						tone: "sidebar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-heading-3 uppercase",
									children: "No submissions yet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-3 max-w-md text-body",
									children: "Your history starts the moment you submit your first proof. One commit link, one post link — that's all it takes. Today's task is waiting."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalLink, {
									to: "/dashboard",
									className: "mt-6",
									children: ["Go to today's task ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										size: 18,
										strokeWidth: 3
									})]
								})
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-3",
						children: [allSubmissions.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "block cursor-pointer border-2 border-ink bg-card-surface p-4 shadow-brutal transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/day/$n",
									params: { n: String(sub.dayNumber) },
									className: "flex flex-wrap items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-10 w-10 items-center justify-center border-2 border-ink bg-blue font-display text-label-bold text-on-blue",
											children: sub.dayNumber
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-label-bold uppercase",
											children: sub.taskTitle
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: new Date(sub.submittedAt).toLocaleDateString("en-IN", {
											day: "numeric",
											month: "short",
											year: "numeric"
										}) })] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										tone: "blue",
										children: "Completed"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: sub.githubUrl,
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
										href: sub.linkedinUrl,
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
								}),
								sub.aiFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 border-2 border-ink bg-sidebar-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "AI Feedback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-body",
										children: sub.aiFeedback
									})]
								})
							]
						}, sub.dayNumber)), frozenDays.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/day/$n",
							params: { n: String(d.dayNumber) },
							className: "block border-2 border-dashed border-blue bg-card-surface p-4 transition-all duration-150 hover:shadow-brutal-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-10 w-10 items-center justify-center border-2 border-dashed border-blue bg-card-surface font-display text-label-bold text-blue",
										children: d.dayNumber
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-label-bold uppercase",
										children: d.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Protected by streak freeze" })] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: "blue",
									children: "Frozen"
								})]
							})
						}, `frozen-${d.dayNumber}`))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { HistoryPage as component };
