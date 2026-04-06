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
      }),
    ).toBeInTheDocument();
  });

  it("renders the projects page", async () => {
    renderAppAt("/projects");

    expect(await screen.findByText(/project library/i)).toBeInTheDocument();
  });

  it("renders the services page", async () => {
    renderAppAt("/services");

    expect(
      await screen.findByRole("heading", {
        name: /frontend work that improves structure, clarity, and delivery quality\./i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the resume page", async () => {
    renderAppAt("/resume");

    expect(
      await screen.findByRole("heading", {
        name: /frontend experience presented for faster hiring decisions\./i,
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
