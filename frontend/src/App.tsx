import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlightSearchPage from "./pages/FlightSearch";
import FlightResults from "./pages/FlightResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlightSearchPage />} />
        <Route path="/FlightResults" element={<FlightResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
