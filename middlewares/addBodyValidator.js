const httpError = require("../helpers/httpError");
const { objectFieldsChecker } = require("../helpers");
const addBodyValidator = (schema) => {
	const valid = (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			const alertMessage = objectFieldsChecker(req.body);
			next(httpError(400, alertMessage));
		}
		next();
	};
	return valid;
};

module.exports = addBodyValidator;
