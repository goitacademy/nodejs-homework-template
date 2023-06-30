const { HttpError } = require('../helpers');

const isBodyEmpty = async (req, res, next) => {
	if (!req.body || !Object.keys(req.body).length) {
		next(HttpError(400, 'missing fields'));
	}
	next();
};

module.exports = isBodyEmpty;
