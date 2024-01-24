const jwt = require('jsonwebtoken');
const { HttpError } = require('../utils');
// const { secretConfig } = require('../config');



exports.registerToken = (id) => jwt.sign({ id }, 'secretConfigjwtSecret', { expiresIn: '1d' });



exports.checkToken = (token) => {
	if (!token) throw new HttpError(401, 'Not Logged In...');

	try {
		const { id } = jwt.verify(token, 'secretConfigjwtSecret');
		return id;
	} catch (err) {
		throw new HttpError(401, 'Not Logged In...');
	}
}