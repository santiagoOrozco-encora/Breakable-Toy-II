import { Dictionary, Offer } from "../../api/types";
import FlightStop from "../atoms/flightStop";

interface FlightDetailsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  offer: Offer;
  dictionary: Dictionary;
  index: number;
}

const FlightDetailsCard: React.FC<FlightDetailsCardProps> = ({
  offer,
  dictionary,
  index,
  ...rest
}) => {
  // render flight offer
  const renderFlightOffer = (
    offer: Offer,
    index: number,
    type: "goingFlight" | "returningFlight"
  ) => {
    return (
      <div
        key={`${type}-${index}`}
        className="flex flex-col gap-2 p-2 rounded w-full justify-around"
      >
        {/* Duration */}
        <div>
          <h1>{`${offer[type].initialDayTime.split("T")[1]} - ${
            offer[type].finalDayTime.split("T")[1]
          }`}</h1>
        </div>

        {/* Details */}
        <div className="flex gap-2 w-full">
          {/* Airports */}
          <div className="flex flex-col gap-1 w-1/2">
            <p className="text-md">
              {`(${offer[type].initialAirport}) `}
              <strong>
                {dictionary.airports[offer[type].initialAirport]?.name}
              </strong>
              {" - "}
              {`(${offer[type].finalAirport}) `}
              <strong>
                {dictionary.airports[offer[type].finalAirport]?.name}
              </strong>
            </p>
          </div>

          {/* Stop details */}
          <div className="flex flex-col gap-1 w-1/2 text-md">
            <p>{`${offer[type].totalTime.split("T")[1]}`}</p>

            {offer[type].flightStops == null ? (
              <p>No stops</p>
            ) : (
              offer[type].flightStops.map((stop, index) => (
                <FlightStop key={index} stop={stop} dictionary={dictionary} />
              ))
            )}
          </div>
        </div>

        {/* Airline */}
        <div className="text-xs font-light italic">{`(${offer[type].airline.code})${offer[type].airline.name}`}</div>
      </div>
    );
  };

  // render price
  const renderPrice = (offer: Offer) => {
    return (
      <div className="flex flex-col min-w-50 p-5 items-end justify-center border-l border-gray-300 text-start">
        <div className="flex flex-col gap-2 text-end w-fit">
          <strong className="text-lg">
            $ {offer.price.grandTotal} {offer.price.currency}
          </strong>
          <p className="text-md">Total</p>
        </div>

        <div className="flex flex-col gap-2 text-end w-fit">
          {offer.returningFlight !== null ? (
            <strong className="text-lg">
              $ {parseFloat(offer.travelerPricings[0].price.total) * 2}{" "}
              {offer.price.currency}
            </strong>
          ) : (
            <strong className="text-lg">
              $ {offer.travelerPricings[0].price.total} {offer.price.currency}
            </strong>
          )}
          <p className="text-md">Price per traveler</p>
        </div>
      </div>
    );
  };

  return (
    <div
      key={`offer-${index}`}
      className="flex gap-2 border-gray-500 rounded w-full p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50"
      {...rest}
    >
      {offer.returningFlight !== null ? (
        // if the offer has a returning flight, render it
        <>
          <div className="w-full flex flex-col gap-2">
            {renderFlightOffer(offer, index, "goingFlight")}
            <hr className="border-gray-300" />
            {renderFlightOffer(offer, index, "returningFlight")}
          </div>
        </>
      ) : (
        renderFlightOffer(offer, index, "goingFlight")
      )}
      {renderPrice(offer)}
    </div>
  );
};

export default FlightDetailsCard;
