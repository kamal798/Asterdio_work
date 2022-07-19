const mongoose = require("mongoose");

const DB = "mongodb+srv://Samar:Asterdio%40123@cluster0.abww1.mongodb.net/TaskManagementSystem?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connection start")).catch((error) => console.log(error.message));