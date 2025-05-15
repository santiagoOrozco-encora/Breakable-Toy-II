import { Dictionary, Offer } from "../../api/types";

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
  console.log(offer);

  // render flight offer
  const renderFlightOffer = (
    offer: Offer,
    index: number,
    type: "goingFlight" | "returningFlight"
  ) => {
    return (
      <div
        key={`${type}-${index}`}
        className="flex flex-col gap-2 p-5 rounded w-full justify-around"
      >
        {/* Duration */}
        <div className="flex items-center justify-between">
          <h1>{`${offer[type].initialDayTime.split("T")[0]} / ${
            offer[type].initialDayTime.split("T")[1]
          }`}</h1>
          <p>{offer[type].totalTime.split("T")[1]}</p>
          <h1>{`${offer[type].finalDayTime.split("T")[0]} / ${
            offer[type].finalDayTime.split("T")[1]
          }`}</h1>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 w-full">
          {/* Segments */}
          {offer[type].segments.map((segment, segmentIndex) => (
            <div key={`offer-${index}-${type}-segment-${segmentIndex}`}>
              <div className="flex gap-1 w-full justify-center">
                {/* Departure */}
                <div className="flex flex-col items-start gap-1 w-1/3 text-left">
                  <p className="text-md">
                    {`(${segment.departureAirport}) `}
                    <strong>
                      {dictionary.airports[segment.departureAirport]?.name}
                    </strong>
                  </p>
                </div>
                {/* Duration */}
                <div className="text-xs flex items-center justify-center w-1/3 gap-2">
                  <p className="text-right w-16">
                    {segment.duration.split("T")[1]}
                  </p>
                  <div className="w-[1px] h-full bg-gray-300" />
                  <div className="flex flex-col gap-1 w-fit">
                    {segment.stops !== null ? (
                      segment.stops.map((stop, stopIndex) => (
                        <div
                          key={`offer-${index}-${type}-segment-${segmentIndex}-stop-${stopIndex}`}
                          className="flex  gap-1"
                        >
                          <p>
                            ({stop.iataCode}){" "}
                            {dictionary.airports[stop.iataCode]?.name}
                          </p>
                          <p>{stop.duration.split("T")[1]}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-left">Non-stop</p>
                    )}
                  </div>
                </div>
                {/* Arrival */}
                <p className="text-md w-1/3 text-right">
                  {`(${segment.arrivalAirport}) `}
                  <strong>
                    {dictionary.airports[segment.arrivalAirport]?.name}
                  </strong>
                </p>
              </div>
              {/* <hr className="border-gray-300" /> */}
            </div>
          ))}
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
          <strong className="text-lg">
            $ {offer.travelerPricings[0].price.total} {offer.price.currency}
          </strong>
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
