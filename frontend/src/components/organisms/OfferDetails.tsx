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
    <div className="flex gap-3 w-full mx-auto px-4 py-8">
      <div className="flex justify-start w-2/3 gap-2 flex-col">
        <h2 className="text-start text-lg font-bold">Going itinerary</h2>
        <FlightDetailSection
          flight={offer.goingFlight}
          dictionary={dictionary}
          fareDetails={offer.travelerPricings[0].fareDetailsBySegment}
        />
        {offer.returningFlight !== null && (
          <>
            <h2 className="text-start text-lg font-bold">
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
      <div className="flex justify-end w-1/3">
        <PriceSegment
          price={offer.price}
          travelerPricings={offer.travelerPricings}
        />
      </div>
    </div>
  );
};

export default OfferDetails;
