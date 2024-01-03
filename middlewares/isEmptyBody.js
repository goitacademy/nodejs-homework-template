const { HttpError } = require("../helpers/");

const isEmptyBody = (req, res, next) => {
	if (!Object.keys(req.body).length) {
		return next(HttpError(400, "missing fields"));
	}
	next();
};

module.exports = isEmptyBody;
