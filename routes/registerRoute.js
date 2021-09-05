const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');
const { schemas, validateBody } = require('../middleware/validate');
router
    .post('/', validateBody(schemas.userSchema), registerController.register)

module.exports = router;