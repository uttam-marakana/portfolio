import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import projectsData from "./projectsData";

describe("project image assets", () => {
  it("references only existing local image files", () => {
    const missingImages = projectsData
      .flatMap((project) => [
        project.image,
        ...(project.gallery ?? []).map((item) => item.image),
      ])
      .filter(Boolean)
      .filter((image) =>
        image.startsWith("/")
          ? !existsSync(resolve("public", image.slice(1)))
          : false,
      );

    expect(missingImages).toEqual([]);
  });
});
