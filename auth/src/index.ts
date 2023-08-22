import express from 'express';
import 'express-async-errors';//this is used as async function make problem when throw an error.
import { json } from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';//if tpye error  $npm install @types/mongoose



import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app=express();

app.use(json());


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// //if route not found then throw error and capture by below errorHandler
app.all("*",async ()=>{
    throw new NotFoundError();
})

// app.all("*",async (req,res,next)=>{
//     next(new NotFoundError());
// })


app.use(errorHandler);


const start = async() =>{
    // await mongoose.connect("mongodb://localhost")
    try{
        console.log("Connnecting")

        const dbURI = 'mongodb://auth-mongo-srv:27017/auth';
   

        await mongoose.connect(dbURI)
        console.log('Connected to MongoDB');
    }catch(err){
        console.error(err);
    }

    app.listen(3000,()=>{
        console.log("Listening on port 3000!!!");
    })
}
start();
// setTimeout(start, 10000)
// ;