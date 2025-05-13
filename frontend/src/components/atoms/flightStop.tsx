import { Segment, Dictionary } from "../../api/types";

interface FlightStopProps {
  stop: Segment;
  dictionary: Dictionary;
}

const FlightStop: React.FC<FlightStopProps> = ({ stop, dictionary }) => {
  return (
    <div className="flex gap-1 items-center">
      <p>{`${stop.waitTime} hrs`}</p>
      <p>{" / "}</p>
      {dictionary.airports[stop.airportData]?.name ? (
        <p>
          <strong>{dictionary.airports[stop.airportData]?.name}</strong>(
          {stop.airportData})
        </p>
      ) : (
        <strong>{stop.airportData}</strong>
      )}
    </div>
  );
};

export default FlightStop;
