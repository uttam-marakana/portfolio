import { Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProjectDetails from "./ProjectDetails";
import { renderWithProvidersAndRouter } from "../test/test-utils";

vi.mock("../services/githubReadme", () => ({
  fetchReadme: vi.fn().mockResolvedValue("README not available."),
}));

describe("ProjectDetails README fallback", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("renders the fetch-layer README fallback text when the repository readme is unavailable", async () => {
    renderWithProvidersAndRouter(
      <Routes>
        <Route path="/projects/details/:id" element={<ProjectDetails />} />
      </Routes>,
      { route: "/projects/details/dhatru-care" },
    );

    expect(
      await screen.findByRole("heading", { name: /dhatru care platform/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/readme not available\./i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/README map/i)).not.toBeInTheDocument();
  });
});
