import { useState, useEffect } from "react";
import axios from "axios";
import "./ArrivalsDepartures.css";
import NavBar from "../components/NavBar.jsx";

export default function ArrivalsDepartures() {
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [airportSearch, setAirportSearch] = useState("");
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [showAirportDropdown, setShowAirportDropdown] = useState(false);
    const [activeTab, setActiveTab] = useState("departures");
    const [flights, setFlights] = useState({ departures: [], arrivals: [] });
    const [flightsLoading, setFlightsLoading] = useState(false);
    const API = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const response = await axios.get(`${API}/api/reqFlights/airports`);
                setAirports(response.data);
            } catch (err) {
                console.error("Error fetching airports:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAirports();
    }, []);

    const filterAirports = (searchTerm) => {
        if (!searchTerm) return airports;
        const term = searchTerm.toLowerCase();
        return airports.filter(
            (airport) =>
                airport.name.toLowerCase().startsWith(term) ||
                airport.iataCode.toLowerCase().startsWith(term) ||
                airport.city.toLowerCase().startsWith(term)
        );
    };

    const handleAirportSelect = async (airport) => {
        setSelectedAirport(airport);
        setAirportSearch("");
        setShowAirportDropdown(false);

        setFlightsLoading(true);
        try {
            const response = await axios.get(`${API}/api/reqFlights/byAirports/${airport.iataCode}`);
            setFlights(response.data);
        } catch (err) {
            console.error("Error fetching flights:", err);
            setFlights({ departures: [], arrivals: [] });
        } finally {
            setFlightsLoading(false);
        }
    };

    const formatTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    // Check if flight has landed
    const hasLanded = (flight) => {
        if (flight.flight_status === "landed") return true;
        if (flight.arrival.actual) return true;
        if (flight.arrival.scheduled) {
            const scheduledTime = new Date(flight.arrival.scheduled);
            const now = new Date();
            return now > scheduledTime;
        }
        return false;
    };

    const filteredAirports = filterAirports(airportSearch);

    if (loading) {
        return (
            <div className="locationLoader">
                <div className="loaderContent">
                    <div className="loaderPlane">✈</div>
                    <div className="loaderBar">
                        <div className="loaderFill"></div>
                    </div>
                    <p className="loaderMsg">Loading airports...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="arrDepPage">
            <NavBar />
            <div className="arrDepContainer">
                <div className="pageHeader">
                    <h1 className="pageTitle">Airport Arrivals & Departures</h1>
                    <p className="pageSubtitle">
                        View all arrivals and departures for any airport worldwide
                    </p>
                                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <h3 style={{ color: '#ca2929ff' }}>
                            User Information
                        </h3>
                        <p className="pageSubtitle">
                            You will only be able to search flights which are available in real-time, to check the api you can search any airport of your choice.
                        </p>
                    </div>
                </div>

                <div className="searchCard">
                    <div className="inputWrapper">
                        <label className="inputLabel">Select Airport</label>
                        <div className="autocompleteField">
                            <div className="selectedAirport">
                                {selectedAirport ? (
                                    <div className="selectedAirportInfo">
                                        <span className="airportCode">{selectedAirport.iataCode}</span>
                                        <span className="airportName">{selectedAirport.name}</span>
                                        <button className="clearBtn" onClick={() => { setSelectedAirport(null); setFlights({ departures: [], arrivals: [] }); }}>×</button>
                                    </div>
                                ) : (
                                    <input type="text" placeholder="Search airport by name, code, or city..." value={airportSearch} onChange={(e) => setAirportSearch(e.target.value)} onFocus={() => setShowAirportDropdown(true)} className="searchInput" />
                                )}
                            </div>
                            <button className="dropdownToggle" onClick={() => { setShowAirportDropdown(!showAirportDropdown); setAirportSearch(""); }}>
                                <span className={`arrow ${showAirportDropdown ? "up" : "down"}`}>▼</span>
                            </button>
                        </div>

                        {showAirportDropdown && (
                            <div className="autocompleteDropdown">
                                {filteredAirports.length > 0 ? (
                                    filteredAirports.map((airport) => (
                                        <div key={airport._id} className="airportOption" onClick={() => handleAirportSelect(airport)}>
                                            <span className="optionCode">{airport.iataCode}</span>
                                            <span className="optionName">{airport.name}</span>
                                            <span className="optionCity">{airport.city}, {airport.country}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="noResults">No airports found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {selectedAirport && (
                    <>
                        <div className="tabContainer">
                            <button className={`tab ${activeTab === "departures" ? "active" : ""}`} onClick={() => setActiveTab("departures")}>
                                Departures ({flights.departures.length})
                            </button>
                            <button className={`tab ${activeTab === "arrivals" ? "active" : ""}`} onClick={() => setActiveTab("arrivals")}>
                                Arrivals ({flights.arrivals.length})
                            </button>
                        </div>

                        {flightsLoading ? (
                            <div className="resultsLoading">
                                <div className="loaderPlane">✈</div>
                                <p>Loading flights...</p>
                            </div>
                        ) : (
                            <div className="flightsSection">
                                {activeTab === "departures" && (
                                    <div className="departuresSection">
                                        {flights.departures.length > 0 ? (
                                            <div className="flightsList">
                                                {flights.departures.map((flight, index) => (
                                                    <div key={index} className="flightCard">
                                                        <div className="flightHeader">
                                                            <div className="airlineInfo">
                                                                <h3 className="airlineName">{flight.airline.name}</h3>
                                                                <div className="flightNumber">
                                                                    {flight.flight.iata}
                                                                    {flight.flight.codeshared && <span className="codesharedBadge">Codeshared</span>}
                                                                </div>
                                                            </div>
                                                            <div className="flightStatus">
                                                                <span className={`statusBadge status-${flight.flight_status}`}>{flight.flight_status}</span>
                                                                <div className="flightDate">{formatDate(flight.flight_date)}</div>
                                                            </div>
                                                        </div>

                                                        <div className="flightRoute">
                                                            <div className="routeSection">
                                                                <div className="routeLabel">DEPARTURE</div>
                                                                <div className="airportCode">{flight.departure.iata}</div>
                                                                <div className="airportName">{flight.departure.airport}</div>
                                                                <div className="timeInfo">
                                                                    <div className="scheduledTime">
                                                                        <span className="timeLabel">Scheduled:</span>
                                                                        <span className="time">{formatTime(flight.departure.scheduled)}</span>
                                                                    </div>
                                                                    {flight.departure.estimated && (
                                                                        <div className="estimatedTime">
                                                                            <span className="timeLabel">Estimated:</span>
                                                                            <span className="time">{formatTime(flight.departure.estimated)}</span>
                                                                        </div>
                                                                    )}
                                                                    {flight.departure.delay && (
                                                                        <div className="delayInfo">Delay: {flight.departure.delay} min</div>
                                                                    )}
                                                                </div>
                                                                <div className="terminalGate">
                                                                    {flight.departure.terminal && <span className="terminal">Terminal {flight.departure.terminal}</span>}
                                                                    {flight.departure.gate && <span className="gate">Gate {flight.departure.gate}</span>}
                                                                </div>
                                                            </div>

                                                            <div className="routeArrow">
                                                                <div className="arrowLine"></div>
                                                                <div className="planeIcon">✈</div>
                                                            </div>

                                                            <div className="routeSection">
                                                                <div className="routeLabel">ARRIVAL</div>
                                                                <div className="airportCode">{flight.arrival.iata}</div>
                                                                <div className="airportName">{flight.arrival.airport}</div>
                                                                <div className="timeInfo">
                                                                    <div className="scheduledTime">
                                                                        <span className="timeLabel">Scheduled:</span>
                                                                        <span className="time">{formatTime(flight.arrival.scheduled)}</span>
                                                                    </div>
                                                                    {flight.arrival.estimated && (
                                                                        <div className="estimatedTime">
                                                                            <span className="timeLabel">Estimated:</span>
                                                                            <span className="time">{formatTime(flight.arrival.estimated)}</span>
                                                                        </div>
                                                                    )}
                                                                    {flight.arrival.delay && (
                                                                        <div className="delayInfo">Delay: {flight.arrival.delay} min</div>
                                                                    )}
                                                                </div>
                                                                <div className="terminalGate">
                                                                    {flight.arrival.terminal && <span className="terminal">Terminal {flight.arrival.terminal}</span>}
                                                                    {flight.arrival.baggage && <span className="baggage">Baggage {flight.arrival.baggage}</span>}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {flight.flight.codeshared && (
                                                            <div className="codesharedInfo">
                                                                <strong>Operated by:</strong> {flight.flight.codeshared.airline_name} ({flight.flight.codeshared.flight_iata})
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="noFlights">
                                                <div className="noFlightsIcon">✈</div>
                                                <h3>No Departures Found</h3>
                                                <p>No departure flights scheduled for today</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === "arrivals" && (
                                    <div className="arrivalsSection">
                                        {flights.arrivals.length > 0 ? (
                                            <div className="flightsList">
                                                {flights.arrivals.map((flight, index) => {
                                                    const landed = hasLanded(flight);
                                                    const displayStatus = landed ? "landed" : flight.flight_status;

                                                    return (
                                                        <div key={index} className="flightCard">
                                                            <div className="flightHeader">
                                                                <div className="airlineInfo">
                                                                    <h3 className="airlineName">{flight.airline.name}</h3>
                                                                    <div className="flightNumber">
                                                                        {flight.flight.iata}
                                                                        {flight.flight.codeshared && <span className="codesharedBadge">Codeshared</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="flightStatus">
                                                                    <span className={`statusBadge status-${displayStatus}`}>{displayStatus}</span>
                                                                    <div className="flightDate">{formatDate(flight.flight_date)}</div>
                                                                </div>
                                                            </div>

                                                            <div className="flightRoute">
                                                                <div className="routeSection">
                                                                    <div className="routeLabel">DEPARTURE</div>
                                                                    <div className="airportCode">{flight.departure.iata}</div>
                                                                    <div className="airportName">{flight.departure.airport}</div>
                                                                    <div className="timeInfo">
                                                                        <div className="scheduledTime">
                                                                            <span className="timeLabel">Scheduled:</span>
                                                                            <span className="time">{formatTime(flight.departure.scheduled)}</span>
                                                                        </div>
                                                                        {flight.departure.estimated && (
                                                                            <div className="estimatedTime">
                                                                                <span className="timeLabel">Estimated:</span>
                                                                                <span className="time">{formatTime(flight.departure.estimated)}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="terminalGate">
                                                                        {flight.departure.terminal && <span className="terminal">Terminal {flight.departure.terminal}</span>}
                                                                        {flight.departure.gate && <span className="gate">Gate {flight.departure.gate}</span>}
                                                                    </div>
                                                                </div>

                                                                <div className="routeArrow">
                                                                    <div className="arrowLine"></div>
                                                                    <div className="planeIcon">✈</div>
                                                                </div>

                                                                <div className="routeSection">
                                                                    <div className="routeLabel">ARRIVAL</div>
                                                                    <div className="airportCode">{flight.arrival.iata}</div>
                                                                    <div className="airportName">{flight.arrival.airport}</div>
                                                                    <div className="timeInfo">
                                                                        <div className="scheduledTime">
                                                                            <span className="timeLabel">Scheduled:</span>
                                                                            <span className="time">{formatTime(flight.arrival.scheduled)}</span>
                                                                        </div>
                                                                        {flight.arrival.estimated && (
                                                                            <div className="estimatedTime">
                                                                                <span className="timeLabel">Estimated:</span>
                                                                                <span className="time">{formatTime(flight.arrival.estimated)}</span>
                                                                            </div>
                                                                        )}
                                                                        {flight.arrival.delay && (
                                                                            <div className="delayInfo">Delay: {flight.arrival.delay} min</div>
                                                                        )}
                                                                    </div>
                                                                    <div className="terminalGate">
                                                                        {flight.arrival.terminal && <span className="terminal">Terminal {flight.arrival.terminal}</span>}
                                                                        {flight.arrival.baggage && <span className="baggage">Baggage {flight.arrival.baggage}</span>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {flight.flight.codeshared && (
                                                                <div className="codesharedInfo">
                                                                    <strong>Operated by:</strong> {flight.flight.codeshared.airline_name} ({flight.flight.codeshared.flight_iata})
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="noFlights">
                                                <div className="noFlightsIcon">✈</div>
                                                <h3>No Arrivals Found</h3>
                                                <p>No arrival flights scheduled for today</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
