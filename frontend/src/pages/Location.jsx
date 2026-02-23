import { useState, useEffect } from "react";
import axios from "axios";
import "./Location.css";
import Navbar from "../components/Navbar";

export default function Location() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departureSearch, setDepartureSearch] = useState("");
  const [arrivalSearch, setArrivalSearch] = useState("");
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showArrivalDropdown, setShowArrivalDropdown] = useState(false);
  const [flightDate, setFlightDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);


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

  const handleDepartureSelect = (airport) => {
    setSelectedDeparture(airport);
    setDepartureSearch("");
    setShowDepartureDropdown(false);
  };

  const handleArrivalSelect = (airport) => {
    setSelectedArrival(airport);
    setArrivalSearch("");
    setShowArrivalDropdown(false);
  };
  const handleSearch = async () => {
    console.log(selectedDeparture.iataCode, selectedArrival.iataCode, flightDate)
    setSearchLoading(true);
    try {
      const respo = await axios.get(`http://localhost:3000/api/reqFlights/airports/${selectedDeparture.iataCode}/to/${selectedArrival.iataCode}/date/${flightDate}`)
      // console.log(respo.data)
      setFlights(respo.data);

    } catch (err) {
      console.log(err)
      setFlights([]);

    } finally {
      setSearchLoading(false);
    }

  }


  const departureFilteredAirports = filterAirports(departureSearch);
  const arrivalFilteredAirports = filterAirports(arrivalSearch);

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
          <h1 className="pageTitle">Flight Search</h1>
          <p className="pageSubtitle" style={{fontSize: '16px'}}>
            Search for flights between any airports worldwide with real-time data
          </p>
          <div style={{marginTop: '20px'}}>
            <h3 style={{color: '#ca2929ff'}}>
              User Information
            </h3>
            <p className="pageSubtitle">
              You will only be able to search direct flights which are available in real-time, to check the api you can search, Departure - DEL & Arrival - BOM, flight date - today's date
            </p>
          </div>
        </div>

        <div className="searchCard">
          <div className="inputGrid">
            <div className="inputWrapper">
              <label className="inputLabel">Departure Airport</label>
              <div className="autocompleteField">
                <div className="selectedAirport">
                  {selectedDeparture ? (
                    <div className="selectedAirportInfo">
                      <span className="airportCode">{selectedDeparture.iataCode}</span>
                      <span className="airportName">{selectedDeparture.name}</span>
                      <button
                        className="clearBtn"
                        onClick={() => setSelectedDeparture(null)}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Search departure airport..."
                      value={departureSearch}
                      onChange={(e) => setDepartureSearch(e.target.value)}
                      onFocus={() => setShowDepartureDropdown(true)}
                      className="searchInput"
                    />
                  )}
                </div>
                <button
                  className="dropdownToggle"
                  onClick={() => {
                    setShowDepartureDropdown(!showDepartureDropdown);
                    setDepartureSearch("");
                  }}
                >
                  <span className={`arrow ${showDepartureDropdown ? "up" : "down"}`}>
                    ▼
                  </span>
                </button>
              </div>

              {showDepartureDropdown && (
                <div className="autocompleteDropdown">
                  {departureFilteredAirports.length > 0 ? (
                    departureFilteredAirports.map((airport) => (
                      <div
                        key={airport._id}
                        className="airportOption"
                        onClick={() => handleDepartureSelect(airport)}
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

            {/* Arrival Airport */}
            <div className="inputWrapper">
              <label className="inputLabel">Arrival Airport</label>
              <div className="autocompleteField">
                <div className="selectedAirport">
                  {selectedArrival ? (
                    <div className="selectedAirportInfo">
                      <span className="airportCode">{selectedArrival.iataCode}</span>
                      <span className="airportName">{selectedArrival.name}</span>
                      <button
                        className="clearBtn"
                        onClick={() => setSelectedArrival(null)}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Search arrival airport..."
                      value={arrivalSearch}
                      onChange={(e) => setArrivalSearch(e.target.value)}
                      onFocus={() => setShowArrivalDropdown(true)}
                      className="searchInput"
                    />
                  )}
                </div>
                <button
                  className="dropdownToggle"
                  onClick={() => {
                    setShowArrivalDropdown(!showArrivalDropdown);
                    setArrivalSearch("");
                  }}
                >
                  <span className={`arrow ${showArrivalDropdown ? "up" : "down"}`}>
                    ▼
                  </span>
                </button>
              </div>

              {showArrivalDropdown && (
                <div className="autocompleteDropdown">
                  {arrivalFilteredAirports.length > 0 ? (
                    arrivalFilteredAirports.map((airport) => (
                      <div
                        key={airport._id}
                        className="airportOption"
                        onClick={() => handleArrivalSelect(airport)}
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

          <div className="dateRow">
            <div className="inputWrapper">
              <label className="inputLabel">Flight Date</label>
              <input
                type="date"
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
                className="dateInput"
              />
            </div>
          </div>

          <button className="searchBtn" onClick={handleSearch}>
            <span>Search Flights</span>
            <span className="searchBtnIcon">→</span>
          </button>
        </div>

        {/* Flight Results Section */}
        {searchLoading && (
          <div className="resultsLoading">
            <div className="loaderPlane">✈</div>
            <p>Searching for flights...</p>
          </div>
        )}

        {!searchLoading && flights.length > 0 && (
          <div className="resultsSection">
            <div className="resultsHeader">
              <h2>Available Flights</h2>
              <p className="resultsCount">{flights.length} flights found</p>
            </div>

            <div className="flightsList">
              {flights.map((flight, index) => {
                // Format dates and times
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

                return (
                  <div key={index} className="flightCard">
                    {/* Flight Header */}
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

                    {/* Flight Route */}
                    <div className="flightRoute">
                      {/* Departure */}
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

                      {/* Flight Arrow */}
                      <div className="routeArrow">
                        <div className="arrowLine"></div>
                        <div className="planeIcon">✈</div>
                      </div>

                      {/* Arrival */}
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
              })}
            </div>
          </div>
        )}

        {!searchLoading && flights.length === 0 && selectedDeparture && selectedArrival && flightDate && (
          <div className="noResults">
            <div className="noResultsIcon">✈</div>
            <h3>No Flights Found</h3>
            <p>No flights available for the selected route and date</p>
          </div>
        )}
      </div>
    </div>
  );
}
