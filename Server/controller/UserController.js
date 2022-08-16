const Joi = require('joi');
const _ = require('lodash');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


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
  const role = user.role;
  const userId = user.id;

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

 
  return res
    .cookie('token', token, options)
    .json({ status: true, msg: 'Login successfull :)', token, role, userId });

}

//TO DELETE THE USER BY USER_ID
module.exports.deleteUser = async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user)
        return res.status(404).json({status: false, msg: "No user Found"});
    return res.json({status: true, msg:"User deleted successfully"});
}
 
// FORGOT PASSWORD
module.exports.changePassword = async (req, res) => {
  if (req.body && req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).json({ status: false, msg: `${req.body.email} email not found :(` });

    // SEND MAIL
    const message = "Your password is chaged recently. Please contact the department to retrieve the password to access your data";
    try {
      await sendMail({
        email: user.email,
        subject: 'Password Changed',
        message
      });
      user.set(req.body);
      await user.save();
      return res.json({ status: true, msg: 'Please check your email :)' });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, msg: 'Email could not be sent :(' });
    }
  }
  return res.status(400).json({ status: false, msg: 'Please send your email' });
}


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


// TO REGISTER THE NEW USER AFTER EMAIL VERIFICATION
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
    
    const token = jwt.sign({name, email, phone, mobile, role}, process.env.PRIVATE_KEY, {expiresIn: '20m'});
    try {
      await sendMail({
        email: req.body.email,
        subject: 'Email verification',
        html:`
              <h2>Please click the link to activate the account</h2>
              <p>${process.env.client_URL}/authetication/activate/${token}</p>
              `
      });
    }catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, msg: 'Email could not be sent :(' });
    }



    // const user = await User.create(
    //   _.pick(req.body, [
    //     "name",
    //     "email",
    //     "password",
    //     "mobile",
    //     "phone",
    //     "role",
    //   ])
    // );
    // user.token = user.getAccessToken();
    // return res.json({ status: true, msg: "New user created successfully", user });
    // }
    // catch(error){
    // res.status(400).json({ status: false, msg: error });
    // }*/
  };

  module.exports.activateAccount = (req,res) => {
    const {token} = req.body;
    if(token){
      jwt.verify(token, process.env.PRIVATE_KEY, function(err, decodedToken){
        if(err){
          return res.status(404).json({status: false, msg: "Invalid token"})
        }
        const userData = decodedToken;
        userData.save((err, success) => {
          if(err){
            return res.status(404).json({error: err})
          }
          res.json({
            message: "User registered successfully."
          })
        })
      })

    }else{
      return res.json({status:false, msg: "please enter the token"})
    }
  }


  const userDataValidation = (datas) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      mobile: Joi.number().required(),
      phone: Joi.number().required(),
      role: Joi.string().required(),
    });
  
  
    return schema.validate(datas);
  };
