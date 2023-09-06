const { HttpError } = require("../helpers");

const validateBody = (schema) => (req, _, next) => {
	const { error } = schema.validate(req.body);

	if (error) {
		return next(HttpError(400, error.message));
	}

	next();
};

module.exports = validateBody;