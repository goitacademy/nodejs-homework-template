const {HttpError} = require("../helpers");

const validateBody = (schema) => {
	console.log(schema);
	const func = (req, res, next) => {
		if(Object.values(req.body).length === 0) {
			next(HttpError(400, "missing filds"))
		}
		const {error} = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}
		next();
	}

	return func;
}

module.exports = validateBody;