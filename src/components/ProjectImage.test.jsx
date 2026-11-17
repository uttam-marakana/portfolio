import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectImage from "./ProjectImage";

describe("ProjectImage", () => {
  it("shows a labeled fallback when no image is available", () => {
    render(<ProjectImage src={null} alt="Project preview" className="media" />);

    expect(screen.getByRole("img", { name: "Project preview" })).toHaveTextContent(
      "Project preview",
    );
  });

  it("shows the labeled fallback when an image fails to load", () => {
    render(
      <ProjectImage
        src="/missing-image.png"
        alt="Project preview"
        className="media"
      />,
    );

    fireEvent.error(screen.getByRole("img", { name: "Project preview" }));

    expect(screen.getByRole("img", { name: "Project preview" })).toHaveTextContent(
      "Project preview",
    );
  });
});
