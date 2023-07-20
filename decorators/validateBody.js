import HttpError from "../helpers/HttpError.js";

const validateBody = schema => {
	const func = (req, res, next) => {
		const { error } = schema.validate(req.body);

		if (error) {
			if (error.details[0].type === "any.required") {
				next(HttpError(400, `missing required ${error.details[0].context.key} field`))
			} else {
				next(HttpError(400, error.message))
			}
		}
		next()

	}
	return func
}

export default validateBody