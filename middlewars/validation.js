const { createError } = require('../helpers')

const validation = (schema, message = null) => {
	return (req, _, next) => {
		const { error } = schema.validate(req.body)
		if (error) {
			if (message) {
				next(createError(400, message))
			}
			const { message: errMessage } = error
			next(createError(400, errMessage))
		}
		next()
	}
}

module.exports = validation
