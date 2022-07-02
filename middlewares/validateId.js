const { Types } = require('mongoose');
const { BadRequest } = require('http-errors');

const validateId = (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.contactId)) {
    throw new BadRequest(`Invalid ObjectId`);
  }
  next();
};

module.exports = validateId;
