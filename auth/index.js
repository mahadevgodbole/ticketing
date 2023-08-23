
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
require('express-async-errors');

const currentUserRouter = require('./src/routes/current-user');
const signinRouter = require('./src/routes/signin');
const signoutRouter = require('./src/routes/signout');
const signupRouter = require('./src/routes/signup');
const errorHandler = require('./src/middleware/error-handler');
const { NotFoundError } = require('./src/errors/not-found-error');

const app=express();
app.set('trust proxy',true);

app.use(express.json());
app.use(
    cookieSession({
        signed:false,
        secure: true //https connection
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


const start = async() =>{

  
    if (!process.env.JWT_KEY){
        throw new Error("JWT_KEY not defined");
    }
    
    // await mongoose.connect("mongodb://localhost")
    try{
        console.log("Connnecting")

        const DATABASE = 'mongodb://auth-mongo-srv:27017/auth';
        // const DATABASE="mongodb+srv://mahadev:mahadev@cluster0.zlmulle.mongodb.net/auth?retryWrites=true&w=majority";
   

        await mongoose.connect(DATABASE)
        console.log('Connected to MongoDB');
    }catch(err){
        console.error(err);
    }

    app.listen(3000,()=>{
        console.log("Listening on port 3000!!!");
    })
}
// start();
setTimeout(start, 9000)
;