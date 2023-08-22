import mongoose from 'mongoose';

//An interface that describes the properties that required to create new user
interface UserAttrs{
    email: string;
    password:string;
}



// An interface that describe an use model has
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs):UserDoc;
}


// An interface that describes the properties tha a user document has
interface UserDoc extends mongoose.Document{
    email: string;
    password:string;
    // createdAt: string;
    // updatedAt: string;
}




const userSchema= new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});


userSchema.statics.build = (attrs: UserAttrs) =>{
    return new User(attrs);
}

const User=mongoose.model<UserDoc,UserModel>("User",userSchema);

const user= User.build({
    email:'test@gmail.com',
    password: "passsword"
});

export {User};


// //this function is used to create new user(For checking correct type use use buildUser function)
// const buildUser= (attrs:UserAttrs)=>{
//     return new User(attrs);
// }

// //here we can use neccesary attribute
// buildUser({
//     email:"m@gmail.com",
//     password:"34#3df"
// })
