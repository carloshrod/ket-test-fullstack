const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = () => {
	try {
		mongoose.set('strictQuery', false);
		mongoose.connect(process.env.MONGODB_URI);
		console.log('\n********** CONNECTION TO DATABASE SUCCESSFUL **********');
	} catch (error) {
		console.log('********** CONNECTION TO DATABASE FAILED **********');
		console.error(error);
	}
};

module.exports = connectToDB;
