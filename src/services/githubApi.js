import axios from "axios";

const USERNAME = "uttam-marakana";

export const fetchGithubRepos = async () => {
  try {
    const res = await axios.get(
      `https://api.github.com/users/${USERNAME}/repos`,
      {
        params: {
          sort: "updated",
          per_page: 12,
        },
      },
    );

    return res.data
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        title: repo.name,
        description: repo.description || "GitHub Repository Project",
        tech: repo.language || "JavaScript",
        image: `https://picsum.photos/600/40${Math.floor(Math.random() * 9)}`,
        github: repo.html_url,
        preview: repo.homepage,
      }));
  } catch (err) {
    console.error("GitHub API error:", err);
    return [];
  }
};
