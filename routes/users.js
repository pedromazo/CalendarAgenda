const express = require('express');
const router = express.Router();
const { isLoggedIn, checkForConflictInvite } = require('../middleware');
const events = require('../controllers/events')
const users = require('../controllers/users')
const passport = require('passport')
const catchAsync = require('../utils/catchAsync');

router.get('/', events.renderHome);

router.get('/new', isLoggedIn, events.renderNew);

router.route('/register')
        .get(users.showFormRegister)
        .post(catchAsync(users.registerUser));

router.route('/login')
        .get(users.renderLogin)
        .post(passport.authenticate('local', {failureFlash: 'Usuário ou senha incorretos.', failureRedirect:'/login'}), users.login);

router.get('/logout', users.logout);

router.route('/invites')
        .get(isLoggedIn, catchAsync(users.inviteList))
        .post(isLoggedIn, catchAsync(users.inviteFriend))

router.route('/invites/:id')
        .get(isLoggedIn, catchAsync(users.showInvite))
        .post(isLoggedIn, catchAsync(checkForConflictInvite), catchAsync(users.acceptInvite))
        .delete(isLoggedIn, catchAsync(users.declineInvite))

module.exports = router;