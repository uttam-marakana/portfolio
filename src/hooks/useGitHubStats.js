import { useState, useEffect } from "react";

const REQUEST_TIMEOUT_MS = 8000;

function getRepositoryPath(repo) {
  const repository = repo
    .trim()
    .replace(/^https:\/\/github\.com\//i, "")
    .replace(/\.git\/?$/i, "")
    .replace(/\/$/, "");

  if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) {
    throw new Error("Invalid GitHub repository");
  }

  return repository;
}

export default function useGitHubStats(repo) {
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    loading: Boolean(repo),
    error: null,
  });

  useEffect(() => {
    if (!repo) {
      setStats({ stars: 0, forks: 0, loading: false, error: null });
      return;
    }

    const controller = new AbortController();
    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    setStats({ stars: 0, forks: 0, loading: true, error: null });

    const fetchStats = async () => {
      try {
        const repository = getRepositoryPath(repo);
        const res = await fetch(
          `https://api.github.com/repos/${repository}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error(`GitHub API request failed (${res.status})`);
        }

        const data = await res.json();

        if (
          !Number.isFinite(data.stargazers_count) ||
          !Number.isFinite(data.forks_count)
        ) {
          throw new Error("GitHub API returned invalid repository statistics");
        }

        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (controller.signal.aborted && !timedOut) return;

        const error = timedOut
          ? new Error("GitHub statistics request timed out")
          : err instanceof Error
            ? err
            : new Error("Unable to load GitHub statistics");

        setStats({ stars: 0, forks: 0, loading: false, error: error.message });
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchStats();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [repo]);

  return stats;
}
