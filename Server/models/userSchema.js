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
          //  unique: [true, "Please enter the new email"],
          /*  match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter the valid email address'
              ]
          */
        },
    password:{
            type: String,
            required: [true, 'password is required'],
            select: false
        },

        //AGE
    number:{
            type: Number,
            required:[true, "Please enter the age"]
        },
  
        //PHONE NUMBER
    phone:{
            type: Number,
            required:[true,"Please add the phone number"],
          //  unique: [true, "Add the new numer that is not mentioned preciously"]
        },

    role: {
            type: String,
            enum: ["frontend", "backend", "designer", "QA"]
          }

},
{timestamp: true}  // IT SET THE "CREATED AT AND UPDATED AT" AUTOMATICALLY
);

module.exports=  mongoose.model("Users",userSchema);