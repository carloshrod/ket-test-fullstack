const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { genSalt, hash } = require('bcryptjs');

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.pre('save', async function (next) {
	const salt = await genSalt(10);
	this.password = await hash(this.password, salt);
	next();
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
