const { response } = require("express");
const express = require("express");
const router = express.Router();
const {authentication, authorization} = require('../../middleware/auth');



const {getAll, registerUser, getOne, deleteUser, updateUser, login, changePassword } = require('../../controller/UserController')

// TO GET ALL USERS
router.get('/users', authentication,  getAll);

//TO GET ONE USER
router.get('/:id', authentication,  getOne);

//router.post('/logout', authentication, logoutUser);

// TO Login
router.post('/login', login);

//TO ADD NEW USER
router.post('/register', registerUser);

//TO DELETE THE USER BY USER_ID
// <<<<<<< HEAD

router.delete('/delete/:id', authentication, deleteUser);


//TO UPDATE BY USER_ID
router.put('/:id', authentication,updateUser );

// TO HANDLE FORGOT PASSWORD
router.put('/user/changepassword', changePassword);



module.exports = router;
