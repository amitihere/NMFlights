const axios = require("axios");

const BASE_URL = "https://api.aviationstack.com/v1/flights";

const get_Flights = async (flightNumber,flightDate) => {
  const response = await axios.get(BASE_URL, {
    params: {
      access_key: process.env.AVIATIONSTACK_KEY,
      flight_iata: flightNumber,
      flight_date: flightDate
    }
  });
  console.log("data is here", response)
  console.log("Acheieved data", response.data)

  return response.data.data;
};

module.exports = {get_Flights}