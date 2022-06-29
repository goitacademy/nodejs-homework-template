
const validation = (schema) => {
	return (req, res, next) => {
    
		try {
			schema.validate(req.body)
		} catch (err) {
			res.status(400)
				.json({
								status: 'error',
								message: 'Invalid request data',
								data: req.body
							})
		}
		next()
	}
}

module.exports = validation
