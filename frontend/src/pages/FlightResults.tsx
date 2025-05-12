import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import { FlightOffer } from "../api/types";
import FlightDetailsCard from "../components/molecules/FlightDetailsCard";

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // flights is what we passed as { state: { flights } }
  const flights: FlightOffer = location.state?.flights;
  const dictionary = flights.dictionaryDTO;

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
      <div className="flex flex-col gap-5">
        {/* Flight offers */}
        {flights.offers.map((offer, index) => {
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
