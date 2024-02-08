const MessageModel = require('../models/message.model');

const createMessage = async msg => {
	try {
		const newMessage = new MessageModel({
			body: msg.body,
			from: msg.from,
			role: msg.role,
		});
		await newMessage.save();
	} catch (e) {
		console.error(e);
	}
};

const getMessages = async (_req, res, next) => {
	try {
		const foundMessages = await MessageModel.find();
		if (foundMessages.length > 0) {
			return res.status(200).send(foundMessages);
		}
		return res.status(204).send();
	} catch (error) {
		next(error);
	}
};

module.exports = { createMessage, getMessages };
