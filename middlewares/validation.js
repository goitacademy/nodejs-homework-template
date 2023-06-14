const { ApiError } = require("../utils");

const { isValidObjectId } = require("mongoose");

const contactValidation = (schema, message) => (req, _, next) => {
  const { body } = req;
  const { error, value } = schema.validate(body);
  if (error) return next(ApiError(400, message));

  req.body = value;
  next();
};

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId))
    next(ApiError(400, `${contactId} is not valid id`));

  next();
};

module.exports = { contactValidation, isValidId };
