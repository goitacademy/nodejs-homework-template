const { isValidObjectId } = require('mongoose');
const { BadRequest } = require('http-errors');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);

  if (!isCorrectId) {
    const error = BadRequest(`${contactId} - is not correct id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
