const express = require("express");
const router = express.Router();



const { create }= require("../controllers/category");
const { requireSignin, isAuth, isAdmin }= require("../controllers/auth");
const { userById}= require("../controllers/user");


router.post("/category/create/:userId",
 requireSignin, 
 isAuth, 
 isAdmin, 
 create);

 router.param('userId', userById);



/*router.get("/hello", requireSignin, (req,res)=>{
    res.send("Hello there");
}); */ //to restrict any route we use require sign in middleware

module.exports = router;