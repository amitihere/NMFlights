import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          NMFlights
        </div>
        <div className="navbar-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#flights" className="nav-link">Flights</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href="#track" className="cta-button">
          Track Flight
        </a>
      </div>
    </nav>
  );
}
