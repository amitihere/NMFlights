const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()
const app = express()
const PORT = process.env.PORT
const { AirportDataset } = require("./src/schema/AirportDataset.js")
const axios = require("axios")

app.use(express.json())
app.use(cors())

const flightRoutes = require("./src/catalog/routes.js")
app.get("/", (req, res) => {
  console.log("it is working")
  return res.send("hello world")
})

app.use("/api/reqFlights", flightRoutes)
app.use("/api/user/info", flightRoutes)
app.get("/requiredairports", async(req,res)=>{
  try{
    const airports = await AirportDataset.find()
    return res.status(200).json(airports)
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Internal server error" });
  }
} )

app.get("/allairports", async (req, res) => {
  try {
    let offset = 0;
    const limit = 100;
    let total = 0;
    let insertedCount = 0;

    do {
      const response = await axios.get(
        "http://api.aviationstack.com/v1/airports",
        {
          params: {
            access_key: process.env.AVIATIONSTACK_KEY,
            country_name: "India",
            limit,
            offset
          },
        }
      );

      const { data, pagination } = response.data;
      total = pagination.total;

      if (!data || data.length === 0) break;

      const formattedAirports = data.map((airport) => ({
        name: airport.airport_name,
        iataCode: airport.iata_code,
        icaoCode: airport.icao_code,
        city: airport.city || "Unknown",
        state: airport.state_province || "Unknown",
        country: airport.country_name,
        isInternational:
          airport.airport_type?.toLowerCase() === "international",
      }));

      // 🚀 bulk upsert
      const bulkOps = formattedAirports.map((airport) => ({
        updateOne: {
          filter: { iataCode: airport.iataCode },
          update: { $setOnInsert: airport },
          upsert: true,
        },
      }));

      const result = await AirportDataset.bulkWrite(bulkOps);

      insertedCount += result.upsertedCount;

      offset += limit;

    } while (offset < total);

    res.json({
      message: "All Indian airports inserted successfully",
      inserted: insertedCount,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Error inserting airports" });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });

  })
  .catch(err => console.error("MongoDB error:", err));
