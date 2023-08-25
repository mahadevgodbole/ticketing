const mongoose = require('mongoose');
const {app}=require("./app")

const start = async() =>{

  
    if (!process.env.JWT_KEY){
        throw new Error("JWT_KEY not defined");
    }
    
    // await mongoose.connect("mongodb://localhost")
    try{
        console.log("Connnecting")

       
        if (!process.env.MONGO_URI){
            throw new Error("MONGO_URI must be defined")
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');
    }catch(err){
        console.error(err);
    }

    app.listen(3000,()=>{
        console.log("Listening on port 3000!!!");
    })
}
start();
// setTimeout(start, 9000)
;