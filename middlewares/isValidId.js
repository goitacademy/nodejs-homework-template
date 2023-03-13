const { isValidObjectId } = require('mongoose');
const createError = require('http-errors');

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrect = isValidObjectId(contactId);

  if (!isCorrect) {
    throw createError(404, `Contact with id=${contactId} was not found`);
  }
  next();
};

module.exports = isValidId;
