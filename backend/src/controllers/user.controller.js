const UserModel = require('../models/user.model');
const { compare } = require('bcryptjs');
const { generateAuthToken } = require('../utils');

const createUser = async (req, res, next) => {
	try {
		const newUser = new UserModel(req.body);
		const savedUser = await newUser.save();
		if (savedUser) {
			return res.status(201).send(savedUser);
		}
	} catch (error) {
		next(error);
	}
};

const signIn = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username });
		if (!user) {
			return res.status(400).send();
		}
		const passOK = await compare(password, user.password);
		if (passOK) {
			const token = generateAuthToken(user);
			return res.status(200).send({ user, token });
		}
		return res.status(400).send();
	} catch (error) {
		console.log('Error iniciando sesión: ' + error);
		next(error);
	}
};

module.exports = { createUser, signIn };
