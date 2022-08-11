const express = require("express");
const router = express.Router();
const {authentication, authorization} = require('../../middleware/auth');




const {getAll, addNew} = require('../../controller/EventController');


router.get('/events', getAll);

router.post('/addevent', addNew);




module.exports = router;
