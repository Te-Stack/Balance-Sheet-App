const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")




//Starting the Express App 
const app = express()

// configuring the env package for mongodb
dotenv.config()


// Middlewares
app.use(cors())
//Setting Static
app.use(express.static('public'))
// Body Parsers 
app.use(express.json())
// Routes 
app.use("/",require("./routes/route"))

//Connecting to mongoDb 
mongoose.connect(
    process.env.DATABASE_ACCESS,
    {
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    ()=>{
        console.log("DataBase Connected")
    }
)


const port = process.env.PORT || 4000


app.listen(port,()=>{
    console.log(`server running in port'${port}`)
})