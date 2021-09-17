const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
	senderID: {
		type: Schema.Types.ObjectId,
		required: true
	},
	receiverID: {
		type: Schema.Types.ObjectId,
		required: true
	},
	senderImage: String,
	receiverImage: String,
	message: {
		type: String,
		required: true
	}
}, { timestamps: true })

module.exports = mongoose.model('message', messageSchema);