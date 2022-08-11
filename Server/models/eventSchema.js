const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventTitle:{
        type: String,
        required: [true, "Please mention the title"]
    },
    eventDate:{
        type: Date,
        required: [true, "Please mention the date"]
    },
    eventDetail:{
        type: String,
        required: [true, "Please mention the details"]
    }
},
    {timestamps: true}
);
module.exports = mongoose.model("Events", eventSchema);