const ERRORS = {
	MongoServerError: res => res.status(400).send(),

	ValidationError: res => res.status(400).send(),

	CastError: res => res.status(400).send(),

	defaultError: res => res.status(500).end(),
};

const errorHandler = (error, _req, res, _next) => {
	console.log(error);
	const handler = ERRORS[error.name] || ERRORS.defaultError;
	handler(res, error);
};

module.exports = errorHandler;
