const ErrorCreator = require('../utils/ErrorCreator')
const validateBody = (schema) => {
	const func = async (req, res, next) => {
		const { error } = await schema.validate(req.body)
		if (error) {
			next(ErrorCreator(400, error.message))
		}
		next()
	}
	return func
}
module.exports = validateBody
