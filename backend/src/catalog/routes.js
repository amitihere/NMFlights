const express = require("express")
const router = express.Router()
const {validateFlightNumber} = require("../middleware/middle.js")
const {get_flight_details,get_airport,get_flightsAiport,get_flightsAirlines,get_liveFlight} = require("../controller/controllers.js")
const {signupMiddle,loginMiddle} = require("../middleware/userInfo.js")
const {airportValidate,airportDetail,airlinesValidate} = require("../middleware/airport_middle.js")
const {signupController,loginController} = require("../controller/userCredentials.js")

router.get("/:flightNumber/:flightDate",validateFlightNumber,get_flight_details)
router.post("/signup",signupMiddle,signupController)
router.post("/login",loginMiddle,loginController)
router.get("/byAirport/:dept_iataCode/:arr_iataCode",airportValidate,get_airport)
router.get("/byAirport/:dept_arr_iata",airportDetail,get_flightsAiport)
router.get("/byAirlines/:airline_iata",airlinesValidate,get_flightsAirlines)
router.get("/airline/live/:flightNumber/:flightDate",validateFlightNumber,get_liveFlight)



module.exports = router