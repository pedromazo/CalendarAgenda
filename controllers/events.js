const Event = require('../models/events');

module.exports.createEvent = async (req, res, next) => {
     const event = new Event(req.body.event);
     await event.save();
    res.redirect('/events');
}