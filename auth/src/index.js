const mongoose = require('mongoose');
const {app}=require("./app")

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
start();
// setTimeout(start, 9000)
;