const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
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
app.use("/api/flights",flightRoutes)

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})