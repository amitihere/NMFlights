import { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

const handleFeature = () => {
  navigate("/");
  setTimeout(() => {
    const section = document.getElementById("features");
    section?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          NMFlights
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <button className="nav-link" onClick={handleFeature}>
            Features
          </button>
          <Link to="/maps" className="nav-link">About</Link>
          <Link to="/location" className="nav-link">Flights</Link>
        </div>
        <Link to="/flight-search" className="cta-button">
          Track Flight
        </Link>
      </div>
    </nav>
  );
}