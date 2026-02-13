import { useState } from "react";
import axios from "axios";
import "./FlightSearch.css";
import NavBar from "../components/NavBar.jsx";

export default function FlightSearch() {
    const [flightNumber, setFlightNumber] = useState("");
    const [flightDate, setFlightDate] = useState("");
    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!flightNumber || !flightDate) {
            setError("Please enter both flight number and date");
            return;
        }

        setLoading(true);
        setError("");
        setFlight(null);

        try {
            const response = await axios.get(
                `http://localhost:3000/api/reqFlights/flights/number/${flightNumber}/date/${flightDate}`
            );
            setFlight(response.data);
        } catch (err) {
            if (err.response?.status === 404) {
                setError("Flight not found. Please check the flight number and date.");
            } else {
                setError("An error occurred while searching. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch(e);
        }
    };

    const formatTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    };

    return (
        <div className="flightSearchPage">
            <NavBar />
            <div className="searchContainer">
                <div className="searchHeader">
                    <h1>Flight Search</h1>
                    <p className="searchSubtitle">
                        Search for flight details by flight number and date
                    </p>
                    <p className="apiNotice">
                        ⚠️ Please enter today's or tomorrow's date only. The API does not support dates beyond that.
                    </p>
                </div>

                <form className="searchForm" onSubmit={handleSearch}>
                    <div className="inputGroup">
                        <input
                            type="text"
                            placeholder="Flight Number (e.g., AA123)"
                            value={flightNumber}
                            onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                            onKeyPress={handleKeyPress}
                            className="searchInput"
                        />
                        <input
                            type="date"
                            value={flightDate}
                            onChange={(e) => setFlightDate(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="searchInput"
                        />
                    </div>
                    <button type="submit" className="searchButton">
                        Search Flight
                    </button>
                </form>

                {loading && (
                    <div className="loadingState">
                        <div className="spinner">✈</div>
                        <p>Searching for flight...</p>
                    </div>
                )}

                {error && (
                    <div className="errorState">
                        <div className="errorIcon">⚠️</div>
                        <p>{error}</p>
                    </div>
                )}

                {flight && !loading && (
                    <div className="flightResult">
                        <div className="resultHeader">
                            <h2>{flight.airline.name}</h2>
                            <div className="flightMeta">
                                <span className="flightNum">{flight.flight.iata || flight.flight.number}</span>
                                <span className={`status status-${flight.flight_status}`}>
                                    {flight.flight_status}
                                </span>
                            </div>
                        </div>

                        <div className="flightRoute">
                            <div className="routePoint">
                                <div className="label">DEPARTURE</div>
                                <div className="airport">{flight.departure.airport}</div>
                                <div className="iata">{flight.departure.iata}</div>
                                <div className="timeBlock">
                                    <div className="timeRow">
                                        <span>Scheduled:</span>
                                        <strong>{formatTime(flight.departure.scheduled)}</strong>
                                    </div>
                                    {flight.departure.estimated && (
                                        <div className="timeRow">
                                            <span>Estimated:</span>
                                            <strong>{formatTime(flight.departure.estimated)}</strong>
                                        </div>
                                    )}
                                    {flight.departure.actual && (
                                        <div className="timeRow">
                                            <span>Actual:</span>
                                            <strong>{formatTime(flight.departure.actual)}</strong>
                                        </div>
                                    )}
                                </div>
                                {(flight.departure.terminal || flight.departure.gate) && (
                                    <div className="terminalInfo">
                                        {flight.departure.terminal && <span>Terminal {flight.departure.terminal}</span>}
                                        {flight.departure.gate && <span>Gate {flight.departure.gate}</span>}
                                    </div>
                                )}
                            </div>

                            <div className="routeArrow">→</div>

                            <div className="routePoint">
                                <div className="label">ARRIVAL</div>
                                <div className="airport">{flight.arrival.airport}</div>
                                <div className="iata">{flight.arrival.iata}</div>
                                <div className="timeBlock">
                                    <div className="timeRow">
                                        <span>Scheduled:</span>
                                        <strong>{formatTime(flight.arrival.scheduled)}</strong>
                                    </div>
                                    {flight.arrival.estimated && (
                                        <div className="timeRow">
                                            <span>Estimated:</span>
                                            <strong>{formatTime(flight.arrival.estimated)}</strong>
                                        </div>
                                    )}
                                    {flight.arrival.actual && (
                                        <div className="timeRow">
                                            <span>Actual:</span>
                                            <strong>{formatTime(flight.arrival.actual)}</strong>
                                        </div>
                                    )}
                                </div>
                                {(flight.arrival.terminal || flight.arrival.baggage) && (
                                    <div className="terminalInfo">
                                        {flight.arrival.terminal && <span>Terminal {flight.arrival.terminal}</span>}
                                        {flight.arrival.baggage && <span>Baggage {flight.arrival.baggage}</span>}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flightDetails">
                            <div className="detailRow">
                                <span>Flight Date:</span>
                                <strong>{formatDate(flight.flight_date)}</strong>
                            </div>
                            {flight.aircraft && (
                                <div className="detailRow">
                                    <span>Aircraft:</span>
                                    <strong>{flight.aircraft.registration || "N/A"}</strong>
                                </div>
                            )}
                            {flight.flight.codeshared && (
                                <div className="detailRow">
                                    <span>Operated by:</span>
                                    <strong>
                                        {flight.flight.codeshared.airline_name} ({flight.flight.codeshared.flight_iata})
                                    </strong>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
