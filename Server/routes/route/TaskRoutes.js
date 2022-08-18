const { response } = require("express");
const express = require("express");
const router = express.Router();
const {authentication, authorization} = require('../../middleware/auth');




const {getAll, getOne, addNew, deleteTask, updateTask, ListAssignedTask} = require('../../controller/TaskController');

// TO GET ALL TASKS
router.get('/tasks',authentication, getAll)

//TO GET TASK BY ID
router.get('/:id',authentication, getOne);

//TO ADD NEW TASK 
router.post('/addtask',authentication, addNew);

//TO DELETE TASKS
router.delete('/delete/:id',authentication, authorization('Project Manager'), deleteTask);

//TO UPDATE TASKS
router.put("/update/:id",authentication, updateTask);

//TO GET ASSIGNED TASK
router.get("/assignedtask/tasks/:id",authentication, ListAssignedTask);




module.exports = router;