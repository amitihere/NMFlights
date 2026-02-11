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

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });

  })
  .catch(err => console.error("MongoDB error:", err));
