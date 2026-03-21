import { useState, useEffect } from "react";
import axios from "axios";
import "./Airlines.css";
import NavBar from "../components/NavBar.jsx";

export default function Airlines() {
    const [airlines, setAirlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [airlineSearch, setAirlineSearch] = useState("");
    const [selectedAirline, setSelectedAirline] = useState(null);
    const [showAirlineDropdown, setShowAirlineDropdown] = useState(false);
    const [flights, setFlights] = useState([]);
    const [flightsLoading, setFlightsLoading] = useState(false);
    const API = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchAirlines = async () => {
            try {
                const response = await axios.get(`${API}/api/reqFlights/airlines`);
                setAirlines(response.data);
            } catch (err) {
                console.error("Error fetching airlines:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAirlines();
    }, []);

    const filterAirlines = (searchTerm) => {
        if (!searchTerm) return airlines;
        const term = searchTerm.toLowerCase();
        return airlines.filter(
            (airline) =>
                airline.name.toLowerCase().startsWith(term) ||
                airline.iataCode.toLowerCase().startsWith(term)
        );
    };

    const handleAirlineSelect = async (airline) => {
        setSelectedAirline(airline);
        setAirlineSearch("");
        setShowAirlineDropdown(false);

        setFlightsLoading(true);
        try {
            const response = await axios.get(`${API}/api/reqFlights/airlines/${airline.iataCode}`);
            const top30Flights = response.data.slice(0, 30);
            setFlights(top30Flights);
        } catch (err) {
            console.error("Error fetching flights:", err);
            setFlights([]);
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

    const filteredAirlines = filterAirlines(airlineSearch);

    if (loading) {
        return (
            <div className="airlinesLoader">
                <div className="loaderContent">
                    <div className="loaderPlane">✈</div>
                    <div className="loaderBar">
                        <div className="loaderFill"></div>
                    </div>
                    <p className="loaderMsg">Loading airlines...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="airlinesPage">
            <NavBar />
            <div className="airlinesContainer">
                <div className="pageHeader">
                    <h1 className="pageTitle">Airlines Search</h1>
                    <p className="pageSubtitle">
                        Search for active flights by airline with real-time data
                    </p>
                    <div>
                        <h3 style={{ color: '#ca2929ff' }}>
                            User Information
                        </h3>
                        <p className="pageSubtitle">
                            You will only be able to search flights which are available in real-time, to check the api you can search any available airline of your choice.
                        </p>
                        <p style={{ fontWeight: 'bold', color: '#b4b1b1ff' }}> sorry for the inconvenience caused as the complete data cannot be viewed due to the limitations of the api.</p>
                    </div>
                </div>

                <div className="searchCard">
                    <div className="inputWrapper">
                        <label className="inputLabel">Select Airline</label>
                        <div className="autocompleteField">
                            <div className="selectedAirline">
                                {selectedAirline ? (
                                    <div className="selectedAirlineInfo">
                                        <span className="airlineCode">{selectedAirline.iataCode}</span>
                                        <span className="airlineName">{selectedAirline.name}</span>
                                        <button
                                            className="clearBtn"
                                            onClick={() => {
                                                setSelectedAirline(null);
                                                setFlights([]);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder="Search airline by name or code..."
                                        value={airlineSearch}
                                        onChange={(e) => setAirlineSearch(e.target.value)}
                                        onFocus={() => setShowAirlineDropdown(true)}
                                        className="searchInput"
                                    />
                                )}
                            </div>
                            <button
                                className="dropdownToggle"
                                onClick={() => {
                                    setShowAirlineDropdown(!showAirlineDropdown);
                                    setAirlineSearch("");
                                }}
                            >
                                <span className={`arrow ${showAirlineDropdown ? "up" : "down"}`}>
                                    ▼
                                </span>
                            </button>
                        </div>

                        {showAirlineDropdown && (
                            <div className="autocompleteDropdown">
                                {filteredAirlines.length > 0 ? (
                                    filteredAirlines.map((airline) => (
                                        <div
                                            key={airline._id}
                                            className="airlineOption"
                                            onClick={() => handleAirlineSelect(airline)}
                                        >
                                            <span className="optionCode">{airline.iataCode}</span>
                                            <span className="optionName">{airline.name}</span>
                                            <span className="optionCountry">{airline.country}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="noResults">No airlines found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Flight Results Section */}
                {flightsLoading && (
                    <div className="resultsLoading">
                        <div className="loaderPlane">✈</div>
                        <p>Loading flights...</p>
                    </div>
                )}

                {!flightsLoading && flights.length > 0 && (
                    <div className="resultsSection">
                        <div className="resultsHeader">
                            <h2>Active Flights</h2>
                            <p className="resultsCount">
                                Showing {flights.length} {flights.length === 30 ? "(top 30)" : ""} flights
                            </p>
                        </div>

                        <div className="flightsList">
                            {flights.map((flight, index) => (
                                <div key={index} className="flightCard">
                                    {/* Flight Header */}
                                    <div className="flightHeader">
                                        <div className="airlineInfo">
                                            <h3 className="airlineNameTitle">{flight.airline.name}</h3>
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

                                    {/* Flight Route */}
                                    <div className="flightRoute">
                                        {/* Departure */}
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
                                                {flight.departure.terminal && (
                                                    <span className="terminal">Terminal {flight.departure.terminal}</span>
                                                )}
                                                {flight.departure.gate && (
                                                    <span className="gate">Gate {flight.departure.gate}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Flight Arrow */}
                                        <div className="routeArrow">
                                            <div className="arrowLine"></div>
                                            <div className="planeIcon">✈</div>
                                        </div>

                                        {/* Arrival */}
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
                            ))}
                        </div>
                    </div>
                )}

                {!flightsLoading && selectedAirline && flights.length === 0 && (
                    <div className="noResults">
                        <div className="noResultsIcon">✈</div>
                        <h3>No Flights Found</h3>
                        <p>No active flights available for this airline</p>
                    </div>
                )}
            </div>
        </div>
    );
}
