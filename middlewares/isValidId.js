const { isValidObjectId } = require('mongoose');
const HttpError = require('../helpers/HttpError');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(new HttpError(400, `${contactId} is not a valid ID`));
  } else {
    next();
  }
};

module.exports = isValidId;
