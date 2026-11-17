import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useGitHubStats from "./useGitHubStats";

describe("useGitHubStats", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("loads stats from a GitHub repository URL", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ stargazers_count: 12, forks_count: 3 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() =>
      useGitHubStats("https://github.com/owner/repository.git"),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/repos/owner/repository",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(result.current).toMatchObject({
      stars: 12,
      forks: 3,
      error: null,
    });
  });

  it("reports a failed API response without showing false zero stats", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 404 }),
    );

    const { result } = renderHook(() => useGitHubStats("owner/missing"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current).toMatchObject({
      stars: 0,
      forks: 0,
      error: "GitHub API request failed (404)",
    });
  });

  it("rejects malformed repository references without making a request", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useGitHubStats("https://example.com"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.error).toBe("Invalid GitHub repository");
  });

  it("aborts an in-flight request when the repository changes", async () => {
    let firstSignal;
    const fetchMock = vi
      .fn()
      .mockImplementationOnce((_url, { signal }) => {
        firstSignal = signal;
        return new Promise((_resolve, reject) => {
          signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
        });
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ stargazers_count: 4, forks_count: 1 }),
      });
    vi.stubGlobal("fetch", fetchMock);

    const { result, rerender } = renderHook(
      ({ repo }) => useGitHubStats(repo),
      { initialProps: { repo: "owner/first" } },
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    rerender({ repo: "owner/second" });

    await waitFor(() => {
      expect(result.current).toMatchObject({
        stars: 4,
        forks: 1,
        loading: false,
        error: null,
      });
    });

    expect(firstSignal.aborted).toBe(true);
  });

  it("marks a timed-out request as unavailable", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url, { signal }) =>
          new Promise((_resolve, reject) => {
            signal.addEventListener(
              "abort",
              () => reject(new DOMException("Aborted", "AbortError")),
              { once: true },
            );
          }),
      ),
    );

    const { result } = renderHook(() => useGitHubStats("owner/slow"));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(8000);
    });

    expect(result.current).toMatchObject({
      loading: false,
      error: "GitHub statistics request timed out",
    });

  });
});
