const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    throw createError(404, `${contactId} is not correct format`);
  }
  next();
};

module.exports = isValidId;