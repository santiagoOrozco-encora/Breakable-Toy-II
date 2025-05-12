import { Offer } from "../../api/types";
import { Dictionary } from "../../api/types";
import SegmentDetails from "../molecules/SegmentDetails";

interface OfferDetailsProps {
  offer: Offer;
  dictionary: Dictionary;
}

const OfferDetails: React.FC<OfferDetailsProps> = ({ offer, dictionary }) => {
  return (
    <div className="flex gap-3 w-full mx-auto px-4 py-8">
      <div className="flex justify-start w-2/3">
        <h1>Offer Details</h1>
        {/* <SegmentDetails
          segment={offer.goingFlight.flightStops[0]}
          dictionary={dictionary}
        /> */}
      </div>
      <div className="flex justify-end w-1/3">
        <p>Travelers price</p>
      </div>
    </div>
  );
};

export default OfferDetails;
