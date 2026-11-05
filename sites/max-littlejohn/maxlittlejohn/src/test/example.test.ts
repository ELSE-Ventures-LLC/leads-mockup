import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import App from "@/App";

describe("Max Littlejohn mockup", () => {
  it("renders both portfolio concept routes", () => {
    vi.stubGlobal("scrollTo", vi.fn());
    render(React.createElement(App));

    expect(screen.getByRole("heading", { name: "Dr. Littlejohn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /The Terminal Bloomberg-inspired/i })).toHaveAttribute("href", "/1");
    expect(screen.getByRole("link", { name: /The Terminal — Clean/i })).toHaveAttribute("href", "/2");
  });
});
