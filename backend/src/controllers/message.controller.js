const MessageModel = require('../models/message.model');

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

module.exports = { getMessages };
