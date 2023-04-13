const { isValidObjectId } = require("mongoose");

const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createError(404, `Not found`);
  }
  next();
};

module.exports = isValidId;
