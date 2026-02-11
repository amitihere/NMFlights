const airportValidate = (req, res, next) => {
    const { dept_iataCode, arr_iataCode, flightDate } = req.params
    if (!dept_iataCode || !arr_iataCode || !flightDate) {
        return res.status(400).json({ message: "Missing required parameters" })
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(flightDate)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" })
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
    next()
}
module.exports = { airportValidate, airportDetail, airlinesValidate }