import { useState, useEffect } from "react";
import axios from "axios";
import "./ArrivalsDepartures.css";
import Navbar from "../components/NavBar";

export default function ArrivalsDepartures() {
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [airportSearch, setAirportSearch] = useState("");
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [showAirportDropdown, setShowAirportDropdown] = useState(false);
    const [flights, setFlights] = useState({ departures: [], arrivals: [] });
    const [searchLoading, setSearchLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("departures");

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/reqFlights/airports");
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

        setSearchLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/reqFlights/byAirports/${airport.iataCode}`);
            const currentTime = new Date().getTime();

            // Process departures: 10 recent past + 90 upcoming
            const allDepartures = [...response.data.departures].sort((a, b) => {
                const timeA = new Date(a.departure.scheduled).getTime();
                const timeB = new Date(b.departure.scheduled).getTime();
                return timeA - timeB;
            });

            const pastDepartures = allDepartures.filter(flight =>
                new Date(flight.departure.scheduled).getTime() < currentTime
            );
            const futureDepartures = allDepartures.filter(flight =>
                new Date(flight.departure.scheduled).getTime() >= currentTime
            );

            const recentPastDepartures = pastDepartures.slice(-10);
            const upcomingDepartures = futureDepartures.slice(0, 90);
            const finalDepartures = [...recentPastDepartures, ...upcomingDepartures];

            // Process arrivals: 10 recent past + 90 upcoming
            const allArrivals = [...response.data.arrivals].sort((a, b) => {
                const timeA = new Date(a.arrival.scheduled).getTime();
                const timeB = new Date(b.arrival.scheduled).getTime();
                return timeA - timeB;
            });

            const pastArrivals = allArrivals.filter(flight =>
                new Date(flight.arrival.scheduled).getTime() < currentTime
            );
            const futureArrivals = allArrivals.filter(flight =>
                new Date(flight.arrival.scheduled).getTime() >= currentTime
            );

            const recentPastArrivals = pastArrivals.slice(-10);
            const upcomingArrivals = futureArrivals.slice(0, 90);
            const finalArrivals = [...recentPastArrivals, ...upcomingArrivals];

            setFlights({
                departures: finalDepartures,
                arrivals: finalArrivals
            });
        } catch (err) {
            console.log(err);
            setFlights({ departures: [], arrivals: [] });
        } finally {
            setSearchLoading(false);
        }
    };

    const filteredAirports = filterAirports(airportSearch);

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const renderFlightCard = (flight, index) => (
        <div key={index} className="flightCard">
            <div className="flightHeader">
                <div className="airlineInfo">
                    <h3 className="airlineName">{flight.airline.name}</h3>
                    <div className="flightNumber">
                        {flight.flight.iata}
                        {flight.flight.codeshared && (
                            <span className="codesharedBadge">Codeshared</span>
                        )}
                    </div>
                </div>
                <div className="flightStatus">
                    <span className={`statusBadge status-${flight.flight_status}`}>
                        {flight.flight_status}
                    </span>
                    <div className="flightDate">{formatDate(flight.flight_date)}</div>
                </div>
            </div>

            <div className="flightRoute">
                <div className="routeSection">
                    <div className="routeLabel">Departure</div>
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
                        {flight.departure.terminal && (
                            <span className="terminal">Terminal {flight.departure.terminal}</span>
                        )}
                        {flight.departure.gate && (
                            <span className="gate">Gate {flight.departure.gate}</span>
                        )}
                    </div>
                </div>

                <div className="routeArrow">
                    <div className="arrowLine"></div>
                    <div className="planeIcon">✈</div>
                </div>

                <div className="routeSection">
                    <div className="routeLabel">Arrival</div>
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
                        {flight.arrival.terminal && (
                            <span className="terminal">Terminal {flight.arrival.terminal}</span>
                        )}
                        {flight.arrival.baggage && (
                            <span className="baggage">Baggage {flight.arrival.baggage}</span>
                        )}
                    </div>
                </div>
            </div>

            {flight.flight.codeshared && (
                <div className="codesharedInfo">
                    <strong>Operated by:</strong> {flight.flight.codeshared.airline_name}
                    ({flight.flight.codeshared.flight_iata})
                </div>
            )}
        </div>
    );

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
        <div className="locationPage">
            <Navbar />
            <div className="locationContainer">
                <div className="pageHeader">
                    <h1 className="pageTitle">Airport Arrivals & Departures</h1>
                    <p className="pageSubtitle">
                        View all arriving and departing flights for any airport worldwide
                    </p>
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
                                        <button
                                            className="clearBtn"
                                            onClick={() => {
                                                setSelectedAirport(null);
                                                setFlights({ departures: [], arrivals: [] });
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder="Search airport..."
                                        value={airportSearch}
                                        onChange={(e) => setAirportSearch(e.target.value)}
                                        onFocus={() => setShowAirportDropdown(true)}
                                        className="searchInput"
                                    />
                                )}
                            </div>
                            <button
                                className="dropdownToggle"
                                onClick={() => {
                                    setShowAirportDropdown(!showAirportDropdown);
                                    setAirportSearch("");
                                }}
                            >
                                <span className={`arrow ${showAirportDropdown ? "up" : "down"}`}>
                                    ▼
                                </span>
                            </button>
                        </div>

                        {showAirportDropdown && (
                            <div className="autocompleteDropdown">
                                {filteredAirports.length > 0 ? (
                                    filteredAirports.map((airport) => (
                                        <div
                                            key={airport._id}
                                            className="airportOption"
                                            onClick={() => handleAirportSelect(airport)}
                                        >
                                            <span className="optionCode">{airport.iataCode}</span>
                                            <span className="optionName">{airport.name}</span>
                                            <span className="optionCity">
                                                {airport.city}, {airport.country}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="noResults">No airports found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {searchLoading && (
                    <div className="resultsLoading">
                        <div className="loaderPlane">✈</div>
                        <p>Loading flights...</p>
                    </div>
                )}

                {!searchLoading && selectedAirport && (flights.departures.length > 0 || flights.arrivals.length > 0) && (
                    <div className="resultsSection">
                        <div className="tabNavigation">
                            <button
                                className={`tabButton ${activeTab === "departures" ? "active" : ""}`}
                                onClick={() => setActiveTab("departures")}
                            >
                                Departures ({flights.departures.length})
                            </button>
                            <button
                                className={`tabButton ${activeTab === "arrivals" ? "active" : ""}`}
                                onClick={() => setActiveTab("arrivals")}
                            >
                                Arrivals ({flights.arrivals.length})
                            </button>
                        </div>

                        {activeTab === "departures" && (
                            <div className="flightsList">
                                {flights.departures.length > 0 ? (
                                    flights.departures.map((flight, index) => renderFlightCard(flight, index))
                                ) : (
                                    <div className="noFlights">
                                        <div className="noFlightsIcon">✈</div>
                                        <h3>No Departures</h3>
                                        <p>No departing flights found for this airport today</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "arrivals" && (
                            <div className="flightsList">
                                {flights.arrivals.length > 0 ? (
                                    flights.arrivals.map((flight, index) => renderFlightCard(flight, index))
                                ) : (
                                    <div className="noFlights">
                                        <div className="noFlightsIcon">✈</div>
                                        <h3>No Arrivals</h3>
                                        <p>No arriving flights found for this airport today</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {!searchLoading && selectedAirport && flights.departures.length === 0 && flights.arrivals.length === 0 && (
                    <div className="noResults">
                        <div className="noResultsIcon">✈</div>
                        <h3>No Flights Found</h3>
                        <p>No flights available for this airport today</p>
                    </div>
                )}
            </div>
        </div>
    );
}
