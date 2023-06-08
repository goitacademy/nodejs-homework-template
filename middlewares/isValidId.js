const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../help');

const isValid = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, `${contactId} is not valid`));
  }
  next();
};

module.exports = isValid;
