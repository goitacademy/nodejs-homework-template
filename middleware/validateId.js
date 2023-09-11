const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, _, next) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		return next(HttpError(400, `${id} is not valid id`));
	}

	next();
};

module.exports = isValidId;
