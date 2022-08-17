const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User is required :(']
    },
    task: {
        type: mongoose.Schema.ObjectId,
        ref: 'task',
        required: [true, 'Task is required :(']
    },
    startTime:{
        type: String,
        required: [true, "Please mention the start time"]
    },
    breakTime:{
        type: String,
        default: null
    },
    endBreak:{
        type: String,
        default: null
    },
    endTime:{
        type: String,
        default: null
    }
}, 
{timestamps: true}
);

module.exports = mongoose.model('Timer', timerSchema);