const airportValidate = (req, res, next) => {
    const { dept_iataCode, arr_iataCode, flight_date } = req.params
    if (!dept_iataCode || !arr_iataCode || !flight_date) {
        return res.status(400).json({ message: "Missing required parameters" })
    }
    next()
}
const airportDetail = (req, res, next) => {
    const { dept_arr_iata } = req.params
    if (!dept_arr_iata || dept_arr_iata.trim().length == '') {
        return res.status(400).json({ message: "Missing required parameters" })
    }
    next()
}
const airlinesValidate = (req, res, next) => {
    const { airline_iata } = req.params
    if (!airline_iata || airline_iata.trim().length == '') {
        return res.status(400).json({ message: "Missing required parameters" })
    }
    console.log("middle ware")
    next()
}
module.exports = { airportValidate, airportDetail, airlinesValidate }