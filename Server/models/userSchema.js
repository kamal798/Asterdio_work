const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter the valid email address'
              ]
        },
    password:{
            type: String,
            required: [true, 'password is required'],
            select: false,
        },

        //AGE
    mobile:{
            type: Number,
            required:[true, "Please enter the mobile"]
        },
  
        //PHONE NUMBER
    address:{
            type: String,
            required:[true,"Please add address"],
          //  unique: [true, "Add the new number that is not mentioned preciously"]
        },

    status:{
      type: String,
      enum:["Active","Inactive"],
      default: 'Inactive'
    },

    role: {
            type: String,
            enum: ["Frontend Developer", "Backend Developer", "Designer", "QA", "Project Manager"]
          },
    token: {
            type: String
    }

},
{timestamps: true}  // IT SET THE "CREATED AT AND UPDATED AT" AUTOMATICALLY
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {

  var data=   await bcrypt.compare(password, this.password);
  console.log(data);
  return data;
};
userSchema.methods.getAccessToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.PRIVATE_KEY) //{ expiresIn: process.env.TOKEN_EXPIRES })
}
userSchema.methods.getPasswordResetToken = async function () {
  const resetToken = await crypto.randomBytes(20).toString('hex');
  console.log(resetToken);

  // HASH THE RESETTOKEN AND SET TO resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // SET EXIPIRE
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
}

module.exports=  mongoose.model("Users",userSchema);