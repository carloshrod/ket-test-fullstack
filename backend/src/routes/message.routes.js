const { Router } = require('express');
const { getMessages } = require('../controllers/message.controller');

const messageRoutes = Router();

messageRoutes.get('/messages', getMessages);

module.exports = messageRoutes;
