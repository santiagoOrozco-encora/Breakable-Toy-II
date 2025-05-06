import { FlightSearch } from "./types";

export const AMADEUS_API_KEY = import.meta.env.VITE_API_KEY;
export const AMADEUS_API_SECRET = import.meta.env.VITE_API_SECRET;
export const flightSearchUrl = import.meta.env.VITE_FLIGHT_SEARCH;
console.log(flightSearchUrl);

const TOKEN = "vyOY9rYdTZfZovWdHmGalSn18rjZ";

export const getFlightOffers = async (params: FlightSearch) => {
  const url = new URL(flightSearchUrl);
  console.log(url);
  url.searchParams.set("originLocationCode", params.originLocationCode);
  url.searchParams.set(
    "destinationLocationCode",
    params.destinationLocationCode
  );
  url.searchParams.set("departureDate", params.departureDate.toISOString());
  if (params.returnDate !== null && params.returnDate !== undefined) {
    url.searchParams.set("returnDate", params.returnDate.toISOString());
  }
  url.searchParams.set("adults", params.adults.toString());
  url.searchParams.set("currencyCode", params.currencyCode);
  url.searchParams.set("nonStop", params.nonStop.toString());
  url.searchParams.set("max", "10");
  console.log(url);
  // const response = await fetch(url, {
  //     headers: {
  //         'authorization': `Bearer ${TOKEN}`,
  //     }
  // })
  // const data = await response.json()
  // console.log(data)
  // return data
};

export const getAirports = async (params: string) => {
  const url = new URL(flightSearchUrl + "/search-aiport");
  url.searchParams.set("keyword", params);
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  // console.log(data)
  // return data
};
