import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Location from './pages/Location'
import ArrivalsDepartures from './pages/ArrivalsDepartures'
import Airlines from './pages/Airlines'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Location />} />
        <Route path="/arrivals-departures" element={<ArrivalsDepartures />} />
        <Route path="/airlines" element={<Airlines />} />
      </Routes>
    </>
  )
}

export default App