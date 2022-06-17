

const validation = (schema) => {
	return (req, res, next) => {
    
		const { error } = schema.validate(req.body)
						
				if (error) {					
					res.status(400).json({
						status: 'error',
						message: 'Invalid request data',
						data: req.body
					});

					next(error)
				}

				next()
	}
}

  module.exports = {
		validation
  }
