const mongoose = require("mongoose")

const Schema = mongoose.Schema

const incomeSchema = new Schema({
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    register_date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("balance-sheet",incomeSchema)