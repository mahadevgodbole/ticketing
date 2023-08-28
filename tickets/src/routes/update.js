const express=require("express");
const {body}=require("express-validator");
const {validateRequest,NotFoundError,requireAuth,NotAuthorizedError}=require("@godbole/common");
const {Ticket} =require("../models/ticket");

const router=express.Router();

router.put("/api/tickets/:id",
requireAuth,
[
    body('title').not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({gt:0}).withMessage("Price must be provided and must be greater than 0")
],
validateRequest,
async(req,res)=>{
    const ticket= await Ticket.findById(req.params.id);

    if(!ticket){
        throw new NotFoundError();
    }

    if(ticket.userId!==req.currentUser.id){
        throw new NotAuthorizedError();
    }

    ticket.set({
        title:req.body.title,
        price: req.body.price
    });

    await ticket.save();
    res.send(ticket);
});

module.exports= {updateTicketRouter:router};