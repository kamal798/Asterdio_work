const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

//  USER SCHEMA 

const userSchema = new mongoose.Schema({
    //IMAGES
    image:{
        type: String
    },
    // NAME
    name:{
        type: String,
        required:[true, "Please add a name"]
    },
    // EMAIL ADDRESS
    email:{
            type: String,
            required:[true, "Enter the email address"],
            unique: [true, "Please enter the new email"]
        },

        //AGE
    age:{
            type: String,
            required:[true, "Please enter the age"]
        },
  
        //PHONE NUMBER
    number:{
            type: Number,
            required:[true,"Please add the phone number"],
            unique: [true, "Add the new numer that is not mentioned preciously"]
        },

        //ROLE
        role: {
            type: ObjectId,
            ref: "Role",
            //This above reference means take reference from the role_id of Role.js Model
            //Thus create RoleController.js before Creating UserController.js
          },

},
{timestamp: true}  // IT SET THE "CREATED AT AND UPDATED AT" AUTOMATICALLY
);

const users = new mongoose.model("Users",userSchema);

module.exports = users;