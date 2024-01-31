const app = require('./app.js');
const connectToDB = require('./database.js');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Connect to database:
connectToDB();

// Run server
const server = app.listen(PORT, () => {
	console.log(`************ Server listening on port ${PORT} ************\n`);
});

module.exports = server;
