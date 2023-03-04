const { isValidObjectId } = require('mongoose');
const requestError = require('../helpers/requestError');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(requestError(400, `${contactId} is not correct id format`));
  }
  next();
};

module.exports = isValidId;
