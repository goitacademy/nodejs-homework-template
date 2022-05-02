const { isValidObjectId } = require("mongoose");

const { createError } = require("../helpers");

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    next(createError(404, "Invalid id"));
    return;
  }
  next();
};

module.exports = validateId;
