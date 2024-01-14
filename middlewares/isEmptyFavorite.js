const { HttpError } = require("../helpers/");

const isEmptyFavorite = (req, res, next) => {
	if (!Object.keys(req.body).length) {
		return next(HttpError(400, "missing field favorite"));
	}
	next();
};

module.exports = isEmptyFavorite;
