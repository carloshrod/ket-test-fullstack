const { sign } = require('jsonwebtoken');

exports.generateAuthToken = user => {
	const token = sign(
		{
			_id: user._id,
			role: user.role,
			id_number: user.id_number,
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: '6h' }
	);
	return token;
};
