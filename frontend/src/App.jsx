import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Location from './pages/Location'
import ArrivalsDepartures from './pages/ArrivalsDepartures'
import Airlines from './pages/Airlines'
import FlightSearch from './pages/FlightSearch'
import Features from './components/Features'
import Maping from './services/Maping'
import Login from './pages/Login'
import Signup from './pages/Signup'
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
        <Route path="/maps" element={<Maping />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App