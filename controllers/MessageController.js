const Message = require('../db/models/message');

class MessageController{
	async getAllMessage(req, res, next){
		try{
			const messages = await Message.find({});
			console.log(messages);
			return res.status(200).json(messages);
		}catch(err){
			next(err);
		}
	}
	async getPrivateMessage(req, res, next){
		try{
			const { senderID, receiverID } = req.query;
			const messagesSender = await Message.find({
				senderID: senderID,
				receiverID: receiverID
			});
			const messagesReceiver = await Message.find({
				senderID: receiverID,
				receiverID: senderID
			})
			return res.status(200).json([...messagesReceiver, ...messagesSender]);
		}catch(err){
			next(err);
		}
	}
}

module.exports = new MessageController();