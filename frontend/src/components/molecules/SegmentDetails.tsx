import { Dictionary, Segment, FareDetailsBySegment } from "../../api/types";
import Button from "../atoms/Button";
import { useState } from "react";

interface SegmentDetailsProps {
  segment: Segment;
  dictionary: Dictionary;
  fareDetails: FareDetailsBySegment | undefined;
}

const SegmentDetails: React.FC<SegmentDetailsProps> = ({
  segment,
  dictionary,
  fareDetails,
}) => {
  const [showAmenities, setShowAmenities] = useState(false);

  return (
    <div className="flex gap-2 items-center flex-col w-full max-h-fit">
      {/* Wait time */}
      {segment.waitTime !== null &&
      segment.waitTime !== "" &&
      segment.waitTime !== "0:00:00" ? (
        <div className="w-full flex flex-col justify-center items-center text-center rounded bg-amber-100 shadow-md hover:shadow-lg transition-shadow">
          <p className="text-gray-500">{segment.waitTime} hrs wait</p>
        </div>
      ) : null}

      <div className="flex gap-2 w-full rounded max-h-fit shadow-md hover:shadow-lg transition-shadow justify-between">
        <div className="flex flex-col gap-2 w-full max-w-full min-w-2/3 p-5 justify-between">
          {/* Flight details */}
          <div className="flex gap-2 w-full justify-between">
            {/* Left */}
            <div className="flex flex-col gap-2 items-start">
              {/* Departure time */}
              <div className="flex text-wrap">
                <p>{segment.departureTime.split("T")[0]} / </p>
                <p>{segment.departureTime.split("T")[1]}</p>
              </div>
              {/* Departure Airport flight number*/}
              <div className="flex flex-col text-sm items-start text-wrap max-w-50 text-left">
                <p className="text-start">
                  {dictionary.airports[segment.departureAirport]?.name} (
                  {segment.departureAirport})
                </p>
                <strong className="text-xs">{segment.number}</strong>
              </div>
            </div>
            {/* Center */}
            <div className="flex flex-col gap-2 items-center">
              {/* Duration */}
              <p> ({segment.duration.split("T")[1]}) </p>
              {/* Stops */}
              <div className="flex flex-col gap-2 items-center justify-center text-xs">
                {segment.stops != null ? (
                  segment.stops.map((stop, index) => (
                    <div key={index} className="flex gap-2">
                      <p>
                        ({stop.iataCode}){" "}
                        {dictionary.airports[stop.iataCode]?.name}
                      </p>
                      <p>{stop.duration.split("T")[1]}</p>
                    </div>
                  ))
                ) : (
                  <p>No stops</p>
                )}
              </div>
            </div>
            {/* Right */}
            <div className="flex flex-col gap-2 items-end">
              {/* Arrival time */}
              <div className="flex">
                <p>{segment.arrivalTime.split("T")[0]} / </p>
                <p>{segment.arrivalTime.split("T")[1]}</p>
              </div>
              <div className="flex flex-col text-sm items-end text-wrap max-w-50 text-right">
                <p>
                  {dictionary.airports[segment.arrivalAirport]?.name} (
                  {segment.arrivalAirport})
                </p>
              </div>
            </div>
          </div>
          {/* Airline and Operating */}
          <div className="flex gap-2">
            <div className="flex text-xs gap-2 items-start">
              <div className="flex items-center">
                <p className="font-bold">Airline: </p>
                <p> {segment.airlineInfo.name}</p>
                <p>({segment.airlineInfo.code})</p>
              </div>
              {segment.carrierCode != segment.airlineInfo.code && (
                <>
                  <p>/</p>
                  <div className="flex items-center">
                    <p className="font-bold">Operating: </p>
                    <p> {dictionary.carriers[segment.carrierCode]}</p>
                    <p>({segment.operating})</p>
                  </div>
                </>
              )}
              {/* <div className="text-xs font-light italic flex flex-col justify-between">
                <p>
                  Operated by {segment.operating} /{" "}
                  {dictionary.aircraft[segment.aircraft.code].valueOf()}
                </p>
              </div> */}
            </div>
          </div>
          {/* Amenities */}
          {showAmenities ? (
            <div className="flex flex-col gap-2 rounded p-2 shadow-xl transition-shadow w-full">
              <h2 className="text-left text-lg font-bold">Amenities</h2>
              <div className="flex flex-col gap-2">
                <p>Checked bags:{fareDetails?.includedCheckedBags.quantity}</p>
                {fareDetails?.amenities.map((amenity, index) => (
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
            <></>
          )}
        </div>
        {/* Details */}
        <div className="flex h-full min-w-1/5 max-w-1/5 gap-2 text-wrap">
          {/* Travel details */}
          <div className="flex flex-col gap-2 w-full text-sm p-3 text-wrap">
            {/* Cabin and class */}
            <div className="flex gap-2 text-wrap w-full flex-col">
              <p>Cabin:</p>
              <p>{fareDetails?.cabin}</p>
            </div>
            <div className="flex gap-2 text-wrap">
              <p>Class:</p>
              <p>{fareDetails?.class}</p>
            </div>
            <Button
              variant={"secondary"}
              onClick={() => {
                setShowAmenities(!showAmenities);
              }}
            >
              {showAmenities ? "Hide amenities" : "Show amenities"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentDetails;
