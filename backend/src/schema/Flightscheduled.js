const mongoose = require("mongoose");

const flightScheduledSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true,
      trim: true,
    },
    airline: {
      type: String,
      required: true,
    },
    flightDate: {
      type: Date,
      required: true,
    },
    departureTime: Date,
    arrivalTime: Date,
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
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

const Scheduled = mongoose.model("FlightScheduled", flightScheduledSchema);

module.exports = { Scheduled };
