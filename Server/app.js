require("dotenv").config();
const express = require("express");
const app =  express();
const mongoose = require("mongoose");
require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
//console.log(new mongoose.Types.ObjectId())



const PORT = 8003;

app.use(cors());
app.use(express.json());
app.use(userRoutes);

app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log('server is starting on port number %d', PORT);
});
