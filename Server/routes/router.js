const { response } = require("express");
const express = require("express");
const router = express.Router();
const users = require('../models/userSchema')


//router.get("/", (req,res)=>{
//    console.log("connect");
//})

router.post("/register", async(req,res)=>{
    //console.log(req.body);
    const {name, email, age, role, number} = req.body;

    if(!name || !email || !age || !role || !number){
        res.status(404).send("Please fill the complete data");
    }
    try{
        const preuser = await users.findOne({email:email});
        console.log(preuser);
        if(preuser){
            res.status(404).send("This user is already added.")
        }else{
            const adduser = new users({
                name, email, age, role, number
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    }catch(error){
        res.status(404).send(error);
    }
})

module.exports = router;

