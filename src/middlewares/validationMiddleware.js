const Joi = require('joi')
const { addContactSchema } = require('./addContactSchema')
const { updateContactSchema } = require('./updateContactSchema')

const actionValidation = (req, res, next, schema) => {
	const validationResult = schema.validate(req.body)

		if(validationResult.error) {
			return res.status(400).json({'message': 'missing required name field', status: validationResult.error.details})
		}
	next()
}

  module.exports = {
		addContactValidation: (req, res, next) => actionValidation(req, res, next, addContactSchema),
		updateContactValidation: (req, res, next) => actionValidation(req, res, next, updateContactSchema)
  }
