const {get_Flights} = require("../services/services")
const get_flight_details = async (req,res) => {
    try {
        const flightNumber = req.flightNumber
        const flightRequired = await get_Flights(flightNumber)
        if (!flightRequired.length) {
            return res.status(404).json({ message: "Flight not found" });
            }

        return res.json(flightRequired[0]);
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });

    }
}

module.exports = {get_flight_details}