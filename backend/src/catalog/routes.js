const express = require("express")
const router = express.Router()
const { validateFlightNumber } = require("../middleware/middle.js")
const { get_flight_details, get_airport, get_flightsAirport, get_flightsAirlines, get_liveFlight,get_info_airports,get_info_airlines } = require("../controller/controllers.js")
const { signupMiddle, loginMiddle } = require("../middleware/userInfo.js")
const { airportValidate, airportDetail, airlinesValidate } = require("../middleware/airport_middle.js")
const { signupController, loginController } = require("../controller/userCredentials.js")

router.post("/auth/signup", signupMiddle, signupController);
router.post("/auth/login", loginMiddle, loginController);

router.get("/byAirports/:iata", airportDetail, get_flightsAirport);
router.get("/airports/:dept_iataCode/to/:arr_iataCode/date/:flight_date",airportValidate,get_airport);
router.get("/airports",get_info_airports);

router.get("/flights/number/:flightNumber/date/:flightDate",validateFlightNumber,get_flight_details);
router.get("/flights/live/:flightNumber/date/:flightDate",validateFlightNumber,get_liveFlight);

router.get("/airlines/:airline_iata",airlinesValidate,get_flightsAirlines);
router.get("/airlines",get_info_airlines);



module.exports = router