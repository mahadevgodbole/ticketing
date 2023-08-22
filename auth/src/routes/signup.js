const express = require("express");
require('express-async-errors');
const { body, validationResult } = require("express-validator");
const { RequestValidationError } = require("../errors/request-validation-errors");
const { DatabaseConnectionError } = require("../errors/database-connection-errors");
const User  = require("../models/user");
const { BadRequestError } = require("../errors/bad-request-error");

const bcrypt= require("bcryptjs");

const router= express.Router();



router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),

    body('password')
        .trim()
        .isLength({min:4,max:20})
        .withMessage('Password must be between 4 and 20 characters.')
] 
, async (req,res) =>{

    //send error to user
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({email});
    
    if (existingUser){
        // console.log("Email in use");
        // return res.send({});

        throw new BadRequestError('Email in use');
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = User.create({ email, hashedPassword});


    res.status(201).send({
        email,password
    });
})

module.exports = router;