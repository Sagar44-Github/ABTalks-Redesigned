import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Check, N as ArrowRight, n as Users } from "../_libs/lucide-react.mjs";
import { a as cn, c as useStore } from "./router-N6lz0OtS.mjs";
import { c as Nav, g as tracks, i as Footer, s as MonoLabel, t as BrutalButton, u as Pill } from "./ui-Dkg9G4I4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-srIfGn0T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Onboarding() {
	const [selected, setSelected] = (0, import_react.useState)(null);
	const { selectTrack } = useStore();
	const navigate = useNavigate();
	const handleConfirm = () => {
		if (!selected) return;
		selectTrack(selected);
		navigate({
			to: "/dashboard",
			search: { student: "first-day" }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1440px] px-4 py-10 md:px-10 md:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
						className: "text-red",
						children: "STEP 1 OF 1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl font-display text-heading-2 uppercase md:text-heading-1",
						children: "Pick your track"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-body",
						children: "Each track is 60 sequenced tasks built for one skill path. You can't pick wrong — you can only not start."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: tracks.map((track) => {
							const isSelected = selected === track.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelected(track.id),
								className: cn("min-w-0 rounded-card border-2 p-5 text-left transition-all duration-150", isSelected ? "border-yellow bg-yellow/10 shadow-brutal-yellow" : "border-ink bg-card-surface shadow-brutal hover:shadow-brutal-lg"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-heading-3 uppercase",
											children: track.name
										}), isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-7 w-7 shrink-0 items-center justify-center border-2 border-ink bg-yellow",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												size: 14,
												strokeWidth: 3,
												className: "text-on-yellow"
											})
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
											tone: "ink",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
													size: 8,
													strokeWidth: 3
												}),
												" ",
												track.totalStudents.toLocaleString("en-IN")
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-body",
										children: track.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "What you'll build" }), track.exampleTasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "flex items-start gap-2 text-body-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-2 w-2 shrink-0 border border-ink bg-blue" }), task]
										}, task))]
									}),
									isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
											tone: "yellow",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
													size: 8,
													strokeWidth: 3
												}),
												" ",
												track.totalStudents.toLocaleString("en-IN"),
												" students on this track"
											]
										})
									})
								]
							}, track.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-col items-start gap-3 border-t-2 border-ink pt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalButton, {
							disabled: !selected,
							onClick: handleConfirm,
							className: "w-full sm:w-auto",
							children: ["Start this track ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								size: 18,
								strokeWidth: 3
							})]
						}), !selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Select a track above to continue" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Onboarding as component };
