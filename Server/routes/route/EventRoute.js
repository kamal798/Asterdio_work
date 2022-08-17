const express = require("express");
const router = express.Router();
const {authentication, authorization} = require('../../middleware/auth');




const {getAll, getOne, addNew, deleteEvent, updateEvent} = require('../../controller/EventController');


router.get('/events', getAll);

router.post('/addevent', addNew);

router.delete('/delete/:id', deleteEvent);

router.get('/event/:id', getOne);

router.put('/update/:id', updateEvent);

module.exports = router;
