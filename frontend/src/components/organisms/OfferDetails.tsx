import { Offer } from "../../api/types";
import { Dictionary } from "../../api/types";
import PriceSegment from "../molecules/PriceSegment";
import FlightDetailSection from "../molecules/FlightDetailSection";

interface OfferDetailsProps {
  offer: Offer;
  dictionary: Dictionary;
}

const OfferDetails: React.FC<OfferDetailsProps> = ({ offer, dictionary }) => {
  return (
    <div className="flex gap-6 w-full mx-auto px-4 py-8">
      {/* Flight details */}
      <div className="flex justify-start w-2/3 flex-col gap-6">
        {/* Going itinerary */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Going itinerary</h2>
        <FlightDetailSection
          flight={offer.goingFlight}
          dictionary={dictionary}
          fareDetails={offer.travelerPricings[0].fareDetailsBySegment}
        />
        {/* Returning itinerary */}
        {offer.returningFlight !== null && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Returning itinerary
            </h2>
            <FlightDetailSection
              flight={offer.returningFlight}
              dictionary={dictionary}
              fareDetails={offer.travelerPricings[0].fareDetailsBySegment}
            />
          </>
        )}
      </div>
      {/* Price details */}
      <div className="flex justify-start w-1/3 flex-col gap-6">
        <PriceSegment
          price={offer.price}
          travelerPricings={offer.travelerPricings}
        />
      </div>
    </div>
  );
};

export default OfferDetails;
