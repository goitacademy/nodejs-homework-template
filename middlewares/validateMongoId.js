const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");
const { status } = require("../consts");

const validateMongoId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(HttpError(status.BAD_ID));
  }
  next();
};

module.exports = validateMongoId;
