require("dotenv").config();
const express = require("express");
const app =  express();
require("./db/conn");
const cors = require("cors");

const userRoutes = require("./routes/route/UserRoutes");
const taskRoutes = require("./routes/route/TaskRoutes");
const eventRoutes = require("./routes/route/EventRoute");
const timerRoutes = require('./routes/route/TimerRoute');


const cookieParser = require('cookie-parser');
//console.log(new mongoose.Types.ObjectId())



const PORT = 3500;

app.use(
    cors({
    origin: "http://192.168.0.130:3000",
    credentials: true
})
);

// FOR PARSING THE REQUEST DATA
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTING
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/event',eventRoutes);
app.use('/timer',timerRoutes);
app.listen(PORT, () => {
    console.log('server is starting on port number %d', PORT);
});
