export async function fetchReadme(repoPath) {
  try {
    if (!repoPath) return "";

    // repoPath format:
    // "uttam-marakana/project-name"
    const url = `https://api.github.com/repos/${repoPath}/readme`;

    const res = await fetch(url);

    if (!res.ok) throw new Error("README not found");

    const data = await res.json();

    const decoded = atob(data.content.replace(/\n/g, ""));
    return decoded;
  } catch (err) {
    console.error("README fetch error:", err);
    return "README not available.";
  }
}
