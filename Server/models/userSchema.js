const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
            type: String,
            required:true,
            unique: true
        },
    age:{
            type: String,
            required:true
        },
    role:{
            type: String,
            required:true
        },
    number:{
            type: Number,
            required:true
        }

});

const users = new mongoose.model("Users",userSchema);

module.exports = users;