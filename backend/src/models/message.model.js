const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		body: {
			type: String,
			required: true,
		},
		from: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const MessageModel = mongoose.model('messages', userSchema);

module.exports = MessageModel;
