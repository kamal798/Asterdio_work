const Joi = require('joi');
const _ = require('lodash');

const Task = require('../models/taskSchema');


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
    const task = await Task.create(
        _.pick(req.body, [
            "title",
            "description",
            "date",
            "task_type",
            "task_status",
            "user"
        ])
    );
    return res.json({status: true, msg: "Task created successfully", task});
};


module.exports.deleteTask = async(req,res) => {
    const task = await Task.findById(req.params.id);
    if(task){
        if(req.user.role == "admin"){
            await task.remove();
            return res.json({status: true, msg: "Task deleted successfully"});
        }
        return res.status(404).json({status: false, msg: "No such task found"});
    }
}

module.exports.updateTask = async(req,res) => {
    const task = await Task.findById(req.params.id);

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


