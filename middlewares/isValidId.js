const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  console.log(req.params.contactId);
  if (!isValidObjectId(req.params.contactId)) {
    next(HttpError(400, `${req.params.contactId} is not id`));
  }
  next();
};

module.exports = isValidId;
