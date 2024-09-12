const { HttpError } = require("../helpers");

const validateBody = (schema) => {
	const func = async (req, res, next) => {
		if (Object.keys(req.body).length === 0) {
			return next(HttpError(400, "missing fields"));
		}
		const { error } = schema.validate(req.body);
		if (error) {
			return next(HttpError(400, error.message));
		}
		next();
	};
	return func;
};

module.exports = validateBody;
