import { createServerFn } from "@tanstack/react-start";

export type GithubCommit = {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
};

export type GithubVerifyResult =
  | {
      verified: true;
      repo: string;
      commitsToday: number;
      commits: GithubCommit[];
    }
  | {
      verified: false;
      repo: string | null;
      reason: string;
    };

function parseRepo(url: string): { owner: string; repo: string } | null {
  const m = /^https?:\/\/(?:www\.)?github\.com\/([\w.-]+)\/([\w.-]+)/i.exec(url.trim());
  if (!m) return null;
  const owner = m[1]!;
  const repo = m[2]!.replace(/\.git$/i, "");
  return { owner, repo };
}

/** Pulls recent public commits for a submitted repo so a submission can be
 *  auto-verified instead of taken on trust. Uses the unauthenticated GitHub
 *  API — no token required, rate limited per IP. */
export const verifyGithubActivity = createServerFn({ method: "POST" })
  .validator((data: { url: string }) => data)
  .handler(async ({ data }): Promise<GithubVerifyResult> => {
    const parsed = parseRepo(data.url);
    if (!parsed) {
      return { verified: false, repo: null, reason: "That doesn't look like a github.com repo URL." };
    }
    const repo = `${parsed.owner}/${parsed.repo}`;

    try {
      const res = await fetch(
        `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/commits?per_page=5`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "abtalks-challenge",
          },
        },
      );

      if (res.status === 404) {
        return { verified: false, repo, reason: "Repo not found or it's private. Make it public so the commit can be verified." };
      }
      if (res.status === 403) {
        return { verified: false, repo, reason: "GitHub rate-limited the check. Your submission still saved." };
      }
      if (!res.ok) {
        return { verified: false, repo, reason: `GitHub responded ${res.status}. Your submission still saved.` };
      }

      const raw = (await res.json()) as Array<{
        sha: string;
        html_url: string;
        commit: { message: string; author: { name: string; date: string } };
      }>;

      if (!Array.isArray(raw) || raw.length === 0) {
        return { verified: false, repo, reason: "No commits found on the default branch yet." };
      }

      const commits: GithubCommit[] = raw.map((c) => ({
        sha: c.sha.slice(0, 7),
        message: (c.commit?.message ?? "").split("\n")[0]!.slice(0, 120),
        author: c.commit?.author?.name ?? "unknown",
        date: c.commit?.author?.date ?? "",
        url: c.html_url,
      }));

      const today = new Date().toISOString().slice(0, 10);
      const commitsToday = commits.filter((c) => c.date.slice(0, 10) === today).length;

      return { verified: true, repo, commitsToday, commits };
    } catch {
      return { verified: false, repo, reason: "Couldn't reach GitHub right now. Your submission still saved." };
    }
  });
