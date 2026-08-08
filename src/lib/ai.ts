import { createServerFn } from "@tanstack/react-start";

/* ── Grok API Proxy ── */

const GROK_TIMEOUT_MS = 15_000;

async function callGrok(prompt: string): Promise<string> {
  const apiKey =
    typeof process !== "undefined" && process?.env
      ? (process.env.GROK_API_KEY ?? process.env.XAI_API_KEY)
      : undefined;
  if (!apiKey) {
    throw new Error("GROK_API_KEY is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GROK_TIMEOUT_MS);

  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Grok API error ${response.status}: ${text}`);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response from Grok");
    return content.trim();
  } finally {
    clearTimeout(timeout);
  }
}

/* ── AI Submission Feedback ── */

export const getAiFeedback = createServerFn({ method: "POST" })
  .validator(
    (data: {
      taskTitle: string;
      taskDescription: string;
      learningObjectives: string[];
      githubUrl: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const prompt = `You are giving brief feedback to a student who just completed a coding task as part of a 60-day challenge. The student submitted a GitHub link as proof of their work.

Task: "${data.taskTitle}"
Description: ${data.taskDescription}
Skills this task was meant to build: ${data.learningObjectives.join(", ")}
GitHub URL: ${data.githubUrl}

Write 2-3 sentences of specific, encouraging feedback referencing the actual skills the task was meant to build. Be direct and plain-spoken — no corporate jargon, no "Great job!" openers. You have NOT reviewed their actual code — frame your feedback around the task and what completing it demonstrates, not code quality you can't verify. Keep it under 60 words.`;

      const feedback = await callGrok(prompt);
      return { success: true as const, feedback };
    } catch (error) {
      console.error("AI feedback error:", error);
      return {
        success: false as const,
        feedback: null,
        error: "AI feedback is temporarily unavailable. Your submission was saved successfully.",
      };
    }
  });

/* ── AI Recruiter Pitch ── */

export const getAiPitch = createServerFn({ method: "POST" })
  .validator(
    (data: {
      studentName: string;
      track: string;
      daysCompleted: number;
      currentStreak: number;
      longestStreak: number;
      sampleTasks: string[];
    }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const prompt = `Write a 2-3 sentence pitch introducing a student developer to a recruiter. Be specific to their actual work, not generic praise. Plain, direct tone.

Student: ${data.studentName}
Track: ${data.track}
Days completed: ${data.daysCompleted}/60
Current streak: ${data.currentStreak} days
Longest streak: ${data.longestStreak} days
Recent tasks completed: ${data.sampleTasks.join(", ")}

Write the pitch as a third-person introduction (e.g. "${data.studentName} is..."). Keep it under 50 words. Reference their specific track and consistency pattern.`;

      const pitch = await callGrok(prompt);
      return { success: true as const, pitch };
    } catch (error) {
      console.error("AI pitch error:", error);
      return {
        success: false as const,
        pitch: null,
        error: "AI pitch generation is temporarily unavailable.",
      };
    }
  });
