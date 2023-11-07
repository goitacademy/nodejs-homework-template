const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../utils');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  if (!isValidObjectId(contactId)) {
    next(HttpError({ status: 400, message: `${contactId} is not valid id` }));
  }
  next();
};

module.exports = isValidId;
