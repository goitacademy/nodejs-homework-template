const { isValidObjectId } = require("mongoose");

const httpError = require("../utilits/httpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(httpError(400, `${contactId} is not valid Id`));
  }
  next();
};

module.exports = isValidId;