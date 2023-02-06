const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");


const isValidation = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const err = createError(400, `id is not correct format`);
    next(err);
  }
  next();
};

module.exports = isValidation;