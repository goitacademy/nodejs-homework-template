const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

function isValidId(req, res, next) {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createError(404, "Wrong id format");
  }
  next();
}

module.exports = isValidId;
