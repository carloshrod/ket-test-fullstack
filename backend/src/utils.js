const { sign } = require('jsonwebtoken');

exports.generateAuthToken = user => {
	const token = sign(
		{
			_id: user._id,
			name: user.name,
			username: user.username,
			role: user.role,
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: '6h' }
	);
	return token;
};
