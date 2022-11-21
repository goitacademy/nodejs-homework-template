const { isValidObjectId } = require('mongoose');
const { HTTPError } = require('../helpers');

//* Check Valid id in mongo DB
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HTTPError(400, 'Not valid id'));
  }
  next();
};

module.exports = isValidId;
