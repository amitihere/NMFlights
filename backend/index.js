const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const {Scheduled} = require("./src/schema/Flightscheduled.js")
dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

const flightRoutes = require("./src/catalog/routes.js")
app.get("/",(req,res)=>{
    console.log("it is working")
    return res.send("hello world")
})
app.use("/api/reqFlights",flightRoutes)
app.get("/test/mongodb", async (req,res)=>{
    try {
        const testing = await Scheduled.create({
            flightNumber: "TestFlight123",
            airline: "TestAir",
            flightDate: "2024-12-31",
            departureTime: "2024-12-31T10:00:00Z",
            arrivalTime: "2024-12-31T14:00:00Z",
            origin: "TestingOrigin",
            destination: "FinalDestination",
            flightStatus: "Delayed"
        })
        return res.status(200).json({message: "MongoDB is connected and working", data: testing})
    }catch(err){
        return res.status(500).json({message: "MongoDB connection error", error: err.message})
    }
})
app.get("/findit",async (req,res)=>{
    try{
        const finding = await Scheduled.find({})
        return res.status(200).json({message:finding})
    }
    catch(err){
        return res.status(404).json({error:err})

    }
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})