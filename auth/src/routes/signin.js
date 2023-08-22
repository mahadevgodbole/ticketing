const express = require("express");
const User  = require("../models/user");

const router = express.Router();

router.post('/api/users/signin', async(req, res) => {
    // res.send("Hi there signin");

    const {email,password}=req.body;

    const user= await User.findOne({email})

    if (!user){
        
    }

});

module.exports =router ;