const Joi = require('joi');
const _ = require('lodash');

const Task = require('../models/taskSchema');


module.exports.getAll = async(req,res) => {
    const tasks = await Task.find();
    if(tasks.length > 0)
        return res.json({status: true, tasks});
    return res.json({status: false, msg: "NO TASK FOUND"});
}

