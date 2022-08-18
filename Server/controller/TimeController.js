const Joi = require('Joi');
const _ = require('lodash');


const Timer = require('../models/timerSchema');
const User = require('../models/userSchema');
const Task = require('../models/taskSchema');

module.exports.getAll = async(req,res) =>{
    const timer = await Timer.find();
    if(timer.length>0)
        return res.json({status: true, timer});
    return res.status(400).json({status: false, msg: "No timer found"});
}

module.exports.getOne = async(req,res) => {
    const timer = await Timer.findById(req.params.id);
    if(!timer)
        return res.status(400).json({status: false, msg: "No Timer found"});
    return res.json({status: true, timer});
}

module.exports.addNew = async(req,res) => {
    console.log(req.body);
    const { error } = timerDataValidation(req.body)
    if(error){
        return res.status(404).json({status: false, msg: error});
    }
    const data = _.pick(req.body, [
            "user",
            "task",
            "startTime",
            "endTime",
        ]);
    const userID = data.user;
    const taskID = data.task;
    const user = await User.findById(userID);
    const task = await Task.findById(taskID);
    if(user && task){
        const timer = await Timer.create(data);
        return res.json({status: true, msg: "Task created successfully", timer});
    }
    return res.status(404).json({status: false, msg: "User or task not found"});
    
};

module.exports.updateStatus = async(req,res) => {
    const timer = await Timer.findById(req.params.id);
    if(timer){
        timer.set(req.body);
        await timer.save();
        return res.json({status: true, timer});

    }
    return res.status(300).json({status: false, msg: "Timer not found"});
}


const timerDataValidation = (datas) => {
    const schema = Joi.object({
        user: Joi.string(),
        task: Joi.string(),
        startTime: Joi.date(),
        endTime: Joi.date().greater(Joi.ref('startTime'))
    });
    return schema.validate(datas);
}