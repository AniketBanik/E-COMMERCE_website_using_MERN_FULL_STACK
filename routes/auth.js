const express = require("express");
const router = express.Router();

const {signup, 
       signin ,
       signout , 
      requireSignin
    }= require("../controllers/auth");
const {userSignupValidator}= require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

/*router.get("/hello", requireSignin, (req,res)=>{
    res.send("Hello there");
}); */ //to restrict any route we use require sign in middleware

module.exports = router;