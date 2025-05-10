import { useLocation, useNavigate } from "react-router-dom";

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // flights is what we passed as { state: { flights } }
  const flights = location.state?.flights;

  if (!flights) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Flight Search Results</h1>
        <div className="mb-4 text-red-500">No flight data found. Please search again.</div>
        <button className="rounded bg-blue-500 text-white px-4 py-2" onClick={() => navigate("/")}>Back to Search</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Flight Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render your flight offers here. For now, just JSON stringify as a placeholder */}
        <pre className="col-span-full bg-gray-100 p-4 rounded text-xs overflow-x-auto">{JSON.stringify(flights, null, 2)}</pre>
      </div>
    </div>
  );
};

export default FlightResults;
