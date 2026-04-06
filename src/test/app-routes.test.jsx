import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import App from "../App";
import { renderWithProviders } from "./test-utils";

vi.mock("../services/githubReadme", () => ({
  fetchReadme: vi.fn().mockResolvedValue("# Mock README"),
}));

function renderAppAt(route) {
  window.history.pushState({}, "", route);
  return renderWithProviders(<App />);
}

describe("app routes", () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.innerHTML = "";
  });

  it("renders the home page", async () => {
    renderAppAt("/");

    expect(
      await screen.findByRole("link", {
        name: /explore selected work/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the projects page", async () => {
    renderAppAt("/projects");

    expect(
      await screen.findByRole("link", {
        current: "page",
        name: /^projects$/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders a project details page", async () => {
    renderAppAt("/projects/details/alpine-selection");

    expect(
      await screen.findByRole("button", { name: /back to previous page/i }),
    ).toBeInTheDocument();
  });

  it("renders the resume page", async () => {
    renderAppAt("/resume");

    expect(
      await screen.findByRole("link", {
        current: "page",
        name: /^resume$/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the 404 page for unknown routes", async () => {
    renderAppAt("/missing-route");

    expect(
      await screen.findByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
  });
});
