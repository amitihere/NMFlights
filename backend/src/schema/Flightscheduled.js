const mongoose = require('mongoose');

const flightScheduledSchema = new Schema(
  {
    flightNumber: String,
    airline: String,
    flightDate: Date,
    departureTime: Date,
    arrivalTime: Date,
    origin: String,
    destination: String,
    flightStatus: {
      type: String,
      enum: ["Scheduled", "Delayed", "Cancelled", "Completed"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FlightScheduled', flightScheduledSchema);