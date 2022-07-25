require("dotenv").config();
const express = require("express");
const app =  express();
const mongoose = require("mongoose");
require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");


const userRoutes = require("./routes/route/UserRoutes");
const taskRoutes = require("./routes/route/TaskRoutes");

const cookieParser = require('cookie-parser');
//console.log(new mongoose.Types.ObjectId())



const PORT = 8003;

app.use(cors());

// FOR PARSING THE REQUEST DATA
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTING
app.use('/', userRoutes)
app.use('/', taskRoutes);

app.listen(PORT, () => {
    console.log('server is starting on port number %d', PORT);
});
