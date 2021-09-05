const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');
const passport = require('passport');
const passportConfig = require('../passport/index');
router
    .post('/', passport.authenticate('local', { session: false, failureFlash: true, failureRedirect: '/' }), loginController.login)
    .get('/auth/facebook', passport.authenticate('facebook', { session: false, scopre: ['email'] }))
    .get('/auth/facebook/getInf', passport.authenticate('facebook', { session: false }), loginController.loginFB)
module.exports = router;