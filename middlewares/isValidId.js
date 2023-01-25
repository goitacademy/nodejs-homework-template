const { isValidObjectId } = require("mongoose");
const { NotFound } = require("http-errors");

const isValidId = (req, res, next) => {
	const id = req.params.contactId;
	const isCorrectId = isValidObjectId(id);
	if (!isCorrectId) {
		const error = NotFound(`${id} is not correct id format`);
		next(error);
	}
	next();
};

module.exports = isValidId;
