import { useLocation } from "react-router-dom";
import { Offer, Dictionary } from "../api/types";
import OfferDetails from "../components/organisms/OfferDetails";
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";

const FlightDetails = () => {
  const navigate = useNavigate();
  const { offer, dictionary }: { offer: Offer; dictionary: Dictionary } =
    useLocation().state;
  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Flight Details</h1>
        <Button variant="secondary" onClick={() => navigate(-1)}>
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </Button>
      </div>
      <OfferDetails offer={offer} dictionary={dictionary} />
    </div>
  );
};

export default FlightDetails;
