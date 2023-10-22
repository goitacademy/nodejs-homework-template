const { isValidObjectId } = require('mongoose');

const httpError = require('../helpers/HttpError');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(httpError(400, `${id} is not a valid id`));
  }
  next();
};

module.exports = isValidId;
