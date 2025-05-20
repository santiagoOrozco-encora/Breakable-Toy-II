import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import FlightSearchPage from "../FlightSearch";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("FlightSearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders flight search form", () => {
    render(
      <MemoryRouter>
        <FlightSearchPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Departure airport"));
    expect(screen.getByText("Arrival airport"));
    expect(screen.getByText("Currency"));
    expect(screen.getByRole("button", { name: "Search" }));
  });
});
