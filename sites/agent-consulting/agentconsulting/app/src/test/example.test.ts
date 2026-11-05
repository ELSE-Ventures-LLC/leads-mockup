import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("Agent Consulting mockup", () => {
  it("renders the core financial-leadership message and contact action", () => {
    render(React.createElement(App));

    expect(screen.getAllByText(/Your strategy,/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/our financial leadership\./i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /contact us/i }).some((link) => link.getAttribute("href") === "#contact"),
    ).toBe(true);
  });
});
