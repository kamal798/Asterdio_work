const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    role:{
        type: String,
        required: [true, "Please select the role"]
    }
},
{timestamp: true}   // IT SET THE "CREATED AT AND UPDATED AT" AUTOMATICALLY
);
const role = new mongoose.model("ROLE", roleSchema);
module.exports = role;