const mongoose=require("mongoose")
const Password=require("../services/passsword")


const userSchema= new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
},{
    // modify json response when send as user object
    toJSON:{
        transform(doc,ret){
            ret.id=ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v; //version key
        }
    }
});

//pre hook while sending into database
userSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed= await Password.toHash(this.get('password'));

        this.set("password",hashed);
    }
    done();
})



module.exports=mongoose.model("User",userSchema);


// //this function is used to create new user(For checking correct type use use buildUser function)
// const buildUser= (attrs:UserAttrs)=>{
//     return new User(attrs);
// }

// //here we can use neccesary attribute
// buildUser({
//     email:"m@gmail.com",
//     password:"34#3df"
// })
