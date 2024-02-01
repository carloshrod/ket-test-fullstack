const { Router } = require('express');
const { signIn, createUser } = require('../controllers/user.controller');

const userRoutes = Router();

userRoutes.post('/', createUser);
userRoutes.post('/signin', signIn);

module.exports = userRoutes;
