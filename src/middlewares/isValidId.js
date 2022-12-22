const { isValidObjectId } = require("mongoose");
const {
  handleSchemaValidationErrors,
} = require("../helpers/handlerSchemaValidation");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = handleSchemaValidationErrors(
      400,
      `${contactId} is not corrent id format`
    );
    next(error);
  }
  next();
};

module.exports = isValidId;
