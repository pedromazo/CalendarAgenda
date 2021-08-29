const express = require('express');
const router = express.Router();
const { isLoggedIn, validateEvent, checkForConflict, isAuthor } = require('../middleware');
const events = require('../controllers/events')
const catchAsync = require('../utils/catchAsync');

router.route('/')
        .get(isLoggedIn, catchAsync(events.eventList))
        .post(isLoggedIn, validateEvent, catchAsync(checkForConflict), catchAsync(events.createEvent));
        
router.route('/:id')
        .get(isLoggedIn, catchAsync(events.showEvent))
        .put(isLoggedIn, isAuthor, validateEvent, catchAsync(checkForConflict), catchAsync(events.editEvent))
        .delete(isLoggedIn, isAuthor, catchAsync(events.deleteEvent));

router.get('/:id/edit', isLoggedIn, catchAsync(events.showFormEdit));


module.exports = router;