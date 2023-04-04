const { isValidObjectId } = require("mongoose");

const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.param;
  if (!isValidObjectId(contactId)) {
    throw createError(404, "Not valid id");
  }
  next();
};

module.exports = isValidId;
