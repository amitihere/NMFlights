import Navbar from "../components/Navbar";
import LiquidEther from "../animations/LiquidEther.jsx";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <Navbar />

      <div className="heroSection">
        <div className="liquidEtherBackground">
          <LiquidEther
            topColor="#ff6600"
            bottomColor="#ffaa55"
            intensity={1.2}
            rotationSpeed={0.3}
            glowAmount={0.003}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>

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
        </div>
      </div>
    </div>
  );
}
