import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sun, d as Moon, f as Monitor, i as TriangleAlert, j as Bell, u as RefreshCw, x as Eye } from "../_libs/lucide-react.mjs";
import { a as cn, c as useStore, l as useTheme } from "./router-N6lz0OtS.mjs";
import { c as Nav, g as tracks, i as Footer, l as Panel, s as MonoLabel, t as BrutalButton, u as Pill } from "./ui-Dkg9G4I4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CU2mpriY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Toggle({ checked, onChange, label, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer items-start gap-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			onClick: () => onChange(!checked),
			className: cn("mt-0.5 flex h-7 w-12 shrink-0 items-center rounded-none border-2 border-ink p-0.5 transition-colors", checked ? "bg-blue" : "bg-sidebar-surface"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-5 w-5 border-2 border-ink bg-card-surface transition-transform", checked ? "translate-x-5" : "translate-x-0") })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-label-bold uppercase",
			children: label
		}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-body text-muted-ink",
			children: description
		})] })]
	});
}
function SettingsPage() {
	const store = useStore();
	const { isDark, toggle: toggleTheme } = useTheme();
	const navigate = useNavigate();
	const [showTrackWarning, setShowTrackWarning] = (0, import_react.useState)(false);
	const [pendingTrack, setPendingTrack] = (0, import_react.useState)(null);
	const currentTrack = tracks.find((t) => t.id === store.selectedTrackId) ?? tracks[0];
	const handleTrackSelect = (trackId) => {
		if (trackId === store.selectedTrackId) return;
		setPendingTrack(trackId);
		setShowTrackWarning(true);
	};
	const confirmTrackSwitch = () => {
		if (pendingTrack) {
			store.selectTrack(pendingTrack);
			setShowTrackWarning(false);
			setPendingTrack(null);
		}
	};
	const setTheme = (pref) => {
		store.setThemePreference(pref);
		if (pref === "system") {
			const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			document.documentElement.classList.toggle("dark", systemDark);
		} else document.documentElement.classList.toggle("dark", pref === "dark");
		try {
			localStorage.setItem("abtalks-theme", pref === "system" ? "" : pref);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { cta: false }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[700px] px-4 py-8 md:px-10 md:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Settings" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-heading-2 uppercase md:text-heading-1",
						children: "Preferences"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
									size: 16,
									strokeWidth: 3,
									className: "text-blue"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "Track"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-body",
								children: [
									"Currently on ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentTrack.name }),
									". Switching tracks will change your daily content."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: tracks.map((t) => {
									const isActive = t.id === store.selectedTrackId;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => handleTrackSelect(t.id),
										className: cn("border-2 p-3 text-left transition-all duration-150", isActive ? "border-yellow bg-yellow/10 shadow-brutal-yellow" : "border-ink bg-card-surface shadow-brutal-sm hover:shadow-brutal"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-label-bold uppercase",
												children: t.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-body-bold text-muted-ink",
												children: t.description
											}),
											isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: "yellow",
												className: "mt-2",
												children: "Current"
											})
										]
									}, t.id);
								})
							}),
							showTrackWarning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 border-2 border-red bg-red/10 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											size: 16,
											strokeWidth: 3,
											className: "text-red"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display text-label-bold uppercase text-red",
											children: [
												"Switch to ",
												tracks.find((t) => t.id === pendingTrack)?.name,
												"?"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-body",
										children: "Switching tracks will change your daily content. Your progress data persists but day tasks will reflect the new track's curriculum."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalButton, {
											variant: "ink",
											onClick: confirmTrackSwitch,
											children: "Confirm switch"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalButton, {
											variant: "outline",
											onClick: () => {
												setShowTrackWarning(false);
												setPendingTrack(null);
											},
											children: "Cancel"
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
								size: 16,
								strokeWidth: 3,
								className: "text-blue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-heading-3 uppercase",
								children: "Theme"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex gap-2",
							children: [
								{
									value: "light",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
										size: 14,
										strokeWidth: 3
									}),
									label: "Light"
								},
								{
									value: "dark",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
										size: 14,
										strokeWidth: 3
									}),
									label: "Dark"
								},
								{
									value: "system",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
										size: 14,
										strokeWidth: 3
									}),
									label: "System"
								}
							].map(({ value, icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTheme(value),
								className: cn("inline-flex items-center gap-2 border-2 border-ink px-4 py-3 font-display text-label-bold uppercase", store.themePreference === value ? "bg-ink text-base shadow-none" : "bg-card-surface shadow-brutal-sm press"),
								children: [
									icon,
									" ",
									label
								]
							}, value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
									size: 16,
									strokeWidth: 3,
									className: "text-blue"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "Notifications"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
								className: "mt-1 block",
								children: "Mocked — no real notifications are sent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 divide-y divide-muted-ink/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									checked: store.notificationPrefs.eveningReminder,
									onChange: (v) => store.setNotificationPrefs({ eveningReminder: v }),
									label: "Evening reminder",
									description: "Get a nudge in the evening if you haven't submitted today"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
								size: 16,
								strokeWidth: 3,
								className: "text-blue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-heading-3 uppercase",
								children: "Public profile"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							checked: store.isPublic,
							onChange: (v) => store.setIsPublic(v),
							label: "Profile visible to others",
							description: "When enabled, your /u/username page is accessible to anyone with the link"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						tone: "sidebar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-heading-3 uppercase",
								children: "Reset all data"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-body",
								children: "Clear all localStorage data and return to a fresh state. This is useful during demos."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrutalButton, {
								variant: "outline",
								className: "mt-3",
								onClick: () => {
									store.resetStore();
									navigate({ to: "/onboarding" });
								},
								children: "Reset everything"
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
export { SettingsPage as component };
