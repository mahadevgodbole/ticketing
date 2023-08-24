//config express application

const express = require('express');
const cookieSession = require("cookie-session");
require('express-async-errors');//to use throw inteaded of next in hanlder fuction
const {errorHandler,NotFoundError}=require("@godbole/common");
const currentUserRouter = require('./routes/current-user');
const signinRouter = require('./routes/signin');
const signoutRouter = require('./routes/signout');
const signupRouter = require('./routes/signup');

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

app.use("/",currentUserRouter);
app.use("/",signinRouter);
app.use("/",signoutRouter);
app.use("/",signupRouter);

// //if route not found then throw error and capture by below errorHandler
app.all("*",async ()=>{
    throw new NotFoundError();
})

// app.all("*",async (req,res,next)=>{
//     next(new NotFoundError());
// })


app.use(errorHandler);
module.exports = { app };

