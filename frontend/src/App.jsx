import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Location from './pages/Location'
import ArrivalsDepartures from './pages/ArrivalsDepartures'
import Airlines from './pages/Airlines'
import FlightSearch from './pages/FlightSearch'
import Features from './components/Features'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/location" element={<Location />} />
        <Route path="/arrivals-departures" element={<ArrivalsDepartures />} />
        <Route path="/airlines" element={<Airlines />} />
        <Route path="/flight-search" element={<FlightSearch />} />
      </Routes>
    </>
  )
}

export default App