import { useState, useEffect } from "react";

export default function useGitHubStats(repo) {
  const [stats, setStats] = useState({ stars: 0, forks: 0, loading: true, error: null });

  useEffect(() => {
    if (!repo) {
      setStats({ stars: 0, forks: 0, loading: false, error: null });
      return;
    }

    const fetchStats = async () => {
      try {
        const cleanRepo = repo.replace("https://github.com/", "").replace(/\/$/, "");
        
        const res = await fetch(`https://api.github.com/repos/${cleanRepo}`);
        
        if (!res.ok) {
          throw new Error("Repo not found");
        }
        
        const data = await res.json();
        setStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          loading: false,
          error: null
        });
      } catch (err) {
        setStats({ stars: 0, forks: 0, loading: false, error: err.message });
      }
    };

    fetchStats();
  }, [repo]);

  return stats;
}
