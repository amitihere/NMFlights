const {get_Flights} = require("../services/services")
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

module.exports = {get_flight_details}