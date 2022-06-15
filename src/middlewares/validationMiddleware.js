const { addContactSchema } = require('./addContactSchema')
const { updateContactSchema } = require('./updateContactSchema')

const actionValidation = (req, res, next, schema) => {
	const validationResult = schema.validate(req.body)

		if(validationResult.error) {
			console.log(req.body)
			return res.status(400).json({'message': 'validate error', status: validationResult.error.details})
		}
	next()
}

  module.exports = {
		addContactValidation: (req, res, next) => actionValidation(req, res, next, addContactSchema),
		updateContactValidation: (req, res, next) => actionValidation(req, res, next, updateContactSchema)
  }
