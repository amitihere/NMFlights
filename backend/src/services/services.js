const axios = require("axios");
const mongoose = require("mongoose");
const { Scheduled } = require("../schema/Flightscheduled.js");
//WRITE THE MONGODB QUIRES HERE FOR THE FLIGHTS.
const BASE_URL = "https://api.aviationstack.com/v1/flights";

const get_Flights = async (flightNumber, flightDate) => {
  const response = await axios.get(BASE_URL, {
    params: {
      access_key: process.env.AVIATIONSTACK_KEY,
      flight_iata: flightNumber,
    }
  });
  const filteredData = response.data.data.filter(flight => flight.flight_date === flightDate);

  return filteredData;
};
const get_Destination = async (dept_iataCode, arr_iataCode) => {
  const response = await axios.get(BASE_URL, {
    params: {
      access_key: process.env.AVIATIONSTACK_KEY,
      dep_iata: dept_iataCode,
      arr_iata: arr_iataCode,
    }
  });

  return response.data.data;
}
const get_airport_details = async (iata) => {
  try {
    const today = new Date().toISOString().split("T")[0]
    const departuresRes = await axios.get(BASE_URL, {
      params: {
        access_key: process.env.AVIATIONSTACK_KEY,
        dep_iata: iata,
      }
    });
    const arrivalsRes = await axios.get(BASE_URL, {
      params: {
        access_key: process.env.AVIATIONSTACK_KEY,
        arr_iata: iata
      }
    });

    const filteredDepartures = departuresRes.data.data.filter(flight => flight.flight_date === today);
    const filteredArrivals = arrivalsRes.data.data.filter(flight => flight.flight_date === today);

    const sortedDepartures = filteredDepartures.sort((a, b) => {
      const timeA = new Date(a.departure.scheduled).getTime();
      const timeB = new Date(b.departure.scheduled).getTime();
      return timeA - timeB;
    });
    const sortedArrivals = filteredArrivals.sort((a, b) => {
      const timeA = new Date(a.arrival.scheduled).getTime();
      const timeB = new Date(b.arrival.scheduled).getTime();
      return timeA - timeB;
    });

    return {
      departures: sortedDepartures,
      arrivals: sortedArrivals
    };

  } catch (err) {
    console.error("Axios error:", err.response?.data || err.message);
    throw new Error("Error fetching airport flights");
  }
};

const get_airlines = async (airline_iata) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: process.env.AVIATIONSTACK_KEY,
        airline_iata: airline_iata,
        limit: 100
      }
    })
    return response.data.data
  } catch (err) {
    throw new Error("Error while fetching airline details")
  }
};

const get_all_active = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: process.env.AVIATIONSTACK_KEY,
        flight_status: "active",
      }
    });
    return response.data.data;

  } catch (err) {
    console.log("Axios Error:", err.response?.data || err.message);
    throw err;
  }
};
module.exports = { get_Flights, get_Destination, get_airport_details, get_airlines, get_all_active }