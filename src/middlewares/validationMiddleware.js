const Joi = require('joi')

  module.exports = {
		addContactValidation: (req, res, next) => {
			const schema = Joi.object({
				name: Joi.string()
					.min(3)
					.max(100)
					.required(),
				email: Joi.string()
					.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
					.required(),
				phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
			})

			const validationResult = schema.validate(req.body)

			if(validationResult.error) {
				return res.status(400).json({'message': 'missing required name field', status: validationResult.error.details})
			}
			next()
		},

		updateContactValidation: (req, res, next) => {
			const schema = Joi.object({
				name: Joi.string()
					.min(3)
					.max(100)
					.optional(),
				email: Joi.string()
					.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
					.optional(),
				phone: Joi.string().length(10).pattern(/^[0-9]+$/).optional()
			})

			const validationResult = schema.validate(req.body)

			if(validationResult.error) {
				return res.status(400).json({status: validationResult.error.details})
			}
			next()
		}
  }
