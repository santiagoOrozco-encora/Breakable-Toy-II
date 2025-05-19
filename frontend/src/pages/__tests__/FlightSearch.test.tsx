import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import FlightSearchPage from "../FlightSearch";
import { getAirports } from "../../api/service";
import { vi } from "vitest";

// Mock API calls
vi.mock("../../api/service", () => ({
  getAirports: vi.fn(),
}));

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

  test("calls getAirports when searching for airports", async () => {
    const mockAirports = [
      { value: "JFK", label: "John F. Kennedy International Airport" },
      { value: "LAX", label: "Los Angeles International Airport" },
    ];

    (getAirports as jest.Mock).mockResolvedValue(mockAirports);

    render(
      <MemoryRouter>
        <FlightSearchPage />
      </MemoryRouter>
    );

    const departureInput = screen.getByTestId('originLocationCodeInput');
    fireEvent.change(departureInput, { target: { value: "J" } });

    const arrivalInput = screen.getByTestId('destinationLocationCodeInput');
    fireEvent.change(arrivalInput, { target: { value: "L" } });

    await waitFor(() => {
      expect(getAirports).toHaveBeenCalledWith("J");
      expect(getAirports).toHaveBeenCalledWith("L");
    });
  });
});
