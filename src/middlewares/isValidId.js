const { isValidObjectId } = require("mongoose");
const { handleSchemaValidationErrors } = require('../helpers/handlerSchemaValidation');

const isValidId = (req, _, next) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		const error = handleSchemaValidationErrors(400, `${id} is not corrent id format`);
		next(error);
	}
	next()
}

module.exports = isValidId;