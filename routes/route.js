const express = require("express")
const incomeSchema = require("../model/income")

// Initialing Express Router 
const {Router}= express
const router = Router()




// @route POST  
// @desc post the income to the databases 
// @access Public
router.post("/",(req,res)=>{
    
    const incomedata = new incomeSchema({
        type:req.body.type,
        description:req.body.description,
        amount:req.body.amount
    })
    incomedata.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>res.json(err))
})

module.exports = router