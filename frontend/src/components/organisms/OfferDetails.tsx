import { Offer } from "../../api/types";
import { Dictionary, FareDetailsBySegment } from "../../api/types";
import PriceSegment from "../molecules/PriceSegment";
import FlightDetailSection from "../molecules/FlightDetailSection";
import { useState } from "react";
import Button from "../atoms/Button";

interface OfferDetailsProps {
  offer: Offer;
  dictionary: Dictionary;
}

const OfferDetails: React.FC<OfferDetailsProps> = ({ offer, dictionary }) => {
  const [fareDetailsValue, setFareDetailsValue] =
    useState<FareDetailsBySegment | null>(null);

  return (
    <div className="flex gap-3 w-full mx-auto px-4 py-8">
      {/* Flight details */}
      <div className="flex justify-start w-2/3 gap-2 flex-col">
        {/* Going itinerary */}
        <h2 className="text-start text-lg font-bold">Going itinerary</h2>
        <FlightDetailSection
          flight={offer.goingFlight}
          dictionary={dictionary}
          fareDetails={offer.travelerPricings[0].fareDetailsBySegment}
          setFareDetailsValue={setFareDetailsValue}
        />
        {/* Returning itinerary */}
        {offer.returningFlight !== null && (
          <>
            <h2 className="text-start text-lg font-bold">
              Returning itinerary
            </h2>
            <FlightDetailSection
              flight={offer.returningFlight}
              dictionary={dictionary}
              fareDetails={offer.travelerPricings[0].fareDetailsBySegment}
              setFareDetailsValue={setFareDetailsValue}
            />
          </>
        )}
      </div>
      {/* Price details */}
      <div className="flex justify-start w-1/3 flex-col gap-2">
        <PriceSegment
          price={offer.price}
          travelerPricings={offer.travelerPricings}
        />
        {fareDetailsValue?.amenities !== null &&
        fareDetailsValue?.amenities !== undefined &&
        fareDetailsValue?.includedCheckedBags !== null &&
        fareDetailsValue?.includedCheckedBags !== undefined &&
        fareDetailsValue?.includedCheckedBags.quantity !== null &&
        fareDetailsValue?.includedCheckedBags.quantity !== undefined &&
        fareDetailsValue?.includedCheckedBags.quantity !== 0 &&
        fareDetailsValue?.amenities.length !== 0 &&
        fareDetailsValue?.amenities.length !== undefined ? (
          <div className="flex flex-col gap-2 rounded p-2 shadow-lg transition-shadow">
            {/* Amenities */}
            <div className="flex justify-between">
              <h2 className="text-start text-lg font-bold">Amenities</h2>
              <Button
                variant="secondary"
                onClick={() => setFareDetailsValue(null)}
              >
                X
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                Checked bags:{fareDetailsValue?.includedCheckedBags.quantity}
              </p>
              {fareDetailsValue?.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-between"
                >
                  <p className="text-wrap text-ellipsis">
                    {amenity.description}
                  </p>
                  <p className="text-xs">
                    {amenity.isChargeable ? "Chargeable" : "Not chargeable"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 rounded p-2 shadow-lg transition-shadow">
            <p>No amenities found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferDetails;
