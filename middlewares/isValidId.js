const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    next(HttpError(404, `${id} is not a valid id format`));
  }
  next();
};

module.exports = isValidId;
