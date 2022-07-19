const express = require("express");
const router = express.Router();


//router.get("/", (req,res)=>{
//    console.log("connect");
//})

router.post("/register", (req,res)=>{
    console.log(req.body);
})

module.export = router;

