const Joi = require('joi');
const _ = require('lodash');

const Task = require('../models/taskSchema');
const User = require('../models/userSchema');

module.exports.getAll = async(req,res) => {
    const tasks = await Task.find();
    if(tasks.length > 0)
        return res.json({status: true, tasks});
    return res.json({status: false, msg: "NO TASK FOUND"});
}

module.exports.getOne = async(req,res) => {
    const task = await Task.findById(req.params.id);
    if(task)
        return res.json({status: true, task});
    return res.status(404).json({status: false, msg: "No task found"});
}

module.exports.addNew = async(req,res) => {
    console.log(req.body);
    const { error } = taskDataValidation(req.body)
    if(error){
        return res.status(404).json({status: false, msg: error});
    }
    const data = _.pick(req.body, [
            "title",
            "description",
            "date",
            "task_type",
            "task_status",
            "user"
        ]);
    const userID = data.user;
    const user = await User.findById(userID);
    if(user){
        const task = await Task.create(data);
        return res.json({status: true, msg: "Task created successfully", task});
    }
    return res.status(404).json({status: false, msg: "User not found"});
    
};


module.exports.deleteTask = async(req,res) => {
    const task = await Task.findById(req.params.id);
    if(task){
        await task.remove();
        return res.json({status: true, msg: "Task deleted successfully"});
    }
    return res.status(404).json({status: false, msg: "No such task found"});
    }

module.exports.updateTask = async(req,res) => {
    const task = await Task.findById(req.params.id);
    console.log(req.body);
    if(task){
            task.set(req.body);
            await task.save();
            return res.json({status: true, msg: "Task updated sucessfully", task});
        }
    return res.status(404).json({status: false, msg: "No task found"});
}


const taskDataValidation = (datas) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      task_type: Joi.string().required(),
      task_status: Joi.string().required(),
      user: Joi.string().required()
    });
  
  
    return schema.validate(datas);
  };


