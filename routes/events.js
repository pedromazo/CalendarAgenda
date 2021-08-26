const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const events = require('../controllers/events')

router.route('/')
        .get(isLoggedIn, events.eventList)
        .post(isLoggedIn, events.createEvent);
        
router.route('/:id')
        .get(isLoggedIn, events.showEvent)
        .put(isLoggedIn, events.editEvent)
        .delete(isLoggedIn, events.deleteEvent);

router.get('/:id/edit', isLoggedIn, events.showFormEdit);


module.exports = router;