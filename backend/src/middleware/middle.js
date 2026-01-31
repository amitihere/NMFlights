const validateFlightNumber = async (req,res,next) => {
    const flightNumber = req.params.flightNumber
    if(!flightNumber || flightNumber.trim() === ""){
        return res.status(404).json({message: "The provided number is incorrect please check"})
    }
    if (!/^[A-Za-z0-9-]+$/.test(flightNumber)) {
        return res.status(400).json({ message: "Invalid flight number format" });
    }
    req.flightNumber = flightNumber.trim()
    next()
}

module.exports = {validateFlightNumber}