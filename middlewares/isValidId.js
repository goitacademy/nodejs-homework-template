const { isValidObjectId } = require('mongoose');

const { createError } = require('../errors');

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = createError(400, `${contactId} is not correct id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
