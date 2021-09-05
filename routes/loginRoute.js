const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');
const passport = require('passport');
const passportConfig = require('../passport/index');
router
    .post('/', passport.authenticate('local', { session: false, failureFlash: true, failureRedirect: '/' }), loginController.login)
    .get('/auth/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }))
    .get('/auth/facebook/getInf', passport.authenticate('facebook', { session: false }), loginController.loginFB)
    .get('/auth/google', passport.authenticate('google', { session: false, scope: [ 'profile', 'email' ] }))
    .get('/auth/google/getInf', passport.authenticate('google', { session: false }), loginController.loginGG)
module.exports = router;