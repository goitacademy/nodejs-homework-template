import HTTPError from "../helpers/HTTPError.js";

const validateBody = schema => {
	const func = (req, _, next) => {
		const { error } = schema.validate(req.body);

		if (error) {
			next(HTTPError(400, error.message));
		}
		next();
	};

	return func;
};

export default validateBody;
