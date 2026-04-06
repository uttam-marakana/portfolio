import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import Contact from "./Contact";
import { renderWithProvidersAndRouter } from "../test/test-utils";

const addDocMock = vi.fn();
const collectionMock = vi.fn(() => "contacts-collection");
const serverTimestampMock = vi.fn(() => "mock-timestamp");

vi.mock("firebase/firestore", () => ({
  addDoc: (...args) => addDocMock(...args),
  collection: (...args) => collectionMock(...args),
  serverTimestamp: () => serverTimestampMock(),
}));

vi.mock("../services/firebase", () => ({
  db: {},
  isFirebaseConfigured: true,
}));

function fillBaseForm({
  name = "Uttam",
  email = "uttam@example.com",
  message = "Need React cleanup and responsive fixes across the product.",
} = {}) {
  fireEvent.change(screen.getByLabelText(/your name/i), {
    target: { value: name },
  });
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText(/project details/i), {
    target: { value: message },
  });
}

function submitForm() {
  const submitButton = screen.getByRole("button", { name: /send message/i });
  const form = submitButton.closest("form");

  if (!form) {
    throw new Error("Expected contact form to be present.");
  }

  fireEvent.submit(form);
}

describe("Contact page", () => {
  beforeEach(() => {
    addDocMock.mockReset();
    collectionMock.mockClear();
    serverTimestampMock.mockClear();
  });

  it("shows an error for invalid email input", async () => {
    renderWithProvidersAndRouter(<Contact />, { route: "/contact" });
    fillBaseForm({ email: "not-an-email" });

    submitForm();

    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
    expect(addDocMock).not.toHaveBeenCalled();
  });

  it("shows an error when the message is too short", async () => {
    renderWithProvidersAndRouter(<Contact />, { route: "/contact" });
    fillBaseForm({ message: "Too short" });

    submitForm();

    expect(
      await screen.findByText(/please add a bit more project detail/i),
    ).toBeInTheDocument();
    expect(addDocMock).not.toHaveBeenCalled();
  });

  it("submits the form and shows the detected service", async () => {
    addDocMock.mockResolvedValue({ id: "contact-1" });

    renderWithProvidersAndRouter(<Contact />, { route: "/contact" });
    fillBaseForm({
      message: "Need React dashboard cleanup, routing fixes, and component refactors.",
    });

    submitForm();

    expect(await screen.findByText(/message sent successfully!/i)).toBeInTheDocument();
    expect(await screen.findByText(/request categorized as/i)).toBeInTheDocument();
    expect(collectionMock).toHaveBeenCalled();
    expect(serverTimestampMock).toHaveBeenCalled();
    expect(addDocMock).toHaveBeenCalledWith(
      "contacts-collection",
      expect.objectContaining({
        name: "Uttam",
        email: "uttam@example.com",
        service: "React",
      }),
    );
  });
});
