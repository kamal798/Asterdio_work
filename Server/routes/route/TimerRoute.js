const express = require("express");
const router = express.Router();
const {authentication, authorization} = require('../../middleware/auth');




const {getAll, getOne, addNew} = require('../../controller/TimeController');


router.get('/timers', getAll);

router.post('/addtimer', addNew);

router.get('/timer/:id', getOne);

module.exports = router;
