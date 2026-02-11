import { useState, useEffect } from "react";
import axios from "axios";
import "./Location.css";

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


  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/reqFlights/allairports");
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
    console.log(selectedDeparture.iataCode, selectedArrival.iataCode,flightDate)
    try {
      const respo = await axios.get(`http://localhost:3000/api/reqFlights/byAirport/${selectedDeparture.iataCode}/${selectedArrival.iataCode}/${flightDate}`)
      console.log(respo.data)

    } catch (err) {
      console.log(err)

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
      <div className="locationContainer">
        <div className="pageHeader">
          <h1 className="pageTitle">Flight Search</h1>
          <p className="pageSubtitle">
            Search for flights between any airports worldwide with real-time data
          </p>
        </div>

        <div className="searchCard">
          <div className="inputGrid">
            {/* Departure Airport */}
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
      </div>
    </div>
  );
}
