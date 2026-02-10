import "./Features.css";
import travelIcon from "../assets/icons/travel.gif"
import departureIcon from "../assets/icons/departure.gif"
import bordingIcon from "../assets/icons/boarding-pass.gif"
import smartphoneIcon from "../assets/icons/smartphone.gif"
import sustainableIcon from "../assets/icons/sustainable-travel.gif"

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
                            <img src={feature.icon} alt="feature icon" className="feature-icon"/>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
