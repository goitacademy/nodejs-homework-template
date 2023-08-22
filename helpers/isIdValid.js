const HttpError = require('./httpErrors');

const { isValidObjectId } = require('mongoose');

const isIdValid = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    throw HttpError(404, 'ID is invalid');
  }
  next();
};

module.exports = isIdValid;