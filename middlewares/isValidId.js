const { isValidObjectId } = require('mongoose');
const { httpError } = require('../utils');

const isValidId = (req, _, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(httpError(400, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
