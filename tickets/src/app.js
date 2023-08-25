//config express application
const express = require('express');
const cookieSession = require("cookie-session");
require('express-async-errors');//to use throw inteaded of next in hanlder fuction
const {errorHandler,NotFoundError,currentUser}=require("@godbole/common");
const {showTicketRouter}=require("./routes/show")
const {CreateTicketRouter}=require("./routes/new");

const app=express();
app.set('trust proxy',true);

app.use(express.json());
app.use(
    cookieSession({
        signed:false,
        // secure: true //https connection
        secure: process.env.NODE_ENV !=='test' //in test allow http request
    })
)

app.use(currentUser)

app.use("/",CreateTicketRouter)
app.use("/",showTicketRouter);

// //if route not found then throw error and capture by below errorHandler
app.all("*",async ()=>{
    throw new NotFoundError();
})

// app.all("*",async (req,res,next)=>{
//     next(new NotFoundError());
// })


app.use(errorHandler);
module.exports = { app };

