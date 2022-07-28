const { response } = require("express");
const express = require("express");
const router = express.Router();
const {authentication, authorization} = require('../../middleware/auth');



const {getAll, registerUser, getOne, deleteUser, updateUser, login, forgotPassword, } = require('../../controller/UserController')

// TO GET ALL USERS
router.get('/users', authentication, authorization('project manager'), getAll);



//TO GET ONE USER
router.get('/:id',getOne);

// TO Login
router.post('/login', login);

//TO ADD NEW USER
router.post('/register', registerUser);

//TO DELETE THE USER BY USER_ID
router.delete('/delete/:id',deleteUser);

//TO UPDATE BY USER_ID
router.put('/:id', updateUser );

// TO HANDLE FORGOT PASSWORD
router.post('/forgot-password', forgotPassword);

module.exports = router;
