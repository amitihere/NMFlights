import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./home.css";


export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="appleLoader">
        <div className="planeWrapper">
          <div className="plane">✈</div>
          <div className="progressBar">
            <div className="progressFill"></div>
          </div>
          <p className="loaderText">Preparing your flight experience</p>
        </div>
      </div>
    );
  }
  return (
    <div className="home">
      <Navbar />

      <div className="heroSection">
        <div className="heroOverlay"></div>

        <div className="heroContent">
          <div className="heroBadge">Real-Time Flight Tracking</div>

          <h1 className="heroTitle">
            Track Your Flights
            <span className="gradientText"> In Real-Time</span>
          </h1>

          <p className="heroDescription">
            Get accurate updates on departures, arrivals, routes, and delays.
            Track any flight worldwide with NMFlights.
          </p>

          <div className="buttonGroup">
            <button className="trackFlightBtn" onClick={() => navigate('/flight-search')}>
              <span>Track Flight</span>
              <span className="btnIcon">→</span>
            </button>
            <button className="learnMoreBtn" onClick={() => navigate('/maps')}>Learn More</button>
          </div>

          <div className="infoCards">
            <div className="infoCard">
              <div className="cardIcon">
                <img src="/plane_contrails_71dp_F2CDA2_FILL0_wght400_GRAD0_opsz48.png" alt="Live Flight Routes" />
              </div>
              <h3>Live Flight Routes</h3>
              <p>Track real-time flight paths and routes worldwide with accurate GPS coordinates.</p>
            </div>
            <div className="infoCard">
              <div className="cardIcon"><img src="/flights_and_hotels_71dp_F2CDA2_FILL0_wght400_GRAD0_opsz48.png" /></div>
              <h3>Global Coverage</h3>
              <p>Access departure and arrival data for airports across all timezones instantly.</p>
            </div>
            <div className="infoCard">
              <div className="cardIcon">
                <img src="/travel_explore_71dp_F2CDA2_FILL0_wght400_GRAD0_opsz48.png" />
              </div>
              <h3>Flight Search</h3>
              <p>Search by flight number, airline, or route to get comprehensive flight details.</p>
            </div>
          </div>
        </div>
      </div>

      <section id="features"><Features /></section>
      <Footer />
    </div>
  );
}