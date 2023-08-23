const express = require("express")
const jwt = require("jsonwebtoken");
const requireAuth=require("../middleware/require-auth")
const currentUser =require("../middleware/currentuser")

const router = express.Router();

router.get('/api/users/currentuser',currentUser,(req, res) => {
    res.send({currentUser:req.currentUser || null});
})

module.exports = router;



// router.get('/api/users/currentuser', (req, res) => {
//     if (!req.session?.jwt) {
//         return res.send({ currentUser: null })
//     }

//     try{
       
//         const payload = jwt.verify(req.session.jwt,process.env.JWT_KEY);
       
//         res.send({currentUser:payload});
//     }catch(err){ res.send({currentUser:null,err})}

// })