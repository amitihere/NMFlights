import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Location from './pages/Location'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </>
  )
}

export default App