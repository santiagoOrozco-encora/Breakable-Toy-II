import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Offer, Dictionary } from "../../api/types";
import FlightDetails from "../FlightDetails";
import { vi } from "vitest";
// Mock OfferDetails component
vi.mock("../../components/organisms/OfferDetails", () => ({
  default: vi.fn().mockReturnValue(<div />),
}));

// Re-import the component after mocking
import OfferDetails from "../../components/organisms/OfferDetails";

describe("FlightDetails", () => {
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
    returningFlight: {
      initialDayTime: "2025-06-05T15:30:00",
      finalDayTime: "2025-06-08T17:30:00",
      initialAirport: "LAX",
      finalAirport: "JFK",
      totalTime: "PT9H25M",
      airline: { name: "Test Airline", code: "TA" },
      segments: [
        {
          id: "1",
          waitTime: "PT0H",
          airportData: "LAX",
          duration: "PT9H25M",
          number: "123",
          airlineInfo: { name: "Test Airline", code: "TA" },
          arrivalAirport: "JFK",
          departureAirport: "LAX",
          departureTime: "2025-06-05T15:30:00",
          arrivalTime: "2025-06-08T17:30:00",
          aircraft: { code: "B737" },
          operating: "TA",
          carrierCode: "TA",
          stops: [],
        },
      ],
    },
    price: {
      total: "500",
      currency: "USD",
      grandTotal: "500",
      base: "500",
      fees: [
        {
          amount: "500",
          type: "BASE",
        },
      ],
    },
    travelerPricings: [
      {
        travelerId: "1",
        price: {
          total: "500",
          currency: "USD",
          grandTotal: "500",
          base: "500",
          fees: [
            {
              amount: "500",
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

  const mockDictionary: Dictionary = {
    airports: {
      JFK: { iataCode: "JFK", name: "John F. Kennedy International Airport" },
      LAX: { iataCode: "LAX", name: "Los Angeles International Airport" },
    },
    aircraft: { B737: "Boeing 737" },
    currencies: { USD: "US Dollar" },
    carriers: { TA: "Test Airline" },
  };

  vi.stubGlobal("../../components/organisms/OfferDetails", {
    default: OfferDetails,
  });

  test("renders flight details with offer and dictionary", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/FlightDetails",
          element: <FlightDetails />,
        },
      ],
      {
        initialEntries: [
          {
            pathname: "/FlightDetails",
            state: { offer: mockOffer, dictionary: mockDictionary },
          },
        ],
      }
    );

    render(<RouterProvider router={router} />);

    // Check if the page title is rendered
    expect(screen.getByText("Flight Details")).toBeInTheDocument;

    // Check if the back button is rendered
    expect(screen.getByText("Back")).toBeInTheDocument;
  });

  test("back button navigates back", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/FlightDetails",
          element: <FlightDetails />,
        },
      ],
      {
        initialEntries: [
          {
            pathname: "/FlightDetails",
            state: { offer: mockOffer, dictionary: mockDictionary },
          },
        ],
      }
    );

    render(<RouterProvider router={router} />);

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    // Check if the location changed
    expect(router.state.location.pathname).toBe("/FlightResults");
  });

  test("renders OfferDetails component with correct props", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/flight-details",
          element: <FlightDetails />,
        },
        {
          path: "/FlightResults",
          element: <div>Flight Results</div>,
        },
      ],
      {
        initialEntries: [
          {
            pathname: "/flight-details",
            state: { offer: mockOffer, dictionary: mockDictionary },
          },
        ],
        initialIndex: 0,
      }
    );

    render(<RouterProvider router={router} />);

    expect(OfferDetails).toHaveBeenCalledTimes(3);
  });
});
