const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');
router
	.get('/', messageController.getAllMessage)
	.get('/private', messageController.getPrivateMessage)
module.exports = router;