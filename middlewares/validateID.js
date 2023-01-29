const { isValidObjectId } = require('mongoose');
const { httpError } = require('@root/helpers');

const validateID = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId))
    next(httpError(404, `Invalid entity ID: ${contactId}`));

  next();
};

module.exports = validateID;
