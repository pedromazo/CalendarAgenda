const express = require('express');
const router = express.Router();
const { isLoggedIn, validateEvent, checkForConflict } = require('../middleware');
const events = require('../controllers/events')

router.route('/')
        .get(isLoggedIn, events.eventList)
        .post(isLoggedIn, validateEvent, checkForConflict, events.createEvent);
        
router.route('/:id')
        .get(isLoggedIn, events.showEvent)
        .put(isLoggedIn, validateEvent, checkForConflict, events.editEvent)
        .delete(isLoggedIn, events.deleteEvent);

router.get('/:id/edit', isLoggedIn, events.showFormEdit);


module.exports = router;