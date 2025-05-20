import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import { Offer } from "../api/types";
import FlightDetailsCard from "../components/molecules/FlightDetailsCard";
import { useEffect, useState } from "react";
import { sortFlights } from "../api/service";

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string[]>([]);
  const [orderDirection, setOrderDirection] = useState<string>("asc");
  const [page, setPage] = useState(1);
  const [flights, setFlights] = useState(location.state?.flights);
  const dictionary = flights?.dictionaryDTO || {};
  const flightsSize = flights?.size || 0;
  const flightsPerPage = 10;

  useEffect(() => {
    if (filterBy.includes("price") && filterBy.includes("duration")) {
      setOrderBy("price,duration");
    } else if (filterBy.includes("price")) {
      setOrderBy("price");
    } else if (filterBy.includes("duration")) {
      setOrderBy("duration");
    } else {
      setOrderBy("");
    }
  }, [filterBy]);

  useEffect(() => {
    filterFlights(orderBy, orderDirection, page);
  }, [page, orderBy, orderDirection]);

  const toggleFilters = (filter: string) => {
    setFilterBy((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  const clearFilters = () => {
    setFilterBy([]);
    setOrderBy("");
    setOrderDirection("asc");
  };

  const filterFlights = async (
    filter: string,
    direction: string,
    page: number
  ) => {
    const sortedFlightsResult = await sortFlights(filter, direction, page);
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
    <div className="mx-auto px-4 py-8  bg-gradient-to-b from-blue-50 to-white gap-2">
      <h1 className="text-2xl font-bold mb-6 ">Flight Search Results</h1>
      <div className="flex justify-start mb-6">
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back to Search
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        </div>
        <div className="flex gap-6 items-center justify-between">
          <div className="flex gap-5 p-2 items-center">
            {/* Order by */}
            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
                }}
                className="px-4 py-2 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      orderDirection === "asc"
                        ? "M5 10l7-7m0 0l7 7m-7-7v18"
                        : "M19 14l-7 7m0 0l-7-7m7 7V7"
                    }
                  />
                </svg>
                {orderDirection === "asc" ? "ASC" : "DESC"}
              </Button>
            </div>
            {/* Filters */}
            <div className="flex gap-4">
              <button
                name="price"
                onClick={() => toggleFilters("price")}
                className={` px-4 py-2 hover:text-green-500 cursor-pointer transition-all ${
                  filterBy.includes("price") ? "text-green-500" : ""
                }`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Price
              </button>
              <button
                name="duration"
                onClick={() => toggleFilters("duration")}
                className={`px-4 py-2 hover:text-green-500 cursor-pointer transition-all ${
                  filterBy.includes("duration") ? "text-green-500" : ""
                }`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707"
                  />
                </svg>
                Duration
              </button>
            </div>
            {filterBy.length > 0 && (
              <Button variant="secondary" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>
          {/* Pagination */}
          <div className="flex flex-col items-center">
            <div className="flex gap-4 mb-4">
              <span className="text-gray-600">
                Page {page} of {Math.ceil(flightsSize / flightsPerPage)}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 cursor-pointer hover:border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </Button>

              <Button
                variant="secondary"
                disabled={page >= Math.ceil(flightsSize / flightsPerPage)}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 cursor-pointer hover:border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
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
