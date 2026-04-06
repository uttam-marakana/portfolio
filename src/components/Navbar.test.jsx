import { Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Navbar from "./Navbar";
import { renderWithProvidersAndRouter } from "../test/test-utils";

vi.mock("../services/githubReadme", () => ({
  fetchReadme: vi.fn().mockResolvedValue("# Mock README"),
}));

describe("Navbar integrations", () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.innerHTML = "";
    document.documentElement.className = "";
  });

  it("navigates to projects and filters results from the shared search input", async () => {
    const user = userEvent.setup();

    renderWithProvidersAndRouter(
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </>,
      { route: "/" },
    );

    const searchInputs = await screen.findAllByPlaceholderText(/search work/i);
    await user.type(searchInputs[0], "dhatru");

    expect(
      await screen.findByText(/showing 1 result for "dhatru"/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/dhatru care platform/i)).toBeInTheDocument();
    expect(screen.queryByText(/tradeos dashboard/i)).not.toBeInTheDocument();
  });

  it("toggles theme state and persists it to localStorage", async () => {
    const user = userEvent.setup();
    localStorage.setItem("theme", "dark");

    renderWithProvidersAndRouter(<Navbar />, { route: "/" });

    expect(document.documentElement).toHaveClass("dark");

    const toggleButtons = screen.getAllByRole("button", {
      name: /toggle theme/i,
    });

    await user.click(toggleButtons[0]);

    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
