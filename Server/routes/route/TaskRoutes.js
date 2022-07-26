const { response } = require("express");
const express = require("express");
const router = express.Router();


const {getAll, getOne, addNew, deleteTask, updateTask} = require('../../controller/TaskController');

// TO GET ALL TASKS
router.get('/tasks', getAll);

//TO GET TASK BY ID
router.get('/:id', getOne);

//TO ADD NEW TASK 
router.post('/addtask', addNew);

//TO DELETE TASKS
router.delete('/delete/:id', deleteTask);

//TO UPDATE TASKS
router.put("/update/:id", updateTask);


module.exports = router;