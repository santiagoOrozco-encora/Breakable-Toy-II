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
    <div className="flex flex-col gap-3 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Flight Details</h1>
      <div className="flex justify-start">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back to Search
        </Button>
      </div>
      <OfferDetails offer={offer} dictionary={dictionary} />
    </div>
  );
};

export default FlightDetails;
