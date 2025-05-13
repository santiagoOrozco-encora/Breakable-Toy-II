import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlightSearchPage from "./pages/FlightSearch";
import FlightResults from "./pages/FlightResults";
import FlightDetails from "./pages/FlightDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlightSearchPage />} />
        <Route path="/FlightResults" element={<FlightResults />} />
        <Route path="/FlightDetails" element={<FlightDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
