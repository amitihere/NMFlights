const { get_Flights, get_Destination, get_airport_details, get_airlines, get_all_active } = require("../services/services")
const { normalizeFlight } = require("../utils/normalizeFlights.js")
const { AirportDataset, AirlinesDataset } = require("../schema/AirportDataset.js")

const get_flight_details = async (req, res) => {
    try {
        const flightNumber = req.params.flightNumber
        const flightDate = req.params.flightDate
        const flightRequired = await get_Flights(flightNumber, flightDate)
        if (!flightRequired.length) {
            return res.status(404).json({ message: "Flight not found" });
        }

        const normalized = normalizeFlight(flightRequired[0]);
        return res.json(normalized);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });

    }
}

const get_airport = async (req, res) => {
    try {
        const { dept_iataCode, arr_iataCode, flight_date } = req.params
        const flights = await get_Destination(dept_iataCode, arr_iataCode)
        if (!flights.length) {
            return res.status(404).json({ message: "No flights found for the given airports" });
        }
        const filteredData = flights.filter((t) => t.flight_date == flight_date)
        return res.status(200).json(filteredData);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }

}

const get_flightsAirport = async (req, res) => {
    try {
        const { iata } = req.params;
        console.log("came to controller")

        const flights = await get_airport_details(iata);

        if (!flights.departures.length && !flights.arrivals.length) {
            return res.status(404).json({
                message: "No flights found for this airport"
            });
        }

        return res.status(200).json(flights);

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const get_flightsAirlines = async (req, res) => {
    try {
        const { airline_iata } = req.params;
        const aiportDetails = await get_airlines(airline_iata)
        if (!aiportDetails.length) {
            return res.status(404).json({ message: "No flights found for the given airline" })
        }
        return res.status(200).json(aiportDetails)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}
const get_liveFlight = async (req, res) => {
    try {
        const flightNumber = req.flightNumber
        const flightDate = req.params.flightDate
        const flightRequired = await get_Flights(flightNumber, flightDate)
        if (!flightRequired.length) {
            return res.status(404).json({ message: "No flights found for the given flight number and date" })
        }
        const reqLivePath = flightRequired.find(flight => flight.flight_status === "active")
        if (!reqLivePath) {
            return res.status(404).json({ message: "No live flight found for the given flight number and date" })
        }
        return res.status(200).json({
            message: "Live flight found",
            live: reqLivePath.live,
            flight: reqLivePath
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}
const get_info_airports = async (req, res) => {
    try {
        const airports = await AirportDataset.find()
        if (airports.length == 0) {
            return res.status(404).json({ message: "No airports found" })
        }
        return res.status(200).json(airports)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}

const get_info_airlines = async (req, res) => {
    try {
        const airlines = await AirlinesDataset.find()
        if (airlines.length == 0) {
            return res.status(404).json({ message: "No airlines found" })
        }
        return res.status(200).json(airlines)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}
const get_complete_active = async (req, res) => {
    try {

        const complete_active = await get_all_active()
        return res.status(200).json({ message: "Successfully fetch all active flights", data: complete_active })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }

}
module.exports = { get_flight_details, get_airport, get_flightsAirport, get_flightsAirlines, get_liveFlight, get_info_airports, get_info_airlines, get_complete_active }