const express=require("express");
const { requireAuth }=require("@godbole/common")

const router=express.Router();

router.post("/api/tickets",requireAuth,(req,res)=>{
    res.sendStatus(200);
})

module.exports={CreateTicketRouter:router}