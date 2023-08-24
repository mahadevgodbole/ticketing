const express = require("express");
const jwt = require("jsonwebtoken");

const  {validateRequest,BadRequestError}  =require("@godbole/common")
// const Password = require("../services/passsword")
const { body } = require("express-validator");
const User = require("../models/user");

const router = express.Router();



router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),

    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters.')
]
    ,
    validateRequest
    , async (req, res) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // console.log("Email in use");
            // return res.send({});

            throw new BadRequestError('Email in use');
        }
    
        const user = await User.create({ email, password });

        
        if (!process.env.JWT_KEY) {
            throw new Error("JWT_KEY not defined");
        }
        //JWT Generation
        const userJwt = jwt.sign({
            id: user.id, email: user.email
        },process.env.JWT_KEY);

        //store on session object
        req.session = { jwt: userJwt };


        res.status(201).send({
            user
        });
    })

module.exports = router;