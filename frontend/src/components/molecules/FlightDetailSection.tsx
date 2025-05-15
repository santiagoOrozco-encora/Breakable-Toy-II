import { Dictionary, Flight, FareDetailsBySegment } from "../../api/types";
import SegmentDetails from "./SegmentDetails";

interface FlightDetailSectionProps {
  flight: Flight;
  dictionary: Dictionary;
  fareDetails: FareDetailsBySegment[];
}

const FlightDetailSection: React.FC<FlightDetailSectionProps> = ({
  flight,
  dictionary,
  fareDetails,
}) => {
  return (
    <div className="w-full flex flex-col gap-5 rounded p-2">
      {flight.segments.map((segment, index) => {
        const fareDetailsBySegment: FareDetailsBySegment | undefined =
          fareDetails.find((fareDetail) => fareDetail.segmentId === segment.id);
        return (
          <SegmentDetails
            key={index}
            segment={segment}
            dictionary={dictionary}
            fareDetails={fareDetailsBySegment}
          />
        );
      })}
    </div>
  );
};

export default FlightDetailSection;
