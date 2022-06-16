const Joi = require('joi')

const validation = (schema) => {

	return (req, res, next) => {
		try {
			const { error } = Joi.validate(req.body, schema)
			const valid = error == null
						
				if (!valid) {
					res.status(422).json({
						status: 'error',
						message: 'Invalid request data',
						data: req.body
					});
				} else {
					next()
				}

		} catch (error) {
			console.log(req.body)
			res.status(400).json({'message': 'validate error catch', status: error.details})
		}
	}
}

  module.exports = {
		validation
  }
