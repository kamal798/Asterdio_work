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
    task_start_date:{
        type: String,
    },
    task_end_date:{
        type: String
    },
    priority:{
        type: String,
        enum: {
            values: [
                "Low",
                "Medium",
                "High",
                "Urgent"
            ],
            message: "select the type of task",
        },
        required: [true, "please select the task type"]
        },
    task_status:{
        type: String,
        enum: {
            values: [
                "Pending",
                "Ongoing",
                "Completed"
            ],
            message: "Please select the task status",
        },
        required: [true, "please select the task-status"] 
       }, 

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User is required :(']
      }
    },
    {timestamps: true}

    );

module.exports=  mongoose.model("Tasks",taskSchema);