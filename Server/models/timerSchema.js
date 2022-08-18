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
    startTime: {
        type: String
    },
    endTime: {
        type: String
    }
}, 
{timestamps: true}
);

module.exports = mongoose.model('Timer', timerSchema);