const normalizeFlight = (flight) => ({
  flightDate: flight.flight_date,
  flightStatus: flight.flight_status,
  airline: flight.airline.name,
  flightNumber: flight.flight.iata,

  route: {
    from: flight.departure.iata,
    to: flight.arrival.iata
  },

  departure: {
    airport: flight.departure.airport,
    terminal: flight.departure.terminal,
    timezone: flight.departure.timezone,
    gate: flight.departure.gate,
    scheduled: flight.departure.scheduled
  },

  arrival: {
    airport: flight.arrival.airport,
    terminal: flight.arrival.terminal,
    timezone: flight.arrival.timezone,
    gate: flight.arrival.gate,
    scheduled: flight.arrival.scheduled
  }
});

module.exports = { normalizeFlight };
