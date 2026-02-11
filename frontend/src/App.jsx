import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import LiveFlight from "./pages/LiveFlight";
import Airlines from "./pages/Airlines";
import Airport from "./pages/Airport";
import Location from "./pages/Location";
import FlightNumber from "./pages/FlightNumber";

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/live-route' element={<LiveFlight />} />
        <Route path='/airlines' element={<Airlines />} />
        <Route path='/airport' element={<Airport />} />
        <Route path='/location' element={<Location />} />
        <Route path='/flight-number' element={<FlightNumber />} />
      </Routes>
    </>
  );
}

export default App;
