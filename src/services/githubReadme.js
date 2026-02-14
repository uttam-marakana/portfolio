export async function fetchReadme(repo) {
  try {
    const cleanRepo = repo
      .replace("https://github.com/", "")
      .replace(/\/$/, "");

    const res = await fetch(
      `https://api.github.com/repos/${cleanRepo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.raw",
        },
      },
    );

     if (!res.ok) throw new Error("README not found");

    return await res.text();
  } catch (err) {
    console.error("README fetch failed", err);
    return "README not available.";
  }
}
