const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const events = require('../controllers/events')
const users = require('../controllers/users')
const passport = require('passport')

router.get('/', events.renderHome);

router.get('/new', isLoggedIn, events.renderNew);

router.route('/register')
        .get(users.showFormRegister)
        .post(users.registerUser);

router.route('/login')
        .get(users.renderLogin)
        .post(passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), users.login);

router.get('/logout', users.logout);

module.exports = router;