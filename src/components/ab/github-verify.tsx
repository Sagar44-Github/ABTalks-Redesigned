import { useState } from "react";
import { CheckCircle2, GitCommitHorizontal, Loader2, XCircle } from "lucide-react";
import { MonoLabel } from "@/components/ab/ui";
import { verifyGithubActivity, type GithubVerifyResult } from "@/lib/github.functions";

/** Auto GitHub verification — pulls recent public commits for the submitted
 *  repo so "I did the work" is backed by an actual push. */
export function GithubVerify({ url, auto = false }: { url: string; auto?: boolean }) {
  const [result, setResult] = useState<GithubVerifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);

  const run = async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const res = await verifyGithubActivity({ data: { url } });
      setResult(res);
    } catch {
      setResult({ verified: false, repo: null, reason: "Verification failed. Your submission still saved." });
    } finally {
      setLoading(false);
      setRan(true);
    }
  };

  if (auto && !ran && !loading) {
    void run();
  }

  return (
    <div className="border-2 border-ink bg-card-surface p-3 shadow-brutal-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <MonoLabel>GitHub verification</MonoLabel>
        <button
          type="button"
          onClick={run}
          disabled={loading || !url.trim()}
          className="inline-flex items-center gap-1 border-2 border-ink bg-card-surface px-2 py-1 font-mono mono-label uppercase tracking-[0.16em] shadow-brutal-sm press disabled:opacity-40"
        >
          {loading ? <Loader2 size={10} strokeWidth={3} className="animate-spin" /> : <GitCommitHorizontal size={10} strokeWidth={3} />}
          {loading ? "Checking" : ran ? "Re-check" : "Verify commits"}
        </button>
      </div>

      {loading ? (
        <p className="mt-2 animate-pulse font-display text-label-bold uppercase text-muted-ink">
          Reading the repo…
        </p>
      ) : null}

      {!loading && result?.verified ? (
        <div className="mt-2">
          <p className="flex items-center gap-2 text-body-bold">
            <CheckCircle2 size={16} strokeWidth={3} className="text-blue" />
            {result.commitsToday > 0
              ? `${result.commitsToday} commit${result.commitsToday === 1 ? "" : "s"} pushed today`
              : "Repo found — no commits dated today"}
          </p>
          <p className="mt-1 font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
            {result.repo}
          </p>
          <ul className="mt-3 space-y-2">
            {result.commits.map((c) => (
              <li key={c.sha} className="border-2 border-ink/20 bg-sidebar-surface p-2">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-words text-body underline"
                >
                  {c.message || "(no message)"}
                </a>
                <p className="mt-1 font-mono mono-label uppercase tracking-[0.16em] text-muted-ink">
                  {c.sha} · {c.author} ·{" "}
                  {c.date ? new Date(c.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!loading && result && !result.verified ? (
        <p className="mt-2 flex items-start gap-2 text-body text-muted-ink">
          <XCircle size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-red" />
          {result.reason}
        </p>
      ) : null}

      {!loading && !result ? (
        <p className="mt-2 text-body text-muted-ink">
          We check the public commit log on the repo you submitted. No token, no access to private code.
        </p>
      ) : null}
    </div>
  );
}
