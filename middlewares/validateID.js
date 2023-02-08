const { isValidObjectId } = require('mongoose');
const { HttpError } = require('@root/helpers');

const validateID = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId))
    next(new HttpError(404, `Invalid entity ID: ${contactId}`));

  next();
};

module.exports = validateID;
