import { a as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Check, C as Download, D as ChevronRight, N as ArrowRight, O as ChevronLeft, P as ArrowLeft, _ as GitCommitHorizontal, h as Linkedin, m as Lock, s as Snowflake, w as Copy, y as Flame } from "../_libs/lucide-react.mjs";
import { a as cn, c as useStore, n as Route$1, o as resolvedDayStatus } from "./router-N6lz0OtS.mjs";
import { c as Nav, d as getProfile, f as getTrack, i as Footer, l as Panel, s as MonoLabel, t as BrutalButton, u as Pill } from "./ui-Dkg9G4I4.mjs";
import { t as getAiFeedback } from "./ai-CkUNhRfY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/day._n-BBkhsXv_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShareCard({ studentName, studentInitials, dayNumber, taskTitle, currentStreak, trackName, isMilestone = false, milestoneMessage }) {
	const cardRef = (0, import_react.useRef)(null);
	const handleDownload = (0, import_react.useCallback)(async () => {
		if (!cardRef.current) return;
		try {
			const canvas = document.createElement("canvas");
			const rect = cardRef.current.getBoundingClientRect();
			const scale = 2;
			canvas.width = rect.width * scale;
			canvas.height = rect.height * scale;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			ctx.scale(scale, scale);
			if (isMilestone) ctx.fillStyle = "#ffcc00";
			else ctx.fillStyle = "#1a1a1a";
			ctx.fillRect(0, 0, rect.width, rect.height);
			const cardX = 20;
			const cardY = 20;
			const cardW = rect.width - 40;
			const cardH = rect.height - 40;
			ctx.fillStyle = isMilestone ? "#1a1a1a" : "#ffffff";
			ctx.fillRect(24, 24, cardW, cardH);
			ctx.fillStyle = isMilestone ? "#ffcc00" : "#ffffff";
			ctx.fillRect(cardX, cardY, cardW, cardH);
			ctx.strokeStyle = "#1a1a1a";
			ctx.lineWidth = 2;
			ctx.strokeRect(cardX, cardY, cardW, cardH);
			const textColor = "#1a1a1a";
			ctx.fillStyle = textColor;
			ctx.font = "900 14px 'Space Grotesk', sans-serif";
			ctx.fillText("ABTALKS", 40, 55);
			ctx.font = "700 9px 'JetBrains Mono', monospace";
			ctx.fillStyle = "#55524d";
			ctx.fillText(`#ABTALKS60DAYCHALLENGE · ${trackName.toUpperCase()}`, 40, 80);
			ctx.fillStyle = textColor;
			ctx.font = "900 48px 'Space Grotesk', sans-serif";
			ctx.fillText(`DAY ${dayNumber}`, 40, 135);
			ctx.font = "700 16px 'Space Grotesk', sans-serif";
			ctx.fillStyle = textColor;
			const maxWidth = cardW - 40;
			const words = taskTitle.split(" ");
			let line = "";
			let y = 165;
			for (const word of words) {
				const testLine = line + (line ? " " : "") + word;
				if (ctx.measureText(testLine).width > maxWidth && line) {
					ctx.fillText(line, 40, y);
					line = word;
					y += 22;
				} else line = testLine;
			}
			ctx.fillText(line, 40, y);
			ctx.font = "900 36px 'Space Grotesk', sans-serif";
			ctx.fillStyle = "#0055ff";
			ctx.fillText(`${currentStreak}`, 40, y + 55);
			ctx.font = "700 9px 'JetBrains Mono', monospace";
			ctx.fillStyle = "#55524d";
			ctx.fillText("DAY STREAK", 40 + ctx.measureText(`${currentStreak}  `).width, y + 55);
			ctx.font = "900 12px 'Space Grotesk', sans-serif";
			ctx.fillStyle = textColor;
			ctx.fillText(studentName.toUpperCase(), 40, cardH + cardY - 15);
			if (isMilestone && milestoneMessage) {
				ctx.font = "900 14px 'Space Grotesk', sans-serif";
				ctx.fillStyle = "#d3291c";
				ctx.fillText(milestoneMessage, 40, y + 85);
			}
			const link = document.createElement("a");
			link.download = `abtalks-day-${dayNumber}.png`;
			link.href = canvas.toDataURL("image/png");
			link.click();
		} catch {
			alert("Screenshot this card to share!");
		}
	}, [
		dayNumber,
		taskTitle,
		currentStreak,
		studentName,
		trackName,
		isMilestone,
		milestoneMessage
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: cardRef,
			className: cn("overflow-hidden border-2 border-ink p-5", isMilestone ? "bg-yellow text-on-yellow" : "bg-ink text-base"),
			style: {
				width: "100%",
				maxWidth: 400
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("border-2 p-5 shadow-brutal", isMilestone ? "border-ink bg-yellow" : "border-base bg-card-surface text-ink"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, {
						className: isMilestone ? "text-on-yellow/70" : void 0,
						children: "ABTALKS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("mt-1 font-mono mono-label uppercase tracking-[0.16em]", isMilestone ? "text-on-yellow/60" : "text-muted-ink"),
						children: ["#ABTalks60DayChallenge · ", trackName]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-display text-heading-1 uppercase",
						children: ["DAY ", dayNumber]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-label-bold uppercase",
						children: taskTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-baseline gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
								size: 16,
								strokeWidth: 3,
								className: "text-blue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-heading-2 text-blue tabular-nums",
								children: currentStreak
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "day streak" })
						]
					}),
					isMilestone && milestoneMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-label-bold uppercase text-red",
						children: milestoneMessage
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center gap-2 border-t-2 border-ink pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex h-7 w-7 items-center justify-center font-display text-label-small", isMilestone ? "bg-ink text-yellow" : "bg-blue text-on-blue"),
							children: studentInitials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-label-small uppercase",
							children: studentName
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalButton, {
			onClick: handleDownload,
			variant: "outline",
			className: "w-full sm:w-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
				size: 16,
				strokeWidth: 3
			}), " Download Share Card"]
		})]
	});
}
var githubRe = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/.*)?$/i;
var linkedinRe = /^https?:\/\/(www\.)?linkedin\.com\/.+$/i;
function Field({ label, icon, value, onChange, placeholder, valid, hint }) {
	const showError = value.length > 0 && !valid;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex items-center gap-2 font-display text-label-bold uppercase",
			children: [icon, label]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			inputMode: "url",
			"aria-invalid": showError,
			"aria-describedby": `${label}-hint`,
			className: `mt-2 w-full rounded-none border-2 bg-card-surface px-3 py-3 text-body text-ink outline-none focus:shadow-brutal ${showError ? "border-red" : "border-ink"}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			id: `${label}-hint`,
			className: `mt-1.5 font-mono mono-label uppercase tracking-[0.16em] ${showError ? "text-red" : "text-muted-ink"}`,
			children: showError ? `Doesn't look like a ${label} URL` : hint
		})
	] });
}
function DayPage() {
	const { n } = Route$1.useParams();
	const { student: profileId } = Route$1.useSearch();
	const store = useStore();
	const didSyncRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!didSyncRef.current && profileId && profileId !== store.activeProfileId) store.switchProfile(profileId);
		didSyncRef.current = true;
	}, []);
	const profile = getProfile(store.activeProfileId);
	const dayNumber = Number(n);
	const trackId = store.selectedTrackId ?? profile.student.selectedTrackId ?? "web-dev";
	const track = getTrack(trackId);
	const trackDay = track.challengeDays[dayNumber - 1];
	if (!trackDay) throw notFound();
	const baseDay = profile.days.find((d) => d.dayNumber === dayNumber);
	if (!baseDay) throw notFound();
	const dayStatus = resolvedDayStatus(trackId, dayNumber, baseDay.status, store.dayStatusOverrides);
	const day = {
		...baseDay,
		...trackDay,
		status: dayStatus,
		submission: dayStatus === "completed" ? baseDay.submission : null
	};
	const [github, setGithub] = (0, import_react.useState)("");
	const [linkedin, setLinkedin] = (0, import_react.useState)("");
	const draft = (0, import_react.useMemo)(() => `Day ${day.dayNumber} of my #ABTalks60DayChallenge 🚀\n\nToday I built: ${day.title}.\n\nWhat I learned:\n${day.learningObjectives.map((o) => `• ${o}`).join("\n")}\n\nCommit pushed, day logged. ${60 - day.dayNumber} to go.\n\n#100DaysOfCode #BuildInPublic #ABTalks`, [day]);
	const [caption, setCaption] = (0, import_react.useState)(draft);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [showShareCard, setShowShareCard] = (0, import_react.useState)(false);
	const [aiFeedback, setAiFeedback] = (0, import_react.useState)(null);
	const [aiFeedbackLoading, setAiFeedbackLoading] = (0, import_react.useState)(false);
	const [aiFeedbackError, setAiFeedbackError] = (0, import_react.useState)(null);
	const githubValid = githubRe.test(github.trim());
	const linkedinValid = linkedinRe.test(linkedin.trim());
	const canSubmit = githubValid && linkedinValid;
	const alreadyDone = day.status === "completed" && day.submission !== null;
	const isFuture = day.status === "upcoming";
	const isMilestone = [
		7,
		30,
		60
	].includes(dayNumber);
	const milestoneMessages = {
		7: "7 days straight. You're building a habit.",
		30: "Halfway there. 30 days of proof.",
		60: "60 days. Done. You finished."
	};
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(caption);
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	};
	const handleSubmit = async () => {
		if (!canSubmit) return;
		const record = {
			dayNumber: day.dayNumber,
			trackId,
			taskTitle: day.title,
			submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
			githubUrl: github.trim(),
			linkedinUrl: linkedin.trim(),
			status: "completed",
			aiFeedbackStatus: "pending"
		};
		store.submitDay(record);
		store.showToast("Proof submitted. +15 XP earned — streak continues!");
		setSubmitted(true);
		setAiFeedbackLoading(true);
		try {
			const result = await getAiFeedback({ data: {
				taskTitle: day.title,
				taskDescription: day.description,
				learningObjectives: day.learningObjectives,
				githubUrl: github.trim()
			} });
			if (result.success && result.feedback) {
				setAiFeedback(result.feedback);
				store.updateSubmissionFeedback(day.dayNumber, result.feedback, "success");
			} else {
				setAiFeedbackError(result.error ?? "AI feedback unavailable");
				store.updateSubmissionFeedback(day.dayNumber, null, "failed");
			}
		} catch {
			setAiFeedbackError("AI feedback is temporarily unavailable. Your submission was saved successfully.");
			store.updateSubmissionFeedback(day.dayNumber, null, "failed");
		} finally {
			setAiFeedbackLoading(false);
		}
	};
	const hasPrev = dayNumber > 1;
	const hasNext = dayNumber < 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid-bg bg-base",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { cta: false }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[900px] px-4 py-8 md:px-10 md:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "inline-flex items-center gap-2 border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								size: 14,
								strokeWidth: 3
							}), " Dashboard"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [hasPrev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/day/$n",
								params: { n: String(dayNumber - 1) },
								className: "inline-flex items-center gap-1 border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
										size: 14,
										strokeWidth: 3
									}),
									" Day ",
									dayNumber - 1
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 border-2 border-dashed border-muted-ink px-3 py-2 font-display text-label-small uppercase text-muted-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
									size: 14,
									strokeWidth: 3
								}), " Day 0"]
							}), hasNext ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/day/$n",
								params: { n: String(dayNumber + 1) },
								className: "inline-flex items-center gap-1 border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press",
								children: [
									"Day ",
									dayNumber + 1,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
										size: 14,
										strokeWidth: 3
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 border-2 border-dashed border-muted-ink px-3 py-2 font-display text-label-small uppercase text-muted-ink",
								children: ["Day 61 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
									size: 14,
									strokeWidth: 3
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MonoLabel, { children: [
								"Day ",
								day.dayNumber,
								" of 60"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: "ink",
								children: day.track
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: "blue",
								children: day.difficulty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: "yellow",
								children: day.estimatedTime
							}),
							day.status === "frozen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
								tone: "blue",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, {
									size: 9,
									strokeWidth: 3
								}), " Frozen"]
							}) : null,
							isFuture ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
								tone: "locked",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									size: 9,
									strokeWidth: 3
								}), " Preview"]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-heading-2 uppercase md:text-heading-1",
						children: day.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-body",
						children: day.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-heading-3 uppercase",
							children: "What this covers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: day.learningObjectives.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 text-body",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-2.5 w-2.5 shrink-0 border-2 border-ink bg-blue" }), o]
							}, o))
						})]
					}),
					isFuture ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						tone: "sidebar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									size: 18,
									strokeWidth: 3,
									className: "text-muted-ink"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "Not yet unlocked"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-body",
								children: [
									"This day is still ahead of you. The task content is visible so you can preview what's coming, but submissions open when you reach Day ",
									day.dayNumber,
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono mono-label uppercase tracking-[0.16em] text-muted-ink",
								children: ["Unlocks when you complete Day ", day.dayNumber - 1]
							})
						]
					}) : alreadyDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						tone: "sidebar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									size: 18,
									strokeWidth: 3,
									className: "text-blue"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-heading-3 uppercase",
									children: "Proof submitted"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-body",
								children: [
									"Logged on",
									" ",
									new Date(day.submission.submittedAt).toLocaleString("en-IN", {
										dateStyle: "medium",
										timeStyle: "short"
									}),
									". This day is locked — nothing left to do."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: day.submission.githubUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "break-all border-2 border-ink bg-card-surface p-3 text-body-bold underline",
										children: day.submission.githubUrl
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: day.submission.linkedinUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "break-all border-2 border-ink bg-card-surface p-3 text-body-bold underline",
										children: day.submission.linkedinUrl
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-2 border-ink bg-card-surface p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Caption you posted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 whitespace-pre-wrap text-body",
											children: day.submission.linkedinCaption
										})]
									}),
									store.submissions.find((s) => s.dayNumber === day.dayNumber)?.aiFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-2 border-ink bg-card-surface p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "AI Feedback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-body",
											children: store.submissions.find((s) => s.dayNumber === day.dayNumber)?.aiFeedback
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setShowShareCard(!showShareCard),
									className: "border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase shadow-brutal-sm press",
									children: [showShareCard ? "Hide" : "Generate", " Share Card"]
								}), showShareCard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareCard, {
										studentName: profile.student.name,
										studentInitials: profile.student.initials,
										dayNumber,
										taskTitle: day.title,
										currentStreak: profile.student.currentStreak,
										trackName: track.name,
										isMilestone,
										milestoneMessage: milestoneMessages[dayNumber]
									})
								})]
							})
						]
					}) : submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						tone: "blue",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-heading-2 uppercase",
								children: "Proof submitted."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-body",
								children: [
									"Streak continues. Day ",
									day.dayNumber,
									" is locked in."
								]
							}),
							aiFeedbackLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 border-2 border-ink bg-card-surface p-4 shadow-brutal-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "AI Feedback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 animate-pulse font-display text-label-bold uppercase text-muted-ink",
									children: "Reading your submission…"
								})]
							}),
							aiFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 border-2 border-ink bg-card-surface p-4 shadow-brutal-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "AI Feedback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-body",
									children: aiFeedback
								})]
							}),
							aiFeedbackError && !aiFeedback && !aiFeedbackLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 border-2 border-dashed border-muted-ink bg-sidebar-surface p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "AI Feedback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-body text-muted-ink",
									children: aiFeedbackError
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								className: "mt-5 inline-flex rounded-none border-2 border-ink bg-card-surface px-5 py-3 font-display text-label-bold uppercase text-ink shadow-brutal press",
								children: "Back to dashboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setShowShareCard(!showShareCard),
									className: "border-2 border-ink bg-card-surface px-3 py-2 font-display text-label-small uppercase text-ink shadow-brutal-sm press",
									children: [showShareCard ? "Hide" : "Generate", " Share Card"]
								}), showShareCard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareCard, {
										studentName: profile.student.name,
										studentInitials: profile.student.initials,
										dayNumber,
										taskTitle: day.title,
										currentStreak: profile.student.currentStreak,
										trackName: track.name,
										isMilestone,
										milestoneMessage: milestoneMessages[dayNumber]
									})
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "mt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-heading-3 uppercase",
								children: "Submit your proof"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-body",
								children: "Two links. That's the whole ritual."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "GitHub",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCommitHorizontal, {
											size: 16,
											strokeWidth: 3
										}),
										value: github,
										onChange: setGithub,
										placeholder: "https://github.com/you/repo/commit/abc123",
										valid: githubValid,
										hint: "Repo or commit URL on github.com"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "LinkedIn",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
											size: 16,
											strokeWidth: 3
										}),
										value: linkedin,
										onChange: setLinkedin,
										placeholder: "https://www.linkedin.com/posts/your-post",
										valid: linkedinValid,
										hint: "Public post URL on linkedin.com"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "caption",
												className: "font-display text-label-bold uppercase",
												children: "Auto-drafted caption"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setCaption(draft),
													className: "border-2 border-ink bg-card-surface px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] shadow-brutal-sm press",
													children: "Reset draft"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: copy,
													className: "inline-flex items-center gap-1 border-2 border-ink bg-blue px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] text-on-blue shadow-brutal-sm press",
													children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
														size: 10,
														strokeWidth: 3
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
														size: 10,
														strokeWidth: 3
													}), copied ? "Copied" : "Copy"]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "caption",
											rows: 10,
											value: caption,
											onChange: (e) => setCaption(e.target.value),
											className: "mt-2 w-full rounded-none border-2 border-ink bg-card-surface p-3 text-body text-ink outline-none focus:shadow-brutal"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 font-mono mono-label uppercase tracking-[0.16em] text-muted-ink",
											children: "Pre-written from today's task. Edit it, copy it, post it."
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BrutalButton, {
										disabled: !canSubmit,
										onClick: handleSubmit,
										className: "w-full sm:w-auto",
										children: ["Submit proof ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											size: 16,
											strokeWidth: 3
										})]
									}),
									!canSubmit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonoLabel, { children: "Both links must be valid before you can submit" }) : null
								]
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
export { DayPage as component };
