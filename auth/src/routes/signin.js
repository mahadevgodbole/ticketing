const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const { body } = require("express-validator");
const validateRequest = require("../middleware/validation-request");
const { BadRequestError } = require("../errors/bad-request-error");
const Password = require("../services/passsword")

const router = express.Router();

router.post('/api/users/signin', [
    body('email').isEmail().withMessage("Email must be valid"),
    body('password').trim().notEmpty().withMessage('You must supply a password')
], validateRequest,
    async (req, res) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            throw new BadRequestError("Invalid credentials");
        }

        const passwordsMatch = await Password.compare(existingUser.password , password);

        if (!passwordsMatch) {
            throw new BadRequestError("Invalid credentials");
        }


        //JWT Generation
        const userJwt = jwt.sign({
            id: existingUser.id, email: existingUser.email
        },process.env.JWT_KEY);

        //store on session object
        req.session = { jwt: userJwt };

        res.status(200).send(existingUser)
    });

module.exports = router;