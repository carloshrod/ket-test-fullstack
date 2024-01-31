const { Router } = require('express');
const {
	signin,
	getUsers,
	createUser,
} = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.post('/', createUser);
userRoutes.post('/signin', signin);

module.exports = userRoutes;
