const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw new HttpError(400, `Invalid contact id: ${contactId}`);
  }

  next();
};

module.exports = validateId;
