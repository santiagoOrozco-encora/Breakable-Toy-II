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
  name?: string | null;
  iataCode: string;
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
  size: number;
};

export type Dictionary = {
  airports: AirportData;
  aircraft: Aircraft;
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
  goingFlight: Flight;
  returningFlight: Flight | null;
  price: Price;
  travelerPricings: TravelPricing[];
  validatedAirlineCode: string;
};

export type Price = {
  total: string;
  currency: string;
  grandTotal: string;
  base: string;
  fees: Fee[];
};

export type Fee = {
  amount: string;
  type: string;
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
  class: string;
  amenities: Amenity[];
  includedCheckedBags: IncludedCheckedBags;
  includedCabinBags: IncludedCabinBags;
};

export type Amenity = {
  description: string;
  amenityType: string;
  isChargeable: boolean;
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
  totalTime: string;
  airline: AirlineInfo;
  segments: Segment[];
};

export type Segment = {
  id: string;
  waitTime: string;
  airportData: string;
  duration: string;
  number: string;
  airlineInfo: AirlineInfo;
  arrivalAirport: string;
  departureAirport: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: AircraftInfo;
  operating: string;
  carrierCode: string;
  stops: Stop[];
};

export type Stop = {
  iataCode: string;
  duration: string;
  arrivalAt: string;
  departureAt: string;
};

export type AircraftInfo = {
  code: string;
};

export type AirlineInfo = {
  name: string;
  code: string;
};
