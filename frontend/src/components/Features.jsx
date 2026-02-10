import "./Features.css";
import travelIcon from "../assets/icons/travel.gif"
import departureIcon from "../assets/icons/departure.gif"
import bordingIcon from "../assets/icons/boarding-pass.gif"
import smartphoneIcon from "../assets/icons/smartphone.gif"
import sustainableIcon from "../assets/icons/sustainable-travel.gif"
import airlineLogos from "../assets/airline_logos.png"

export default function Features() {
    const features = [
        {
            id: "01",
            icon: travelIcon,
            title: "Live Flight Route",
            description: "Track real-time flight paths and routes with precise location data and estimated arrival times for any aircraft in the sky."
        },
        {
            id: "02",
            icon: sustainableIcon,
            title: "By Airlines in Timezone",
            description: "Search and filter flights by specific airlines within your timezone, making it easier to track international flights."
        },
        {
            id: "03",
            icon: departureIcon,
            title: "Airport Departures & Arrivals",
            description: "Monitor all departures and arrivals at any airport worldwide with comprehensive scheduling information."
        },
        {
            id: "04",
            icon: bordingIcon,
            title: "Location to Location",
            description: "Find all available flights from a specific origin to any destination, including direct and connecting flights."
        },
        {
            id: "05",
            icon: smartphoneIcon,
            title: "Search by Flight Number",
            description: "Instantly locate any flight by entering its flight number and date for detailed tracking information."
        }
    ];

    const airlines = ["Emirates", "Delta", "United Airlines", "British Airways", "Lufthansa", "Air France", "Singapore Airlines", "Qatar Airways"];

    const mainIntentFeatures = [
        {
            id: 1,
            title: "Live Flight Route",
            description: "Track real-time flight paths and routes with precise location data. Monitor aircraft positions, altitudes, speeds, and estimated arrival times for any flight in the sky. Get comprehensive route information including waypoints and flight corridors.",
            icon: travelIcon
        },
        {
            id: 2,
            title: "By Airlines in Timezone",
            description: "Search and filter flights by specific airlines within your timezone. Easily track international flights and view departure/arrival times adjusted to your local timezone. Perfect for monitoring flights from your favorite carriers.",
            icon: sustainableIcon
        },
        {
            id: 3,
            title: "Airport Departures & Arrivals",
            description: "Monitor all departures and arrivals at any airport worldwide. Get comprehensive scheduling information, gate assignments, and real-time status updates. Never miss important flight information at your local or destination airport.",
            icon: departureIcon
        },
        {
            id: 4,
            title: "Location to Location",
            description: "Find all available flights from a specific origin to any destination. View direct flights and connecting options with detailed route information. Compare multiple airlines and flight times to plan your journey effectively.",
            icon: bordingIcon
        },
        {
            id: 5,
            title: "Search by Flight Number",
            description: "Instantly locate any flight by entering its flight number and date. Get detailed tracking information including current position, flight status, scheduled and actual departure/arrival times, and complete flight history.",
            icon: smartphoneIcon
        }
    ];

    return (
        <section className="features-section" id="features">
            <div className="features-container">
                <div className="features-header">
                    <h2 className="features-title">
                        Explore the <span className="highlight">Features</span>
                    </h2>
                    <p className="features-subtitle">
                        Our platform isn't based on guesswork—it's driven by rigorous data analysis and state-of-the-art flight tracking technology.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature) => (
                        <div key={feature.id} className="feature-card">
                            <div className="feature-number">{feature.id}</div>
                            <img src={feature.icon} alt="feature icon" className="feature-icon" />
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="airline-carousel-section">
                <h2 className="airline-carousel-heading">
                    Favourite <span className="highlight">Airlines</span>
                </h2>
                <div className="airline-carousel-wrapper">
                    <div className="airline-carousel-track">
                        <img src="/SpiritTaillogo.webp" alt="Spirit Airlines" className="airline-logo" />
                        <img src="/SingaporeTail_2cff618a-5c9e-4a7c-b30b-7ce549fa7693.webp" alt="Singapore Airlines" className="airline-logo" />
                        <img src="/AirIndiaTaillogo.webp" alt="Air India" className="airline-logo" />
                        <img src="/6E_IndiGo_India_Dec2022_v3.webp" alt="IndiGo" className="airline-logo" />
                        <img src="/SpiritTaillogo.webp" alt="Spirit Airlines" className="airline-logo" />
                        <img src="/SingaporeTail_2cff618a-5c9e-4a7c-b30b-7ce549fa7693.webp" alt="Singapore Airlines" className="airline-logo" />
                        <img src="/DeltaTailLogo.webp" alt="Delta Airlines" className="airline-logo" />
                        <img src="/AirIndiaTaillogo.webp" alt="Air India" className="airline-logo" />
                        <img src="/6E_IndiGo_India_Dec2022_v3.webp" alt="IndiGo" className="airline-logo" />
                    </div>
                </div>
            </div>

            <div className="main-intent-section">
                <h2 className="main-intent-heading">
                    The <span className="highlight">Main Intent</span>
                </h2>

                <div className="intent-features-container">
                    {mainIntentFeatures.map((feature) => (
                        <div key={feature.id} className="intent-feature">
                            <div className="intent-content">
                                <h3 className="intent-title">{feature.title}</h3>
                                <p className="intent-description">{feature.description}</p>
                                <button className="track-flight-btn">
                                    <span>Track Flight</span>
                                    <span className="btn-arrow">→</span>
                                </button>
                            </div>
                            <div className="intent-image">
                                <img src={feature.icon} alt={feature.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
