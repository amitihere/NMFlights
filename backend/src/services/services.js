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
      flight_date: flightDate
    }
  });
  console.log("Acheieved data", response.data.data)

  return response.data.data;
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
  console.log("fetching airport details for IATA code:", iata);
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

    return {
      departures: filteredDepartures,
      arrivals: filteredArrivals
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
module.exports = { get_Flights, get_Destination, get_airport_details, get_airlines }