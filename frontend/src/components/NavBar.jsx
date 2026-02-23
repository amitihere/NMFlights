import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleFeature = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("features");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={()=> navigate("/")}>
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
        <div className="navbar-auth">
          {user ? (
            <>
              <span className="nav-welcome">✈ Welcome, {user.username}!</span>
              <button className="nav-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/flight-search" className="cta-button">
              Track Flight
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}