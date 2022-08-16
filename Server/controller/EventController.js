const Joi = require('Joi');
const _ = require('lodash');
const Event = require('../models/eventSchema');


module.exports.getAll = async(req,res) =>{
    const events = await Event.find();
    if(events.length == 0)
        return res.status(403).json({status: false, msg: "No event found"});
    return res.json({status: true, events})
}

module.exports.addNew = async(req,res) =>{
    console.log(req.body);
    const { error } = eventDataValidation(req.body)
    if(error){
        return res.status(404).json({status: false, msg: error});
    }
    const data = await Event.create( 
        _.pick(req.body, [
            "eventTitle",
            "eventDate",
            "eventDetail"
        ])
        );
    
    return res.json({status: true, msg: "Event Created Successfully"});
}

module.exports.deleteEvent = async(req,res) =>{
    try{
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event){
            return res.status(404).json({status: false, msg:"No event found"});
        }
        return res.json({status: false, msg: "Event deleted successfully"})
    }catch(error){
        return res.json({status: false, msg: "Error"})
    }
}

module.exports.getOne = async(req,res) => {
    const event = await Event.findById(req.params.id)
    if(!event)
        return res.status(404).json({status: false, msg: "No such event found"});
    return res.json({status: true, event})
}

module.exports.updateEvent = async(req,res) => {
    const event = await Event.findById(req.params.id)
    if(event){
        event.set(req.body);
        await event.save();
        return res.json({status: true, msg: "Event updated successfully", event});
    }
    return res.status(403).json({status: false, msg:"No Event found"});
}







const eventDataValidation = (datas) => {
    const schema = Joi.object({
      eventTitle: Joi.string().required(),
      eventDate: Joi.date().required(),
      eventDetail: Joi.string().required()
    });
  
    return schema.validate(datas);
  };