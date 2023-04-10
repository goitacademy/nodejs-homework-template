const { ObjectId } = require('mongoose').Types;
const { HttpError } = require('../helpers');

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  if (!ObjectId.isValid(contactId)) {
    throw new HttpError(400, `Invalid contact id: ${contactId}`);
  }

  next();
};

module.exports = validateId;
