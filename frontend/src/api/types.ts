export type Flight = {
  //Time
  departureTime: Date;
  arrivalTime: Date;
  duration: number;

  //Airports + codes
  departureAirport: string;
  departureAirportCode: string;
  arrivalAirport: string;
  arrivalAirportCode: string;
  //Airline + operating airline
  airline: string;
  airlineCode: string;
  operatingAirline?: string;
  operatingAirlineCode?: string;

  passengers: number;
  currency: string;
};

export type FlightSearch = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: Date;
  returnDate: Date;
  adults: number;
  currencyCode: string;
  nonStop: boolean;
};

export type Airport = {
  airportName: string;
  iatacode: string;
  address: Address;
};

export type Address = {
  cityName: string;
  countryName: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

//  a. Initial departure day/time
//             and the final arrival day/time
//  b. The departure airport and
//             the arrival airport (name+code)
//  c. The name and code of the airline
//  d. The name and code of the operating
//             airline (only if different from the main
//             airline)
//  e. Total time of the flight departure-arrival
//             This include the flight time, layover time
//             of all segments (if there is).
//  f. If there are stops, the time at each
//             airport stop showing the name and code
//             of the airport
//  g. The total price of the flight
//  h. Price per traveler
