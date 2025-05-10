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
  airportName?: string | null;
  iatacode: string;
  address?: Address | null;
};

export type Address = {
  cityName: string | null;
  countryName: string | null;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type FlightOffer = {
  offers: Offer[];
  dictionaryDTO: Dictionary;
};

export type Dictionary = {
  airports: AirportData;
  aircrafts: Aircraft;
  currencies: Currency;
  carriers: Carrier;
};

export type AirportData = {
  [key: string]: Airport;
};

export type Carrier = {
  [key: string]: string;
};

export type Currency = {
  [key: string]: string;
};

export type Aircraft = {
  [key: string]: string;
};

export type Offer = {
  goingFlights: Flight[];
  returnFlights: Flight[];
  price: Price;
  travelerPricings: TravelPricing[];
};

export type Price = {
  total: string;
  currency: string;
  grandTotal: string;
  base: string;
};

export type TravelPricing = {
  travelerId: string;
  price: Price;
  travelerType: string;
  fareOption: string;
  fareDetailsBySegment: FareDetailsBySegment[];
};

export type FareDetailsBySegment = {
  segmentId: string;
  cabin: string;
  amenities: Amenity[];
  includedCheckedBags: IncludedCheckedBags;
  includedCabinBags: IncludedCabinBags;
};

export type Amenity = {
  description: string;
  amenityType: string;
};

export type IncludedCheckedBags = {
  quantity: number;
};

export type IncludedCabinBags = {
  quantity: number;
};

export type Flight = {
  initialDayTime: string;
  finalDayTime: string;
  initialAirport: string;
  finalAirport: string;
  totalDuration: string;
  airlineInfo: AirlineInfo;
  flightStops: Segment[];
};

export type Segment = {
  waitTime: string;
  airportData: string;
  airlineInfo: AirlineInfo;
  departureTime: string;
  arrivalTime: string;
};

export type AirlineInfo = {
  name: string;
  code: string;
};
