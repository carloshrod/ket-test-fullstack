const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index.routes.js');
const errorHandler = require('./middlewares/errorHandler.js');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const connectToDB = require('./database.js');
const { createMessage } = require('./controllers/message.controller.js');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app);

// Web sockets server
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
	},
	connectionStateRecovery: {},
});

io.on('connection', async socket => {
	console.log(`User ${socket.id} has connected!`);

	socket.on('disconnect', () => {
		console.log(`User ${socket.id} has disconnected!`);
	});

	socket.on('chat_message', async msg => {
		await createMessage(msg);

		socket.broadcast.emit('chat_message', {
			body: msg.body,
			from: msg.from,
			role: msg.role,
		});
	});
});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use(router);

// Errors middleware
app.use(errorHandler);

// Connect to database:
connectToDB();

// Run server
server.listen(PORT, () => {
	console.log(`************ Server listening on port ${PORT} ************\n`);
});

module.exports = { server, app };
