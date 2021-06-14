const express = require("express");
const router = express.Router();



const { create,
        productById, 
        read, 
        remove,
        cupdate,
        list
    }= require("../controllers/product");
const { requireSignin, isAuth, isAdmin }= require("../controllers/auth");
const { userById}= require("../controllers/user");
const { update } = require("lodash");




router.get("/product/:productId", read); 

router.post("/product/create/:userId",
 requireSignin, 
 isAuth, 
 isAdmin, 
 create);

 router.delete('/product/:productId/:userId',
 requireSignin,
 isAuth,
 isAdmin,
 remove
 );

 router.put('/product/:productId/:userId',
 requireSignin,
 isAuth,
 isAdmin,
 cupdate
 );

 router.get("/products", list);

 

 router.param("userId", userById);

 router.param("productId",productById);

 



/*router.get("/hello", requireSignin, (req,res)=>{
    res.send("Hello there");
}); */ //to restrict any route we use require sign in middleware

module.exports = router;