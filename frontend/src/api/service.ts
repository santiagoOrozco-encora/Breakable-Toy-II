import { FlightOffer, FlightSearch, SelectOption } from "./types";
export const flightSearchUrl = import.meta.env.VITE_FLIGHT_SEARCH;

export const getFlightOffers = async (params: FlightSearch) => {
  const url = new URL(flightSearchUrl + "/search-flight-offers");
  url.searchParams.set("origin", params.originLocationCode);
  url.searchParams.set("destination", params.destinationLocationCode);
  url.searchParams.set("departureDate", params.departureDate.toString());
  if (params.returnDate !== null && params.returnDate !== undefined) {
    url.searchParams.set("returnDate", params.returnDate.toString());
  }
  url.searchParams.set("passengers", params.adults.toString());
  url.searchParams.set("currency", params.currencyCode);
  url.searchParams.set("nonStop", params.nonStop ? "true" : "false");
  const response = await fetch(url);
  const data: FlightOffer[] = await response.json();
  console.log(data);
  return data;
};

export const getAirports = async (params: string) => {
  const url = new URL(flightSearchUrl + "/search-airport");
  url.searchParams.set("keyword", params);
  const response = await fetch(url);
  const data: SelectOption[] = await response.json();
  console.log(data);
  return data;
};
