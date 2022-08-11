require("dotenv").config();
const express = require("express");
const app =  express();
require("./db/conn");
const cors = require("cors");
//
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
//

const userRoutes = require("./routes/route/UserRoutes");
const taskRoutes = require("./routes/route/TaskRoutes");
const eventRoutes = require("./routes/route/EventRoute");


const cookieParser = require('cookie-parser');
//console.log(new mongoose.Types.ObjectId())



const PORT = 3500;

app.use(cors(corsOptions));

// app.use(cors());

// FOR PARSING THE REQUEST DATA
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTING
app.use('/user', userRoutes)
app.use('/task', taskRoutes);
app.use('/event',eventRoutes);

app.listen(PORT, () => {
    console.log('server is starting on port number %d', PORT);
});
