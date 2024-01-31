const UserModel = require('../models/user.model');
const { compare } = require('bcryptjs');
const { generateAuthToken } = require('../utils');

exports.createUser = async (req, res, next) => {
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

exports.getUsers = async (_req, res, next) => {
	try {
		const foundUsers = await UserModel.find();
		if (foundUsers.length > 0) {
			return res.status(200).send(foundUsers);
		}
		return res.status(204).send();
	} catch (error) {
		next(error);
	}
};

exports.signin = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username });
		if (!user) {
			return res.send({
				msg: 'Credenciales NO válidas. Intentelo de nuevo!',
				error: 'Unvalid credentials',
			});
		}
		const passOK = await compare(password, user.password);
		if (passOK) {
			const token = generateAuthToken(user);
			return res.status(200).send({ user, token });
		} else {
			return res.send({
				msg: 'Credenciales NO válidas. Intentelo de nuevo!',
				error: 'Unvalid credentials',
			});
		}
	} catch (error) {
		console.log('Error iniciando sesión: ' + error);
		next(error);
	}
};
