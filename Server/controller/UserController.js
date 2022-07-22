const Joi = require('joi');
const _ = require('lodash')

const User = require('../models/userSchema')


// TO GET ALL USERS
module.exports.getAll = async(req, res)=>{
    const users = await User.find();
    if(users.length>0)
        return res.json({status: true, users})
    return res.status(404).json({status: false, msg: "No User Found"});
};


//TO GET USER BY ID
module.exports.getOne = async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(user)
        return res.json({status: true, user});
    return res.status(404).json({status: false, msg: "User not found"});
}


//TO DELETE THE USER BY USER_ID
module.exports.deleteUser = async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user)
        return res.status(404).json({status: false, msg: "No user Found"});
    return res.json({status: true, msg:"User deleted successfully"});
}

// TO REGISTER THE NEW USER
/*
module.exports.registerUser = async(req,res)=>{
    //console.log(req.body);
    const {name, email,password, age, role, number} = req.body;

    if(!name || !email || !password || !age || !role || !number){
        res.status(404).send("Please fill the complete data");
    }
    try{
        const preuser = await User.findOne({email:email});
        console.log(preuser);
        if(preuser){
            res.status(404).send("This user is already added.")
        }else{
            const adduser = new User({
                name, email, password, age, role, number
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    }catch(error){
        res.status(404).send(error);
    }
}*/