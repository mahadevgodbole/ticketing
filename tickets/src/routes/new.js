const express=require("express");
const { requireAuth,validateRequest }=require("@godbole/common")
const {body}=require("express-validator")
const {Ticket}=require("../models/ticket")
const router=express.Router();

router.post("/api/tickets",requireAuth,[
    body('title')
        .not()
        .isEmpty()
        .withMessage("Title is required"),
    body('price')
        .isFloat({gt:0})
        .withMessage("Price must greater than 0")
],validateRequest
,async(req,res)=>{

    const {title,price}=req.body;


    const ticket=await Ticket.create({
        title,
        price,
        userId: req.currentUser.id
    })
    res.status(201).send(ticket);

})

module.exports={CreateTicketRouter:router}