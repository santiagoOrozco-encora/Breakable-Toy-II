import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import { Offer } from "../api/types";
import FlightDetailsCard from "../components/molecules/FlightDetailsCard";
import { useState } from "react";
import { sortFlights } from "../api/service";

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [flights, setFlights] = useState(location.state?.flights);
  // flights is what we passed as { state: { flights } }
  const dictionary = flights?.dictionaryDTO || {};

  const filterFlights = async (filter: string, direction: string) => {
    console.log(filter, direction);
    setOrderBy(filter);
    setOrderDirection(direction);
    const sortedFlightsResult = await sortFlights(filter, direction);
    setFlights(sortedFlightsResult);
  };

  // if no flights are found, redirect to search page
  if (flights.offers == null) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Flight Search Results</h1>
        <div className="mb-4 text-red-500">
          No flight data found. Please search again.
        </div>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back to Search
        </Button>
      </div>
    );
  }

  // render the flight offers
  return (
    <div className="flex flex-col gap-3 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Flight Search Results</h1>
      <div className="flex justify-start">
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back to Search
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-start">Filters</h1>
        <div className="flex gap-5 items-center text-center justify-start">
          {/* Order by */}
          <div className="flex gap-5 p-2">
            <Button
              variant="secondary"
              onClick={() => {
                filterFlights(
                  orderBy,
                  orderDirection === "asc" ? "desc" : "asc"
                );
              }}
            >
              {orderDirection === "asc" ? "↑" : "↓"}
            </Button>
          </div>
          {/* Filters */}
          <div className="flex  gap-5 p-2">
            <Button
              variant={orderBy === "price" ? "primary" : "secondary"}
              onClick={() => {
                filterFlights("price", orderDirection);
              }}
            >
              Price
            </Button>
            <Button
              variant={orderBy === "date" ? "primary" : "secondary"}
              onClick={() => {
                filterFlights("date", orderDirection);
              }}
            >
              Duration
            </Button>
            {orderBy != "" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  filterFlights("", orderDirection);
                }}
              >
                ✕
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {/* Flight offers */}
        {flights.offers.map((offer: Offer, index: number) => {
          return (
            <FlightDetailsCard
              offer={offer}
              dictionary={dictionary}
              index={index}
              key={index}
              onClick={() =>
                navigate("/FlightDetails", { state: { offer, dictionary } })
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default FlightResults;
