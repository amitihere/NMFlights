const express = require("express")
const router = express.Router()
const {validateFlightNumber} = require("../middleware/middle.js")
const {get_flight_details} = require("../controller/controllers.js")
const {signupMiddle,loginMiddle} = require("../middleware/userInfo.js")
const {signupController,loginController} = require("../controller/userCredentials.js")

router.get("/:flightNumber/:flightDate",validateFlightNumber,get_flight_details)
router.post("/signup",signupMiddle,signupController)
router.post("/login",loginMiddle,loginController)


module.exports = router