const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
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

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})