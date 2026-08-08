import { n as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-So0GBSqD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-Pq1lIVSp.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var GROK_TIMEOUT_MS = 15e3;
async function callGrok(prompt) {
	const apiKey = typeof process !== "undefined" && process?.env ? process.env.GROK_API_KEY ?? process.env.XAI_API_KEY : void 0;
	if (!apiKey) throw new Error("GROK_API_KEY is not configured");
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), GROK_TIMEOUT_MS);
	try {
		const response = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-3-mini",
				messages: [{
					role: "user",
					content: prompt
				}],
				max_tokens: 300,
				temperature: .7
			}),
			signal: controller.signal
		});
		if (!response.ok) {
			const text = await response.text().catch(() => "");
			throw new Error(`Grok API error ${response.status}: ${text}`);
		}
		const content = (await response.json()).choices?.[0]?.message?.content;
		if (!content) throw new Error("Empty response from Grok");
		return content.trim();
	} finally {
		clearTimeout(timeout);
	}
}
var getAiFeedback_createServerFn_handler = createServerRpc({
	id: "221f9ae60ee323c1faecbeafc587abdeedee4b9bf18c3d3dd9f56e83ebe08763",
	name: "getAiFeedback",
	filename: "src/lib/ai.ts"
}, (opts) => getAiFeedback.__executeServer(opts));
var getAiFeedback = createServerFn({ method: "POST" }).validator((data) => data).handler(getAiFeedback_createServerFn_handler, async ({ data }) => {
	try {
		return {
			success: true,
			feedback: await callGrok(`You are giving brief feedback to a student who just completed a coding task as part of a 60-day challenge. The student submitted a GitHub link as proof of their work.

Task: "${data.taskTitle}"
Description: ${data.taskDescription}
Skills this task was meant to build: ${data.learningObjectives.join(", ")}
GitHub URL: ${data.githubUrl}

Write 2-3 sentences of specific, encouraging feedback referencing the actual skills the task was meant to build. Be direct and plain-spoken — no corporate jargon, no "Great job!" openers. You have NOT reviewed their actual code — frame your feedback around the task and what completing it demonstrates, not code quality you can't verify. Keep it under 60 words.`)
		};
	} catch (error) {
		console.error("AI feedback error:", error);
		return {
			success: false,
			feedback: null,
			error: "AI feedback is temporarily unavailable. Your submission was saved successfully."
		};
	}
});
var getAiPitch_createServerFn_handler = createServerRpc({
	id: "d9500dcd8a12e465b5fcfe1a83e410407a63171b81adcd27c1a50504ed103079",
	name: "getAiPitch",
	filename: "src/lib/ai.ts"
}, (opts) => getAiPitch.__executeServer(opts));
var getAiPitch = createServerFn({ method: "POST" }).validator((data) => data).handler(getAiPitch_createServerFn_handler, async ({ data }) => {
	try {
		return {
			success: true,
			pitch: await callGrok(`Write a 2-3 sentence pitch introducing a student developer to a recruiter. Be specific to their actual work, not generic praise. Plain, direct tone.

Student: ${data.studentName}
Track: ${data.track}
Days completed: ${data.daysCompleted}/60
Current streak: ${data.currentStreak} days
Longest streak: ${data.longestStreak} days
Recent tasks completed: ${data.sampleTasks.join(", ")}

Write the pitch as a third-person introduction (e.g. "${data.studentName} is..."). Keep it under 50 words. Reference their specific track and consistency pattern.`)
		};
	} catch (error) {
		console.error("AI pitch error:", error);
		return {
			success: false,
			pitch: null,
			error: "AI pitch generation is temporarily unavailable."
		};
	}
});
//#endregion
export { getAiFeedback_createServerFn_handler, getAiPitch_createServerFn_handler };
