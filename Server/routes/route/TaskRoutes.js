const { response } = require("express");
const express = require("express");
const router = express.Router();


const {getAll, getOne, addNew, deleteTask, updateTask} = require('../../controller/TaskController');

// TO GET ALL TASKS
router.get('/tasks', getAll);


module.exports = router;