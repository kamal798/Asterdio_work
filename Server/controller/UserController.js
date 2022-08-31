const Joi = require('joi');
const _ = require('lodash');
const crypto = require('crypto');


const User = require('../models/userSchema')
const sendMail = require('../utilis/SendMail')


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

// TO LOGIN USER
module.exports.login = async(req, res) => {
  const {email, password} = req.body;
  // console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ status: false, msg: "Enter both email and password" });
  }
  const user = await User.findOne({email}).select('+password');
  if (!user)
    return res.status(404).json({status: false, msg: 'invalid email' });
  const valid = await user.comparePassword(password);
  if (!valid)
    return res.status(400).json({ status: false, msg: 'Invalid Password' });
  
  const token = user.getAccessToken();
// <<<<<<< HEAD
  const role = user.role
  const userID = user._id

// =======
//   const role = user.role;
//   const userId = user.id;
// >>>>>>> a2efdbb8c9abcb6b14282a4d8fb50888cbcc9747

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

 
  return res
    .cookie('token', token, options)
// <<<<<<< HEAD

    .json({ status: true, msg: 'Login successfull :)', token, role, userID });

// =======
//     .json({ status: true, msg: 'Login successfull :)', token, role, userId });
// >>>>>>> a2efdbb8c9abcb6b14282a4d8fb50888cbcc9747

}

//TO DELETE THE USER BY USER_ID
module.exports.deleteUser = async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user)
        return res.status(404).json({status: false, msg: "No user Found"});
    return res.json({status: true, msg:"User deleted successfully"});
}
 
// FORGOT PASSWORD
module.exports.forgotPassword = async (req, res) => {
  if (req.body && req.body.email) {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user)
      return res.status(404).json({ status: false, msg: `${req.body.email} email not found :(` })
    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({status:false,msg:"Password do not match with each other"});
      }

    const resetToken = await user.getPasswordResetToken();

    // SEND MAIL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/users/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you or someone else has requested the reset
                      of a password. Please make a PUT request to \n\n ${resetUrl}
                    `;
    try {
      await sendMail({
        email: user.email,
        subject: 'Password reset token',
        message
      });
      await user.save();
      return res.json({ status: true, msg: 'Please check your email :)' });
    }
    catch (error) {
      console.log(error);
      // user.resetPasswordToken = undefined;
      // user.resetPasswordExpire = undefined;
      // await user.save({ validateBeforeSave: false });
      return res.status(500).json({ status: false, msg: 'Email could not be sent :(' });
    }
  }
  return res.status(400).json({ status: false, msg: 'Please send your email' });
}

};

//TO UPDATE USER BY USER_ID
module.exports.updateUser = async(req,res) => {
  const user = await User.findById(req.params.id);
  if(!user)
    return res.status(404).json({status: false, msg:"No user found"});

  // CHECK EMAIL IS ALREADY USED OR NOT
  if(req.body.email){
    const checkEmail = await User.findOne({email: req.body.email});

    if(checkEmail && checkEmail.id != user.id)
      return res.status(404).json({status:false, msg: "Email not available"});

  }
  user.set(req.body);
  await user.save();
  return res.json({status:true, msg: "User updated successfully", user});
}
//image
// module.exports.updateUserimage = async(req,res) => {
//   if(req.file)
//     req.body.image = req.file.filename;

//   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   });
//   if(!user)
//     return res.status(404).json({status: false, msg: "User not found"});

//   return res.json({status : true, msg: "USer photos updated successfully", user});
// }


// TO LOGOUT USER
// module.exports.logoutUser = async(req,res) => {
//   try{
//     console.log(req.token);
//     console.log(req.user);
//     res.clearCookie("jwt");
//     console.log("logout successfull")
//     await req.user.save();
//     console.log(req.user);
//     console.log(req.token);
//   }catch (error){
//     return res.status(500).json({status: false, msg: "Failed"});

//   }
 
// }


// TO REGISTER THE NEW USER
module.exports.registerUser = async(req, res) => {
  // try{
  console.log(req.body);
   const { error } = userDataValidation(req.body);
    //JOI VALIDATES ONE AT A TIME
    //HENCE, IF WE DO:
    // return res.status(400).json({ status: false , msg: error.message }); -> ONE ERROR at a time
  
    if (error) {
      // return res.status(400).json({ status: false , msg: error.message });
      return res.status(400).json({ status: false, msg: error });
    }
    
    const user = await User.create(
      _.pick(req.body, [
        "name",
        "email",
        "password",
        "mobile",
        "address",
        "role"
      ])
    );
    return res.json({ status: true, msg: "New user created successfully", user });
   
  };


  const userDataValidation = (datas) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      mobile: Joi.string().regex(/^(98)[0-9]{8}$/).messages({'string.pattern.base': `Mobile number must have 10 digits and start with 98.`}).required(),
      address: Joi.string().required(),
      role: Joi.string().required()
    });
  
  
    return schema.validate(datas);
  };

/*
module.exports.registerUser = async(req,res)=>{
    console.log(req.body);
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
}
*/