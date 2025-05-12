import { Dictionary, Segment } from "../../api/types";

interface SegmentDetailsProps {
  segment: Segment;
  dictionary: Dictionary;
}

const SegmentDetails: React.FC<SegmentDetailsProps> = ({
  segment,
  dictionary,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <p>{segment.departureTime}</p>
        {" / "}
        <p>{segment.arrivalTime}</p>
      </div>
      <div></div>
    </div>
  );
};

export default SegmentDetails;
