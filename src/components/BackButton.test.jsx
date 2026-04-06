import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import BackButton from "./BackButton";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ pathname: "/projects/details/alpine-selection" }),
  };
});

describe("BackButton", () => {
  beforeEach(() => {
    navigateMock.mockReset();
  });

  it("navigates back when browser history is available", () => {
    window.history.replaceState({ idx: 1 }, "", "/projects/details/alpine-selection");
    render(<BackButton fallback="/projects" />);

    fireEvent.click(screen.getByRole("button", { name: /back to previous page/i }));

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  it("falls back to the provided route when there is no in-app history", () => {
    window.history.replaceState({ idx: 0 }, "", "/projects/details/alpine-selection");
    render(<BackButton fallback="/projects" />);

    fireEvent.click(screen.getByRole("button", { name: /back to previous page/i }));

    expect(navigateMock).toHaveBeenCalledWith("/projects");
  });
});
