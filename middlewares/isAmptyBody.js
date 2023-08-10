const {HttpError} = require("../helpers")

const isAmptyBody = (req, res, next) => {
	const { length } = Object.keys(req.body);

	if (!length) next(HttpError(400, "missing fields"));

	next();
};

module.exports = isAmptyBody;