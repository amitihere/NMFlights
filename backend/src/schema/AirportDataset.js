const mongoose = require("mongoose");

const airportDatasetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    iataCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },

    icaoCode: {
      type: String,
      uppercase: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },

    isInternational: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AirportDataset = mongoose.model(
  "AirportDataset",
  airportDatasetSchema
);

module.exports = { AirportDataset };
