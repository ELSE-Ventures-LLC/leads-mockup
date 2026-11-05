import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import App from "@/App";
import LocalContactForm from "@/components/LocalContactForm";

describe("Adcamp mockup", () => {
  it("renders the home-page value proposition and contact route", async () => {
    vi.stubGlobal("scrollTo", vi.fn());
    render(React.createElement(App));

    expect(screen.getByText(/Mississippi Paving/i)).toBeInTheDocument();
    expect(screen.getByText(/Done Right Since 1989/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact us now/i })).toHaveAttribute("href", "/contact");
  });

  it("keeps the contact form submission in the browser", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    render(
      React.createElement(
        React.Fragment,
        null,
        React.createElement("h2", { id: "test-form-heading" }, "Send a message"),
        React.createElement(LocalContactForm, {
          idPrefix: "test-contact",
          labelledBy: "test-form-heading",
        }),
      ),
    );

    fireEvent.submit(screen.getByRole("form", { name: /send a message/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/not sent or saved/i);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
