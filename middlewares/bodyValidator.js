const httpError = require("../helpers/httpError");

const bodyValidator = (schema) => {
	const valid = (req, res, next) => {
		if (!Object.keys(req.body).length) {
			next(httpError(400, "missing fields"));
		}
		const { error } = schema.validate(req.body);
		if (error) {
			next(httpError(400, error.message));
		}
		next();
	};
	return valid;
};

module.exports = bodyValidator;
