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
      await screen.findByText(
        /interfaces that feel sharper, faster, and more deliberate/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the projects page", async () => {
    renderAppAt("/projects");

    expect(
      await screen.findByText(
        /frontend and ecommerce work organised with more intent/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders a project details page", async () => {
    renderAppAt("/projects/details/alpine-selection");

    expect(
      await screen.findByText(/alpine selection store/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to previous page/i })).toBeInTheDocument();
  });

  it("renders the resume page", async () => {
    renderAppAt("/resume");

    expect(
      await screen.findByRole("heading", {
        name: /frontend experience presented for faster hiring decisions/i,
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
