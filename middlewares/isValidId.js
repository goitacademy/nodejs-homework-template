const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
	const { contactId } = req.params;
	const isCorrectId = isValidObjectId(contactId);

	if (!isCorrectId) {
		res.json({
			status: "error",
			code: 400,
			message: "Requested contactId has incorrect format",
		});
	}
	next();
};

module.exports = isValidId;
