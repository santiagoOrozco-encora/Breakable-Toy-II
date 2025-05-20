import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import FlightResults from "../FlightResults";
import { Offer } from "../../api/types";
import { vi } from "vitest";
import { sortFlights } from "../../api/service";

// Mock the sortFlights function with proper typing
vi.mock("../../api/service", () => ({
  sortFlights: vi
    .fn()
    .mockImplementation((_orderBy: string, _orderDirection: string) => []),
}));

// Create a mock flight offer
describe("FlightResults", () => {
  const mockOffer: Offer = {
    goingFlight: {
      initialDayTime: "2025-06-02T11:25:00",
      finalDayTime: "2025-06-05T13:25:00",
      initialAirport: "JFK",
      finalAirport: "LAX",
      totalTime: "PT9H25M",
      airline: { name: "Test Airline", code: "TA" },
      segments: [
        {
          id: "1",
          waitTime: "PT0H",
          airportData: "JFK",
          duration: "PT9H25M",
          number: "123",
          airlineInfo: { name: "Test Airline", code: "TA" },
          arrivalAirport: "LAX",
          departureAirport: "JFK",
          departureTime: "2025-06-02T11:25:00",
          arrivalTime: "2025-06-05T13:25:00",
          aircraft: { code: "B737" },
          operating: "TA",
          carrierCode: "TA",
          stops: [],
        },
      ],
    },
    returningFlight: null,
    price: {
      total: "100.00",
      currency: "USD",
      grandTotal: "100.00",
      base: "100.00",
      fees: [
        {
          amount: "100.00",
          type: "BASE",
        },
      ],
    },
    travelerPricings: [
      {
        travelerId: "1",
        price: {
          total: "100.00",
          currency: "USD",
          grandTotal: "100.00",
          base: "100.00",
          fees: [
            {
              amount: "100.00",
              type: "BASE",
            },
          ],
        },
        travelerType: "ADULT",
        fareOption: "STANDARD",
        fareDetailsBySegment: [
          {
            segmentId: "1",
            cabin: "ECONOMY",
            class: "ECONOMY",
            amenities: [],
            includedCheckedBags: {
              quantity: 1,
            },
            includedCabinBags: {
              quantity: 1,
            },
          },
        ],
      },
    ],
    validatedAirlineCode: "TA",
  };

  const mockFlights = {
    offers: [mockOffer],
    dictionaryDTO: {
      airports: {
        JFK: { iataCode: "JFK", name: "John F. Kennedy International Airport" },
        LAX: { iataCode: "LAX", name: "Los Angeles International Airport" },
      },
      aircraft: { B737: "Boeing 737" },
      currencies: { USD: "US Dollar" },
      carriers: { TA: "Test Airline" },
    },
    size: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders flight results with flights", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/FlightResults",
          element: <FlightResults />,
        },
      ],
      {
        initialEntries: [
          {
            pathname: "/FlightResults",
            state: { flights: mockFlights },
          },
        ],
      }
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Flight Search Results"));
    expect(screen.getByText("Filters"));
    expect(screen.getByText("Back to Search"));
    expect(screen.getByText("(TA)Test Airline"));
    expect(screen.getByText("John F. Kennedy International Airport"));
    expect(screen.getByText("Los Angeles International Airport"));
  });

  test("renders no flights found state", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/FlightResults",
          element: <FlightResults />,
        },
      ],
      {
        initialEntries: [
          {
            pathname: "/FlightResults",
            state: { flights: [] },
          },
        ],
      }
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText("No flight data found. Please search again."));
    expect(screen.getByText("Back to Search"));
  });

  test("calls sortFlights when changing order direction", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/FlightResults",
          element: <FlightResults />,
        },
      ],
      {
        initialEntries: [
          {
            pathname: "/FlightResults",
            state: { flights: mockFlights },
          },
        ],
      }
    );

    render(<RouterProvider router={router} />);

    const sortButton = screen.getByRole("button", { name: "ASC" });
    fireEvent.click(sortButton);

    expect(vi.mocked(sortFlights)).toHaveBeenCalledWith("", "desc", 1);
  });

  test("calls sortFlights with correct filters", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/FlightResults",
          element: <FlightResults />,
        },
      ],
      {
        initialEntries: [
          {
            pathname: "/FlightResults",
            state: { flights: mockFlights },
          },
        ],
      }
    );

    render(<RouterProvider router={router} />);

    const priceFilter = screen.getByRole("button", { name: "Price" });
    const durationFilter = screen.getByRole("button", { name: "Duration" });

    fireEvent.click(priceFilter);
    fireEvent.click(durationFilter);

    expect(vi.mocked(sortFlights)).toHaveBeenCalledWith(
      "price,duration",
      "asc",
      1
    );
  });
});
