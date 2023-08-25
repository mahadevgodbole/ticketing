const express=require("express");
const {Ticket}=require("../models/ticket");
const {NotFoundError}=require("@godbole/common")

const router=express.Router();

router.get("/api/tickets/:id",async(req,res)=>{
    const ticket= await Ticket.findById(req.params.id);

    if(!ticket){
        throw new NotFoundError();
    }
    res.send(ticket);
})

module.exports={showTicketRouter:router}