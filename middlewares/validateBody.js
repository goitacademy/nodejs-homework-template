const { HttpError } = require("../helpers/");

const validateBody = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });
		if (error) {
			throw HttpError(400, error.message);
		}
		next();
	};
};

module.exports = validateBody;
