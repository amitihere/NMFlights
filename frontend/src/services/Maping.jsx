import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import Navbar from "../components/NavBar";
import "./Maping.css";

// Fix Leaflet default icon paths broken by bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom flight icon
const flightIcon = L.divIcon({
  className: "",
  html: `<div class="flight-icon">✈</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Airport marker icon
const airportIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [22, 36],
  iconAnchor: [11, 36],
  popupAnchor: [1, -34],
});

function ResizeFix() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 0);
  }, [map]);
  return null;
}

// Top 10 busiest airports data
const busyAirports = [
  { rank: 1, name: "Hartsfield-Jackson Atlanta International", city: "Atlanta, USA", iata: "ATL", passengers: "93.7M" },
  { rank: 2, name: "Dallas/Fort Worth International", city: "Dallas, USA", iata: "DFW", passengers: "73.4M" },
  { rank: 3, name: "Denver International", city: "Denver, USA", iata: "DEN", passengers: "69.0M" },
  { rank: 4, name: "Chicago O'Hare International", city: "Chicago, USA", iata: "ORD", passengers: "68.3M" },
  { rank: 5, name: "Dubai International", city: "Dubai, UAE", iata: "DXB", passengers: "66.9M" },
  { rank: 6, name: "Los Angeles International", city: "Los Angeles, USA", iata: "LAX", passengers: "65.9M" },
  { rank: 7, name: "London Heathrow", city: "London, UK", iata: "LHR", passengers: "61.6M" },
  { rank: 8, name: "Indira Gandhi International", city: "New Delhi, India", iata: "DEL", passengers: "59.5M" },
  { rank: 9, name: "Chhatrapati Shivaji Maharaj International", city: "Mumbai, India", iata: "BOM", passengers: "49.8M" },
  { rank: 10, name: "John F. Kennedy International", city: "New York, USA", iata: "JFK", passengers: "49.0M" },
];

// DEL and BOM coordinates
const DEL = [28.5665, 77.103];
const BOM = [19.0896, 72.8656];
const midPoint = [(DEL[0] + BOM[0]) / 2, (DEL[1] + BOM[1]) / 2];

export default function Maping() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <Navbar />

      {/* ── HERO / WELCOME ────────────────────────────────── */}
      <section className="about-hero">
        <div className="hero-badge">✈ About NMFlights</div>
        <h1 className="hero-title">
          Welcome to <span className="gold">NMFlights</span>
        </h1>
        <p className="hero-sub">We are glad to have you here!</p>
        <p className="hero-desc">
          NMFlights is your all-in-one aviation intelligence platform — tracking
          every commercial flight around the world in real-time, so you always
          know where any aircraft is, where it came from, and where it's headed.
        </p>
      </section>


      {/* ── COMMUNITY / JOIN ─────────────────────────────── */}
      <section className="about-section community-section">
        <div className="section-inner community-inner">
          <h2 className="community-title">
            Want to join the <span className="gold">NMFlights Community?</span>
          </h2>
          <p className="community-desc">
            Please login or become a member to unlock full access — track live
            flights, save favourite routes, and get real-time alerts on any
            aircraft around the world.
          </p>
          <div className="community-btns">
            <button className="comm-btn login-btn" onClick={() => navigate('/login')}>
              🔑 Login
            </button>
            <button className="comm-btn signup-btn" onClick={() => navigate('/signup')}>
              🚀 Sign Up
            </button>
          </div>
        </div>
      </section>


      <section className="about-section alt-bg">
        <div className="section-inner">
          <h2 className="section-title">
            Top 10 Busiest <span className="gold">Airports in the World</span>
          </h2>
          <p className="section-body">
            These mega-hubs collectively handle over 700 million passengers a year,
            making them the beating heart of global aviation.
          </p>

          <div className="airport-table-wrap">
            <table className="airport-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Airport</th>
                  <th>City / Country</th>
                  <th>IATA</th>
                  <th>Annual Passengers</th>
                </tr>
              </thead>
              <tbody>
                {busyAirports.map((a) => (
                  <tr key={a.iata} className={a.iata === "DEL" || a.iata === "BOM" ? "highlight-row" : ""}>
                    <td className="rank-cell">{a.rank}</td>
                    <td>{a.name}</td>
                    <td>{a.city}</td>
                    <td><span className="iata-badge">{a.iata}</span></td>
                    <td>{a.passengers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-inner">
          <h2 className="section-title">
            Sample Route: <span className="gold">Delhi → Mumbai</span>
          </h2>
          <p className="section-body">
            Here's a snapshot of one of India's busiest domestic corridors —
            Indira Gandhi International (DEL) to Chhatrapati Shivaji Maharaj
            International (BOM). The ✈ icon represents the flight midpoint.
          </p>

          <div className="route-map-wrap">
            <MapContainer
              center={midPoint}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
            >
              <ResizeFix />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Route line */}
              <Polyline
                positions={[DEL, BOM]}
                pathOptions={{ color: "#fccd40", weight: 3, dashArray: "8 6", opacity: 0.9 }}
              />

              {/* DEL marker */}
              <Marker position={DEL} icon={airportIcon}>
                <Popup>
                  <strong>Indira Gandhi International</strong>
                  <br />Delhi, India · DEL
                </Popup>
              </Marker>

              {/* BOM marker */}
              <Marker position={BOM} icon={airportIcon}>
                <Popup>
                  <strong>Chhatrapati Shivaji Maharaj International</strong>
                  <br />Mumbai, India · BOM
                </Popup>
              </Marker>

              {/* Flight icon at midpoint */}
              <Marker position={midPoint} icon={flightIcon}>
                <Popup>
                  <strong>NMFlights Sample Flight</strong>
                  <br />DEL → BOM · En route
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <p className="map-caption">
            ✈ Click any marker for details · Route shown is approximate
          </p>
        </div>
      </section>

      <section className="about-section alt-bg">
        <div className="section-inner">
          <h2 className="section-title">
            About the <span className="gold">NMFlights App</span>
          </h2>

          <div className="desc-grid">
            <div className="desc-block">
              <h3>What is NMFlights?</h3>
              <p>
                NMFlights is a full-stack aviation tracking web application built
                with React on the frontend and Node.js / Express on the backend.
                It connects to live flight-data APIs and an internal airport
                dataset to provide users with accurate, real-time information
                about commercial aviation worldwide.
              </p>
            </div>

            <div className="desc-block">
              <h3>User Warning</h3>
              <ul>
                <li style={{ color: "#ef0d0dff" , fontWeight: "bold"}}>Just to let the user know that this is not a free api which the developer (i.e me) as used so please don't make unneccessary requests to the api</li>
                <li>AviationStack / OpenSky API (live data feed)</li>
              </ul>
            </div>

            <div className="desc-block">
              <h3>Why NMFlights?</h3>
              <p>
                Unlike heavyweight flight-tracking sites cluttered with ads and
                paywalls, NMFlights focuses on delivering clean, fast, and
                accurate data. Students, aviation enthusiasts, and travel
                planners alike can use it to get concise, beautiful,
                at-a-glance flight intelligence — for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ─────────────────────────────────── */}
      <div className="about-footer-strip">
        <span>© {new Date().getFullYear()} NMFlights — All rights reserved</span>
        <span className="gold">Built with ✈ and ❤️</span>
      </div>
    </div>
  );
}
