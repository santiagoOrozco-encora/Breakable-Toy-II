import { Dictionary, Segment, FareDetailsBySegment } from "../../api/types";

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
  return (
    <div className="flex gap-2 rounded p-2 max-h-40 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Flight details */}
      <div className="flex flex-col gap-2 w-2/3 p-3 justify-between">
        {/* Duration */}
        <div className="flex gap-2 justify-between">
          <div className="flex">
            <p>{segment.departureTime.split("T")[0]} / </p>
            <p>{segment.departureTime.split("T")[1]}</p>
          </div>
          <p> ({segment.duration}) </p>
          <div className="flex">
            <p>{segment.arrivalTime.split("T")[0]} / </p>
            <p>{segment.arrivalTime.split("T")[1]}</p>
          </div>
        </div>
        {/* Airports */}
        <div className="flex gap-2 text-md justify-between">
          <p>
            {dictionary.airports[segment.departureAirport]?.name} (
            {segment.departureAirport})
          </p>
          <p> - </p>
          <div className="flex flex-col text-sm text-end">
            <p>
              {dictionary.airports[segment.arrivalAirport]?.name} (
              {segment.arrivalAirport})
            </p>
            {segment.waitTime !== null && (
              <p className="text-gray-500">{segment.waitTime} hrs wait</p>
            )}
          </div>
        </div>
        {/* Airline */}
        <div className="flex text-sm">
          <p>{segment.airlineInfo.name}</p>
          <p>({segment.airlineInfo.code})</p>
        </div>
      </div>
      {/* Travelers amenities */}
      <div className="flex flex-col gap-2 w-1/3 text-sm">
        <h2 className="text-start text-lg font-bold">Travel details</h2>
        {/* Cabin and class */}
        <div className="flex gap-2">
          <p>Cabin:</p>
          <p>{fareDetails?.cabin}</p>
        </div>
        <div className="flex gap-2">
          <p>Class:</p>
          <p>{fareDetails?.class}</p>
        </div>
        <hr />
        {/* Amenities */}
        <h2 className="text-start text-lg font-bold">Amenities</h2>
        <div className="flex flex-col gap-2">
          <p>Checked bags:{fareDetails?.includedCheckedBags.quantity}</p>
          {fareDetails?.amenities.map((amenity, index) => (
            <div key={index} className="flex gap-2 flex-col">
              <p className="text-wrap text-ellipsis">{amenity.description}</p>
              <p className="text-xs">
                {amenity.isChargeable ? "Chargeable" : "Not chargeable"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SegmentDetails;
