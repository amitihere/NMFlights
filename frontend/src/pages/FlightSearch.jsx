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
    const API = process.env.REACT_APP_API_URL;

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
                `${API}/api/reqFlights/flights/number/${flightNumber}/date/${flightDate}`
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

    const statusClass = (status) => {
        if (!status) return "";
        return `status status-${status.toLowerCase()}`;
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
                              <div style={{marginTop: '20px'}}>
            <h3 style={{color: '#ca2929ff'}}>
              User Information
            </h3>
            <p className="pageSubtitle">
              You will only be able to search flights which are available in real-time, to check the api you can search, flight number - 6E2062 & flight date - today/yesterday/tommorow date
            </p>
          </div>
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

                        {/* ── Header ── */}
                        <div className="resultHeader">
                            <h2>{flight.airline}</h2>
                            <div className="flightMeta">
                                <span className="flightNum">{flight.flightNumber}</span>
                                <span className={statusClass(flight.flightStatus)}>
                                    {flight.flightStatus}
                                </span>
                            </div>
                        </div>

                        {/* ── Route ── */}
                        <div className="flightRoute">
                            {/* Departure */}
                            <div className="routePoint">
                                <div className="label">DEPARTURE</div>
                                <div className="iata">{flight.route?.from}</div>
                                <div className="airport">{flight.departure?.airport}</div>

                                <div className="timeBlock">
                                    <div className="timeRow">
                                        <span>Scheduled:</span>
                                        <strong>{formatTime(flight.departure?.scheduled)}</strong>
                                    </div>
                                </div>

                                <div className="terminalInfo">
                                    {flight.departure?.terminal && (
                                        <span>Terminal {flight.departure.terminal}</span>
                                    )}
                                    {flight.departure?.gate && (
                                        <span>Gate {flight.departure.gate}</span>
                                    )}
                                </div>

                                {flight.departure?.timezone && (
                                    <div className="timezoneTag">{flight.departure.timezone}</div>
                                )}
                            </div>

                            <div className="routeArrow">→</div>

                            {/* Arrival */}
                            <div className="routePoint">
                                <div className="label">ARRIVAL</div>
                                <div className="iata">{flight.route?.to}</div>
                                <div className="airport">{flight.arrival?.airport}</div>

                                <div className="timeBlock">
                                    <div className="timeRow">
                                        <span>Scheduled:</span>
                                        <strong>{formatTime(flight.arrival?.scheduled)}</strong>
                                    </div>
                                </div>

                                <div className="terminalInfo">
                                    {flight.arrival?.terminal && (
                                        <span>Terminal {flight.arrival.terminal}</span>
                                    )}
                                    {flight.arrival?.gate && (
                                        <span>Gate {flight.arrival.gate}</span>
                                    )}
                                </div>

                                {flight.arrival?.timezone && (
                                    <div className="timezoneTag">{flight.arrival.timezone}</div>
                                )}
                            </div>
                        </div>

                        {/* ── Extra Details ── */}
                        <div className="flightDetails">
                            <div className="detailRow">
                                <span>Flight Date:</span>
                                <strong>{formatDate(flight.flightDate)}</strong>
                            </div>
                            <div className="detailRow">
                                <span>Flight Number:</span>
                                <strong>{flight.flightNumber || "N/A"}</strong>
                            </div>
                            <div className="detailRow">
                                <span>Status:</span>
                                <strong className={statusClass(flight.flightStatus)}>
                                    {flight.flightStatus || "N/A"}
                                </strong>
                            </div>
                            <div className="detailRow">
                                <span>Airline:</span>
                                <strong>{flight.airline || "N/A"}</strong>
                            </div>
                            <div className="detailRow">
                                <span>Route:</span>
                                <strong>{flight.route?.from} → {flight.route?.to}</strong>
                            </div>
                            {flight.departure?.timezone && (
                                <div className="detailRow">
                                    <span>Departure Timezone:</span>
                                    <strong>{flight.departure.timezone}</strong>
                                </div>
                            )}
                            {flight.arrival?.timezone && (
                                <div className="detailRow">
                                    <span>Arrival Timezone:</span>
                                    <strong>{flight.arrival.timezone}</strong>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
