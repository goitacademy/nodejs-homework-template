const { requestError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization || '';
	const [type, token] = authHeader.split(' ');
	if (type !== 'Bearer') {
		throw requestError(401, 'Token type is not valid');
	}
	if (!token) {
		throw requestError(401, 'No token provider');
	}
	try {
		const payload = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(payload.id);
		req.user = user;
	} catch (error) {
		if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
			throw requestError(401, 'Not authorized');
		}
		throw error;
	}
	next();
};

module.exports = auth;
