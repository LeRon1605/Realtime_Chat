const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConfig = require('../passport/index');

const homeController = require('../controllers/homeController');

const LoginMiddleware = require('../middleware/login');
router
    .get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), homeController.index)
module.exports = router;