const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin }= require("../controllers/auth");

const { userById}= require("../controllers/user");

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req,res)=> {
    res.json({
        user: req.profile
    });
});

router.param('userId', userById);


/*router.get("/hello", requireSignin, (req,res)=>{
    res.send("Hello there");
}); */ //to restrict any route we use require sign in middleware

module.exports = router;