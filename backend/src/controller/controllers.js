const {get_Flights,get_Destination,get_airport_details} = require("../services/services")
const {normalizeFlight} = require("../utils/normalizeFlights.js")

const get_flight_details = async (req,res) => {
    try {
        const flightNumber = req.flightNumber
        const flightDate = req.params.flightDate
        const flightRequired = await get_Flights(flightNumber,flightDate)
        if (!flightRequired.length) {
            return res.status(404).json({ message: "Flight not found" });
            }

        const normalized = normalizeFlight(flightRequired[0]);
        return res.json(normalized);
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });

    }
}

const get_airport = async (req,res) => {
    try {
        const {dept_iataCode,arr_iataCode} = req.params
        const flights = await get_Destination(dept_iataCode,arr_iataCode)
        if (!flights.length) {
            return res.status(404).json({ message: "No flights found for the given airports" });
        }
        return res.status(200).json(flights);
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }

}

const get_flightsAiport = async (req,res) => {
    try{
        const {dept_arr_iata} = req.params;
        const aiportDetails = await get_airport_details(dept_arr_iata)
        if(!aiportDetails.length){
            return res.status(404).json({message:"No flights found for the given airports"})
        }
        return res.status(200).json(aiportDetails)
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}
const get_flightsAirlines = async (req,res) => {
    try{
        const {airline_iata} = req.params;
        const aiportDetails = await get_airlines(airline_iata)
        if(!aiportDetails.length){
            return res.status(404).json({message:"No flights found for the given airline"})
        }
        return res.status(200).json(aiportDetails)
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {get_flight_details,get_airport,get_flightsAiport,get_flightsAirlines}