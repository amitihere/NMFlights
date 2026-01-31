const express = require("express")
const router = express.Router()
const {validateFlightNumber} = require("../middleware/middle.js")
const {get_flight_details} = require("../controller/controllers.js")

router.get("/:flightNumber",validateFlightNumber,get_flight_details)

module.exports = router