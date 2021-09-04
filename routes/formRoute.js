const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConfig = require('../passport/index');
const formController = require('../controllers/formController');

const LoginMiddleware = require('../middleware/login');
router
    .get('/', LoginMiddleware.preventToLoginForm, formController.index)
    
module.exports = router;