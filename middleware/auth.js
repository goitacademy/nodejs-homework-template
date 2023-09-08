const jwt = require('jsonwebtoken')
const userModel = require('../models/usersModel')

function auth(req, res, next) {
	const authHeader = req.headers.authorization
	if (typeof authHeader !== 'string') {
		return res.status(401).send({ message: 'No token provided!' })
	}

	const [bearer, token] = authHeader.split(" ", 2)
	if (bearer !== "Bearer") {
		return res.status(401).send({ message: 'No token provided!' })
	}

	jwt.verify(token, process.env.JWT_SECREET, async (error, decode) => {
		if (error) {
			if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
				return res.status(401).send({ message: "Token Error! (Check if it's not expired)" })
			}
			return next(error)
		}

		try {
			const user = await userModel.findById(decode.id)

			if (user.token !== token) {
				return res.status(401).send({ message: "You are not authorized!" })
			}

			req.user = { id: user.id, email: user.email }

			next()
		} catch (error) {
			next(error)
		}
	})
}

module.exports = auth