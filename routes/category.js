const express = require("express");
const router = express.Router();

const {

    create

    }= require("../controllers/category");


router.post("/category/create", create);



/*router.get("/hello", requireSignin, (req,res)=>{
    res.send("Hello there");
}); */ //to restrict any route we use require sign in middleware

module.exports = router;