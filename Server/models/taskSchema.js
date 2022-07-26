const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    // TITLE
    title:{
        type: String,
        required: [true, "Please mention the title"]
    },

    description: {
        type: String,
    },
    date:{
        type: String,
        required: [true, "please choose the date"]
    },
    task_type:{
        type: String,
        enum: {
            values: [
                "easy",
                "moderate",
                "difficult"
            ],
            message: "select the type of task",
        },
        required: [true, "please select the task type"]
        },
    task_status:{
        type: String,
        enum: {
            values: [
                "assigned",
                "ongoing",
                "completed"
            ],
            message: "Please select the task status",
        },
        required: [true, "please select the task-status"] 
       }, 

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User is required :(']
      }
    },
    {timestamps: true}

    );

module.exports=  mongoose.model("Tasks",taskSchema);