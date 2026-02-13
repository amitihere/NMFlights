import { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          NMFlights
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/flights" className="nav-link">Flights</Link>
        </div>
        <Link to="/flight-search" className="cta-button">
          Track Flight
        </Link>
      </div>
    </nav>
  );
}