const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../Helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `Contact with this ID: ${contactId} was not found`));
  }
  next();
};

module.exports = isValidId;
