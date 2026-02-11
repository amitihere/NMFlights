import { useState } from "react";
import {Link} from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          NMFlights
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link onClick={() => scrollToSection("features")} className="nav-link">Features</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/flights" className="nav-link">Flights</Link>
        </div>
        <a href="#track" className="cta-button">
          Track Flight
        </a>
      </div>
    </nav>
  );
}
