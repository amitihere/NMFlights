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
const get_Destination = async (dept_iataCode, arr_iataCode, flightDate) => {
  const response = await axios.get(BASE_URL, {
    params: {
      access_key: process.env.AVIATIONSTACK_KEY,
      dep_iata: dept_iataCode,
      arr_iata: arr_iataCode,
      flight_date: flightDate
    }
  });
  console.log("Acheieved data", response.data.data)

  return response.data.data;
}
const get_airport_details = async (dept_arr_iata) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: process.env.AVIATIONSTACK_KEY,
        dept_iata: dept_arr_iata,
        arr_iata: dept_arr_iata
      }
    })
    return response.data.data
  } catch (err) {
    throw new Error("Error while fetching aiport details")
  }
}
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