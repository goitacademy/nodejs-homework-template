const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidFavorite = (req, res, next) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		next(HttpError(400, "missing field favorite"));
	}
	next();
};

module.exports = isValidFavorite;
